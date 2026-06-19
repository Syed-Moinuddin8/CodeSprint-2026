import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import RegistrationForm from "@/components/RegistrationForm";

export default function FAQ() {
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <Navbar onRegisterClick={() => setIsRegistrationOpen(true)} />
      
      <main>
        {/* FAQ Section - Exact copy from Home */}
        <section className="py-20 bg-white border-t border-gray-200 pt-32">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-4xl font-bold mb-12 text-center text-gray-900">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div className="p-6 bg-gray-50 rounded-xl border border-gray-200">
                <h3 className="font-bold text-lg mb-2 text-gray-900">Who can participate?</h3>
                <p className="text-gray-600">Anyone! Students, professionals, and tech enthusiasts from anywhere in the world are welcome to join.</p>
              </div>
              <div className="p-6 bg-gray-50 rounded-xl border border-gray-200">
                <h3 className="font-bold text-lg mb-2 text-gray-900">Is there a registration fee?</h3>
                <p className="text-gray-600">Yes, there is a registration fee of ₹350 per participant to secure your spot in the hackathon.</p>
              </div>
              <div className="p-6 bg-gray-50 rounded-xl border border-gray-200">
                <h3 className="font-bold text-lg mb-2 text-gray-900">Can I work on an existing project?</h3>
                <p className="text-gray-600">No, all work must be created during the 11-hour hackathon period. However, you can use existing libraries, frameworks, and APIs.</p>
              </div>
              <div className="p-6 bg-gray-50 rounded-xl border border-gray-200">
                <h3 className="font-bold text-lg mb-2 text-gray-900">What if I don't have a team?</h3>
                <p className="text-gray-600">You can participate solo or we'll have a team formation session before the event starts to help you find teammates.</p>
              </div>
              <div className="p-6 bg-gray-50 rounded-xl border border-gray-200">
                <h3 className="font-bold text-lg mb-2 text-gray-900">How will projects be judged?</h3>
                <p className="text-gray-600">Projects will be evaluated based on innovation (30%), technical implementation (30%), design & UX (20%), and presentation (20%).</p>
              </div>
              <div className="p-6 bg-gray-50 rounded-xl border border-gray-200">
                <h3 className="font-bold text-lg mb-2 text-gray-900">What do I need to prepare?</h3>
                <p className="text-gray-600">A computer with internet connection, your favorite development tools, and lots of enthusiasm! We'll provide all necessary resources and support.</p>
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
