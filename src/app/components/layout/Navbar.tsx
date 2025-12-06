'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const links = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/#about' },
    { name: 'Events', href: '/#events' },
  ];

  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);

      if (window.scrollY < 100) {
        setActiveSection('/');
        return;
      }

      const sections = ['about', 'events'];
      let currentActive = '';

      sections.forEach((sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          const windowHeight = window.innerHeight;
          if (rect.top <= windowHeight / 2 && rect.bottom >= windowHeight / 2) {
            currentActive = `/#${sectionId}`;
          }
        }
      });

      setActiveSection(currentActive);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = async (href: string) => {
    setIsOpen(false);

    if (href === '/') {
      if (pathname === '/') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        router.push('/');
      }
      return;
    }

    if (pathname !== '/') {
      router.push(href);
      return;
    }

    const targetId = href.replace('/#', '');
    const element = document.getElementById(targetId);

    if (element) {
      const navbarHeight = 80; // Approximate navbar height (10vh)
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isOpen && !target.closest('nav')) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <nav
      className={`w-full fixed top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'backdrop-blur-lg bg-black/30 border-b border-white/10 shadow-lg'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="mx-auto flex items-center justify-between px-4 sm:px-8 md:px-12 py-6 h-[10vh]">
        {/* Logo */}
        <div className="md:px-4">
          <Link
            href="/"
            className="cursor-pointer focus:outline-none rounded"
          >
            <Image
              src="/logos/logo_pm.png"
              width={100}
              height={40}
              alt="Purple Movement Logo"
              priority
              className="w-auto h-auto"
              style={{ width: 'auto' }}
              sizes="(max-width: 768px) 80px, 100px"
            />
          </Link>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-16 text-white">
          <nav className="flex items-center gap-10" role="navigation">
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.href);
                }}
                className={`font-bold text-base sm:text-lg px-2 py-1 relative transition-all duration-300 focus:outline-none rounded group ${
                  activeSection === link.href
                    ? 'text-purple-500'
                    : 'text-white hover:text-purple-400'
                }`}
              >
                {link.name}
                <span
                  className={`absolute left-0 -bottom-0.5 h-[2px] bg-purple-500 transition-all duration-300 ${
                    activeSection === link.href
                      ? 'w-full'
                      : 'w-0 group-hover:w-full'
                  }`}
                ></span>
              </Link>
            ))}
          </nav>
        </div>

        {/* Hamburger (Mobile) */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 focus:outline-non rounded"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            {isOpen ? (
              <X size={28} color="white" />
            ) : (
              <Menu size={28} color="white" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div
          id="mobile-menu"
          className="md:hidden bg-black/90 backdrop-blur-lg shadow-md animate-slide-in-down"
          role="navigation"
        >
          <ul className="flex flex-col divide-y divide-white/10">
            {links.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(link.href);
                  }}
                  className={`block px-6 py-4 text-base font-medium transition-all duration-300 relative focus:outline-none ${
                    activeSection === link.href
                      ? 'text-purple-400 bg-purple-800/20'
                      : 'text-white hover:bg-white/10'
                  }`}
                >
                  {link.name}
                  <span
                    className={`absolute bottom-1 left-6 right-6 h-0.5 bg-purple-500 transition-all duration-300 ${
                      activeSection === link.href
                        ? 'opacity-100'
                        : 'opacity-0'
                    }`}
                  ></span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};