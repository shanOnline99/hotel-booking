"use client";

import { useState } from "react";
import { MOCK_RESERVATIONS } from "@/lib/mock-data";
import { Search, Mail, Phone, Calendar, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function GuestsPage() {
  const [searchQuery, setSearchQuery] = useState("");

  // Extract unique guests from reservations for the mock data
  const uniqueGuestsMap = new Map();
  MOCK_RESERVATIONS.forEach((res) => {
    if (!uniqueGuestsMap.has(res.guestEmail)) {
      uniqueGuestsMap.set(res.guestEmail, {
        id: res.guestEmail, // Using email as unique ID for mock purposes
        name: res.guestName,
        email: res.guestEmail,
        phone: res.guestPhone,
        totalBookings: 1,
        totalSpent: res.totalAmount,
        lastStay: res.checkOut,
      });
    } else {
      const guest = uniqueGuestsMap.get(res.guestEmail);
      guest.totalBookings += 1;
      guest.totalSpent += res.totalAmount;
      if (new Date(res.checkOut) > new Date(guest.lastStay)) {
        guest.lastStay = res.checkOut;
      }
    }
  });

  const guests = Array.from(uniqueGuestsMap.values());

  const filteredGuests = guests.filter(guest => 
    guest.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    guest.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-20">
      <div>
        <h1 className="text-2xl font-bold text-[#1e293b]">Guest Directory</h1>
        <p className="text-gray-500 mt-1">View and manage your customer database (CRM).</p>
      </div>

      {/* Search bar */}
      <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search guests by name or email..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1e293b] focus:border-transparent outline-none transition-all"
          />
        </div>
      </div>

      {/* Guests Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Guest Profile</th>
                <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Contact Info</th>
                <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Booking History</th>
                <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredGuests.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-12 text-center text-gray-500">
                    No guests found matching your search.
                  </td>
                </tr>
              ) : (
                filteredGuests.map((guest) => (
                  <tr key={guest.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                          {guest.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-semibold text-[#1e293b]">{guest.name}</div>
                          <div className="text-xs text-gray-500 mt-0.5">Guest ID: {guest.id.split('@')[0]}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Mail className="w-3.5 h-3.5 text-gray-400" />
                          {guest.email}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Phone className="w-3.5 h-3.5 text-gray-400" />
                          {guest.phone}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex gap-6">
                        <div>
                          <div className="text-xs text-gray-400 mb-0.5">Total Stays</div>
                          <div className="font-medium text-[#1e293b]">{guest.totalBookings}</div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-400 mb-0.5">Total Spend</div>
                          <div className="font-medium text-green-600">${guest.totalSpent}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <button className="inline-flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors">
                        View Details <ArrowRight className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
