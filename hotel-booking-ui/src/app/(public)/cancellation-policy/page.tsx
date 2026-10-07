import React from 'react';
import Link from 'next/link';
import { ContentHero } from '@/components/ContentHero';
import { RefreshCw, Clock, AlertCircle, CheckCircle2, MessageSquare, ArrowRight } from 'lucide-react';
import { MOCK_RESORT_INFO } from '@/lib/mock-data';

export default function CancellationPolicyPage() {
  return (
    <div className="space-y-16 pb-20">
      <ContentHero
        badge="booking terms"
        title="Cancellation & Refund Policy"
        subtitle="Flexible cancellation, reservation modifications, and transparent refund terms for stays at Tantor Resort Habarana."
        bgPhoto="/photos/hero/IMG_0046.JPG.jpg"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Banner */}
        <div className="bg-[#1f2d27] text-white p-8 border border-[#e8e4de] shadow-lg space-y-3">
          <div className="flex items-center gap-3">
            <RefreshCw className="w-6 h-6 text-[#25D366]" />
            <h2 className="font-serif text-xl font-semibold">Flexible & Transparent Policies</h2>
          </div>
          <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
            We understand that travel plans can change. Below are our official cancellation terms aligned with Booking.com standards for Tantor Resort Hotel & Spa Habarana Sigiriya.
          </p>
        </div>

        {/* Rate Plans Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 border border-[#e8e4de] space-y-3 shadow-2xs">
            <span className="inline-block px-3 py-1 bg-emerald-500/10 text-emerald-700 text-[11px] font-semibold uppercase tracking-wider">
              Recommended
            </span>
            <h3 className="font-serif text-xl font-semibold text-[#1e293b]">
              Standard Flex Rate
            </h3>
            <p className="text-xs text-[#64748b] leading-relaxed">
              Cancel for free up to <strong>48 hours before official check-in time (14:00)</strong>.
            </p>
            <ul className="space-y-2 text-xs text-[#64748b] pt-2">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#25D366]" /> Free cancellation up to 48h prior to arrival
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#25D366]" /> Zero cancellation penalty fees
              </li>
              <li className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-amber-500" /> Cancellations within 48h incur 1-night charge
              </li>
            </ul>
          </div>

          <div className="bg-white p-6 border border-[#e8e4de] space-y-3 shadow-2xs">
            <span className="inline-block px-3 py-1 bg-amber-500/10 text-amber-700 text-[11px] font-semibold uppercase tracking-wider">
              Special Package
            </span>
            <h3 className="font-serif text-xl font-semibold text-[#1e293b]">
              Non-Refundable Promo Rate
            </h3>
            <p className="text-xs text-[#64748b] leading-relaxed">
              Discounted promotional rates require advance payment and are non-refundable upon confirmation.
            </p>
            <ul className="space-y-2 text-xs text-[#64748b] pt-2">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#25D366]" /> Discounted room rate included
              </li>
              <li className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-amber-500" /> Prepayment non-refundable upon cancellation
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#25D366]" /> Date modification allowed subject to availability
              </li>
            </ul>
          </div>
        </div>

        {/* Detailed Sections */}
        <div className="space-y-8 text-xs sm:text-sm text-[#1e293b] leading-relaxed">
          {/* No show */}
          <section className="space-y-3 border-b border-[#e8e4de] pb-6">
            <h3 className="font-serif text-lg font-semibold text-[#1e293b]">
              No-Show Policy
            </h3>
            <p className="text-[#64748b]">
              If a guest fails to arrive at the resort on the scheduled check-in date without informing us in advance, the reservation will be marked as a no-show, and 100% of the total reservation amount will be charged.
            </p>
          </section>

          {/* Date Changes */}
          <section className="space-y-3 border-b border-[#e8e4de] pb-6">
            <h3 className="font-serif text-lg font-semibold text-[#1e293b]">
              Reservation Date Modifications
            </h3>
            <p className="text-[#64748b]">
              You can request to modify your check-in dates up to 48 hours prior to arrival by contacting our concierge. Date changes are subject to room availability and potential seasonal rate differences.
            </p>
          </section>

          {/* Refund Process */}
          <section className="space-y-3 border-b border-[#e8e4de] pb-6">
            <h3 className="font-serif text-lg font-semibold text-[#1e293b]">
              Refund Processing Timeline
            </h3>
            <p className="text-[#64748b]">
              Approved refunds for direct bookings are processed back to the original payment card or bank account within <strong>5 to 7 business days</strong>.
            </p>
          </section>

          {/* Instant Help */}
          <div className="bg-[#faf8f5] p-6 border border-[#e8e4de] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1">
              <h4 className="font-serif text-base font-semibold text-[#1e293b]">Need to cancel or edit your booking?</h4>
              <p className="text-xs text-[#64748b]">Our WhatsApp concierge team is available 24/7 for instant assistance.</p>
            </div>
            <a
              href={`https://wa.me/${MOCK_RESORT_INFO.whatsapp.replace(/\D/g, '')}?text=Hi%20Concierge,%20I'd%20like%20to%20modify%20or%20cancel%20my%20booking.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white px-5 py-2.5 text-xs font-semibold uppercase tracking-wider transition-colors shrink-0"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp Concierge</span>
            </a>
          </div>
        </div>

        {/* Links */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#e8e4de]">
          <Link
            href="/terms-of-stay"
            className="text-xs font-semibold uppercase tracking-wider text-[#b87352] hover:underline flex items-center gap-1"
          >
            <span>View Terms of Stay</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <Link
            href="/my-booking"
            className="text-xs font-semibold uppercase tracking-wider text-[#b87352] hover:underline flex items-center gap-1"
          >
            <span>Manage Existing Reservation</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
