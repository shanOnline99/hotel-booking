'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Reservation } from '@/types';
import { getReservationByCode } from '@/lib/services';
import {
  Search,
  CheckCircle2,
  Calendar,
  Users,
  MessageSquare,
  AlertCircle,
  Clock,
  Printer,
  XCircle,
  HelpCircle,
} from 'lucide-react';

export default function MyBookingPage() {
  const [bookingCode, setBookingCode] = useState('');
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [reservation, setReservation] = useState<Reservation | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingCode.trim() || !emailOrPhone.trim()) return;

    setLoading(true);
    setSearched(true);

    const result = await getReservationByCode(bookingCode, emailOrPhone);
    setReservation(result);
    setLoading(false);
  };

  const fillSample = () => {
    setBookingCode('TR-84920');
    setEmailOrPhone('elena@example.com');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Top Banner */}
      <div className="text-center max-w-xl mx-auto space-y-3">
        <span className="text-xs uppercase tracking-widest text-[#b87352] font-semibold">
          guest self-service
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-normal text-[#1e293b]">
          manage your reservation
        </h1>
        <p className="text-xs sm:text-sm text-[#64748b] leading-relaxed">
          look up your booking details, view voucher status, or request stay modifications.
        </p>
      </div>

      {/* Lookup Form */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#e8e4de] shadow-xs space-y-6">
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#64748b]">
                booking reference code
              </label>
              <input
                type="text"
                value={bookingCode}
                onChange={(e) => setBookingCode(e.target.value)}
                placeholder="e.g. TR-84920"
                className="w-full p-3 bg-[#faf8f5] rounded-lg border border-[#e8e4de] text-sm text-[#1e293b] focus:outline-hidden focus:border-[#b87352]"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#64748b]">
                email address or phone
              </label>
              <input
                type="text"
                value={emailOrPhone}
                onChange={(e) => setEmailOrPhone(e.target.value)}
                placeholder="e.g. elena@example.com"
                className="w-full p-3 bg-[#faf8f5] rounded-lg border border-[#e8e4de] text-sm text-[#1e293b] focus:outline-hidden focus:border-[#b87352]"
                required
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
            <button
              type="button"
              onClick={fillSample}
              className="text-xs text-[#b87352] hover:underline flex items-center gap-1 font-medium"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>try with sample booking code (TR-84920)</span>
            </button>

            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto bg-[#b87352] hover:bg-[#a25f3f] text-white px-6 py-3 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 shadow-xs"
            >
              {loading ? (
                <span>searching...</span>
              ) : (
                <>
                  <Search className="w-4 h-4" />
                  <span>find reservation</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Lookup Results Section */}
      {searched && !loading && (
        <div className="animate-in fade-in duration-300">
          {reservation ? (
            <div className="bg-white rounded-2xl border border-[#e8e4de] overflow-hidden shadow-md space-y-6 p-6 sm:p-8">
              {/* Status Header */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-[#e8e4de]">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xl font-bold text-[#b87352]">
                      {reservation.bookingCode}
                    </span>
                    <span className="bg-emerald-100 text-emerald-800 text-xs font-semibold px-3 py-0.5 rounded-full capitalize">
                      {reservation.status}
                    </span>
                  </div>
                  <p className="text-xs text-[#64748b]">
                    booked on {new Date(reservation.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <button
                  onClick={() => window.print()}
                  className="bg-[#faf8f5] hover:bg-[#f1ede8] text-[#1e293b] border border-[#e8e4de] px-4 py-2 rounded-lg text-xs font-medium inline-flex items-center gap-2"
                >
                  <Printer className="w-4 h-4" />
                  <span>print voucher</span>
                </button>
              </div>

              {/* Reservation Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-[#1e293b]">
                <div className="space-y-3 bg-[#faf8f5] p-5 rounded-xl border border-[#e8e4de]">
                  <h3 className="font-serif text-sm font-semibold border-b border-[#e8e4de] pb-2 text-[#1e293b]">
                    accommodation & dates
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-[#64748b]">villa / suite:</span>
                      <span className="font-semibold">{reservation.room?.name || 'Grand Ocean Villa'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#64748b]">check-in:</span>
                      <span className="font-semibold">{reservation.checkIn} (15:00)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#64748b]">check-out:</span>
                      <span className="font-semibold">{reservation.checkOut} (12:00)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#64748b]">total guests:</span>
                      <span className="font-semibold">{reservation.guests} guests</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#64748b]">rate plan:</span>
                      <span className="font-semibold capitalize">{reservation.ratePlanName}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 bg-[#faf8f5] p-5 rounded-xl border border-[#e8e4de]">
                  <h3 className="font-serif text-sm font-semibold border-b border-[#e8e4de] pb-2 text-[#1e293b]">
                    guest details & billing
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-[#64748b]">guest name:</span>
                      <span className="font-semibold">{reservation.guestName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#64748b]">email address:</span>
                      <span className="font-semibold">{reservation.guestEmail}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#64748b]">WhatsApp phone:</span>
                      <span className="font-semibold text-emerald-700">{reservation.guestPhone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#64748b]">total stay price:</span>
                      <span className="font-bold text-sm text-[#b87352]">${reservation.totalAmount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#64748b]">payment status:</span>
                      <span className="font-medium text-emerald-700">pay at check-in</span>
                    </div>
                  </div>
                </div>
              </div>

              {reservation.specialRequests && (
                <div className="p-4 bg-[#faf8f5] rounded-xl border border-[#e8e4de] text-xs space-y-1">
                  <span className="font-semibold text-[#1e293b] block">special requests:</span>
                  <p className="text-[#64748b] italic">{reservation.specialRequests}</p>
                </div>
              )}

              {/* Concierge Actions */}
              <div className="bg-[#1f2d27] text-white p-5 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="space-y-1 text-center sm:text-left">
                  <h4 className="font-serif text-base font-semibold">need to modify your stay?</h4>
                  <p className="text-xs text-white/70">
                    contact our concierge via WhatsApp for date changes or airport transfers.
                  </p>
                </div>
                <a
                  href={`https://wa.me/6281234567890?text=Hi%20Concierge,%20I'd%20like%20to%20modify%20booking%20${reservation.bookingCode}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#25D366] hover:bg-[#20bd5a] text-white px-5 py-2.5 rounded-lg text-xs font-medium inline-flex items-center gap-2 shadow-xs shrink-0"
                >
                  <MessageSquare className="w-4 h-4 fill-current" />
                  <span>chat on WhatsApp</span>
                </a>
              </div>
            </div>
          ) : (
            <div className="bg-white p-8 rounded-2xl border border-[#e8e4de] text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mx-auto">
                <AlertCircle className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-medium text-[#1e293b]">
                reservation not found
              </h3>
              <p className="text-xs text-[#64748b] max-w-sm mx-auto leading-relaxed">
                we couldn't find a matching reservation for <strong>"{bookingCode}"</strong> and contact <strong>"{emailOrPhone}"</strong>.
              </p>
              <button
                onClick={fillSample}
                className="bg-[#b87352] text-white text-xs px-4 py-2 rounded-lg font-medium"
              >
                try sample reservation code
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
