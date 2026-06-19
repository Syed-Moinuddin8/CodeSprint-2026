import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import RegistrationForm from "@/components/RegistrationForm";

export default function Timeline() {
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <Navbar onRegisterClick={() => setIsRegistrationOpen(true)} />
      
      <main>
        {/* Timeline Section - Exact copy from Home */}
        <section className="py-20 bg-white border-t border-gray-200 pt-32">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-4xl font-bold mb-12 text-center text-gray-900">Event Timeline</h2>
            <div className="max-w-3xl mx-auto space-y-6">
              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-24 text-right">
                  <span className="text-blue-600 font-bold text-lg">10:00 AM</span>
                </div>
                <div className="flex-1 p-4 bg-blue-50 rounded-lg border border-blue-100">
                  <h3 className="font-bold text-lg mb-1">Opening Ceremony</h3>
                  <p className="text-gray-600">Welcome address and theme announcement</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-24 text-right">
                  <span className="text-cyan-600 font-bold text-lg">10:30 AM</span>
                </div>
                <div className="flex-1 p-4 bg-cyan-50 rounded-lg border border-cyan-100">
                  <h3 className="font-bold text-lg mb-1">Hacking Begins</h3>
                  <p className="text-gray-600">11 hours of non-stop coding starts</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-24 text-right">
                  <span className="text-orange-600 font-bold text-lg">03:00 PM</span>
                </div>
                <div className="flex-1 p-4 bg-orange-50 rounded-lg border border-orange-100">
                  <h3 className="font-bold text-lg mb-1">Mid-Event Check-in</h3>
                  <p className="text-gray-600">Optional mentor consultations and progress sharing</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-24 text-right">
                  <span className="text-red-600 font-bold text-lg">09:00 PM</span>
                </div>
                <div className="flex-1 p-4 bg-red-50 rounded-lg border border-red-100">
                  <h3 className="font-bold text-lg mb-1">Submission Deadline</h3>
                  <p className="text-gray-600">All projects must be submitted</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-24 text-right">
                  <span className="text-purple-600 font-bold text-lg">09:30 PM</span>
                </div>
                <div className="flex-1 p-4 bg-purple-50 rounded-lg border border-purple-100">
                  <h3 className="font-bold text-lg mb-1">Judging & Awards</h3>
                  <p className="text-gray-600">Top teams present and winners announced</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppFloat />
      <RegistrationForm 
        open={isRegistrationOpen} 
        onOpenChange={setIsRegistrationOpen} 
      />
    </div>
  );
}
