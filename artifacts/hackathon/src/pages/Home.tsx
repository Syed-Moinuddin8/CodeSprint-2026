import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-gradient-to-br from-blue-50 via-white to-cyan-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 font-medium text-sm mb-8">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
              14 Hours • Jan 15, 2026
            </div>
            
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-gray-900 mb-6 leading-tight">
              CodeSprint<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">2026</span>
            </h1>
            
            <p className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
              Build. Innovate. Compete.
            </p>
            
            <p className="max-w-2xl mx-auto text-lg text-gray-600 mb-10">
              Join the ultimate 14-hour online hackathon and transform your ideas into reality.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="#register" className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-all hover:-translate-y-1" data-testid="button-hero-register">
                Register Now
              </a>
              <a href="#rules" className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-gray-50 text-gray-900 border border-gray-200 rounded-full font-bold text-lg shadow-sm transition-all" data-testid="button-hero-rules">
                Download Rulebook
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

        <section id="register" className="py-20 bg-gray-50 border-t border-gray-200">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">Ready to build?</h2>
            <p className="text-gray-600 mb-8">Registration form goes here in full version.</p>
            <Button size="lg" className="w-full text-lg h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-xl">Complete Registration</Button>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
