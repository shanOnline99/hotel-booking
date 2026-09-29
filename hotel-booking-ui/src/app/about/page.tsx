import React from 'react';
import Link from 'next/link';
import { ContentHero } from '@/components/ContentHero';
import {
  ArrowRight,
  Waves,
  Sparkles,
  Utensils,
  Trees,
  Compass,
  Star,
  MapPin,
  CheckCircle2,
} from 'lucide-react';
import { MOCK_RESORT_INFO } from '@/lib/mock-data';

export default function AboutPage() {
  return (
    <div className="space-y-16 pb-20">
      {/* Content Hero */}
      <ContentHero
        badge="about tantor resort"
        title="Tantor Resort Hotel & Spa Habarana"
        subtitle="A peaceful tropical sanctuary nestled on Anuradhapura Road, Habarana — featuring an outdoor swimming pool, lush gardens, full spa, and authentic Sri Lankan hospitality."
        bgPhoto="/photos/hero/IMG_0046.JPG.jpg"
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Rating & Highlight Banner */}
        <div className="bg-[#1f2d27] text-white p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 border border-[#e8e4de] shadow-md">
          <div className="flex items-center gap-4">
            <div className="bg-[#25D366] text-white font-serif text-2xl font-bold px-4 py-3 rounded-none shadow-xs text-center">
              9.5
            </div>
            <div>
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
                <span className="text-xs font-semibold text-white ml-2">Exceptional</span>
              </div>
              <p className="text-xs text-white/80 mt-1">
                Rated <strong className="text-white">9.5/10 Superb</strong> by verified guests on Booking.com & Google
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-white/80 bg-white/10 px-4 py-2 border border-white/20">
            <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Anuradhapura Road, Laksirigama, Habarana, Sri Lanka</span>
          </div>
        </div>

        {/* Story & Introduction */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="space-y-4">
            <span className="text-xs uppercase tracking-widest text-[#b87352] font-semibold">
              welcome to habarana
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#1e293b] leading-tight">
              An oasis of nature, comfort & cultural heritage
            </h2>
            <p className="text-xs sm:text-sm text-[#64748b] leading-relaxed">
              <strong>Tantor Resort Hotel & Spa Habarana Sigiriya</strong> offers a quiet retreat surrounded by Sri Lanka’s lush central wildlife province. Situated right along Anuradhapura Road in Laksirigama, Habarana, the resort combines private boutique accommodation with modern amenities.
            </p>
            <p className="text-xs sm:text-sm text-[#64748b] leading-relaxed">
              Whether relaxing by our outdoor swimming pool, indulging in a traditional Ayurvedic spa treatment, or tasting authentic local cuisine at our restaurant, every guest experiences personalized warmth and tranquility.
            </p>
            <div className="pt-2 grid grid-cols-2 gap-3 text-xs font-medium text-[#1e293b]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#25D366]" /> Outdoor Swimming Pool
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#25D366]" /> Spa & Wellness Centre
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#25D366]" /> On-site Restaurant & Bar
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#25D366]" /> Free Private Parking & Wi-Fi
              </div>
            </div>
          </div>

          <div className="h-96 border border-[#e8e4de] shadow-md overflow-hidden bg-[#1f2d27]">
            <img
              src="/photos/gallery/IMG_0054.JPG.jpeg"
              alt="Tantor Resort Habarana Grounds"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Resort Facilities & Amenities */}
        <div className="space-y-8">
          <div className="text-center space-y-2 max-w-lg mx-auto">
            <span className="text-xs uppercase tracking-widest text-[#b87352] font-semibold">
              resort experience
            </span>
            <h2 className="font-serif text-3xl font-normal text-[#1e293b]">
              Key Guest Facilities
            </h2>
            <p className="text-xs text-[#64748b]">
              Everything you need for an unforgettable stay in the Cultural Triangle.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 border border-[#e8e4de] space-y-3 shadow-2xs hover:shadow-md transition-shadow">
              <div className="w-10 h-10 bg-[#1f2d27] text-white flex items-center justify-center">
                <Waves className="w-5 h-5 text-emerald-400" />
              </div>
              <h3 className="font-serif text-lg font-medium text-[#1e293b]">Outdoor Pool</h3>
              <p className="text-xs text-[#64748b] leading-relaxed">
                Crystal-clear swimming pool with sun terrace loungers nestled under tropical trees.
              </p>
            </div>

            <div className="bg-white p-6 border border-[#e8e4de] space-y-3 shadow-2xs hover:shadow-md transition-shadow">
              <div className="w-10 h-10 bg-[#1f2d27] text-white flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-emerald-400" />
              </div>
              <h3 className="font-serif text-lg font-medium text-[#1e293b]">Ayurvedic Spa</h3>
              <p className="text-xs text-[#64748b] leading-relaxed">
                Rejuvenating massages and holistic wellness treatments rooted in Sri Lankan tradition.
              </p>
            </div>

            <div className="bg-white p-6 border border-[#e8e4de] space-y-3 shadow-2xs hover:shadow-md transition-shadow">
              <div className="w-10 h-10 bg-[#1f2d27] text-white flex items-center justify-center">
                <Utensils className="w-5 h-5 text-emerald-400" />
              </div>
              <h3 className="font-serif text-lg font-medium text-[#1e293b]">Garden Restaurant</h3>
              <p className="text-xs text-[#64748b] leading-relaxed">
                Authentic Sri Lankan rice & curry, seafood, organic fresh juices, and Western breakfast.
              </p>
            </div>

            <div className="bg-white p-6 border border-[#e8e4de] space-y-3 shadow-2xs hover:shadow-md transition-shadow">
              <div className="w-10 h-10 bg-[#1f2d27] text-white flex items-center justify-center">
                <Compass className="w-5 h-5 text-emerald-400" />
              </div>
              <h3 className="font-serif text-lg font-medium text-[#1e293b]">Safari & Excursions</h3>
              <p className="text-xs text-[#64748b] leading-relaxed">
                Directly book wild elephant safaris to Minneriya National Park and Sigiriya tours.
              </p>
            </div>
          </div>
        </div>

        {/* Nearby Attractions Grid */}
        <div className="bg-[#faf8f5] p-8 border border-[#e8e4de] space-y-6">
          <div className="space-y-1">
            <span className="text-xs uppercase tracking-widest text-[#b87352] font-semibold">
              prime location
            </span>
            <h3 className="font-serif text-2xl font-normal text-[#1e293b]">
              Explore the Cultural Triangle
            </h3>
            <p className="text-xs text-[#64748b]">
              Tantor Resort Habarana serves as your ideal base for UNESCO heritage sites and wildlife safaris.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2">
            <div className="bg-white p-5 border border-[#e8e4de] space-y-2">
              <span className="text-xs font-semibold text-[#b87352] uppercase">15 Mins Away</span>
              <h4 className="font-serif text-base font-semibold text-[#1e293b]">
                Sigiriya Rock Fortress
              </h4>
              <p className="text-xs text-[#64748b]">
                Climb the world-renowned 5th-century ancient palace and fortress ruin perched on a giant rock.
              </p>
            </div>

            <div className="bg-white p-5 border border-[#e8e4de] space-y-2">
              <span className="text-xs font-semibold text-[#b87352] uppercase">10 Mins Away</span>
              <h4 className="font-serif text-base font-semibold text-[#1e293b]">
                Minneriya National Park
              </h4>
              <p className="text-xs text-[#64748b]">
                Witness the famous Elephant Gathering — hundreds of wild Asian elephants in their natural habitat.
              </p>
            </div>

            <div className="bg-white p-5 border border-[#e8e4de] space-y-2">
              <span className="text-xs font-semibold text-[#b87352] uppercase">15 Mins Away</span>
              <h4 className="font-serif text-base font-semibold text-[#1e293b]">
                Pidurangala Rock
              </h4>
              <p className="text-xs text-[#64748b]">
                Hike for panoramic sunrise views overlooking Sigiriya Rock and the vast emerald forest.
              </p>
            </div>
          </div>
        </div>

        {/* Photo Showcase Row (Sharp edges) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="h-64 border border-[#e8e4de] overflow-hidden bg-[#1f2d27]">
            <img
              src="/photos/gallery/IMG_0056.JPG.jpeg"
              alt="Tantor Pool"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="h-64 border border-[#e8e4de] overflow-hidden bg-[#1f2d27]">
            <img
              src="/photos/gallery/IMG_0058.JPG.jpeg"
              alt="Tantor Lounge"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="h-64 border border-[#e8e4de] overflow-hidden bg-[#1f2d27]">
            <img
              src="/photos/gallery/IMG_0064.JPG.jpeg"
              alt="Tantor Villa"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>

        {/* Direct Booking CTA */}
        <div className="bg-[#1f2d27] text-white p-8 sm:p-12 text-center space-y-4 shadow-xl border border-[#e8e4de]">
          <h3 className="font-serif text-2xl sm:text-3xl font-normal">
            Book Your Sanctuary Stay in Habarana
          </h3>
          <p className="text-xs text-white/70 max-w-md mx-auto">
            Enjoy guaranteed best rates, flexible cancellation, and instant assistance via WhatsApp concierge.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              href="/rooms"
              className="inline-flex items-center gap-2 bg-[#b87352] hover:bg-[#a25f3f] text-white px-6 py-3 text-xs font-semibold tracking-wider uppercase transition-colors"
            >
              <span>Explore Rooms & Rates</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href={`https://wa.me/${MOCK_RESORT_INFO.whatsapp.replace(/\D/g, '')}?text=Hi%20Tantor%20Resort,%20I'd%20like%20to%20inquire%20about%20staying%20in%20Habarana.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white px-6 py-3 text-xs font-semibold tracking-wider uppercase transition-colors"
            >
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
