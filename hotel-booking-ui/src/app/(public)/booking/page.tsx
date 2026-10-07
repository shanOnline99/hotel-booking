'use client';

import React, { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Room, RatePlan, Reservation } from '@/types';
import { getRooms, getRatePlans, createReservation } from '@/lib/services';
import { BookingStepper } from '@/components/BookingStepper';
import {
  Calendar,
  Users,
  DoorOpen,
  CheckCircle2,
  ShieldCheck,
  ChevronRight,
  ChevronLeft,
  MessageSquare,
  Sparkles,
  Info,
  Clock,
  Printer,
  Home,
} from 'lucide-react';

export default function BookingPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const router = useRouter();
  const resolvedSearchParams = use(searchParams);

  const initRoomId = typeof resolvedSearchParams?.roomId === 'string' ? resolvedSearchParams.roomId : '';
  const initCheckIn = typeof resolvedSearchParams?.checkIn === 'string' ? resolvedSearchParams.checkIn : '';
  const initCheckOut = typeof resolvedSearchParams?.checkOut === 'string' ? resolvedSearchParams.checkOut : '';
  const initGuests = typeof resolvedSearchParams?.guests === 'string' ? parseInt(resolvedSearchParams.guests, 10) : 2;
  const initRatePlanId = typeof resolvedSearchParams?.ratePlanId === 'string' ? resolvedSearchParams.ratePlanId : 'standard';

  // Step state
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Loaded data
  const [rooms, setRooms] = useState<Room[]>([]);
  const [ratePlans, setRatePlans] = useState<RatePlan[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);

  // Form State
  const getDefaultDates = () => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const nextWeek = new Date(tomorrow);
    nextWeek.setDate(nextWeek.getDate() + 3);
    const format = (d: Date) => d.toISOString().split('T')[0];
    return {
      checkIn: initCheckIn || format(tomorrow),
      checkOut: initCheckOut || format(nextWeek),
    };
  };

  const defaults = getDefaultDates();
  const [checkIn, setCheckIn] = useState(defaults.checkIn);
  const [checkOut, setCheckOut] = useState(defaults.checkOut);
  const [guests, setGuests] = useState(initGuests);
  const [selectedRateId, setSelectedRateId] = useState(initRatePlanId);

  // Guest Info State (Step 2)
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');

  // Form Errors State
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Confirmation result (Step 4)
  const [confirmedReservation, setConfirmedReservation] = useState<Reservation | null>(null);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const [allRooms, allRates] = await Promise.all([getRooms(), getRatePlans()]);
      setRooms(allRooms);
      setRatePlans(allRates);

      const target = allRooms.find((r) => r.id === initRoomId) || allRooms[0];
      setSelectedRoom(target || null);
      setLoading(false);
    }
    load();
  }, [initRoomId]);

  // Calculate pricing
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
  const pricePerNight = selectedRoom
    ? Math.round(selectedRoom.basePrice * (activeRatePlan?.priceMultiplier || 1))
    : 0;
  const subtotal = pricePerNight * nights;
  const taxesAndFees = Math.round(subtotal * 0.12);
  const totalAmount = subtotal + taxesAndFees;

  // Validation function
  const validateStep2 = () => {
    const newErrors: { [key: string]: string } = {};

    if (!guestName.trim()) {
      newErrors.guestName = 'please enter your full name';
    } else if (guestName.trim().length < 2) {
      newErrors.guestName = 'full name must be at least 2 characters';
    }

    if (!guestEmail.trim()) {
      newErrors.guestEmail = 'please enter your email address';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(guestEmail)) {
      newErrors.guestEmail = 'please enter a valid email address';
    }

    if (!guestPhone.trim()) {
      newErrors.guestPhone = 'please enter your WhatsApp phone number';
    } else if (guestPhone.trim().length < 7) {
      newErrors.guestPhone = 'please enter a valid phone number with country code';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (currentStep === 1) {
      if (!selectedRoom) return;
      setCurrentStep(2);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (currentStep === 2) {
      if (validateStep2()) {
        setCurrentStep(3);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else if (currentStep === 3) {
      handleFinalizeBooking();
    }
  };

  const handleFinalizeBooking = async () => {
    if (!selectedRoom) return;
    setIsSubmitting(true);

    try {
      const res = await createReservation({
        roomId: selectedRoom.id,
        checkIn,
        checkOut,
        guests,
        roomsCount: 1,
        guestName: guestName.trim(),
        guestPhone: guestPhone.trim(),
        guestEmail: guestEmail.trim(),
        ratePlanId: activeRatePlan.id,
        ratePlanName: activeRatePlan.name,
        totalAmount,
        specialRequests: specialRequests.trim() || undefined,
        source: 'direct',
      });

      setConfirmedReservation(res);
      setCurrentStep(4);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-3">
        <Sparkles className="w-8 h-8 text-[#b87352] animate-pulse mx-auto" />
        <p className="text-xs text-[#64748b]">preparing booking checkout...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header Title */}
      <div className="space-y-1">
        <span className="text-xs uppercase tracking-widest text-[#b87352] font-semibold">
          direct reservation
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-normal text-[#1e293b]">
          complete your resort stay
        </h1>
      </div>

      {/* Stepper Progress Bar */}
      <BookingStepper currentStep={currentStep} onStepClick={(step) => setCurrentStep(step)} />

      {/* Grid Layout: Main Steps vs Summary Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Main Step Content Container */}
        <div className={currentStep === 4 ? 'lg:col-span-12' : 'lg:col-span-7'}>
          {/* STEP 1: DATES & RATE PLAN SELECTION */}
          {currentStep === 1 && (
            <div className="bg-white p-6 sm:p-8 rounded-xl border border-[#e8e4de] space-y-6">
              <div className="border-b border-[#e8e4de] pb-4">
                <h2 className="font-serif text-2xl font-normal text-[#1e293b]">
                  step 1: confirm room, dates & rate plan
                </h2>
                <p className="text-xs text-[#64748b]">
                  adjust stay dates, number of guests, or select a custom package.
                </p>
              </div>

              {/* Room Selector if user wants to change room */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#64748b]">
                  selected room villa
                </label>
                <select
                  value={selectedRoom?.id || ''}
                  onChange={(e) => {
                    const found = rooms.find((r) => r.id === e.target.value);
                    if (found) setSelectedRoom(found);
                  }}
                  className="w-full bg-[#faf8f5] border border-[#e8e4de] p-3 rounded-lg text-sm font-semibold text-[#1e293b] focus:outline-hidden cursor-pointer"
                >
                  {rooms.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.name} — from ${r.basePrice}/night (max {r.maxOccupancy} guests)
                    </option>
                  ))}
                </select>
              </div>

              {/* Date & Guest Pickers */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 bg-[#faf8f5] rounded-lg border border-[#e8e4de]">
                <div>
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
                <div>
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
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-[#64748b] font-semibold mb-1">
                    guests
                  </label>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                    className="w-full text-xs font-semibold text-[#1e293b] bg-transparent focus:outline-hidden cursor-pointer"
                  >
                    {Array.from(
                      { length: selectedRoom?.maxOccupancy || 4 },
                      (_, i) => i + 1
                    ).map((n) => (
                      <option key={n} value={n}>
                        {n} {n === 1 ? 'guest' : 'guests'}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Rate Plan Selector */}
              <div className="space-y-3">
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#64748b]">
                  choose your rate plan
                </label>
                <div className="space-y-3">
                  {ratePlans.map((plan) => {
                    const isSelected = plan.id === selectedRateId;
                    const price = selectedRoom
                      ? Math.round(selectedRoom.basePrice * plan.priceMultiplier)
                      : 0;
                    return (
                      <div
                        key={plan.id}
                        onClick={() => setSelectedRateId(plan.id)}
                        className={`p-4 rounded-xl border cursor-pointer transition-all ${
                          isSelected
                            ? 'border-[#b87352] bg-[#b87352]/5 ring-1 ring-[#b87352]'
                            : 'border-[#e8e4de] hover:border-[#b87352]/40 bg-white'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-semibold text-[#1e293b] capitalize">
                            {plan.name}
                          </h4>
                          <span className="text-sm font-semibold text-[#b87352]">${price} / night</span>
                        </div>
                        <p className="text-xs text-[#64748b] mt-1">{plan.description}</p>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {plan.includedBenefits.map((b) => (
                            <span
                              key={b}
                              className="text-[11px] bg-white px-2.5 py-0.5 rounded-full border border-[#e8e4de] text-[#1e293b]"
                            >
                              ✓ {b}
                            </span>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Continue button */}
              <button
                onClick={handleNextStep}
                className="w-full bg-[#b87352] hover:bg-[#a25f3f] text-white py-3.5 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 shadow-xs"
              >
                <span>continue to guest details</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* STEP 2: GUEST DETAILS FORM */}
          {currentStep === 2 && (
            <div className="bg-white p-6 sm:p-8 rounded-xl border border-[#e8e4de] space-y-6">
              <div className="border-b border-[#e8e4de] pb-4">
                <h2 className="font-serif text-2xl font-normal text-[#1e293b]">
                  step 2: guest details
                </h2>
                <p className="text-xs text-[#64748b]">
                  enter your primary guest details for booking confirmation and WhatsApp updates.
                </p>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleNextStep();
                }}
                className="space-y-5"
              >
                {/* Full Name */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#64748b]">
                    full name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={guestName}
                    onChange={(e) => {
                      setGuestName(e.target.value);
                      if (errors.guestName) setErrors((prev) => ({ ...prev, guestName: '' }));
                    }}
                    placeholder="e.g. Elena Rostova"
                    className={`w-full p-3 bg-[#faf8f5] rounded-lg border text-sm text-[#1e293b] focus:outline-hidden ${
                      errors.guestName ? 'border-red-500 bg-red-50/20' : 'border-[#e8e4de] focus:border-[#b87352]'
                    }`}
                  />
                  {errors.guestName && (
                    <p className="text-xs text-red-600 font-medium">{errors.guestName}</p>
                  )}
                </div>

                {/* Email Address */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#64748b]">
                    email address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={guestEmail}
                    onChange={(e) => {
                      setGuestEmail(e.target.value);
                      if (errors.guestEmail) setErrors((prev) => ({ ...prev, guestEmail: '' }));
                    }}
                    placeholder="e.g. elena@example.com"
                    className={`w-full p-3 bg-[#faf8f5] rounded-lg border text-sm text-[#1e293b] focus:outline-hidden ${
                      errors.guestEmail ? 'border-red-500 bg-red-50/20' : 'border-[#e8e4de] focus:border-[#b87352]'
                    }`}
                  />
                  {errors.guestEmail && (
                    <p className="text-xs text-red-600 font-medium">{errors.guestEmail}</p>
                  )}
                  <p className="text-[11px] text-[#64748b]">
                    we will send your booking voucher & confirmation code here.
                  </p>
                </div>

                {/* Phone / WhatsApp Number */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#64748b]">
                    WhatsApp number <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      value={guestPhone}
                      onChange={(e) => {
                        setGuestPhone(e.target.value);
                        if (errors.guestPhone) setErrors((prev) => ({ ...prev, guestPhone: '' }));
                      }}
                      placeholder="e.g. +1 555 019 2831"
                      className={`w-full p-3 pr-10 bg-[#faf8f5] rounded-lg border text-sm text-[#1e293b] focus:outline-hidden ${
                        errors.guestPhone ? 'border-red-500 bg-red-50/20' : 'border-[#e8e4de] focus:border-[#b87352]'
                      }`}
                    />
                    <MessageSquare className="w-4 h-4 text-emerald-600 absolute right-3 top-3.5" />
                  </div>
                  {errors.guestPhone && (
                    <p className="text-xs text-red-600 font-medium">{errors.guestPhone}</p>
                  )}
                  <p className="text-[11px] text-[#64748b]">
                    our concierge team will send instant check-in instructions to your WhatsApp.
                  </p>
                </div>

                {/* Special Requests Textarea */}
                <div className="space-y-1.5 pt-2">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#64748b]">
                    special requests (optional)
                  </label>
                  <textarea
                    rows={3}
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                    placeholder="dietary preferences, high floor preference, airport pickup details..."
                    className="w-full p-3 bg-[#faf8f5] rounded-lg border border-[#e8e4de] text-sm text-[#1e293b] focus:outline-hidden focus:border-[#b87352]"
                  />
                </div>

                {/* Navigation Buttons */}
                <div className="flex items-center justify-between pt-4 border-t border-[#e8e4de]">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="text-xs font-medium text-[#64748b] hover:text-[#1e293b] inline-flex items-center gap-1"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>back to dates & rates</span>
                  </button>

                  <button
                    type="submit"
                    className="bg-[#b87352] hover:bg-[#a25f3f] text-white py-3 px-6 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 shadow-xs"
                  >
                    <span>review stay summary</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* STEP 3: REVIEW RESERVATION */}
          {currentStep === 3 && (
            <div className="bg-white p-6 sm:p-8 rounded-xl border border-[#e8e4de] space-y-6">
              <div className="border-b border-[#e8e4de] pb-4">
                <h2 className="font-serif text-2xl font-normal text-[#1e293b]">
                  step 3: review & confirm reservation
                </h2>
                <p className="text-xs text-[#64748b]">
                  please review all stay details before finalizing your direct booking.
                </p>
              </div>

              {/* Guest Details Review Card */}
              <div className="bg-[#faf8f5] p-5 rounded-xl border border-[#e8e4de] space-y-3 text-xs">
                <h3 className="font-semibold text-sm text-[#1e293b] border-b border-[#e8e4de] pb-2">
                  guest information
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[#1e293b]">
                  <div>
                    <span className="text-[#64748b] block">primary guest</span>
                    <span className="font-semibold text-sm">{guestName}</span>
                  </div>
                  <div>
                    <span className="text-[#64748b] block">email address</span>
                    <span className="font-medium">{guestEmail}</span>
                  </div>
                  <div>
                    <span className="text-[#64748b] block">WhatsApp number</span>
                    <span className="font-medium text-emerald-700">{guestPhone}</span>
                  </div>
                  <div>
                    <span className="text-[#64748b] block">special requests</span>
                    <span className="italic">{specialRequests || 'none specified'}</span>
                  </div>
                </div>
              </div>

              {/* Stay Summary Review */}
              <div className="bg-[#faf8f5] p-5 rounded-xl border border-[#e8e4de] space-y-3 text-xs">
                <h3 className="font-semibold text-sm text-[#1e293b] border-b border-[#e8e4de] pb-2">
                  resort stay breakdown
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div>
                    <span className="text-[#64748b] block">villa</span>
                    <span className="font-semibold">{selectedRoom?.name}</span>
                  </div>
                  <div>
                    <span className="text-[#64748b] block">dates</span>
                    <span className="font-semibold">{checkIn} → {checkOut}</span>
                  </div>
                  <div>
                    <span className="text-[#64748b] block">duration</span>
                    <span className="font-semibold">{nights} {nights === 1 ? 'night' : 'nights'}</span>
                  </div>
                  <div>
                    <span className="text-[#64748b] block">rate plan</span>
                    <span className="font-semibold capitalize">{activeRatePlan.name}</span>
                  </div>
                </div>
              </div>

              {/* Cancellation & Payment Policy Text */}
              <div className="bg-emerald-50/50 p-4 rounded-xl border border-emerald-200 space-y-2 text-xs text-emerald-900">
                <div className="flex items-center gap-2 font-semibold">
                  <ShieldCheck className="w-4 h-4 text-emerald-700" />
                  <span>cancellation & payment policy</span>
                </div>
                <p className="leading-relaxed text-[11px] text-emerald-800">
                  free cancellation up to 48 hours prior to check-in. no deposit required today. payment will be settled directly at resort reception during check-in.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-[#e8e4de]">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="text-xs font-medium text-[#64748b] hover:text-[#1e293b] inline-flex items-center gap-1"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>edit guest details</span>
                </button>

                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={handleFinalizeBooking}
                  className="bg-[#b87352] hover:bg-[#a25f3f] text-white py-3.5 px-8 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 shadow-md disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>confirming reservation...</span>
                  ) : (
                    <>
                      <span>confirm booking now</span>
                      <CheckCircle2 className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: CONFIRMATION SCREEN */}
          {currentStep === 4 && confirmedReservation && (
            <div className="bg-white p-8 sm:p-12 rounded-2xl border border-[#e8e4de] shadow-xl text-center space-y-8 animate-in fade-in duration-300">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-3 max-w-lg mx-auto">
                <span className="text-xs uppercase tracking-widest text-emerald-700 font-semibold bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  reservation confirmed
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#1e293b]">
                  thank you, {confirmedReservation.guestName}!
                </h2>
                <p className="text-sm text-[#64748b] leading-relaxed">
                  your direct reservation at Tantor Resort is officially confirmed. a confirmation voucher has been sent to{' '}
                  <strong className="text-[#1e293b]">{confirmedReservation.guestEmail}</strong> and your WhatsApp{' '}
                  <strong className="text-emerald-700">{confirmedReservation.guestPhone}</strong>.
                </p>
              </div>

              {/* Booking Reference Card */}
              <div className="bg-[#faf8f5] p-6 rounded-xl border border-[#e8e4de] max-w-md mx-auto space-y-4">
                <div className="text-xs text-[#64748b]">booking reference code</div>
                <div className="font-mono text-3xl font-bold tracking-wider text-[#b87352]">
                  {confirmedReservation.bookingCode}
                </div>
                <div className="text-[11px] text-[#64748b] pt-2 border-t border-[#e8e4de]">
                  save this reference code to manage or check your booking anytime at{' '}
                  <Link href="/my-booking" className="text-[#b87352] underline font-medium">
                    /my-booking
                  </Link>
                </div>
              </div>

              {/* Reservation summary details */}
              <div className="bg-white p-6 rounded-xl border border-[#e8e4de] max-w-lg mx-auto grid grid-cols-2 gap-4 text-left text-xs">
                <div>
                  <span className="text-[#64748b] block">resort villa</span>
                  <span className="font-semibold text-sm text-[#1e293b]">
                    {confirmedReservation.room?.name || selectedRoom?.name}
                  </span>
                </div>
                <div>
                  <span className="text-[#64748b] block">check-in date</span>
                  <span className="font-semibold text-sm text-[#1e293b]">
                    {confirmedReservation.checkIn}
                  </span>
                </div>
                <div>
                  <span className="text-[#64748b] block">check-out date</span>
                  <span className="font-semibold text-sm text-[#1e293b]">
                    {confirmedReservation.checkOut}
                  </span>
                </div>
                <div>
                  <span className="text-[#64748b] block">total amount</span>
                  <span className="font-bold text-sm text-[#b87352]">
                    ${confirmedReservation.totalAmount}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                <button
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-2 bg-[#faf8f5] hover:bg-[#f1ede8] text-[#1e293b] px-5 py-2.5 rounded-lg border border-[#e8e4de] text-xs font-medium"
                >
                  <Printer className="w-4 h-4" />
                  <span>print booking voucher</span>
                </button>
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 bg-[#b87352] hover:bg-[#a25f3f] text-white px-6 py-2.5 rounded-lg text-xs font-medium"
                >
                  <Home className="w-4 h-4" />
                  <span>return to home</span>
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Persistent Right Side Order Summary Panel (Steps 1, 2, 3) */}
        {currentStep < 4 && selectedRoom && (
          <div className="lg:col-span-5 sticky top-24 space-y-4">
            <div className="bg-white rounded-xl border border-[#e8e4de] p-6 space-y-5 shadow-xs">
              <h3 className="font-serif text-lg font-semibold text-[#1e293b] border-b border-[#e8e4de] pb-3">
                reservation summary
              </h3>

              {/* Room Card Thumbnail */}
              <div className="flex gap-4 items-center">
                <img
                  src={selectedRoom.photos[0]}
                  alt={selectedRoom.name}
                  className="w-20 h-20 rounded-lg object-cover border border-[#e8e4de]"
                />
                <div className="space-y-1">
                  <h4 className="font-serif font-medium text-sm text-[#1e293b]">{selectedRoom.name}</h4>
                  <div className="text-xs text-[#64748b] flex items-center gap-2">
                    <span>{selectedRoom.sizeSqm} m²</span> • <span>{selectedRoom.bedType}</span>
                  </div>
                  <span className="inline-block text-[11px] text-[#b87352] font-semibold">
                    {selectedRoom.view}
                  </span>
                </div>
              </div>

              {/* Stay parameters */}
              <div className="space-y-2 text-xs text-[#64748b] pt-3 border-t border-[#e8e4de]">
                <div className="flex justify-between">
                  <span>dates</span>
                  <span className="font-medium text-[#1e293b]">
                    {checkIn} → {checkOut}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>duration</span>
                  <span className="font-medium text-[#1e293b]">
                    {nights} {nights === 1 ? 'night' : 'nights'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>guests</span>
                  <span className="font-medium text-[#1e293b]">
                    {guests} {guests === 1 ? 'guest' : 'guests'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>rate plan</span>
                  <span className="font-medium text-[#1e293b] capitalize">
                    {activeRatePlan.name}
                  </span>
                </div>
              </div>

              {/* Cost breakdown */}
              <div className="space-y-2 pt-3 border-t border-[#e8e4de] text-xs text-[#64748b]">
                <div className="flex justify-between">
                  <span>
                    ${pricePerNight} × {nights} nights
                  </span>
                  <span>${subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>resort service & taxes (12%)</span>
                  <span>${taxesAndFees}</span>
                </div>
                <div className="flex justify-between text-base font-semibold text-[#1e293b] pt-3 border-t border-[#e8e4de]">
                  <span>total price</span>
                  <span className="text-[#b87352]">${totalAmount}</span>
                </div>
              </div>

              <div className="bg-[#faf8f5] p-3 rounded-lg border border-[#e8e4de] flex items-center gap-2 text-[11px] text-[#64748b]">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>pay directly at resort. free cancellation up to 48 hours.</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
