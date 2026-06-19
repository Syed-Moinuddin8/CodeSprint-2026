import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import RegistrationForm from "@/components/RegistrationForm";

export default function Prizes() {
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <Navbar onRegisterClick={() => setIsRegistrationOpen(true)} />
      
      <main>
        {/* Prizes Section - Exact copy from Home */}
        <section className="py-20 bg-gradient-to-br from-purple-50 via-white to-blue-50 border-t border-gray-200 pt-32">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-4xl font-bold mb-4 text-center text-gray-900">Prizes & Recognition</h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
              Compete for the grand prize and earn recognition for your work
            </p>
            
            {/* Winner Prize */}
            <div className="max-w-md mx-auto mb-12">
              <div className="relative p-10 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl border-2 border-yellow-400 shadow-2xl transform hover:scale-105 transition-transform">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-yellow-400 text-yellow-900 px-6 py-2 rounded-full text-base font-bold">🏆 Grand Winner</span>
                </div>
                <div className="text-center pt-4">
                  <div className="text-8xl mb-6">🥇</div>
                  <div className="text-5xl font-black text-gray-900 mb-4">Cash Prize</div>
                  <div className="space-y-2">
                    <p className="text-lg text-gray-700 font-semibold">+ Certificate of Excellence</p>
                    <p className="text-sm text-gray-600">Best Project Winner</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Certificates for All */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 rounded-xl p-8 max-w-3xl mx-auto">
              <h3 className="text-2xl font-bold text-center mb-6 text-gray-900">🎖️ All Participants Receive</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start gap-4 p-4 bg-white rounded-lg shadow-sm">
                  <span className="text-3xl">📜</span>
                  <div>
                    <p className="font-bold text-gray-900 mb-1">Certificate of Participation</p>
                    <p className="text-sm text-gray-600">Official certificate for all registered teams who submit their projects</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 bg-white rounded-lg shadow-sm">
                  <span className="text-3xl">🎯</span>
                  <div>
                    <p className="font-bold text-gray-900 mb-1">Portfolio Enhancement</p>
                    <p className="text-sm text-gray-600">Valuable experience and project showcase for your resume</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 bg-white rounded-lg shadow-sm">
                  <span className="text-3xl">🤝</span>
                  <div>
                    <p className="font-bold text-gray-900 mb-1">Networking Opportunity</p>
                    <p className="text-sm text-gray-600">Connect with fellow developers and industry professionals</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 bg-white rounded-lg shadow-sm">
                  <span className="text-3xl">💡</span>
                  <div>
                    <p className="font-bold text-gray-900 mb-1">Learning Experience</p>
                    <p className="text-sm text-gray-600">Gain hands-on experience with real-world problem solving</p>
                  </div>
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
