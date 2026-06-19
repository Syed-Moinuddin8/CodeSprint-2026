import React, { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { useGetAdminMe, useGetAdminStats, useAdminLogout, getGetAdminMeQueryKey } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Registration {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  college: string;
  teamName: string;
  teamSize: number;
  teamMembers: string | null;
  paymentReceiptPath: string | null;
  createdAt: string;
}

export default function AdminDashboard() {
  const [, setLocation] = useLocation();
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [selectedRegistration, setSelectedRegistration] = useState<Registration | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  
  const { data: me, isLoading: meLoading, isError: meError } = useGetAdminMe({
    query: {
      queryKey: getGetAdminMeQueryKey(),
      retry: false
    }
  });

  const { data: stats } = useGetAdminStats();
  
  const logoutMutation = useAdminLogout({
    mutation: {
      onSuccess: () => {
        setLocation("/admin");
      }
    }
  });

  useEffect(() => {
    if (meError) {
      setLocation("/admin");
    }
  }, [meError, setLocation]);

  // Fetch all registrations
  useEffect(() => {
    if (me) {
      fetchRegistrations();
    }
  }, [me]);

  const fetchRegistrations = async (search?: string) => {
    try {
      const url = search 
        ? `/api/registrations?search=${encodeURIComponent(search)}`
        : "/api/registrations";
      const response = await fetch(url, { credentials: "include" });
      if (response.ok) {
        const data = await response.json();
        setRegistrations(data);
      }
    } catch (error) {
      console.error("Failed to fetch registrations:", error);
    }
  };

  const handleDelete = async (id: number, teamName: string) => {
    if (!confirm(`Are you sure you want to delete the registration for team "${teamName}"? This action cannot be undone.`)) {
      return;
    }

    try {
      const response = await fetch(`/api/registrations/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (response.ok) {
        alert(`Successfully deleted registration for team "${teamName}"`);
        fetchRegistrations(); // Refresh the list
      } else {
        const error = await response.json();
        alert(`Failed to delete: ${error.error || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("Failed to delete registration. Please try again.");
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchRegistrations(searchQuery);
  };

  if (meLoading || !me) {
    return <div className="p-8 text-center text-gray-500">Loading dashboard...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
        <h1 className="font-bold text-xl text-gray-900">Admin Dashboard</h1>
        <Button 
          variant="outline" 
          onClick={() => logoutMutation.mutate({})}
          data-testid="button-logout"
        >
          Logout
        </Button>
      </nav>

      <main className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h3 className="text-sm font-medium text-gray-500">Total Registrations</h3>
            <p className="text-3xl font-bold text-gray-900 mt-2">{stats?.totalRegistrations || 0}</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h3 className="text-sm font-medium text-gray-500">Teams</h3>
            <p className="text-3xl font-bold text-gray-900 mt-2">{stats?.teamsRegistered || 0}</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h3 className="text-sm font-medium text-gray-500">Individual Participants</h3>
            <p className="text-3xl font-bold text-gray-900 mt-2">{stats?.individualParticipants || 0}</p>
          </div>
        </div>
        
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-bold text-lg text-gray-900">All Registrations</h2>
              <Button variant="outline" size="sm" onClick={() => window.open('/api/registrations/export')} data-testid="button-export">
                Export CSV
              </Button>
            </div>
            <form onSubmit={handleSearch} className="flex gap-2">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name, email, team, or college..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Button type="submit" size="sm">Search</Button>
              <Button type="button" size="sm" variant="outline" onClick={() => {
                setSearchQuery("");
                fetchRegistrations();
              }}>Clear</Button>
            </form>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50 text-gray-500 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 font-medium">Team</th>
                  <th className="px-6 py-3 font-medium">Leader</th>
                  <th className="px-6 py-3 font-medium">Contact</th>
                  <th className="px-6 py-3 font-medium">College</th>
                  <th className="px-6 py-3 font-medium">Size</th>
                  <th className="px-6 py-3 font-medium">Receipt</th>
                  <th className="px-6 py-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {registrations.map((reg) => (
                  <tr key={reg.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium">{reg.teamName}</td>
                    <td className="px-6 py-4">{reg.fullName}</td>
                    <td className="px-6 py-4 text-gray-500 text-xs">
                      <div>{reg.phone}</div>
                      <div>{reg.email}</div>
                    </td>
                    <td className="px-6 py-4 text-gray-500">{reg.college}</td>
                    <td className="px-6 py-4">{reg.teamSize}</td>
                    <td className="px-6 py-4">
                      {reg.paymentReceiptPath ? (
                        <button
                          onClick={() => setSelectedRegistration(reg)}
                          className="px-3 py-1 bg-green-100 text-green-700 rounded-md text-xs hover:bg-green-200"
                        >
                          View Receipt
                        </button>
                      ) : (
                        <span className="text-gray-400 text-xs">No receipt</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setSelectedRegistration(reg)}
                        >
                          Details
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDelete(reg.id, reg.teamName)}
                        >
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
                {registrations.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                      {searchQuery ? "No registrations found" : "No registrations yet"}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Registration Details Modal */}
      <Dialog open={!!selectedRegistration} onOpenChange={() => setSelectedRegistration(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Registration Details</DialogTitle>
            <DialogDescription>
              Team: {selectedRegistration?.teamName} (ID: {selectedRegistration?.id})
            </DialogDescription>
          </DialogHeader>
          
          {selectedRegistration && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Team Leader</p>
                  <p className="text-base">{selectedRegistration.fullName}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Team Name</p>
                  <p className="text-base">{selectedRegistration.teamName}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Email</p>
                  <p className="text-base">{selectedRegistration.email}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Phone</p>
                  <p className="text-base">{selectedRegistration.phone}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">College/Organization</p>
                  <p className="text-base">{selectedRegistration.college}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Team Size</p>
                  <p className="text-base">{selectedRegistration.teamSize} members</p>
                </div>
              </div>
              
              {selectedRegistration.teamMembers && (
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">Team Members</p>
                  <p className="text-base">{selectedRegistration.teamMembers}</p>
                </div>
              )}
              
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Registration Date</p>
                <p className="text-base">{new Date(selectedRegistration.createdAt).toLocaleString()}</p>
              </div>
              
              {selectedRegistration.paymentReceiptPath && (
                <div className="border-t pt-4">
                  <p className="text-sm font-medium text-gray-700 mb-3">Payment Receipt</p>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <img
                      src={selectedRegistration.paymentReceiptPath}
                      alt="Payment Receipt"
                      className="max-w-full h-auto rounded border border-gray-300"
                      onError={(e) => {
                        const target = e.currentTarget;
                        target.style.display = 'none';
                        const parent = target.parentElement;
                        if (parent) {
                          const errorMsg = document.createElement('p');
                          errorMsg.className = 'text-red-500 text-sm';
                          errorMsg.textContent = 'Failed to load receipt image';
                          parent.appendChild(errorMsg);
                        }
                      }}
                    />
                    <a
                      href={selectedRegistration.paymentReceiptPath}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-3 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                      Open in New Tab
                    </a>
                  </div>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
