import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import RegistrationForm from "@/components/RegistrationForm";

export default function About() {
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <Navbar onRegisterClick={() => setIsRegistrationOpen(true)} />
      
      <main>
        {/* About Section - Exact copy from Home */}
        <section className="py-20 bg-white pt-32">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-4xl font-bold mb-8 text-center text-gray-900">About CodeSprint</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100">
                <h3 className="font-bold text-xl mb-2 text-blue-900">What is CodeSprint?</h3>
                <p className="text-gray-600">A high-octane 11-hour online hackathon designed to test your limits and push your creativity.</p>
              </div>
              <div className="p-6 bg-cyan-50 rounded-2xl border border-cyan-100">
                <h3 className="font-bold text-xl mb-2 text-cyan-900">Why Participate?</h3>
                <p className="text-gray-600">Win amazing prizes, get recognized by top judges, and build a project that actually matters.</p>
              </div>
              <div className="p-6 bg-orange-50 rounded-2xl border border-orange-100">
                <h3 className="font-bold text-xl mb-2 text-orange-900">Who Can Join?</h3>
                <p className="text-gray-600">Open to all students, professionals, and tech enthusiasts. Solo or teams of up to 4.</p>
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
