import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import RegistrationForm from "@/components/RegistrationForm";
import { generateRulebookPDF } from "@/utils/generateRulebookPDF";

// Download rulebook handler
const downloadRulebook = (e: React.MouseEvent<HTMLButtonElement>) => {
  e.preventDefault();
  generateRulebookPDF();
};

export default function Rules() {
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <Navbar onRegisterClick={() => setIsRegistrationOpen(true)} />
      
      <main>
        {/* Rules Section - Exact copy from Home */}
        <section className="py-20 bg-gray-50 border-t border-gray-200 pt-32">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-4xl font-bold mb-12 text-center text-gray-900">Rules & Guidelines</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl">📝</span>
                </div>
                <h3 className="font-bold text-xl mb-2">Original Work</h3>
                <p className="text-gray-600">All submissions must be original work created during the hackathon period.</p>
              </div>
              <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl">⏱️</span>
                </div>
                <h3 className="font-bold text-xl mb-2">Time Limit</h3>
                <p className="text-gray-600">Complete your project within 11 hours. Late submissions will not be accepted.</p>
              </div>
              <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl">👥</span>
                </div>
                <h3 className="font-bold text-xl mb-2">Team Size</h3>
                <p className="text-gray-600">Solo or teams of up to 4 members. Team leader must register with all team member names.</p>
              </div>
              <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl">💻</span>
                </div>
                <h3 className="font-bold text-xl mb-2">Tech Stack</h3>
                <p className="text-gray-600">Any programming language, framework, or technology is allowed.</p>
              </div>
            </div>
            <div className="text-center mt-8">
              <button onClick={downloadRulebook} className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors">
                Download Full Rulebook
              </button>
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
