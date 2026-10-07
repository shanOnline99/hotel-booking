import React from 'react';
import Link from 'next/link';
import { ContentHero } from '@/components/ContentHero';
import { Clock, ShieldAlert, Users, CreditCard, Ban, CheckCircle2, ArrowRight } from 'lucide-react';
import { MOCK_RESORT_INFO } from '@/lib/mock-data';

export default function TermsOfStayPage() {
  return (
    <div className="space-y-16 pb-20">
      <ContentHero
        badge="guest guidelines"
        title="Terms of Stay & House Rules"
        subtitle="Essential resort rules, check-in schedules, and stay guidelines at Tantor Resort Hotel & Spa Habarana Sigiriya."
        bgPhoto="/photos/hero/IMG_0046.JPG.jpg"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Banner */}
        <div className="bg-[#1f2d27] text-white p-8 border border-[#e8e4de] shadow-lg space-y-3">
          <div className="flex items-center gap-3">
            <Clock className="w-6 h-6 text-[#25D366]" />
            <h2 className="font-serif text-xl font-semibold">Resort Policies & House Rules</h2>
          </div>
          <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
            To ensure a restful and serene experience for all guests, please review our house rules aligned with official Booking.com regulations.
          </p>
        </div>

        {/* Timings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 border border-[#e8e4de] space-y-2 shadow-2xs">
            <span className="text-[#b87352] text-xs font-semibold uppercase tracking-wider">Arrival Schedule</span>
            <h3 className="font-serif text-xl font-semibold text-[#1e293b]">Check-In Time</h3>
            <p className="text-2xl font-serif text-[#1f2d27] font-bold">14:00 – 23:00</p>
            <p className="text-xs text-[#64748b] leading-relaxed pt-1">
              Early check-in is available upon request (subject to room availability). Valid passport or National Identity Card (NIC) required.
            </p>
          </div>

          <div className="bg-white p-6 border border-[#e8e4de] space-y-2 shadow-2xs">
            <span className="text-[#b87352] text-xs font-semibold uppercase tracking-wider">Departure Schedule</span>
            <h3 className="font-serif text-xl font-semibold text-[#1e293b]">Check-Out Time</h3>
            <p className="text-2xl font-serif text-[#1f2d27] font-bold">06:00 – 11:00 AM</p>
            <p className="text-xs text-[#64748b] leading-relaxed pt-1">
              Late check-out until 14:00 can be arranged upon request with front desk reception.
            </p>
          </div>
        </div>

        {/* Rules Breakdown */}
        <div className="space-y-10 text-xs sm:text-sm text-[#1e293b] leading-relaxed">
          {/* Children & Extra Beds */}
          <section className="space-y-3 border-b border-[#e8e4de] pb-8">
            <h3 className="font-serif text-xl font-semibold text-[#1e293b] flex items-center gap-2">
              <Users className="w-5 h-5 text-[#b87352]" /> Children & Extra Bed Policy
            </h3>
            <ul className="space-y-2 text-[#64748b] pl-4 list-disc">
              <li>Children of all ages are welcome at Tantor Resort.</li>
              <li>Infant cots and extra single beds can be provided in family cabanas upon request.</li>
              <li>Maximum occupancy limits per villa room type must be respected at all times.</li>
            </ul>
          </section>

          {/* Quiet Hours & Conduct */}
          <section className="space-y-3 border-b border-[#e8e4de] pb-8">
            <h3 className="font-serif text-xl font-semibold text-[#1e293b] flex items-center gap-2">
              <Clock className="w-5 h-5 text-[#b87352]" /> Quiet Hours & Resort Atmosphere
            </h3>
            <p className="text-[#64748b]">
              Tantor Resort is a tranquil sanctuary in Habarana’s wilderness. Guests are requested to keep noise to a minimum between <strong>22:00 (10:00 PM) and 07:00 (7:00 AM)</strong>.
            </p>
          </section>

          {/* Pets */}
          <section className="space-y-3 border-b border-[#e8e4de] pb-8">
            <h3 className="font-serif text-xl font-semibold text-[#1e293b] flex items-center gap-2">
              <Ban className="w-5 h-5 text-red-500" /> Pet Policy
            </h3>
            <p className="text-[#64748b]">
              Pets are <strong>strictly not allowed</strong> on resort premises to protect local forest wildlife and guarantee allergy-free environments for all guests.
            </p>
          </section>

          {/* Payment Methods */}
          <section className="space-y-3 border-b border-[#e8e4de] pb-8">
            <h3 className="font-serif text-xl font-semibold text-[#1e293b] flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-[#b87352]" /> Accepted Payment Methods
            </h3>
            <p className="text-[#64748b]">
              We accept Cash (LKR / USD / EUR), Visa, Mastercard, Bank Wire Transfer, and direct online payment links.
            </p>
          </section>
        </div>

        {/* Navigation links */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#e8e4de]">
          <Link
            href="/cancellation-policy"
            className="text-xs font-semibold uppercase tracking-wider text-[#b87352] hover:underline flex items-center gap-1"
          >
            <span>View Cancellation Policy</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <Link
            href="/privacy-policy"
            className="text-xs font-semibold uppercase tracking-wider text-[#b87352] hover:underline flex items-center gap-1"
          >
            <span>View Privacy Policy</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
