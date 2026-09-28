import React from 'react';
import Link from 'next/link';
import { ContentHero } from '@/components/ContentHero';
import { MOCK_RESORT_INFO } from '@/lib/mock-data';
import { Waves, Sparkles, Trees, Droplets, Binoculars, Bird, Sun, Wine, Compass, Check, ArrowRight } from 'lucide-react';

export default function AmenitiesPage() {
  const iconMap: Record<string, React.ReactNode> = {
    Trees: <Trees className="w-8 h-8 text-[#b87352]" />,
    Droplets: <Droplets className="w-8 h-8 text-[#b87352]" />,
    Binoculars: <Binoculars className="w-8 h-8 text-[#b87352]" />,
    Bird: <Bird className="w-8 h-8 text-[#b87352]" />,
    Waves: <Waves className="w-8 h-8 text-[#b87352]" />,
    Sun: <Sun className="w-8 h-8 text-[#b87352]" />,
    Wine: <Wine className="w-8 h-8 text-[#b87352]" />,
    Compass: <Compass className="w-8 h-8 text-[#b87352]" />,
  };

  return (
    <div className="space-y-16 pb-20">
      <ContentHero
        badge="sanctuary experiences"
        title="resort amenities & leisure"
        subtitle="from jungle-view plunge pools to farm-to-table cuisine, unwind in true wilderness"
        bgPhoto="https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=2000&q=80"
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {MOCK_RESORT_INFO.amenities.map((item) => (
            <div
              key={item.title}
              className="bg-white p-8 rounded-2xl border border-[#e8e4de] space-y-4 hover:border-[#b87352]/40 transition-all shadow-2xs"
            >
              <div className="w-14 h-14 rounded-xl bg-[#faf8f5] border border-[#e8e4de] flex items-center justify-center">
                {iconMap[item.icon] || <Sparkles className="w-8 h-8 text-[#b87352]" />}
              </div>
              <h3 className="font-serif text-xl font-medium text-[#1e293b]">{item.title}</h3>
              <p className="text-xs text-[#64748b] leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>

        {/* Detailed feature spotlight */}
        <div className="bg-[#1f2d27] text-white p-8 sm:p-12 rounded-2xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <span className="text-xs uppercase tracking-widest text-[#d9a05b] font-semibold">
              ayurvedic spa & wellness
            </span>
            <h2 className="font-serif text-3xl font-normal text-white">
              rejuvenate with authentic ayurvedic therapies
            </h2>
            <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
              Nestled amidst Habarana's lush foliage, our wellness sanctuary offers traditional Sri Lankan Ayurvedic treatments, natural herbal oil massages, and steam therapies tailored to restore your inner vitality.
            </p>
            <ul className="space-y-2 text-xs text-white/90">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#d9a05b]" /> traditional Sri Lankan herbal oil massages & body therapy
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#d9a05b]" /> soothing open-air Ayurvedic treatments surrounded by nature
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#d9a05b]" /> herbal steam baths & botanical relaxation rituals
              </li>
            </ul>
          </div>

          <div className="rounded-xl overflow-hidden border border-white/10 h-72">
            <img
              src="https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1000&q=80"
              alt="Ayurvedic Spa session at Tantor Resort"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="text-center">
          <Link
            href="/rooms"
            className="inline-flex items-center gap-2 bg-[#b87352] hover:bg-[#a25f3f] text-white px-6 py-3.5 rounded-lg text-xs font-medium transition-colors"
          >
            <span>view room rates & package inclusions</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
