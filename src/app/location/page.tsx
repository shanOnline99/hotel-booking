import React from 'react';
import Link from 'next/link';
import { ContentHero } from '@/components/ContentHero';
import { MOCK_RESORT_INFO } from '@/lib/mock-data';
import { MapPin, Plane, Car, Compass, CheckCircle2, Phone, Mail, ArrowRight } from 'lucide-react';

export default function LocationPage() {
  return (
    <div className="space-y-16 pb-20">
      <ContentHero
        badge="destination & transport"
        title="getting to tantor resort"
        subtitle="located in the heart of Sri Lanka's Cultural Triangle in Habarana. seamless airport transfers available."
        bgPhoto="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=2000&q=80"
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Address Card */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#e8e4de] shadow-xs grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-wider text-[#b87352] font-semibold">
              resort address
            </span>
            <div className="flex items-start gap-2 text-xs text-[#1e293b] font-medium leading-relaxed">
              <MapPin className="w-4 h-4 text-[#b87352] shrink-0 mt-0.5" />
              <span>{MOCK_RESORT_INFO.address}</span>
            </div>
          </div>

          <div className="space-y-2">
            <span className="text-xs uppercase tracking-wider text-[#b87352] font-semibold">
              airport distance
            </span>
            <div className="flex items-start gap-2 text-xs text-[#1e293b] font-medium leading-relaxed">
              <Plane className="w-4 h-4 text-[#b87352] shrink-0 mt-0.5" />
              <span>3.5 hours from Bandaranaike International Airport (CMB)</span>
            </div>
          </div>

          <div className="space-y-2">
            <span className="text-xs uppercase tracking-wider text-[#b87352] font-semibold">
              concierge transfers
            </span>
            <div className="flex items-start gap-2 text-xs text-[#1e293b] font-medium leading-relaxed">
              <Car className="w-4 h-4 text-[#b87352] shrink-0 mt-0.5" />
              <span>private AC car/van transfer with driver directly to resort</span>
            </div>
          </div>
        </div>

        {/* Arrival Directions */}
        <div className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-widest text-[#b87352] font-semibold">
              travel options
            </span>
            <h2 className="font-serif text-3xl font-normal text-[#1e293b]">
              how to reach us
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl border border-[#e8e4de] space-y-3">
              <div className="w-10 h-10 rounded-lg bg-[#b87352]/10 text-[#b87352] flex items-center justify-center">
                <Car className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-medium text-[#1e293b]">resort private transfer</h3>
              <p className="text-xs text-[#64748b] leading-relaxed">
                our driver greets you directly at the airport arrival terminal or your previous hotel for a comfortable journey to Habarana.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-[#e8e4de] space-y-3">
              <div className="w-10 h-10 rounded-lg bg-[#b87352]/10 text-[#b87352] flex items-center justify-center">
                <Compass className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-medium text-[#1e293b]">self-drive & parking</h3>
              <p className="text-xs text-[#64748b] leading-relaxed">
                complimentary secure parking available on-site for all guests staying at Tantor Resort Habarana.
              </p>
            </div>
          </div>
        </div>

        {/* Embedded Map Section */}
        <div className="bg-[#1f2d27] text-white p-8 rounded-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-serif text-2xl font-normal text-white">
                resort location map
              </h3>
              <p className="text-xs text-white/70">Dambulla - Trincomalee Hwy, Habarana, Sri Lanka</p>
            </div>
            <a
              href={MOCK_RESORT_INFO.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#b87352] hover:bg-[#a25f3f] text-white text-xs px-5 py-2.5 rounded-lg font-medium inline-flex items-center gap-2 self-start sm:self-auto"
            >
              <span>open in Google Maps</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          <div className="h-80 w-full rounded-xl overflow-hidden relative border border-white/10">
            <img
              src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=1200&q=80"
              alt="Location map"
              className="w-full h-full object-cover opacity-70"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white/95 text-[#1e293b] p-4 rounded-xl shadow-xl text-center space-y-2 max-w-xs">
                <MapPin className="w-6 h-6 text-[#b87352] mx-auto" />
                <h4 className="font-serif font-bold text-sm">Tantor Resort Sanctuary</h4>
                <p className="text-[11px] text-[#64748b]">{MOCK_RESORT_INFO.address}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
