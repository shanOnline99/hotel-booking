import React from 'react';
import Link from 'next/link';
import { ContentHero } from '@/components/ContentHero';
import { MOCK_RESORT_INFO } from '@/lib/mock-data';
import {
  Waves,
  Sparkles,
  Trees,
  Droplets,
  Binoculars,
  Bird,
  Sun,
  Wine,
  Compass,
  Check,
  ArrowRight,
  Wifi,
  Utensils,
  Car,
  ShieldCheck,
} from 'lucide-react';

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

  const detailedAmenities = [
    {
      title: 'Outdoor Swimming Pool',
      description:
        'Relax in our crystal-clear outdoor swimming pool surrounded by tropical greenery and comfortable sun loungers.',
      icon: <Waves className="w-6 h-6 text-emerald-400" />,
      photo: '/photos/gallery/IMG_0056.JPG.jpeg',
    },
    {
      title: 'Ayurvedic Spa & Wellness',
      description:
        'Indulge in authentic Sri Lankan Ayurvedic massages, herbal oil baths, and relaxing body therapies.',
      icon: <Sparkles className="w-6 h-6 text-emerald-400" />,
      photo: '/photos/gallery/IMG_0058.JPG.jpeg',
    },
    {
      title: 'Garden Restaurant & Dining',
      description:
        'Savor authentic Sri Lankan rice & curry, fresh organic fruit juices, seafood, and international dishes.',
      icon: <Utensils className="w-6 h-6 text-emerald-400" />,
      photo: '/photos/gallery/IMG_0063.JPG.jpeg',
    },
    {
      title: 'Wild Elephant Safaris',
      description:
        'We organize direct jeep safaris to Minneriya & Kaudulla National Parks to witness the famous elephant gathering.',
      icon: <Binoculars className="w-6 h-6 text-emerald-400" />,
      photo: '/photos/gallery/IMG_0059.JPG.jpeg',
    },
    {
      title: 'Free High-Speed Wi-Fi',
      description:
        'Complimentary high-speed Wi-Fi internet access available across all villas, pool deck, and public areas.',
      icon: <Wifi className="w-6 h-6 text-emerald-400" />,
      photo: '/photos/gallery/IMG_0064.JPG.jpeg',
    },
    {
      title: 'Free Private Parking',
      description:
        'Secure on-site private parking space available for all resident guests with 24-hour security.',
      icon: <Car className="w-6 h-6 text-emerald-400" />,
      photo: '/photos/gallery/IMG_0054.JPG.jpeg',
    },
  ];

  return (
    <div className="space-y-16 pb-20">
      <ContentHero
        badge="resort experience"
        title="amenities & guest services"
        subtitle="Discover our outdoor swimming pool, authentic Ayurvedic spa, garden dining, and curated safari tours in Habarana."
        bgPhoto="/photos/hero/IMG_0046.JPG.jpg"
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Core Overview Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {detailedAmenities.map((item) => (
            <div
              key={item.title}
              className="bg-white border border-[#e8e4de] shadow-xs hover:shadow-xl transition-all duration-300 rounded-none overflow-hidden group flex flex-col justify-between"
            >
              <div className="h-48 overflow-hidden bg-[#1f2d27] relative">
                <img
                  src={item.photo}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 rounded-none"
                />
                <div className="absolute top-3 left-3 bg-[#1f2d27]/90 p-2 border border-white/20">
                  {item.icon}
                </div>
              </div>
              <div className="p-6 space-y-2 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-xl font-medium text-[#1e293b]">{item.title}</h3>
                  <p className="text-xs text-[#64748b] leading-relaxed mt-2">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Detailed Ayurvedic Spa Spotlight */}
        <div className="bg-[#1f2d27] text-white p-8 sm:p-12 rounded-none border border-[#e8e4de] grid grid-cols-1 lg:grid-cols-2 gap-8 items-center shadow-xl">
          <div className="space-y-4">
            <span className="text-xs uppercase tracking-widest text-[#d9a05b] font-semibold">
              Ayurvedic Spa & Wellness Sanctuary
            </span>
            <h2 className="font-serif text-3xl font-normal text-white">
              Rejuvenate body and mind in Habarana
            </h2>
            <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
              Surrounded by Habarana's peaceful flora, our spa offers authentic Sri Lankan Ayurvedic rituals, herbal oil massages, and natural bath therapies designed to relieve stress and restore energy.
            </p>
            <ul className="space-y-2 text-xs text-white/90">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#d9a05b]" /> Traditional Sri Lankan herbal oil & full-body massage therapy
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#d9a05b]" /> Soothing open-air treatment pavilion surrounded by nature
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#d9a05b]" /> Herbal steam baths & botanical relaxation rituals
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#d9a05b]" /> Tailored wellness consultation upon request
              </li>
            </ul>
          </div>

          <div className="border border-white/20 h-80 bg-[#1f2d27] overflow-hidden rounded-none">
            <img
              src="/photos/gallery/IMG_0058.JPG.jpeg"
              alt="Ayurvedic Spa session at Tantor Resort"
              className="w-full h-full object-cover rounded-none"
            />
          </div>
        </div>

        {/* Additional Guest Services Checklist */}
        <div className="bg-[#faf8f5] p-8 border border-[#e8e4de] space-y-6">
          <div className="space-y-1">
            <span className="text-xs uppercase tracking-widest text-[#b87352] font-semibold">
              guest convenience
            </span>
            <h3 className="font-serif text-2xl font-normal text-[#1e293b]">
              Complimentary Services & Facilities
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs font-medium text-[#1e293b]">
            <div className="flex items-center gap-2 bg-white p-3 border border-[#e8e4de]">
              <ShieldCheck className="w-4 h-4 text-[#25D366]" /> 24-Hour Front Desk Assistance
            </div>
            <div className="flex items-center gap-2 bg-white p-3 border border-[#e8e4de]">
              <ShieldCheck className="w-4 h-4 text-[#25D366]" /> Daily Housekeeping & Fresh Linens
            </div>
            <div className="flex items-center gap-2 bg-white p-3 border border-[#e8e4de]">
              <ShieldCheck className="w-4 h-4 text-[#25D366]" /> Airport Transfer Shuttle (Surcharge)
            </div>
            <div className="flex items-center gap-2 bg-white p-3 border border-[#e8e4de]">
              <ShieldCheck className="w-4 h-4 text-[#25D366]" /> Minneriya Safari Jeep Arrangement
            </div>
            <div className="flex items-center gap-2 bg-white p-3 border border-[#e8e4de]">
              <ShieldCheck className="w-4 h-4 text-[#25D366]" /> Luggage Storage & Tour Desk
            </div>
            <div className="flex items-center gap-2 bg-white p-3 border border-[#e8e4de]">
              <ShieldCheck className="w-4 h-4 text-[#25D366]" /> WhatsApp Concierge Assistance
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center pt-4">
          <Link
            href="/rooms"
            className="inline-flex items-center gap-2 bg-[#b87352] hover:bg-[#a25f3f] text-white px-8 py-3.5 text-xs font-semibold uppercase tracking-wider transition-colors rounded-none"
          >
            <span>View Available Cabanas & Book Stay</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
