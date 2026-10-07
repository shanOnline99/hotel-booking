"use client";

import { useState } from "react";
import { MOCK_RESERVATIONS, MOCK_ROOMS } from "@/lib/mock-data";
import { Search, Filter, MoreVertical, Check, X, Clock } from "lucide-react";
import { Reservation } from "@/types";

export default function ReservationsPage() {
  const [reservations, setReservations] = useState<Reservation[]>(
    [...MOCK_RESERVATIONS].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  );
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const handleStatusChange = (id: string, newStatus: 'confirmed' | 'cancelled' | 'pending') => {
    setReservations(prev => 
      prev.map(res => res.id === id ? { ...res, status: newStatus } : res)
    );
    setActiveDropdown(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-700 border-green-200';
      case 'pending': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'cancelled': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  // Filter and search logic
  const filteredReservations = reservations.filter(res => {
    const matchesStatus = filterStatus === "all" || res.status === filterStatus;
    const matchesSearch = res.guestName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          res.bookingCode.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#1e293b]">Reservations</h1>
          <p className="text-gray-500 mt-1">Manage all your property bookings.</p>
        </div>
        <button className="px-4 py-2 bg-[#1e293b] text-white font-medium rounded-lg hover:bg-black transition-colors shadow-sm">
          + Manual Booking
        </button>
      </div>

      {/* Filters & Search bar */}
      <div className="flex flex-col sm:flex-row gap-4 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search by guest name or booking code..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1e293b] focus:border-transparent outline-none transition-all"
          />
        </div>
        <div className="relative min-w-[200px]">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <select 
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="w-full pl-10 pr-8 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1e293b] focus:border-transparent outline-none appearance-none transition-all"
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-visible">
        <div className="overflow-x-auto min-h-[400px]">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Guest & Code</th>
                <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Room & Plan</th>
                <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Dates</th>
                <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Total</th>
                <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredReservations.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-gray-500">
                    No reservations found matching your criteria.
                  </td>
                </tr>
              ) : (
                filteredReservations.map((res) => {
                  const room = MOCK_ROOMS.find(r => r.id === res.roomId);
                  const isDropdownOpen = activeDropdown === res.id;

                  return (
                    <tr key={res.id} className="hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-6">
                        <div className="font-semibold text-[#1e293b]">{res.guestName}</div>
                        <div className="text-xs text-gray-400 mt-1">{res.bookingCode}</div>
                        <div className="text-xs text-gray-400">{res.guestEmail}</div>
                      </td>
                      <td className="py-4 px-6 max-w-[200px]">
                        <div className="font-medium text-gray-800">{room?.name || 'Unknown Room'}</div>
                        <div className="text-xs text-gray-500 mt-1 truncate" title={res.ratePlanName}>
                          {res.ratePlanName}
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="text-sm font-medium text-gray-800">{res.checkIn}</div>
                        <div className="text-xs text-gray-500 mt-1">to {res.checkOut}</div>
                        <div className="text-xs text-blue-600 mt-1 font-medium">{res.guests} Guests</div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="font-semibold text-[#1e293b]">${res.totalAmount}</div>
                        <div className="text-xs text-gray-400 mt-1 capitalize">{res.source.replace('_', '.')}</div>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(res.status)}`}>
                          {res.status.charAt(0).toUpperCase() + res.status.slice(1)}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right relative">
                        <button 
                          onClick={() => setActiveDropdown(isDropdownOpen ? null : res.id)}
                          className="p-2 text-gray-400 hover:text-[#1e293b] hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          <MoreVertical className="w-5 h-5" />
                        </button>

                        {/* Action Dropdown */}
                        {isDropdownOpen && (
                          <div className="absolute right-6 top-12 w-48 bg-white rounded-lg shadow-xl border border-gray-100 z-50 animate-in fade-in zoom-in-95 duration-200">
                            <div className="py-1">
                              <button 
                                onClick={() => handleStatusChange(res.id, 'confirmed')}
                                className="w-full text-left px-4 py-2 text-sm text-green-700 hover:bg-green-50 flex items-center gap-2"
                              >
                                <Check className="w-4 h-4" /> Mark Confirmed
                              </button>
                              <button 
                                onClick={() => handleStatusChange(res.id, 'pending')}
                                className="w-full text-left px-4 py-2 text-sm text-yellow-700 hover:bg-yellow-50 flex items-center gap-2"
                              >
                                <Clock className="w-4 h-4" /> Mark Pending
                              </button>
                              <button 
                                onClick={() => handleStatusChange(res.id, 'cancelled')}
                                className="w-full text-left px-4 py-2 text-sm text-red-700 hover:bg-red-50 flex items-center gap-2"
                              >
                                <X className="w-4 h-4" /> Cancel Booking
                              </button>
                            </div>
                            <div className="border-t border-gray-100 py-1">
                              <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                                View Details
                              </button>
                            </div>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
