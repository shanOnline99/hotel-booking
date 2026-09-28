import React from 'react';
import Link from 'next/link';
import { getRooms } from '@/lib/services';
import { MOCK_RESORT_INFO } from '@/lib/mock-data';
import { QuickBookingWidget } from '@/components/QuickBookingWidget';
import { RoomCard } from '@/components/RoomCard';
import { HeroSlider } from '@/components/HeroSlider';
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
  Star,
  MapPin,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';

export default async function HomePage() {
  const rooms = await getRooms();
  const featuredRooms = rooms.filter((r) => r.featured).slice(0, 3);

  const heroMedia = [
    '/photos/hero/hero.mp4',
    '/photos/hero/IMG_0046.JPG.jpg',
    '/photos/hero/IMG_0066.JPG.jpeg',
  ];

  const iconMap: Record<string, React.ReactNode> = {
    Trees: <Trees className="w-6 h-6 text-[#b87352]" />,
    Droplets: <Droplets className="w-6 h-6 text-[#b87352]" />,
    Binoculars: <Binoculars className="w-6 h-6 text-[#b87352]" />,
    Bird: <Bird className="w-6 h-6 text-[#b87352]" />,
    Waves: <Waves className="w-6 h-6 text-[#b87352]" />,
    Sun: <Sun className="w-6 h-6 text-[#b87352]" />,
    Wine: <Wine className="w-6 h-6 text-[#b87352]" />,
    Compass: <Compass className="w-6 h-6 text-[#b87352]" />,
  };

  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section - Full Viewport Height */}
      <section className="relative min-h-[calc(100vh-72px)] flex flex-col justify-between pt-10 pb-8 sm:pb-12 px-4 sm:px-6 lg:px-8">
        {/* Background Hero Slider using uploaded video and photos */}
        <HeroSlider items={heroMedia} tagline={MOCK_RESORT_INFO.tagline} />

        {/* Hero Headline Content */}
        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-5 my-auto pt-8 sm:pt-12">
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl text-white font-normal leading-[1.15] tracking-tight">
            Where wild forest meets quiet earth
          </h1>

          <p className="text-base sm:text-xl text-white/90 font-light max-w-2xl mx-auto leading-relaxed">
            {MOCK_RESORT_INFO.tagline}. A secluded sanctuary deep in Habarana's jungle — private villas, natural plunge pools, and true wilderness seclusion, with elephants for neighbors.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/rooms"
              className="bg-[#b87352] hover:bg-[#a25f3f] text-white px-6 py-3.5 text-sm font-medium transition-all shadow-md inline-flex items-center gap-2"
            >
              <span>Explore luxury cabanas</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/gallery"
              className="bg-white/15 hover:bg-white/25 backdrop-blur-md text-white border border-white/30 px-6 py-3.5 text-sm font-medium transition-all"
            >
              View photo gallery
            </Link>
          </div>
        </div>

        {/* Quick Booking Widget inside hero section */}
        <div className="relative z-20 max-w-6xl mx-auto w-full pt-6">
          <QuickBookingWidget />
        </div>
      </section>

      {/* Featured Rooms Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-widest text-[#b87352] font-semibold">
              sanctuary accommodations
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#1e293b]">
              featured rooms & villas
            </h2>
          </div>
          <Link
            href="/rooms"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[#b87352] hover:text-[#a25f3f] group"
          >
            <span>view all 5 room types</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredRooms.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>
      </section>

      {/* Resort Amenities Highlights */}
      <section className="bg-[#1f2d27] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs uppercase tracking-widest text-[#d9a05b] font-semibold">
              the tantor experience
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-normal text-white">
              thoughtfully crafted resort highlights
            </h2>
            <p className="text-sm text-white/70 leading-relaxed">
              every element of Tantor Resort is designed to reconnect you with natural rhythms and effortless luxury.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {MOCK_RESORT_INFO.amenities.map((item) => (
              <div
                key={item.title}
                className="bg-[#2a3c34] p-6 border border-white/10 space-y-4 hover:border-[#d9a05b]/50 transition-colors"
              >
                <div className="w-12 h-12 bg-white/10 flex items-center justify-center">
                  {iconMap[item.icon] || <Sparkles className="w-6 h-6 text-[#d9a05b]" />}
                </div>
                <h3 className="font-serif text-xl font-medium text-white">{item.title}</h3>
                <p className="text-xs text-white/70 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center pt-4">
            <Link
              href="/amenities"
              className="inline-flex items-center gap-2 bg-[#b87352] hover:bg-[#a25f3f] text-white px-6 py-3 text-sm font-medium transition-colors"
            >
              <span>discover all resort facilities</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs uppercase tracking-widest text-[#b87352] font-semibold">
            guest stories
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#1e293b]">
            memories created at tantor
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {MOCK_RESORT_INFO.testimonials.map((t, idx) => (
            <div
              key={idx}
              className="bg-white p-6 border border-[#e8e4de] flex flex-col justify-between space-y-4 shadow-2xs"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-1 text-[#d9a05b]">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-xs text-[#1e293b] leading-relaxed italic">
                  "{t.quote}"
                </p>
              </div>
              <div className="pt-3 border-t border-[#e8e4de] flex items-center justify-between text-xs">
                <span className="font-semibold text-[#1e293b]">{t.author}</span>
                <span className="text-[#64748b]">{t.location}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Location Teaser Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-[#e8e4de] overflow-hidden grid grid-cols-1 lg:grid-cols-12 shadow-xs">
          <div className="lg:col-span-5 p-8 lg:p-12 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <span className="text-xs uppercase tracking-widest text-[#b87352] font-semibold">
                cultural triangle destination
              </span>
              <h2 className="font-serif text-3xl font-normal text-[#1e293b]">
                Find us in the heart of Habarana, Sri Lanka
              </h2>
              <p className="text-xs text-[#64748b] leading-relaxed">
                Located in the heart of Sri Lanka's Cultural Triangle in Habarana, Tantor Resort offers a serene jungle escape with easy access to Sigiriya, Minneriya elephant safaris, and ancient heritage sites.
              </p>
              <div className="space-y-2 pt-2 text-xs text-[#1e293b]">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-[#b87352] shrink-0 mt-0.5" />
                  <span>{MOCK_RESORT_INFO.address}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>complimentary safari & airport transfer assistance</span>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <Link
                href="/location"
                className="inline-flex items-center gap-2 bg-[#faf8f5] hover:bg-[#b87352] text-[#1e293b] hover:text-white border border-[#e8e4de] px-5 py-2.5 text-xs font-medium transition-all"
              >
                <span>view interactive arrival guide</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Interactive Map Section */}
          <div className="lg:col-span-7 bg-[#f1ede8] min-h-[300px] relative overflow-hidden flex items-center justify-center p-6 border-t lg:border-t-0 lg:border-l border-[#e8e4de]">
            <img
              src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=1200&q=80"
              alt="Map view Tantor Resort Habarana"
              className="absolute inset-0 w-full h-full object-cover opacity-60"
            />
            <div className="relative z-10 bg-white/95 backdrop-blur-md p-6 border border-[#e8e4de] shadow-md max-w-xs text-center space-y-3">
              <div className="w-10 h-10 bg-[#b87352] text-white flex items-center justify-center mx-auto">
                <MapPin className="w-5 h-5" />
              </div>
              <h4 className="font-serif font-semibold text-[#1e293b]">Tantor Resort Habarana</h4>
              <p className="text-[11px] text-[#64748b]">lat 8.0451, lng 80.7281</p>
              <a
                href={MOCK_RESORT_INFO.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-[#1f2d27] text-white text-xs px-4 py-2 hover:bg-[#b87352] transition-colors"
              >
                open in Google Maps
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
