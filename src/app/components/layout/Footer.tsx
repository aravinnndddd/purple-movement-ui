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

const supportLinks = [
  { name: 'T&C', href: '/terms' },
  { name: 'Privacy Policy', href: '/privacy' },
  { name: 'Feedback', action: 'feedback' },
];

export const Footer = () => {
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);

  return (
    <>
      <div className="w-full h-20 bg-gradient-to-b from-black to-slate-950" />
      <footer className="w-full bg-slate-950 px-4 sm:px-6 md:px-8 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Mobile Layout - Logo first, then Quick Links and Support side by side */}
          <div className="md:hidden space-y-8">
            {/* Logo, Tagline, and Social Links */}
            <div className="space-y-4 flex flex-col items-start p-4">
              <Image
                width={183}
                height={59}
                className="w-40 h-14"
                src="/logos/logo_pm.png"
                alt="Logo"
                style={{ width: 'auto' }}
              />
              <h3 className="text-white text-lg font-bold font-poppins">
                The Purple Movement
              </h3>
              <p className="text-white/75 text-sm font-poppins">
                Beyond Syllabus, Beyond Gatekeepers, Beyond Borders
              </p>
              <div className="flex space-x-4 mt-4">
                <a href="https://www.instagram.com/tpm.live/" className="group">
                  <FaInstagram className="w-6 h-6 text-white/60 group-hover:text-purple-700 transition-colors" />
                </a>
                <a href="https://x.com/ThePurpleMVMT" className="group">
                  <FaXTwitter className="w-6 h-6 text-white/60 group-hover:text-purple-700 transition-colors" />
                </a>
                <a href="https://www.linkedin.com/company/the-purple-movement/posts/?feedView=all" className="group">
                  <FaLinkedinIn className="w-6 h-6 text-white/60 group-hover:text-purple-700 transition-colors" />
                </a>
              </div>
            </div>

            {/* Quick Links and Support Links side by side */}
            <div className="grid grid-cols-2 gap-6">
              {/* Quick Links - Left side */}
              <div className="space-y-4 flex flex-col items-start pl-4">
                <h4 className="text-left text-white text-base font-extrabold font-roboto leading-relaxed">
                  Quick Links
                </h4>
                <nav className="flex flex-col space-y-1.5 items-start">
                  {links.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="text-left text-white text-sm font-normal font-poppins leading-relaxed hover:text-purple-400 transition-colors"
                    >
                      {item.name}
                    </a>
                  ))}
                </nav>
              </div>

              {/* Support Links - Right side */}
              <div className="space-y-4 flex flex-col items-end pr-4">
                <h4 className="text-right text-white text-base font-extrabold font-roboto leading-relaxed">
                  Support
                </h4>
                <nav className="flex flex-col space-y-1.5 items-end">
                  {supportLinks.map((item) => (
                    item.action === 'feedback' ? (
                      <button
                        key={item.name}
                        onClick={() => setIsFeedbackOpen(true)}
                        className="text-right text-white text-sm font-normal font-poppins leading-relaxed hover:text-purple-400 transition-colors"
                      >
                        {item.name}
                      </button>
                    ) : (
                      <a
                        key={item.name}
                        href={item.href}
                        className="text-right text-white text-sm font-normal font-poppins leading-relaxed hover:text-purple-400 transition-colors"
                      >
                        {item.name}
                      </a>
                    )
                  ))}
                </nav>
              </div>
            </div>
          </div>

          {/* Desktop Layout - 3 columns */}
          <div className="hidden md:grid md:grid-cols-3 gap-10">
            {/* Logo, Tagline, and Social Links */}
            <div className="space-y-4 flex flex-col items-start">
              <Image
                width={183}
                height={59}
                className="w-40 h-14"
                src="/logos/logo_pm.png"
                alt="Logo"
                style={{ width: 'auto' }}
              />
              <h3 className="text-white text-lg sm:text-xl font-bold font-poppins">
                The Purple Movement
              </h3>
              <p className="text-white/75 text-sm sm:text-base font-poppins">
                Beyond Syllabus, Beyond Gatekeepers, Beyond Borders
              </p>
              <div className="flex space-x-4 mt-4">
                <a href="https://www.instagram.com/tpm.live/" className="group">
                  <FaInstagram className="w-6 h-6 sm:w-7 sm:h-7 text-white/60 group-hover:text-purple-700 transition-colors" />
                </a>
                <a href="https://x.com/ThePurpleMVMT" className="group">
                  <FaXTwitter className="w-6 h-6 sm:w-7 sm:h-7 text-white/60 group-hover:text-purple-700 transition-colors" />
                </a>
                <a href="https://www.linkedin.com/company/the-purple-movement/posts/?feedView=all" className="group">
                  <FaLinkedinIn className="w-6 h-6 sm:w-7 sm:h-7 text-white/60 group-hover:text-purple-700 transition-colors" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-4 flex flex-col items-center justify-center ml-16">
              <h4 className="text-center text-white text-lg font-extrabold font-roboto leading-relaxed">
                Quick Links
              </h4>
              <nav className="flex flex-col space-y-2 items-center">
                {links.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-center text-white text-base font-normal font-poppins leading-relaxed hover:text-purple-400 transition-colors"
                  >
                    {item.name}
                  </a>
                ))}
              </nav>
            </div>

            {/* Support Links */}
            <div className="space-y-4 flex flex-col items-center justify-center ml-16 ">
              <h4 className="text-center text-white text-lg font-extrabold font-roboto leading-relaxed">
                Support
              </h4>
              <nav className="flex flex-col space-y-2 items-center">
                {supportLinks.map((item) => (
                  item.action === 'feedback' ? (
                    <button
                      key={item.name}
                      onClick={() => setIsFeedbackOpen(true)}
                      className="text-center text-white text-base font-normal font-poppins leading-relaxed hover:text-purple-400 transition-colors"
                    >
                      {item.name}
                    </button>
                  ) : (
                    <a
                      key={item.name}
                      href={item.href}
                      className="text-center text-white text-base font-normal font-poppins leading-relaxed hover:text-purple-400 transition-colors"
                    >
                      {item.name}
                    </a>
                  )
                ))}
              </nav>
            </div>
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