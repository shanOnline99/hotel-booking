import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getRoomBySlug, getRatePlans } from '@/lib/services';
import { StickyBookingPanel } from '@/components/StickyBookingPanel';
import { RoomGallery } from '@/components/RoomGallery';
import { Users, Maximize2, Bed, Eye, Check, ChevronLeft, ShieldCheck, Sparkles } from 'lucide-react';

export default async function RoomDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;

  const room = await getRoomBySlug(resolvedParams.slug);
  if (!room) {
    notFound();
  }

  const ratePlans = await getRatePlans();

  const checkIn = typeof resolvedSearchParams?.checkIn === 'string' ? resolvedSearchParams.checkIn : '';
  const checkOut = typeof resolvedSearchParams?.checkOut === 'string' ? resolvedSearchParams.checkOut : '';
  const guests = typeof resolvedSearchParams?.guests === 'string' ? parseInt(resolvedSearchParams.guests, 10) : 2;

  return (
    <div className="space-y-10 pb-24">
      {/* Top Breadcrumb & Navigation */}
      <div className="bg-white border-b border-[#e8e4de] py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <Link
            href="/rooms"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-[#64748b] hover:text-[#1e293b] transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>back to all rooms</span>
          </Link>
          <div className="text-xs text-[#64748b]">
            <span className="capitalize">accommodations</span> / <span className="font-medium text-[#1e293b]">{room.name}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Title Header */}
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-3">
            <span className="bg-[#b87352]/10 text-[#b87352] text-xs font-semibold px-3 py-1">
              {room.view}
            </span>
            {room.featured && (
              <span className="bg-[#1f2d27] text-[#d9a05b] text-xs font-medium px-3 py-1">
                featured villa
              </span>
            )}
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-normal text-[#1e293b]">
            {room.name}
          </h1>
          <p className="text-sm sm:text-base text-[#64748b] max-w-3xl leading-relaxed">
            {room.shortDescription}
          </p>
        </div>

        {/* Photo Gallery Component */}
        <RoomGallery photos={room.photos} roomName={room.name} />

        {/* Main Content Layout: Left Details (8 cols) & Right Sticky Panel (4 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Specs, Description, Amenities */}
          <div className="lg:col-span-8 space-y-10">
            {/* Quick Specs Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-white p-4 border border-[#e8e4de] space-y-1">
                <div className="flex items-center gap-2 text-[#b87352]">
                  <Users className="w-4 h-4" />
                  <span className="text-xs font-medium text-[#64748b]">occupancy</span>
                </div>
                <div className="text-base font-semibold text-[#1e293b]">up to {room.maxOccupancy} guests</div>
              </div>

              <div className="bg-white p-4 border border-[#e8e4de] space-y-1">
                <div className="flex items-center gap-2 text-[#b87352]">
                  <Maximize2 className="w-4 h-4" />
                  <span className="text-xs font-medium text-[#64748b]">villa size</span>
                </div>
                <div className="text-base font-semibold text-[#1e293b]">{room.sizeSqm} m²</div>
              </div>

              <div className="bg-white p-4 border border-[#e8e4de] space-y-1">
                <div className="flex items-center gap-2 text-[#b87352]">
                  <Bed className="w-4 h-4" />
                  <span className="text-xs font-medium text-[#64748b]">bed setup</span>
                </div>
                <div className="text-base font-semibold text-[#1e293b]">{room.bedType}</div>
              </div>

              <div className="bg-white p-4 border border-[#e8e4de] space-y-1">
                <div className="flex items-center gap-2 text-[#b87352]">
                  <Eye className="w-4 h-4" />
                  <span className="text-xs font-medium text-[#64748b]">scenic view</span>
                </div>
                <div className="text-base font-semibold text-[#1e293b] truncate">{room.view}</div>
              </div>
            </div>

            {/* Room Narrative Description */}
            <div className="bg-white p-8 border border-[#e8e4de] space-y-4">
              <h2 className="font-serif text-2xl font-normal text-[#1e293b]">
                about this sanctuary
              </h2>
              <p className="text-sm text-[#64748b] leading-relaxed whitespace-pre-line">
                {room.description}
              </p>
            </div>

            {/* Amenities Grid */}
            <div className="bg-white p-8 border border-[#e8e4de] space-y-6">
              <h2 className="font-serif text-2xl font-normal text-[#1e293b]">
                room amenities & features
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {room.amenities.map((amenity) => (
                  <div key={amenity} className="flex items-center gap-3 p-3 bg-[#faf8f5] border border-[#e8e4de]">
                    <div className="w-7 h-7 bg-[#b87352]/10 text-[#b87352] flex items-center justify-center shrink-0">
                      <Check className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-medium text-[#1e293b]">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Resort Policies Teaser */}
            <div className="bg-[#faf8f5] p-6 border border-[#e8e4de] space-y-3">
              <h3 className="font-serif text-lg font-medium text-[#1e293b] flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                stay policies & perks
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#64748b]">
                <li>• check-in from 15:00, check-out until 12:00</li>
                <li>• complimentary high-speed Wi-Fi throughout resort</li>
                <li>• welcome refreshment drink upon arrival</li>
                <li>• free flexible cancellation up to 48 hours before check-in</li>
              </ul>
            </div>
          </div>

          {/* Right Column: Sticky Booking Widget */}
          <div className="lg:col-span-4">
            <StickyBookingPanel
              room={room}
              ratePlans={ratePlans}
              initialCheckIn={checkIn}
              initialCheckOut={checkOut}
              initialGuests={guests}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
