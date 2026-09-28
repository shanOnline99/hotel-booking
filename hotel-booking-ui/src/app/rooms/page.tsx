'use client';

import React, { useState, useEffect, use } from 'react';
import { Room } from '@/types';
import { getRooms } from '@/lib/services';
import { RoomCard } from '@/components/RoomCard';
import { QuickBookingWidget } from '@/components/QuickBookingWidget';
import { SlidersHorizontal, ArrowUpDown, Filter, Sparkles, RefreshCw } from 'lucide-react';

export default function RoomsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedSearchParams = use(searchParams);

  const checkIn = typeof resolvedSearchParams?.checkIn === 'string' ? resolvedSearchParams.checkIn : '';
  const checkOut = typeof resolvedSearchParams?.checkOut === 'string' ? resolvedSearchParams.checkOut : '';
  const guests = typeof resolvedSearchParams?.guests === 'string' ? parseInt(resolvedSearchParams.guests, 10) : 2;
  const roomsCount = typeof resolvedSearchParams?.rooms === 'string' ? parseInt(resolvedSearchParams.rooms, 10) : 1;

  const [allRooms, setAllRooms] = useState<Room[]>([]);
  const [filteredRooms, setFilteredRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<'recommended' | 'price-asc' | 'price-desc'>('recommended');
  const [occupancyFilter, setOccupancyFilter] = useState<number>(0);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const rooms = await getRooms();
      setAllRooms(rooms);
      setLoading(false);
    }
    loadData();
  }, []);

  useEffect(() => {
    let result = [...allRooms];

    // Filter by query params or selected guest count
    if (occupancyFilter > 0) {
      result = result.filter((r) => r.maxOccupancy >= occupancyFilter);
    } else if (guests > 0) {
      result = result.filter((r) => r.maxOccupancy >= guests);
    }

    // Sort
    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.basePrice - b.basePrice);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.basePrice - a.basePrice);
    }

    setFilteredRooms(result);
  }, [allRooms, guests, occupancyFilter, sortBy]);

  return (
    <div className="space-y-12 pb-20">
      {/* Top Banner */}
      <section className="bg-[#1f2d27] text-white py-16 px-4 sm:px-6 lg:px-8 text-center space-y-4 relative overflow-hidden">
        <div className="max-w-3xl mx-auto space-y-3 relative z-10">
          <span className="text-xs uppercase tracking-widest text-[#d9a05b] font-semibold">
            accommodations
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-normal">
            luxury rooms, suites & ocean villas
          </h1>
          <p className="text-sm text-white/70 max-w-xl mx-auto leading-relaxed">
            select your stay experience, crafted with natural materials, panoramic views, and refined comfort.
          </p>
        </div>
      </section>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Quick Booking Bar */}
        <QuickBookingWidget
          initialCheckIn={checkIn}
          initialCheckOut={checkOut}
          initialGuests={guests}
          initialRooms={roomsCount}
        />

        {/* Search Summary Badge if query params exist */}
        {checkIn && checkOut && (
          <div className="bg-white p-4 rounded-xl border border-[#e8e4de] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-[#1e293b]">
              <Sparkles className="w-4 h-4 text-[#b87352]" />
              <span>
                showing rooms available for <strong>{guests} guests</strong> from <strong>{checkIn}</strong> to <strong>{checkOut}</strong>
              </span>
            </div>
            <span className="text-[#64748b]">all prices include resort service & access to facilities</span>
          </div>
        )}

        {/* Filters & Sorting Bar */}
        <div className="bg-white p-4 rounded-xl border border-[#e8e4de] flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Guest Filter Tabs */}
          <div className="flex items-center gap-2 text-xs w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
            <span className="text-[#64748b] font-medium shrink-0 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5 text-[#b87352]" /> guests:
            </span>
            <button
              onClick={() => setOccupancyFilter(0)}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors shrink-0 ${
                occupancyFilter === 0
                  ? 'bg-[#1f2d27] text-white'
                  : 'bg-[#faf8f5] text-[#1e293b] hover:bg-[#f1ede8]'
              }`}
            >
              all rooms
            </button>
            <button
              onClick={() => setOccupancyFilter(2)}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors shrink-0 ${
                occupancyFilter === 2
                  ? 'bg-[#1f2d27] text-white'
                  : 'bg-[#faf8f5] text-[#1e293b] hover:bg-[#f1ede8]'
              }`}
            >
              2+ guests
            </button>
            <button
              onClick={() => setOccupancyFilter(4)}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors shrink-0 ${
                occupancyFilter === 4
                  ? 'bg-[#1f2d27] text-white'
                  : 'bg-[#faf8f5] text-[#1e293b] hover:bg-[#f1ede8]'
              }`}
            >
              4+ guests
            </button>
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 text-xs w-full sm:w-auto justify-end">
            <ArrowUpDown className="w-3.5 h-3.5 text-[#64748b]" />
            <span className="text-[#64748b] font-medium">sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-[#faf8f5] border border-[#e8e4de] px-3 py-1.5 rounded-lg font-medium text-[#1e293b] focus:outline-hidden cursor-pointer"
            >
              <option value="recommended">featured first</option>
              <option value="price-asc">price: low to high</option>
              <option value="price-desc">price: high to low</option>
            </select>
          </div>
        </div>

        {/* Room Grid */}
        {loading ? (
          <div className="text-center py-16 space-y-3">
            <RefreshCw className="w-6 h-6 text-[#b87352] animate-spin mx-auto" />
            <p className="text-xs text-[#64748b]">loading room availability...</p>
          </div>
        ) : filteredRooms.length === 0 ? (
          <div className="bg-white p-12 rounded-xl border border-[#e8e4de] text-center space-y-4">
            <h3 className="font-serif text-xl font-medium text-[#1e293b]">
              no rooms matching your selected filters
            </h3>
            <p className="text-xs text-[#64748b] max-w-sm mx-auto">
              try adjusting your guest count or dates to explore all our luxury villas.
            </p>
            <button
              onClick={() => {
                setOccupancyFilter(0);
                setSortBy('recommended');
              }}
              className="bg-[#b87352] text-white text-xs px-4 py-2 rounded-lg"
            >
              reset filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredRooms.map((room) => (
              <RoomCard
                key={room.id}
                room={room}
                searchParams={{ checkIn, checkOut, guests }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
