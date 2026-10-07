import React from 'react';
import Link from 'next/link';
import { ContentHero } from '@/components/ContentHero';
import { Shield, Lock, Eye, FileText, CheckCircle2, ArrowRight } from 'lucide-react';
import { MOCK_RESORT_INFO } from '@/lib/mock-data';

export default function PrivacyPolicyPage() {
  return (
    <div className="space-y-16 pb-20">
      <ContentHero
        badge="legal & privacy"
        title="Privacy & Data Protection Policy"
        subtitle="How Tantor Resort Hotel & Spa collects, protects, and respects your personal information during reservations and visits."
        bgPhoto="/photos/hero/IMG_0046.JPG.jpg"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Intro card */}
        <div className="bg-[#1f2d27] text-white p-8 border border-[#e8e4de] shadow-lg space-y-3">
          <div className="flex items-center gap-3">
            <Shield className="w-6 h-6 text-[#25D366]" />
            <h2 className="font-serif text-xl font-semibold">Your Privacy Matters to Us</h2>
          </div>
          <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
            Tantor Resort Hotel & Spa Habarana Sigiriya is committed to safeguarding your privacy. This policy outlines how we handle personal data collected through our direct booking website, WhatsApp concierge, and front desk operations.
          </p>
        </div>

        {/* Policy Body */}
        <div className="space-y-10 text-xs sm:text-sm text-[#1e293b] leading-relaxed">
          {/* Section 1 */}
          <section className="space-y-3 border-b border-[#e8e4de] pb-8">
            <h3 className="font-serif text-xl font-semibold text-[#1e293b] flex items-center gap-2">
              <span className="text-[#b87352]">1.</span> Information We Collect
            </h3>
            <p className="text-[#64748b]">
              When making a room reservation or communicating with our team, we may collect the following details:
            </p>
            <ul className="space-y-2 text-[#64748b] pl-4 list-disc">
              <li>Full guest name, nationality, and valid ID / Passport number for check-in registration.</li>
              <li>Contact details including phone number, WhatsApp contact, and email address.</li>
              <li>Stay details: check-in/check-out dates, room selection, and special dietary/bedding requests.</li>
              <li>Payment verification details processed via secure tokenized payment channels.</li>
            </ul>
          </section>

          {/* Section 2 */}
          <section className="space-y-3 border-b border-[#e8e4de] pb-8">
            <h3 className="font-serif text-xl font-semibold text-[#1e293b] flex items-center gap-2">
              <span className="text-[#b87352]">2.</span> How We Use Your Personal Data
            </h3>
            <p className="text-[#64748b]">
              Your data is strictly utilized for the following hospitality purposes:
            </p>
            <ul className="space-y-2 text-[#64748b] pl-4 list-disc">
              <li>Confirming and managing your cabana / villa reservation.</li>
              <li>Sending digital booking vouchers, receipts, and arrival directions.</li>
              <li>Providing instant WhatsApp concierge assistance before and during your stay.</li>
              <li>Arranging custom safari tours, airport transfers, and spa sessions upon request.</li>
              <li>Complying with Sri Lanka Tourism Development Authority (SLTDA) legal requirements.</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="space-y-3 border-b border-[#e8e4de] pb-8">
            <h3 className="font-serif text-xl font-semibold text-[#1e293b] flex items-center gap-2">
              <span className="text-[#b87352]">3.</span> Security & Third-Party Sharing
            </h3>
            <p className="text-[#64748b]">
              We enforce strict administrative and digital security measures to prevent unauthorized access to your information.
            </p>
            <div className="bg-[#faf8f5] p-5 border border-[#e8e4de] space-y-2 text-xs text-[#64748b]">
              <p className="font-semibold text-[#1e293b]">We Never Sell Your Personal Data</p>
              <p>
                We do not sell, rent, or lease guest information to third-party marketing companies. Personal data is only shared with authorized partners (such as safari jeep operators or transport providers) directly required to fulfill your requested guest services.
              </p>
            </div>
          </section>

          {/* Section 4 */}
          <section className="space-y-3 border-b border-[#e8e4de] pb-8">
            <h3 className="font-serif text-xl font-semibold text-[#1e293b] flex items-center gap-2">
              <span className="text-[#b87352]">4.</span> Your Rights & Contact Information
            </h3>
            <p className="text-[#64748b]">
              You have the right to request access to your personal data, request corrections, or request deletion of non-regulatory records after your stay.
            </p>
            <div className="bg-white p-6 border border-[#e8e4de] space-y-3">
              <p className="font-semibold text-[#1e293b]">Contact Data Protection Desk:</p>
              <p className="text-xs text-[#64748b]">
                <strong>Email:</strong> {MOCK_RESORT_INFO.email}<br />
                <strong>Phone / WhatsApp:</strong> {MOCK_RESORT_INFO.phone}<br />
                <strong>Address:</strong> {MOCK_RESORT_INFO.address}
              </p>
            </div>
          </section>
        </div>

        {/* Navigation CTAs */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#e8e4de]">
          <Link
            href="/cancellation-policy"
            className="text-xs font-semibold uppercase tracking-wider text-[#b87352] hover:underline flex items-center gap-1"
          >
            <span>View Cancellation Policy</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <Link
            href="/terms-of-stay"
            className="text-xs font-semibold uppercase tracking-wider text-[#b87352] hover:underline flex items-center gap-1"
          >
            <span>View Terms of Stay</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
