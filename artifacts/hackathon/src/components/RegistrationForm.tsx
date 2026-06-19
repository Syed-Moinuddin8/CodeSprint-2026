import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface RegistrationFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function RegistrationForm({ open, onOpenChange }: RegistrationFormProps) {
  const [formData, setFormData] = useState({
    teamLeaderName: "",
    email: "",
    phone: "",
    teamName: "",
    teamSize: "1",
    member2: "",
    member3: "",
    member4: "",
    college: "",
    paymentReceipt: null as File | null,
  });

  const [receiptFileName, setReceiptFileName] = useState<string>("");
  const [qrImageKey, setQrImageKey] = useState(Date.now());
  const [showSuccessPage, setShowSuccessPage] = useState(false);
  const [registrationData, setRegistrationData] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate payment receipt
    if (!formData.paymentReceipt) {
      alert("Please upload payment receipt before submitting!");
      return;
    }

    try {
      // Prepare form data for API submission with file upload
      const apiFormData = new FormData();
      apiFormData.append("fullName", formData.teamLeaderName);
      apiFormData.append("email", formData.email);
      apiFormData.append("phone", formData.phone);
      apiFormData.append("college", formData.college);
      apiFormData.append("teamName", formData.teamName);
      apiFormData.append("teamSize", formData.teamSize);
      
      // Combine team members
      const members = [
        formData.member2,
        formData.member3,
        formData.member4
      ].filter(m => m.trim()).join(", ");
      apiFormData.append("teamMembers", members);
      
      apiFormData.append("paymentReceipt", formData.paymentReceipt);

      // Submit to API
      const response = await fetch("/api/registrations", {
        method: "POST",
        body: apiFormData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Registration failed");
      }

      const data = await response.json();

      // Store registration data and show success page
      setRegistrationData({
        id: data.id,
        teamName: formData.teamName,
        teamLeaderName: formData.teamLeaderName,
        phone: formData.phone,
        email: formData.email,
      });
      setShowSuccessPage(true);
      
    } catch (error: any) {
      let errorMessage = "Registration failed. Please try again.";
      
      if (error.message.includes("already registered")) {
        errorMessage = "This email is already registered. Please use a different email address.";
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      alert(`Registration Error: ${errorMessage}\n\nPlease try again or contact support.`);
      console.error("Registration error:", error);
    }
  };

  const handleCloseSuccess = () => {
    setShowSuccessPage(false);
    setRegistrationData(null);
    onOpenChange(false);
    
    // Reset form
    setFormData({
      teamLeaderName: "",
      email: "",
      phone: "",
      teamName: "",
      teamSize: "1",
      member2: "",
      member3: "",
      member4: "",
      college: "",
      paymentReceipt: null,
    });
    setReceiptFileName("");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type (images only)
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'application/pdf'];
      if (!validTypes.includes(file.type)) {
        alert('Please upload a valid image file (JPG, PNG, GIF) or PDF');
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        return;
      }

      setFormData({
        ...formData,
        paymentReceipt: file,
      });
      setReceiptFileName(file.name);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
      if (isOpen) {
        // Refresh QR code image when dialog opens
        setQrImageKey(Date.now());
      } else {
        // Reset success page when closing
        setShowSuccessPage(false);
        setRegistrationData(null);
      }
      onOpenChange(isOpen);
    }}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        {showSuccessPage ? (
          // Success Page
          <div className="text-center py-8">
            <div className="mb-6">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Registration Successful! 🎉</h2>
              <p className="text-gray-600 mb-6">Thank you for registering for CodeSprint 2026</p>
            </div>

            {registrationData && (
              <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6 mb-6 text-left">
                <h3 className="font-bold text-lg mb-3 text-blue-900">Registration Details</h3>
                <div className="space-y-2 text-sm">
                  <p><span className="font-semibold">Team Name:</span> {registrationData.teamName}</p>
                  <p><span className="font-semibold">Team Leader:</span> {registrationData.teamLeaderName}</p>
                  <p><span className="font-semibold">Email:</span> {registrationData.email}</p>
                  <p><span className="font-semibold">Phone:</span> {registrationData.phone}</p>
                </div>
              </div>
            )}

            <div className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-300 rounded-lg p-6 mb-6">
              <h3 className="font-bold text-xl mb-3 text-green-900">📱 Join Our WhatsApp Group</h3>
              <p className="text-gray-700 mb-4">Stay updated with all event announcements, schedules, and important information!</p>
              
              <div className="bg-white rounded-lg p-4 inline-block shadow-lg">
                <img 
                  src="/Group.jpeg"
                  alt="WhatsApp Group QR Code" 
                  className="w-96 h-96 object-contain mx-auto"
                  onError={(e) => {
                    const target = e.currentTarget;
                    const rand = Math.random();
                    if (target.src.includes('.jpeg')) {
                      target.src = `/Group.jpg?t=${rand}`;
                    } else if (target.src.includes('.jpg')) {
                      target.src = `/Group.png?t=${rand}`;
                    }
                  }}
                />
                <p className="text-sm text-gray-600 mt-3 font-medium">Scan with WhatsApp to join</p>
              </div>
              
              <div className="mt-4 p-4 bg-yellow-50 border border-yellow-300 rounded-lg">
                <p className="text-sm text-yellow-900 font-medium">
                  ⚠️ Important: Please join the group to receive real-time updates and communicate with organizers!
                </p>
              </div>
            </div>

            <Button
              onClick={handleCloseSuccess}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white text-lg py-6"
            >
              Done
            </Button>
          </div>
        ) : (
          // Registration Form
          <>
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Register for CodeSprint 2026</DialogTitle>
          <DialogDescription>
            Complete the form below and upload payment receipt. Registration fee: ₹350 per team.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          {/* Team Leader Information */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-bold text-lg mb-3 text-blue-900">Team Leader Information</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Team Leader Name *</label>
                <input
                  type="text"
                  name="teamLeaderName"
                  value={formData.teamLeaderName}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter team leader's full name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Mobile Number *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  pattern="[0-9]{10}"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="10-digit mobile number"
                />
                <p className="text-xs text-gray-500 mt-1">Enter 10-digit mobile number without +91</p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">College/Organization *</label>
                <input
                  type="text"
                  name="college"
                  value={formData.college}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Your college or organization name"
                />
              </div>
            </div>
          </div>

          {/* Team Information */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h3 className="font-bold text-lg mb-3 text-green-900">Team Information</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Team Name *</label>
                <input
                  type="text"
                  name="teamName"
                  value={formData.teamName}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Enter your team name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Team Size *</label>
                <select
                  name="teamSize"
                  value={formData.teamSize}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="1">Solo (1 member)</option>
                  <option value="2">2 members</option>
                  <option value="3">3 members</option>
                  <option value="4">4 members</option>
                </select>
              </div>

              {parseInt(formData.teamSize) >= 2 && (
                <div>
                  <label className="block text-sm font-medium mb-1">Team Member 2 Name (Optional)</label>
                  <input
                    type="text"
                    name="member2"
                    value={formData.member2}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Full name of member 2"
                  />
                </div>
              )}

              {parseInt(formData.teamSize) >= 3 && (
                <div>
                  <label className="block text-sm font-medium mb-1">Team Member 3 Name (Optional)</label>
                  <input
                    type="text"
                    name="member3"
                    value={formData.member3}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Full name of member 3"
                  />
                </div>
              )}

              {parseInt(formData.teamSize) >= 4 && (
                <div>
                  <label className="block text-sm font-medium mb-1">Team Member 4 Name (Optional)</label>
                  <input
                    type="text"
                    name="member4"
                    value={formData.member4}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Full name of member 4"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Payment Section */}
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <h3 className="font-bold text-lg mb-3 text-orange-900">Payment Details</h3>
            
            <div className="space-y-4">
              <div className="bg-white border-2 border-orange-300 rounded-lg p-4 text-center">
                <p className="text-sm font-medium text-gray-700 mb-3">Scan QR Code to Pay ₹350</p>
                <div className="bg-white border-2 border-gray-300 rounded-lg p-4 mb-3 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-64 h-64 mx-auto mb-3 bg-white p-2 rounded-lg shadow-lg">
                      <img 
                        key={qrImageKey}
                        src={`/qr-code-payment.jpeg?t=${Math.random()}`}
                        alt="UPI Payment QR Code" 
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          // Try different formats if not found
                          const target = e.currentTarget;
                          const rand = Math.random();
                          if (target.src.includes('.jpeg')) {
                            target.src = `/qr-code-payment.jpg?t=${rand}`;
                          } else if (target.src.includes('.jpg')) {
                            target.src = `/qr-code-payment.png?t=${rand}`;
                          } else if (target.src.includes('.png')) {
                            target.src = `/qr-code-payment.svg?t=${rand}`;
                          }
                        }}
                      />
                    </div>
                    <div className="mt-3 p-3 bg-gradient-to-r from-blue-50 to-green-50 rounded border border-blue-200">
                      <p className="text-xs font-mono text-gray-700 font-semibold">UPI ID: smoinuddin283-1@okicici</p>
                      <p className="text-xs text-gray-600 mt-1">Amount: ₹350</p>
                    </div>
                    <div className="mt-2 text-xs text-gray-500 italic">
                      Open any UPI app (GPay, PhonePe, Paytm) to scan
                    </div>
                  </div>
                </div>
                <p className="text-xs text-orange-700 font-medium">
                  ⚠️ Save the screenshot/receipt after payment
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Upload Payment Receipt *</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-orange-400 transition-colors">
                  <input
                    type="file"
                    accept="image/*,.pdf"
                    onChange={handleFileChange}
                    required
                    className="hidden"
                    id="receipt-upload"
                  />
                  <label
                    htmlFor="receipt-upload"
                    className="cursor-pointer flex flex-col items-center"
                  >
                    <div className="text-4xl mb-2">📎</div>
                    <p className="text-sm font-medium text-gray-700">
                      {receiptFileName || "Click to upload receipt"}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      JPG, PNG, GIF or PDF (Max 5MB)
                    </p>
                  </label>
                </div>
                <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded">
                  <p className="text-xs text-red-800 font-medium">
                    📌 Important: Receipt must contain the Transaction ID clearly visible
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-900 font-medium mb-2">
              💰 Registration Fee: ₹350 per team (not per person)
            </p>
            <p className="text-xs text-blue-700">
              ✓ One payment covers the entire team<br/>
              ✓ Keep your transaction ID for reference
            </p>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
            >
              Submit Registration
            </Button>
          </div>
        </form>
        </>
        )}
      </DialogContent>
    </Dialog>
  );
}
