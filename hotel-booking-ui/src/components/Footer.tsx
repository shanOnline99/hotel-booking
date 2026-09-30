import React from 'react';
import Link from 'next/link';
import { MapPin, Phone, Mail, Clock, ShieldCheck, Heart } from 'lucide-react';
import { MOCK_RESORT_INFO } from '@/lib/mock-data';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#1f2d27] text-white/90 pt-16 pb-12 border-t border-[#2c3e35]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#2c3e35]">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/photos/logo/logo.jpg"
                alt="Tantor Resort Logo"
                className="w-10 h-10 rounded-full object-cover border border-[#2c3e35] footer-logo"
              />
              <span className="font-serif text-2xl tracking-tight text-white font-semibold">
                Tantor Resort
              </span>
            </div>
            <p className="text-sm text-white/70 max-w-sm leading-relaxed">
              {MOCK_RESORT_INFO.tagline}. escape into pristine nature, coastal elegance, and tailored tropical hospitality.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-xs text-white/80">
                <ShieldCheck className="w-3.5 h-3.5 text-[#d9a05b]" />
                official direct booking site
              </span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-wider text-[#d9a05b] font-semibold">
              explore
            </h4>
            <ul className="space-y-2 text-sm text-white/80">
              <li>
                <Link href="/rooms" className="hover:text-white transition-colors">
                  rooms & suites
                </Link>
              </li>
              <li>
                <Link href="/amenities" className="hover:text-white transition-colors">
                  resort amenities
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-white transition-colors">
                  photo gallery
                </Link>
              </li>
              <li>
                <Link href="/location" className="hover:text-white transition-colors">
                  location & arrival
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  about tantor
                </Link>
              </li>
            </ul>
          </div>

          {/* Guest Services */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-wider text-[#d9a05b] font-semibold">
              guest services
            </h4>
            <ul className="space-y-2 text-sm text-white/80">
              <li>
                <Link href="/my-booking" className="hover:text-white transition-colors">
                  manage reservation
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  contact concierge
                </Link>
              </li>
              <li>
                <span className="text-white/60">check-in: {MOCK_RESORT_INFO.checkInTime}</span>
              </li>
              <li>
                <span className="text-white/60">check-out: {MOCK_RESORT_INFO.checkOutTime}</span>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-wider text-[#d9a05b] font-semibold">
              contact us
            </h4>
            <div className="space-y-2 text-sm text-white/80">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#d9a05b] shrink-0 mt-0.5" />
                <span className="text-xs leading-relaxed">{MOCK_RESORT_INFO.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#d9a05b] shrink-0" />
                <a href={`tel:${MOCK_RESORT_INFO.phone}`} className="hover:text-white">
                  {MOCK_RESORT_INFO.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#d9a05b] shrink-0" />
                <a href={`mailto:${MOCK_RESORT_INFO.email}`} className="hover:text-white">
                  {MOCK_RESORT_INFO.email}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-white/60 gap-4">
          <p>© {new Date().getFullYear()} Tantor Resort. all rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy-policy" className="hover:text-white transition-colors">
              privacy policy
            </Link>
            <Link href="/cancellation-policy" className="hover:text-white transition-colors">
              cancellation policy
            </Link>
            <Link href="/terms-of-stay" className="hover:text-white transition-colors">
              terms of stay
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
