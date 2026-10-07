import React from 'react';
import Link from 'next/link';
import { ContentHero } from '@/components/ContentHero';
import {
  Waves,
  Sparkles,
  Utensils,
  Binoculars,
  Wifi,
  Car,
  Check,
  ArrowRight,
  ShieldCheck,
  Dumbbell,
  Compass,
  Flame,
  Coffee,
  HeartHandshake,
  Dog,
  Users,
  Music,
  MapPin,
  Clock,
  Tv,
  Trees,
} from 'lucide-react';

export default function AmenitiesPage() {
  const detailedAmenities = [
    {
      title: '3 Outdoor Swimming Pools',
      description:
        'Enjoy 3 year-round outdoor swimming pools for all ages with sun umbrellas, pool cover, beach towels, and pool toys.',
      icon: <Waves className="w-6 h-6 text-[#d9a05b]" />,
    },
    {
      title: 'Ayurvedic Spa, Sauna & Fitness',
      description:
        'Rejuvenate with full-body, couples, head & foot massages, steam room, sauna, fitness centre, and yoga classes.',
      icon: <Sparkles className="w-6 h-6 text-[#d9a05b]" />,
    },
    {
      title: 'Restaurant, Bar & Room Service',
      description:
        'Experience garden dining, snack bar, in-room breakfast, minibar, wine/champagne, and kid-friendly buffets.',
      icon: <Utensils className="w-6 h-6 text-[#d9a05b]" />,
    },
    {
      title: 'Culture, Safaris & Activities',
      description:
        'Join cooking classes, local culture tours, wild elephant safaris, bike/walking tours, live music, hiking & fishing.',
      icon: <Binoculars className="w-6 h-6 text-[#d9a05b]" />,
    },
    {
      title: 'Free Wi-Fi & 24/7 Reception',
      description:
        'Complimentary high-speed Wi-Fi, 24-hour front desk, express check-in/out, currency exchange, and tour desk.',
      icon: <Wifi className="w-6 h-6 text-[#d9a05b]" />,
    },
    {
      title: 'Free Parking & Airport Shuttle',
      description:
        'Free private parking garage on site, car hire services, and convenient airport shuttle transfers.',
      icon: <Car className="w-6 h-6 text-[#d9a05b]" />,
    },
  ];

  const facilityCategories = [
    {
      category: 'Swimming Pools & Water Recreation',
      icon: <Waves className="w-5 h-5 text-[#b87352]" />,
      items: [
        '3 Outdoor Pools (Open year-round, free access)',
        'Pool & beach towels provided',
        'Sun umbrellas & sun loungers',
        'Pool toys for kids & all ages',
        'Pool cover & safety fence around pool',
      ],
    },
    {
      category: 'Spa, Wellness & Fitness',
      icon: <Sparkles className="w-5 h-5 text-[#b87352]" />,
      items: [
        'Full body, couples, head, neck, hand & foot massages',
        'Steam room & traditional Sauna (extra fee)',
        'Spa & wellness packages',
        'Fitness centre & personal trainer',
        'Yoga classes & fitness sessions',
      ],
    },
    {
      category: 'Activities & Local Culture',
      icon: <Compass className="w-5 h-5 text-[#b87352]" />,
      items: [
        'Local cooking classes & culinary experiences',
        'Tour / class about local culture',
        'Guided walking & bike tours / cycling',
        'Live music / cultural performances',
        'Happy hour & evening entertainment / DJ',
        'Badminton equipment, hiking, fishing & karaoke',
      ],
    },
    {
      category: 'Food, Drink & Dining',
      icon: <Utensils className="w-5 h-5 text-[#b87352]" />,
      items: [
        'On-site restaurant & bar',
        'Breakfast in the room & room service',
        'Snack bar & minibar selections',
        'Wine & champagne service',
        'Kid-friendly buffet & kids\' meals',
        'BBQ facilities & outdoor picnic area',
      ],
    },
    {
      category: 'Reception & Guest Services',
      icon: <Clock className="w-5 h-5 text-[#b87352]" />,
      items: [
        '24-Hour Front Desk Assistance',
        'Private check-in / check-out',
        'Express check-in / check-out',
        'Currency exchange service',
        'Invoice provided upon check-out',
        'Luggage storage & tour desk',
      ],
    },
    {
      category: 'Living Area, Outdoors & Kitchen',
      icon: <Trees className="w-5 h-5 text-[#b87352]" />,
      items: [
        'Private balcony, terrace & garden view verandas',
        'Outdoor furniture & picnic area',
        'Shared kitchen, dining table & seating area',
        'Electric kettle, refrigerator & tea/coffee maker',
        'Work desk & socket near the bed',
      ],
    },
    {
      category: 'Transportation & Parking',
      icon: <Car className="w-5 h-5 text-[#b87352]" />,
      items: [
        'Free private parking on site (no reservation needed)',
        'Private parking garage',
        'Airport shuttle (surcharge)',
        'Shuttle service & car hire arrangements',
      ],
    },
    {
      category: 'General & Room Conveniences',
      icon: <ShieldCheck className="w-5 h-5 text-[#b87352]" />,
      items: [
        'Air conditioning & ceiling fans',
        'Free high-speed Wi-Fi in all areas',
        'Family rooms & non-smoking rooms',
        'En-suite private bathroom with bath/shower',
        'Free toiletries, towels, slippers & hairdryer',
        'Ironing facilities, iron & clothes rack',
        'Wardrobe / closet & alarm clock',
        'Designated smoking area & carpeted spaces',
      ],
    },
    {
      category: 'Family & Pet Amenities',
      icon: <Dog className="w-5 h-5 text-[#b87352]" />,
      items: [
        'Kids\' outdoor play equipment',
        'Board games & puzzles for families',
        'Pets allowed (charges may apply)',
        'Pet bowls & pet baskets provided',
      ],
    },
    {
      category: 'Safety & Security',
      icon: <ShieldCheck className="w-5 h-5 text-[#b87352]" />,
      items: [
        '24-Hour security staff on site',
        'CCTV outside property & in common areas',
        'Safety deposit box in rooms',
        'Fire extinguishers & carbon monoxide detectors',
      ],
    },
  ];

  return (
    <div className="space-y-16 pb-20">
      <ContentHero
        badge="resort experience"
        title="amenities & guest services"
        subtitle="Discover our 3 outdoor swimming pools, Ayurvedic spa & wellness centre, cooking classes, elephant safaris, and complete guest facilities."
        bgPhoto="/photos/hero/IMG_0046.JPG.jpg"
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Core Overview Grid (Text & Icon Cards - No Photos) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {detailedAmenities.map((item) => (
            <div
              key={item.title}
              className="bg-white p-6 sm:p-8 border border-[#e8e4de] shadow-xs hover:shadow-xl transition-all duration-300 rounded-none group flex flex-col justify-between space-y-4"
            >
              <div className="w-12 h-12 rounded-none bg-[#1f2d27] flex items-center justify-center border border-[#d9a05b]/30 shrink-0">
                {item.icon}
              </div>
              <div className="space-y-2 flex-1">
                <h3 className="font-serif text-xl font-medium text-[#1e293b]">{item.title}</h3>
                <p className="text-xs sm:text-sm text-[#64748b] leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Detailed Ayurvedic Spa Spotlight (Photo-Free Feature Card) */}
        <div className="bg-[#1f2d27] text-white p-8 sm:p-12 rounded-none border border-[#e8e4de] space-y-6 shadow-xl">
          <div className="space-y-3">
            <span className="text-xs uppercase tracking-widest text-[#d9a05b] font-semibold">
              Ayurvedic Spa & Wellness Sanctuary
            </span>
            <h2 className="font-serif text-3xl font-normal text-white">
              Rejuvenate body and mind in Habarana
            </h2>
            <p className="text-xs sm:text-sm text-white/70 leading-relaxed max-w-3xl">
              Surrounded by Habarana's peaceful flora, our spa offers authentic Sri Lankan Ayurvedic rituals, herbal oil massages, sauna, steam room, and natural bath therapies designed to relieve stress and restore energy.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-white/90 pt-2">
            <div className="flex items-center gap-2 bg-white/5 p-4 border border-white/10">
              <Check className="w-4 h-4 text-[#d9a05b] shrink-0" />
              <span>Full body, couples, head, neck, hand & foot massages</span>
            </div>
            <div className="flex items-center gap-2 bg-white/5 p-4 border border-white/10">
              <Check className="w-4 h-4 text-[#d9a05b] shrink-0" />
              <span>Steam room & traditional sauna (extra fee)</span>
            </div>
            <div className="flex items-center gap-2 bg-white/5 p-4 border border-white/10">
              <Check className="w-4 h-4 text-[#d9a05b] shrink-0" />
              <span>Fitness centre & instructor-led yoga classes</span>
            </div>
            <div className="flex items-center gap-2 bg-white/5 p-4 border border-white/10">
              <Check className="w-4 h-4 text-[#d9a05b] shrink-0" />
              <span>Tailored wellness consultation & spa packages</span>
            </div>
          </div>
        </div>

        {/* Complete Categorized Facilities Checklist */}
        <div className="space-y-8">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <span className="text-xs uppercase tracking-widest text-[#b87352] font-semibold">
              all resort facilities
            </span>
            <h2 className="font-serif text-3xl font-normal text-[#1e293b]">
              Complete Property Amenities & Facilities
            </h2>
            <p className="text-xs text-[#64748b]">
              Explore the complete list of services, sports, dining, and comforts available at Tantor Resort.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {facilityCategories.map((cat) => (
              <div
                key={cat.category}
                className="bg-[#faf8f5] p-6 border border-[#e8e4de] space-y-4 rounded-none"
              >
                <div className="flex items-center gap-3 border-b border-[#e8e4de] pb-3">
                  <div className="p-2 bg-white border border-[#e8e4de]">{cat.icon}</div>
                  <h3 className="font-serif text-lg font-medium text-[#1e293b]">
                    {cat.category}
                  </h3>
                </div>
                <ul className="space-y-2 text-xs text-[#1e293b]">
                  {cat.items.map((facility) => (
                    <li key={facility} className="flex items-start gap-2 leading-snug">
                      <Check className="w-4 h-4 text-[#25D366] shrink-0 mt-0.5" />
                      <span>{facility}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
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
