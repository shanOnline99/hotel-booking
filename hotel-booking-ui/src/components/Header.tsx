'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Calendar, Compass, Phone } from 'lucide-react';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/rooms', label: 'Rooms' },
    { href: '/amenities', label: 'Amenities' },
    { href: '/gallery', label: 'Gallery' },
    { href: '/location', label: 'Location' },
    { href: '/about', label: 'About us' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${isScrolled
        ? 'bg-white/95 backdrop-blur-md shadow-xs border-b border-[#e8e4de] py-3.5'
        : 'bg-white/80 backdrop-blur-sm border-b border-[#e8e4de]/60 py-4'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo & Hotel Name */}
          <Link href="/" className="flex items-center gap-3 group">
            <img
              src="/photos/logo/logo.jpg"
              alt="Tantor Resort Logo"
              className="w-10 h-10 object-cover border border-[#e8e4de] header-logo group-hover:scale-105 transition-transform"
            />
            <div className="flex flex-col">
              <span className="font-serif text-xl sm:text-2xl tracking-tight text-[#1f2d27] font-semibold">
                Tantor Resort
              </span>
              <span className="text-[10px] text-[#64748b] tracking-wider uppercase -mt-1 font-medium hidden sm:inline-block">
                Habarana Srilanka
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm tracking-wide transition-colors ${isActive
                    ? 'text-[#b87352] font-semibold'
                    : 'text-[#1e293b] hover:text-[#b87352]'
                    }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-3">
            <Link
              href="/my-booking"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-medium text-[#64748b] hover:text-[#1e293b] px-3 py-2.5 transition-colors border border-transparent hover:border-[#e8e4de]"
            >
              Manage booking
            </Link>

            <Link
              href="/rooms"
              className="inline-flex items-center gap-2 bg-[#b87352] hover:bg-[#a25f3f] text-white text-sm font-medium px-4 py-2.5 transition-all shadow-xs"
            >
              <Calendar className="w-4 h-4" />
              <span>Book now</span>
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-[#1e293b] hover:bg-[#faf8f5] border border-[#e8e4de] transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#e8e4de] bg-white px-4 pt-3 pb-6 space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col space-y-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-3 py-2.5 text-base ${isActive
                    ? 'bg-[#faf8f5] text-[#b87352] font-semibold'
                    : 'text-[#1e293b] hover:bg-[#faf8f5]'
                    }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <Link
              href="/my-booking"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 text-base text-[#64748b] hover:bg-[#faf8f5]"
            >
              manage reservation
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};
