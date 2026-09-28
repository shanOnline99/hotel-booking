'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Calendar, Users, DoorOpen, Search, X, ChevronRight } from 'lucide-react';

interface QuickBookingWidgetProps {
  initialCheckIn?: string;
  initialCheckOut?: string;
  initialGuests?: number;
  initialRooms?: number;
  className?: string;
}

export const QuickBookingWidget: React.FC<QuickBookingWidgetProps> = ({
  initialCheckIn,
  initialCheckOut,
  initialGuests = 2,
  initialRooms = 1,
  className = '',
}) => {
  const router = useRouter();

  // Helper to format date YYYY-MM-DD
  const getDefaultDates = () => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const nextWeek = new Date(tomorrow);
    nextWeek.setDate(nextWeek.getDate() + 3);

    const format = (d: Date) => d.toISOString().split('T')[0];
    return {
      checkIn: initialCheckIn || format(tomorrow),
      checkOut: initialCheckOut || format(nextWeek),
    };
  };

  const defaults = getDefaultDates();
  const [checkIn, setCheckIn] = useState(defaults.checkIn);
  const [checkOut, setCheckOut] = useState(defaults.checkOut);
  const [guests, setGuests] = useState(initialGuests);
  const [rooms, setRooms] = useState(initialRooms);
  const [mobileModalOpen, setMobileModalOpen] = useState(false);

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    const params = new URLSearchParams();
    if (checkIn) params.set('checkIn', checkIn);
    if (checkOut) params.set('checkOut', checkOut);
    if (guests) params.set('guests', guests.toString());
    if (rooms) params.set('rooms', rooms.toString());

    setMobileModalOpen(false);
    router.push(`/rooms?${params.toString()}`);
  };

  return (
    <div className={`w-full ${className}`}>
      {/* Desktop Horizontal Bar (Visible on md and larger) */}
      <div className="hidden md:block bg-white border border-[#e8e4de] shadow-xl p-3.5 lg:p-4">
        <form onSubmit={handleSearch} className="flex flex-col md:flex-row items-center gap-3 sm:gap-4 w-full">
          {/* Check in */}
          <div className="flex-1 w-full border-b md:border-b-0 md:border-r border-[#e8e4de] pb-2 md:pb-0 md:pr-4">
            <label className="block text-[11px] uppercase tracking-wider text-[#64748b] font-semibold mb-1">
              check-in date
            </label>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#b87352] shrink-0" />
              <input
                type="date"
                value={checkIn}
                min={new Date().toISOString().split('T')[0]}
                onChange={(e) => setCheckIn(e.target.value)}
                className="w-full text-sm font-semibold text-[#1e293b] bg-transparent focus:outline-hidden cursor-pointer"
              />
            </div>
          </div>

          {/* Check out */}
          <div className="flex-1 w-full border-b md:border-b-0 md:border-r border-[#e8e4de] pb-2 md:pb-0 md:pr-4">
            <label className="block text-[11px] uppercase tracking-wider text-[#64748b] font-semibold mb-1">
              check-out date
            </label>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#b87352] shrink-0" />
              <input
                type="date"
                value={checkOut}
                min={checkIn || new Date().toISOString().split('T')[0]}
                onChange={(e) => setCheckOut(e.target.value)}
                className="w-full text-sm font-semibold text-[#1e293b] bg-transparent focus:outline-hidden cursor-pointer"
              />
            </div>
          </div>

          {/* Guests count */}
          <div className="w-full md:w-36 shrink-0 border-b md:border-b-0 md:border-r border-[#e8e4de] pb-2 md:pb-0 md:pr-4">
            <label className="block text-[11px] uppercase tracking-wider text-[#64748b] font-semibold mb-1">
              guests
            </label>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-[#b87352] shrink-0" />
              <select
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                className="w-full text-sm font-semibold text-[#1e293b] bg-transparent focus:outline-hidden cursor-pointer"
              >
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <option key={num} value={num}>
                    {num} {num === 1 ? 'guest' : 'guests'}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Rooms count */}
          <div className="w-full md:w-32 shrink-0 pb-2 md:pb-0 md:pr-2">
            <label className="block text-[11px] uppercase tracking-wider text-[#64748b] font-semibold mb-1">
              rooms
            </label>
            <div className="flex items-center gap-2">
              <DoorOpen className="w-4 h-4 text-[#b87352] shrink-0" />
              <select
                value={rooms}
                onChange={(e) => setRooms(Number(e.target.value))}
                className="w-full text-sm font-semibold text-[#1e293b] bg-transparent focus:outline-hidden cursor-pointer"
              >
                {[1, 2, 3, 4].map((num) => (
                  <option key={num} value={num}>
                    {num} {num === 1 ? 'room' : 'rooms'}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Search Button */}
          <div className="w-full md:w-auto shrink-0">
            <button
              type="submit"
              className="w-full md:w-auto bg-[#b87352] hover:bg-[#a25f3f] text-white py-3.5 px-6 text-sm font-semibold transition-colors flex items-center justify-center gap-2 shadow-sm whitespace-nowrap"
            >
              <Search className="w-4 h-4" />
              <span>check availability</span>
            </button>
          </div>
        </form>
      </div>

      {/* Mobile Single Button Trigger (Collapses on small screens) */}
      <div className="md:hidden">
        <button
          type="button"
          onClick={() => setMobileModalOpen(true)}
          className="w-full bg-white text-[#1e293b] p-4 rounded-xl border border-[#e8e4de] shadow-lg flex items-center justify-between transition-all hover:bg-[#faf8f5]"
        >
          <div className="flex items-center gap-3 text-left">
            <div className="w-10 h-10 rounded-full bg-[#faf8f5] text-[#b87352] flex items-center justify-center shrink-0 border border-[#e8e4de]">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-semibold text-[#1e293b]">check availability</div>
              <div className="text-xs text-[#64748b]">
                {checkIn ? `${checkIn} → ${checkOut}` : 'select dates & guests'}
              </div>
            </div>
          </div>
          <div className="bg-[#b87352] text-white px-3 py-2 rounded-lg text-xs font-medium flex items-center gap-1">
            <span>search</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </div>
        </button>

        {/* Mobile Full-Screen / Sheet Drawer */}
        {mobileModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex flex-col justify-end animate-in fade-in duration-200">
            <div className="bg-white rounded-t-2xl p-6 space-y-6 max-h-[90vh] overflow-y-auto animate-in slide-in-from-bottom duration-300">
              <div className="flex items-center justify-between pb-3 border-b border-[#e8e4de]">
                <div>
                  <h3 className="font-serif text-lg font-semibold text-[#1e293b]">
                    check dates & guests
                  </h3>
                  <p className="text-xs text-[#64748b]">find available rooms for your stay</p>
                </div>
                <button
                  type="button"
                  onClick={() => setMobileModalOpen(false)}
                  className="p-2 rounded-full hover:bg-[#faf8f5] text-[#64748b]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                {/* Mobile Check-In */}
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-[#64748b] uppercase tracking-wider">
                    check-in date
                  </label>
                  <div className="flex items-center gap-3 p-3 bg-[#faf8f5] rounded-lg border border-[#e8e4de]">
                    <Calendar className="w-5 h-5 text-[#b87352]" />
                    <input
                      type="date"
                      value={checkIn}
                      min={new Date().toISOString().split('T')[0]}
                      onChange={(e) => setCheckIn(e.target.value)}
                      className="w-full text-base font-medium text-[#1e293b] bg-transparent focus:outline-hidden"
                    />
                  </div>
                </div>

                {/* Mobile Check-Out */}
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-[#64748b] uppercase tracking-wider">
                    check-out date
                  </label>
                  <div className="flex items-center gap-3 p-3 bg-[#faf8f5] rounded-lg border border-[#e8e4de]">
                    <Calendar className="w-5 h-5 text-[#b87352]" />
                    <input
                      type="date"
                      value={checkOut}
                      min={checkIn || new Date().toISOString().split('T')[0]}
                      onChange={(e) => setCheckOut(e.target.value)}
                      className="w-full text-base font-medium text-[#1e293b] bg-transparent focus:outline-hidden"
                    />
                  </div>
                </div>

                {/* Mobile Guests */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-[#64748b] uppercase tracking-wider">
                      guests
                    </label>
                    <div className="flex items-center gap-2 p-3 bg-[#faf8f5] rounded-lg border border-[#e8e4de]">
                      <Users className="w-5 h-5 text-[#b87352]" />
                      <select
                        value={guests}
                        onChange={(e) => setGuests(Number(e.target.value))}
                        className="w-full text-base font-medium text-[#1e293b] bg-transparent focus:outline-hidden"
                      >
                        {[1, 2, 3, 4, 5, 6].map((num) => (
                          <option key={num} value={num}>
                            {num} {num === 1 ? 'guest' : 'guests'}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-[#64748b] uppercase tracking-wider">
                      rooms
                    </label>
                    <div className="flex items-center gap-2 p-3 bg-[#faf8f5] rounded-lg border border-[#e8e4de]">
                      <DoorOpen className="w-5 h-5 text-[#b87352]" />
                      <select
                        value={rooms}
                        onChange={(e) => setRooms(Number(e.target.value))}
                        className="w-full text-base font-medium text-[#1e293b] bg-transparent focus:outline-hidden"
                      >
                        {[1, 2, 3, 4].map((num) => (
                          <option key={num} value={num}>
                            {num} {num === 1 ? 'room' : 'rooms'}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleSearch()}
                  className="w-full mt-4 bg-[#b87352] text-white py-3.5 rounded-lg text-base font-medium flex items-center justify-center gap-2 shadow-xs"
                >
                  <Search className="w-5 h-5" />
                  <span>view available rooms</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
