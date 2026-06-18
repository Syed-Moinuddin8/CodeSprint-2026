import React from "react";
import { Link, useLocation } from "wouter";

export default function Navbar() {
  const [location] = useLocation();

  return (
    <nav className="sticky top-0 z-50 w-full backdrop-blur-lg bg-white/80 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="font-black text-2xl tracking-tighter text-blue-600" data-testid="link-logo">
              CodeSprint<span className="text-orange-500">2026</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#about" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors" data-testid="link-about">About</a>
            <a href="#timeline" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors" data-testid="link-timeline">Timeline</a>
            <a href="#rules" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors" data-testid="link-rules">Rules</a>
            <a href="#prizes" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors" data-testid="link-prizes">Prizes</a>
            <a href="#faq" className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors" data-testid="link-faq">FAQ</a>
            {location.startsWith("/admin") && (
              <Link href="/admin/dashboard" className="text-sm font-bold text-orange-500 hover:text-orange-600 transition-colors" data-testid="link-admin">Admin</Link>
            )}
            <a href="#register" className="bg-blue-600 text-white px-5 py-2.5 rounded-full font-semibold text-sm hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg" data-testid="link-register">
              Register Now
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
