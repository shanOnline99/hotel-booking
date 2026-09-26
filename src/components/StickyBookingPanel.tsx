'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Room, RatePlan } from '@/types';
import { Calendar, Users, ShieldCheck, ChevronRight, X, Sparkles } from 'lucide-react';

interface StickyBookingPanelProps {
  room: Room;
  ratePlans: RatePlan[];
  initialCheckIn?: string;
  initialCheckOut?: string;
  initialGuests?: number;
}

export const StickyBookingPanel: React.FC<StickyBookingPanelProps> = ({
  room,
  ratePlans,
  initialCheckIn,
  initialCheckOut,
  initialGuests = 2,
}) => {
  const router = useRouter();

  // Helper dates
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
  const [selectedRateId, setSelectedRateId] = useState(ratePlans[0]?.id || 'standard');
  const [mobileSheetOpen, setMobileSheetOpen] = useState(false);

  // Calculate nights
  const calculateNights = () => {
    const start = new Date(checkIn).getTime();
    const end = new Date(checkOut).getTime();
    if (!isNaN(start) && !isNaN(end) && end > start) {
      return Math.max(1, Math.round((end - start) / (1000 * 60 * 60 * 24)));
    }
    return 1;
  };

  const nights = calculateNights();
  const activeRatePlan = ratePlans.find((r) => r.id === selectedRateId) || ratePlans[0];
  const pricePerNight = Math.round(room.basePrice * (activeRatePlan?.priceMultiplier || 1));
  const subtotal = pricePerNight * nights;
  const taxesAndFees = Math.round(subtotal * 0.12);
  const totalPrice = subtotal + taxesAndFees;

  const handleProceedToBooking = () => {
    const query = new URLSearchParams({
      roomId: room.id,
      checkIn,
      checkOut,
      guests: guests.toString(),
      ratePlanId: selectedRateId,
    });
    router.push(`/booking?${query.toString()}`);
  };

  return (
    <>
      {/* Desktop Sticky Panel (Visible on lg screens) */}
      <div className="hidden lg:block sticky top-24 w-full bg-white rounded-xl border border-[#e8e4de] shadow-lg p-6 space-y-6">
        <div className="flex items-baseline justify-between border-b border-[#e8e4de] pb-4">
          <div>
            <span className="text-2xl font-semibold text-[#1e293b]">${pricePerNight}</span>
            <span className="text-xs text-[#64748b]"> / night</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-[#b87352] font-medium bg-[#faf8f5] px-2.5 py-1 rounded-md border border-[#e8e4de]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>best rate guarantee</span>
          </div>
        </div>

        {/* Form Inputs */}
        <div className="space-y-4">
          {/* Check-In / Check-Out grid */}
          <div className="grid grid-cols-2 gap-2 p-3 bg-[#faf8f5] rounded-lg border border-[#e8e4de]">
            <div className="border-r border-[#e8e4de] pr-2">
              <label className="block text-[10px] uppercase tracking-wider text-[#64748b] font-semibold mb-1">
                check-in
              </label>
              <input
                type="date"
                value={checkIn}
                min={new Date().toISOString().split('T')[0]}
                onChange={(e) => setCheckIn(e.target.value)}
                className="w-full text-xs font-semibold text-[#1e293b] bg-transparent focus:outline-hidden cursor-pointer"
              />
            </div>
            <div className="pl-2">
              <label className="block text-[10px] uppercase tracking-wider text-[#64748b] font-semibold mb-1">
                check-out
              </label>
              <input
                type="date"
                value={checkOut}
                min={checkIn || new Date().toISOString().split('T')[0]}
                onChange={(e) => setCheckOut(e.target.value)}
                className="w-full text-xs font-semibold text-[#1e293b] bg-transparent focus:outline-hidden cursor-pointer"
              />
            </div>
          </div>

          {/* Guests Count */}
          <div className="p-3 bg-[#faf8f5] rounded-lg border border-[#e8e4de]">
            <label className="block text-[10px] uppercase tracking-wider text-[#64748b] font-semibold mb-1">
              guests
            </label>
            <select
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value))}
              className="w-full text-xs font-semibold text-[#1e293b] bg-transparent focus:outline-hidden cursor-pointer"
            >
              {Array.from({ length: room.maxOccupancy }, (_, i) => i + 1).map((num) => (
                <option key={num} value={num}>
                  {num} {num === 1 ? 'guest' : 'guests'} (max {room.maxOccupancy})
                </option>
              ))}
            </select>
          </div>

          {/* Rate Plan Selector */}
          <div className="space-y-2">
            <label className="block text-[10px] uppercase tracking-wider text-[#64748b] font-semibold">
              select rate plan
            </label>
            <div className="space-y-2">
              {ratePlans.map((plan) => {
                const planPrice = Math.round(room.basePrice * plan.priceMultiplier);
                const isSelected = plan.id === selectedRateId;
                return (
                  <div
                    key={plan.id}
                    onClick={() => setSelectedRateId(plan.id)}
                    className={`p-3 rounded-lg border cursor-pointer transition-all ${
                      isSelected
                        ? 'border-[#b87352] bg-[#b87352]/5 ring-1 ring-[#b87352]'
                        : 'border-[#e8e4de] hover:border-[#b87352]/50 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-[#1e293b]">{plan.name}</span>
                      <span className="text-xs font-semibold text-[#1e293b]">${planPrice}/nt</span>
                    </div>
                    <p className="text-[11px] text-[#64748b] mt-1 leading-snug">{plan.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Breakdown Calculation */}
        <div className="space-y-2 pt-3 border-t border-[#e8e4de] text-xs text-[#64748b]">
          <div className="flex justify-between">
            <span>
              ${pricePerNight} × {nights} {nights === 1 ? 'night' : 'nights'}
            </span>
            <span>${subtotal}</span>
          </div>
          <div className="flex justify-between">
            <span>taxes & resort fees (12%)</span>
            <span>${taxesAndFees}</span>
          </div>
          <div className="flex justify-between font-semibold text-sm text-[#1e293b] pt-2 border-t border-[#e8e4de]">
            <span>total stay</span>
            <span className="text-[#b87352]">${totalPrice}</span>
          </div>
        </div>

        {/* Action Button */}
        <button
          type="button"
          onClick={handleProceedToBooking}
          className="w-full bg-[#b87352] hover:bg-[#a25f3f] text-white py-3.5 px-4 rounded-lg font-medium text-sm transition-colors flex items-center justify-center gap-2 shadow-xs"
        >
          <span>continue to booking</span>
          <ChevronRight className="w-4 h-4" />
        </button>

        <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#64748b]">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>no payment required today — pay at resort</span>
        </div>
      </div>

      {/* Mobile Fixed Bottom Bar (Visible on screens smaller than lg) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-[#e8e4de] p-4 shadow-xl flex items-center justify-between">
        <div>
          <div className="text-xs text-[#64748b]">total ({nights} nights)</div>
          <div className="text-lg font-semibold text-[#1e293b]">${totalPrice}</div>
        </div>
        <button
          type="button"
          onClick={() => setMobileSheetOpen(true)}
          className="bg-[#b87352] text-white px-5 py-3 rounded-lg font-medium text-sm flex items-center gap-1.5 shadow-xs"
        >
          <span>reserve room</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Mobile Sheet Modal */}
      {mobileSheetOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex flex-col justify-end animate-in fade-in duration-200">
          <div className="bg-white rounded-t-2xl p-6 space-y-5 max-h-[90vh] overflow-y-auto animate-in slide-in-from-bottom duration-300">
            <div className="flex items-center justify-between pb-3 border-b border-[#e8e4de]">
              <div>
                <h3 className="font-serif text-lg font-semibold text-[#1e293b]">reserve stay</h3>
                <p className="text-xs text-[#64748b]">{room.name}</p>
              </div>
              <button
                type="button"
                onClick={() => setMobileSheetOpen(false)}
                className="p-2 rounded-full text-[#64748b] hover:bg-[#faf8f5]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Form */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-2 p-3 bg-[#faf8f5] rounded-lg border border-[#e8e4de]">
                <div className="border-r border-[#e8e4de] pr-2">
                  <label className="block text-[10px] uppercase tracking-wider text-[#64748b] font-semibold mb-1">
                    check-in
                  </label>
                  <input
                    type="date"
                    value={checkIn}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="w-full text-xs font-semibold text-[#1e293b] bg-transparent focus:outline-hidden"
                  />
                </div>
                <div className="pl-2">
                  <label className="block text-[10px] uppercase tracking-wider text-[#64748b] font-semibold mb-1">
                    check-out
                  </label>
                  <input
                    type="date"
                    value={checkOut}
                    min={checkIn || new Date().toISOString().split('T')[0]}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="w-full text-xs font-semibold text-[#1e293b] bg-transparent focus:outline-hidden"
                  />
                </div>
              </div>

              {/* Rate Plan Selector */}
              <div className="space-y-2">
                <label className="block text-[10px] uppercase tracking-wider text-[#64748b] font-semibold">
                  select rate plan
                </label>
                <div className="space-y-2">
                  {ratePlans.map((plan) => {
                    const planPrice = Math.round(room.basePrice * plan.priceMultiplier);
                    const isSelected = plan.id === selectedRateId;
                    return (
                      <div
                        key={plan.id}
                        onClick={() => setSelectedRateId(plan.id)}
                        className={`p-3 rounded-lg border cursor-pointer transition-all ${
                          isSelected
                            ? 'border-[#b87352] bg-[#b87352]/5 ring-1 ring-[#b87352]'
                            : 'border-[#e8e4de] bg-white'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-medium text-[#1e293b]">{plan.name}</span>
                          <span className="text-xs font-semibold text-[#1e293b]">${planPrice}/nt</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Price calculation */}
              <div className="p-3 bg-[#faf8f5] rounded-lg border border-[#e8e4de] flex justify-between text-xs font-semibold text-[#1e293b]">
                <span>total stay ({nights} nights + taxes)</span>
                <span className="text-[#b87352] text-sm">${totalPrice}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleProceedToBooking}
              className="w-full bg-[#b87352] text-white py-3.5 rounded-lg font-medium text-sm flex items-center justify-center gap-2 shadow-xs"
            >
              <span>continue to booking</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};
