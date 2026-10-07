"use client";

import { useState } from "react";
import { MOCK_RESERVATIONS, MOCK_ROOMS, MOCK_RATE_PLANS } from "@/lib/mock-data";
import { Search, Filter, MoreVertical, Check, X, Clock, Plus } from "lucide-react";
import { Reservation } from "@/types";
import { Button } from "@/components/admin/ui/Button";
import { Card } from "@/components/admin/ui/Card";
import { Badge } from "@/components/admin/ui/Badge";

export default function ReservationsPage() {
  const [reservations, setReservations] = useState<Reservation[]>(
    [...MOCK_RESERVATIONS].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  );
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleStatusChange = (id: string, newStatus: 'confirmed' | 'cancelled' | 'pending') => {
    setReservations(prev => 
      prev.map(res => res.id === id ? { ...res, status: newStatus } : res)
    );
    setActiveDropdown(null);
  };

  const getStatusType = (status: string) => {
    switch (status) {
      case 'confirmed': return 'success';
      case 'pending': return 'warning';
      case 'cancelled': return 'danger';
      default: return 'neutral';
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
        <Button onClick={() => setIsModalOpen(true)} icon={<Plus className="w-4 h-4" />}>
          Manual Booking
        </Button>
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
      <Card noPadding className="overflow-visible">
        <div className="overflow-x-auto min-h-[400px]">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Guest & Code</th>
                <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Room & Plan</th>
                <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Dates</th>
                <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Total</th>
                <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider text-center">Status</th>
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
                    <tr key={res.id} className="hover:bg-gray-50/80 transition-colors">
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
                      <td className="py-4 px-6 text-center">
                        <Badge status={getStatusType(res.status) as any} dot>
                          {res.status.charAt(0).toUpperCase() + res.status.slice(1)}
                        </Badge>
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
      </Card>

      {/* Manual Booking Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <Card noPadding className="w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50 rounded-t-xl shrink-0">
              <h2 className="text-lg font-bold text-[#1e293b]">Create Manual Booking</h2>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-900 transition-colors bg-white hover:bg-gray-200 p-1 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto">
              <form className="space-y-6">
                {/* Guest Details Section */}
                <div>
                  <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 border-b border-gray-100 pb-2">Guest Details</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2 sm:col-span-1">
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">Full Name</label>
                      <input type="text" className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1e293b] outline-none transition-shadow" placeholder="John Doe" />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">Phone Number</label>
                      <input type="tel" className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1e293b] outline-none transition-shadow" placeholder="+1 234 567 890" />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email Address</label>
                      <input type="email" className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1e293b] outline-none transition-shadow" placeholder="john@example.com" />
                    </div>
                  </div>
                </div>

                {/* Booking Details Section */}
                <div>
                  <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 border-b border-gray-100 pb-2">Booking Details</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">Room Selection</label>
                      <select className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1e293b] outline-none transition-shadow bg-white">
                        <option value="">Select a room...</option>
                        {MOCK_ROOMS.map(room => (
                          <option key={room.id} value={room.id}>{room.name} - ${room.basePrice}/night</option>
                        ))}
                      </select>
                    </div>
                    <div className="col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">Rate Plan</label>
                      <select className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1e293b] outline-none transition-shadow bg-white">
                        <option value="">Select a rate plan...</option>
                        {MOCK_RATE_PLANS.map(plan => (
                          <option key={plan.id} value={plan.id} className="capitalize">{plan.name}</option>
                        ))}
                      </select>
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">Check In</label>
                      <input type="date" className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1e293b] outline-none transition-shadow text-gray-700" />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">Check Out</label>
                      <input type="date" className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1e293b] outline-none transition-shadow text-gray-700" />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">Number of Guests</label>
                      <input type="number" min="1" className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1e293b] outline-none transition-shadow" defaultValue="1" />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">Status</label>
                      <select className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1e293b] outline-none transition-shadow bg-white">
                        <option value="confirmed">Confirmed</option>
                        <option value="pending">Pending</option>
                      </select>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            
            <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-3 rounded-b-xl bg-gray-50 shrink-0">
              <Button variant="ghost" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
              <Button variant="primary" onClick={() => setIsModalOpen(false)}>
                Confirm Booking
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
