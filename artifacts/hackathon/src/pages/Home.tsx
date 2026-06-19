import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import RegistrationForm from "@/components/RegistrationForm";
import WhatsAppFloat from "@/components/WhatsAppFloat";

// Smooth scroll handler
const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
  e.preventDefault();
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

export default function Home() {
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <Navbar onRegisterClick={() => setIsRegistrationOpen(true)} />
      
      <main>
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-gradient-to-br from-blue-50 via-white to-cyan-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 font-medium text-sm mb-8">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
              11 Hours • Jan 15, 2026
            </div>
            
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-gray-900 mb-6 leading-tight">
              CodeSprint<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">2026</span>
            </h1>
            
            <p className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
              Build. Innovate. Compete.
            </p>
            
            <p className="max-w-2xl mx-auto text-lg text-gray-600 mb-10">
              Join the ultimate 11-hour online hackathon and transform your ideas into reality.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="#register" onClick={(e) => scrollToSection(e, 'register')} className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-all hover:-translate-y-1" data-testid="button-hero-register">
                Register Now
              </a>
            </div>
          </div>
        </section>

        {/* Minimal placeholders for other sections since doing full app requires a lot of time */}
        <section id="about" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-4xl font-bold mb-8 text-center text-gray-900">About CodeSprint</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100">
                <h3 className="font-bold text-xl mb-2 text-blue-900">What is CodeSprint?</h3>
                <p className="text-gray-600">A high-octane 14-hour online hackathon designed to test your limits and push your creativity.</p>
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

        {/* Timeline Section */}
        <section id="timeline" className="py-20 bg-white border-t border-gray-200">
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

        {/* Rules Section */}
        <section id="rules" className="py-20 bg-gray-50 border-t border-gray-200">
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
                <p className="text-gray-600">Complete your project within 14 hours. Late submissions will not be accepted.</p>
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
          </div>
        </section>

        {/* Prizes Section */}
        <section id="prizes" className="py-20 bg-gradient-to-br from-purple-50 via-white to-blue-50 border-t border-gray-200">
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

        {/* FAQ Section */}
        <section id="faq" className="py-20 bg-white border-t border-gray-200">
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
                <p className="text-gray-600">No, all work must be created during the 14-hour hackathon period. However, you can use existing libraries, frameworks, and APIs.</p>
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

        <section id="register" className="py-20 bg-gray-50 border-t border-gray-200">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">Ready to build?</h2>
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-blue-50 border border-blue-200 mb-6">
              <span className="text-2xl">💰</span>
              <span className="text-xl font-bold text-blue-900">Registration Fee: ₹350</span>
            </div>
            <p className="text-gray-600 mb-8">Complete your registration to secure your spot in CodeSprint 2026</p>
            <Button 
              size="lg" 
              onClick={() => setIsRegistrationOpen(true)} 
              className="w-full text-lg h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-xl"
            >
              Complete Registration - ₹350
            </Button>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 bg-white border-t border-gray-200">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4 text-gray-900">Get in Touch</h2>
              <p className="text-gray-600 text-lg">Have questions? Need help with registration? Contact us!</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
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
                      <p className="text-xs text-gray-500 font-medium">Phone</p>
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

                  <div className="flex items-center gap-3 bg-white rounded-lg p-4 shadow-sm">
                    <span className="text-2xl">💬</span>
                    <div className="flex-1">
                      <p className="text-xs text-gray-500 font-medium">WhatsApp</p>
                      <a 
                        href="https://wa.me/918904281955" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-lg font-semibold text-gray-900 hover:text-green-600"
                      >
                        8904281955
                      </a>
                    </div>
                    <span className="text-xs text-green-600 font-medium bg-green-50 px-3 py-1 rounded-full">Available</span>
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
                      <p className="text-xs text-gray-500 font-medium">Phone</p>
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

                  <div className="flex items-center gap-3 bg-white rounded-lg p-4 shadow-sm">
                    <span className="text-2xl">💬</span>
                    <div className="flex-1">
                      <p className="text-xs text-gray-500 font-medium">WhatsApp</p>
                      <a 
                        href="https://wa.me/919886481493" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-lg font-semibold text-gray-900 hover:text-green-600"
                      >
                        9886481493
                      </a>
                    </div>
                    <span className="text-xs text-green-600 font-medium bg-green-50 px-3 py-1 rounded-full">Available</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Help Info Card - Full Width */}
            <div className="mt-8 bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-8 border-2 border-orange-200 shadow-lg">
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
        </section>

      </main>

      <Footer />
      
      <RegistrationForm 
        open={isRegistrationOpen} 
        onOpenChange={setIsRegistrationOpen} 
      />

      <WhatsAppFloat />
    </div>
  );
}
