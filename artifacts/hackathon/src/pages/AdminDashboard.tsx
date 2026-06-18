import React, { useEffect } from "react";
import { useLocation } from "wouter";
import { useGetAdminMe, useGetAdminStats, useAdminLogout, getGetAdminMeQueryKey } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";

export default function AdminDashboard() {
  const [, setLocation] = useLocation();
  
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
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="font-bold text-lg text-gray-900">Recent Registrations</h2>
            <Button variant="outline" size="sm" onClick={() => window.open('/api/registrations/export')} data-testid="button-export">
              Export CSV
            </Button>
          </div>
          <div className="p-0">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50 text-gray-500 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 font-medium">Name</th>
                  <th className="px-6 py-3 font-medium">Email</th>
                  <th className="px-6 py-3 font-medium">Team</th>
                  <th className="px-6 py-3 font-medium">Size</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {stats?.recentRegistrations?.map((reg) => (
                  <tr key={reg.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">{reg.fullName}</td>
                    <td className="px-6 py-4 text-gray-500">{reg.email}</td>
                    <td className="px-6 py-4">{reg.teamName}</td>
                    <td className="px-6 py-4">{reg.teamSize}</td>
                  </tr>
                ))}
                {(!stats?.recentRegistrations || stats.recentRegistrations.length === 0) && (
                  <tr>
                    <td colSpan={4} className="px-6 py-8 text-center text-gray-500">No registrations yet</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
