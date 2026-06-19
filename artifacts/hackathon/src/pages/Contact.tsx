import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import RegistrationForm from "@/components/RegistrationForm";

export default function Contact() {
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <Navbar onRegisterClick={() => setIsRegistrationOpen(true)} />
      
      <main className="pt-20 pb-20">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-5xl font-black mb-8 text-gray-900">Get in Touch</h1>
          <p className="text-xl text-gray-600 mb-12">Have questions? Need help with registration? Contact us!</p>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Contact Card - Syed Moinuddin */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 border-2 border-blue-200 shadow-lg">
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-blue-600 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold">
                  SM
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Syed Moinuddin</h3>
                  <p className="text-blue-700 font-medium">Event Coordinator</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 bg-white rounded-lg p-4 shadow-sm">
                  <span className="text-2xl">📞</span>
                  <div className="flex-1">
                    <p className="text-xs text-gray-500 font-medium">Phone / WhatsApp</p>
                    <a href="tel:8904281955" className="text-lg font-semibold text-gray-900 hover:text-blue-600">
                      8904281955
                    </a>
                  </div>
                  <a 
                    href="https://wa.me/918904281955" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-green-500 hover:bg-green-600 text-white rounded-full p-3 transition-colors shadow-md hover:shadow-lg"
                    title="Chat on WhatsApp"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Card - Usman */}
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-8 border-2 border-purple-200 shadow-lg">
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-purple-600 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold">
                  U
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Usman</h3>
                  <p className="text-purple-700 font-medium">Co-Coordinator</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 bg-white rounded-lg p-4 shadow-sm">
                  <span className="text-2xl">📞</span>
                  <div className="flex-1">
                    <p className="text-xs text-gray-500 font-medium">Phone / WhatsApp</p>
                    <a href="tel:9886481493" className="text-lg font-semibold text-gray-900 hover:text-purple-600">
                      9886481493
                    </a>
                  </div>
                  <a 
                    href="https://wa.me/919886481493" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-green-500 hover:bg-green-600 text-white rounded-full p-3 transition-colors shadow-md hover:shadow-lg"
                    title="Chat on WhatsApp"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Help Info Card */}
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-8 border-2 border-orange-200 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Need Help With?</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <span className="text-xl mt-1">✅</span>
                <div>
                  <h4 className="font-bold text-gray-900">Registration Issues</h4>
                  <p className="text-sm text-gray-600">Problems with form or payment</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-xl mt-1">✅</span>
                <div>
                  <h4 className="font-bold text-gray-900">Event Details</h4>
                  <p className="text-sm text-gray-600">Timeline, rules, and guidelines</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-xl mt-1">✅</span>
                <div>
                  <h4 className="font-bold text-gray-900">Team Formation</h4>
                  <p className="text-sm text-gray-600">Team size and member queries</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-xl mt-1">✅</span>
                <div>
                  <h4 className="font-bold text-gray-900">Technical Support</h4>
                  <p className="text-sm text-gray-600">Any other event-related questions</p>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-white rounded-lg">
              <p className="text-sm text-gray-600">
                <span className="font-bold text-orange-700">Response Time:</span> We typically respond within 2-3 hours during business hours.
              </p>
            </div>
          </div>
        </div>
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
