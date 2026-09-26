import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Room } from '@/types';
import { Users, Maximize2, Bed, ArrowRight, Check } from 'lucide-react';

interface RoomCardProps {
  room: Room;
  searchParams?: {
    checkIn?: string;
    checkOut?: string;
    guests?: number;
  };
}

export const RoomCard: React.FC<RoomCardProps> = ({ room, searchParams }) => {
  const detailUrl = `/rooms/${room.slug}${
    searchParams?.checkIn
      ? `?checkIn=${searchParams.checkIn}&checkOut=${searchParams.checkOut}&guests=${searchParams.guests || 2}`
      : ''
  }`;

  return (
    <div className="bg-white rounded-xl border border-[#e8e4de] overflow-hidden flex flex-col transition-all duration-300 hover:border-[#b87352]/40 hover:shadow-md group">
      {/* Photo Container */}
      <div className="relative h-64 w-full overflow-hidden bg-[#faf8f5]">
        <img
          src={room.photos[0]}
          alt={room.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {room.featured && (
          <div className="absolute top-3 left-3 bg-[#1f2d27]/90 backdrop-blur-xs text-[#d9a05b] text-[11px] font-medium tracking-wide uppercase px-3 py-1 rounded-full border border-[#d9a05b]/30">
            resort highlight
          </div>
        )}
        <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-xs text-[#1e293b] text-xs font-semibold px-3 py-1 rounded-lg border border-[#e8e4de]">
          {room.view}
        </div>
      </div>

      {/* Content Container */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
        <div className="space-y-3">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-serif text-xl font-semibold text-[#1e293b] group-hover:text-[#b87352] transition-colors">
              {room.name}
            </h3>
            <div className="text-right shrink-0">
              <span className="text-xs text-[#64748b] block">from</span>
              <span className="text-xl font-semibold text-[#1e293b]">${room.basePrice}</span>
              <span className="text-xs text-[#64748b]"> / night</span>
            </div>
          </div>

          <p className="text-xs text-[#64748b] leading-relaxed line-clamp-2">
            {room.shortDescription}
          </p>

          {/* Quick specs icons */}
          <div className="flex items-center gap-4 text-xs text-[#64748b] pt-1">
            <div className="flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-[#b87352]" />
              <span>up to {room.maxOccupancy} guests</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Maximize2 className="w-3.5 h-3.5 text-[#b87352]" />
              <span>{room.sizeSqm} m²</span>
            </div>
            <div className="flex items-center gap-1.5 hidden sm:flex">
              <Bed className="w-3.5 h-3.5 text-[#b87352]" />
              <span>{room.bedType}</span>
            </div>
          </div>

          {/* Key Amenities Badges */}
          <div className="flex flex-wrap gap-1.5 pt-2">
            {room.amenities.slice(0, 3).map((amenity) => (
              <span
                key={amenity}
                className="inline-flex items-center gap-1 text-[11px] text-[#1e293b] bg-[#faf8f5] px-2.5 py-1 rounded-md border border-[#e8e4de]"
              >
                <Check className="w-3 h-3 text-[#b87352]" />
                {amenity}
              </span>
            ))}
            {room.amenities.length > 3 && (
              <span className="text-[11px] text-[#64748b] px-2 py-1">
                +{room.amenities.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* Footer Link Button */}
        <div className="pt-2 border-t border-[#e8e4de]/60 flex items-center justify-between">
          <Link
            href={detailUrl}
            className="w-full inline-flex items-center justify-center gap-2 bg-[#faf8f5] hover:bg-[#b87352] text-[#1e293b] hover:text-white border border-[#e8e4de] hover:border-[#b87352] py-2.5 px-4 rounded-lg text-sm font-medium transition-all"
          >
            <span>view room details</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};
