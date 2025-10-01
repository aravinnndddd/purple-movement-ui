'use client';
import Image from 'next/image';
import { useState } from 'react';
import { FaXTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa6';
import FeedbackPopup from './FeedbackPopup';

const links = [
  { name: 'Home', href: '/#' },
  { name: 'About', href: '/#about' },
  { name: 'Events', href: '/#events' },
];

export const Footer = () => {
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);

  return (
    <>
      <div className="w-full h-20 bg-gradient-to-b from-black to-slate-950" />
      <footer className="w-full bg-slate-950 px-4 sm:px-6 md:px-8 py-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {/* Logo and Social */}
          <div className="space-y-3 flex flex-col items-start">
            <Image
              width={183}
              height={59}
              className="w-40 h-14"
              src="/logos/logo_pm.png"
              alt="Logo"
            />
            <h3 className="text-white text-lg sm:text-xl font-bold font-poppins">
              The Purple Movement
            </h3>
            <p className="text-white/75 text-sm sm:text-base font-poppins">
              Rebuilding how India learns
            </p>
            <div className="flex space-x-4 mt-2">
              <a href="#" className="group">
                <FaXTwitter className="w-6 h-6 sm:w-7 sm:h-7 text-white/60 group-hover:text-purple-700transition-colors" />
              </a>
              <a href="#" className="group">
                <FaInstagram className="w-6 h-6 sm:w-7 sm:h-7 text-white/60 group-hover:text-purple-700 transition-colors" />
              </a>
              <a href="#" className="group">
                <FaLinkedinIn className="w-6 h-6 sm:w-7 sm:h-7 text-white/60 group-hover:text-purple-700 transition-colors" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-white text-lg sm:text-xl font-semibold font-poppins">
              Quick Links
            </h4>
            <nav className="flex flex-col space-y-2">
              {links.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-white text-sm sm:text-base font-poppins hover:text-purple-400 transition-colors"
                >
                  {item.name}
                </a>
              ))}
            </nav>
          </div>

          {/* Feedback */}
          <div className="space-y-4">
            <button 
              onClick={() => setIsFeedbackOpen(true)}
              className="w-52 h-16 relative hover:opacity-80 transition-opacity cursor-pointer"
            >
              <Image
                src="/images/feedback.png"
                alt="Feedback"
                fill
                className="object-contain"
              />
            </button>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-10 pt-6 border-t border-zinc-700">
          <p className="text-white/60 text-xs sm:text-sm font-poppins text-center">
            © 2025 The Purple Movement. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Feedback Popup */}
      <FeedbackPopup 
        isOpen={isFeedbackOpen} 
        onClose={() => setIsFeedbackOpen(false)} 
      />
    </>
  );
};