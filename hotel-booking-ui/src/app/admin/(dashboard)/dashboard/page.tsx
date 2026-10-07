"use client";

import { 
  TrendingUp, 
  Users, 
  CalendarDays, 
  CreditCard,
  ArrowUpRight
} from "lucide-react";
import { MOCK_RESERVATIONS, MOCK_ROOMS } from "@/lib/mock-data";
import Link from "next/link";
import { Card } from "@/components/admin/ui/Card";
import { Badge } from "@/components/admin/ui/Badge";

export default function AdminDashboard() {
  const stats = [
    { name: "Total Bookings", value: "124", icon: CalendarDays, change: "+12%", trend: "up" },
    { name: "Occupancy Rate", value: "85%", icon: TrendingUp, change: "+5%", trend: "up" },
    { name: "Revenue (MTD)", value: "$45,231", icon: CreditCard, change: "+18%", trend: "up" },
    { name: "Active Guests", value: "42", icon: Users, change: "-2%", trend: "down" },
  ];

  const recentReservations = [...MOCK_RESERVATIONS]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  const getStatusType = (status: string) => {
    switch (status) {
      case 'confirmed': return 'success';
      case 'pending': return 'warning';
      case 'cancelled': return 'danger';
      default: return 'neutral';
    }
  };

  return (
    <div className="space-y-8 pb-10">
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
        <h1 className="text-2xl font-bold text-[#1e293b]">Dashboard Overview</h1>
        <p className="text-gray-500 mt-1">Welcome back. Here is what is happening at Tantor Resort today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div key={stat.name} className={`animate-in fade-in slide-in-from-bottom-4 duration-500 stagger-${idx + 1}`}>
            <Card className="flex flex-col h-full hover:-translate-y-1 transition-transform duration-300">
              <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center border border-gray-100">
                  <stat.icon className="w-5 h-5 text-[#1e293b]" />
                </div>
                <Badge status={stat.trend === 'up' ? 'success' : 'danger'} className="gap-0.5 px-2">
                  {stat.trend === 'up' && <ArrowUpRight className="w-3 h-3" />}
                  {stat.change}
                </Badge>
              </div>
              <h3 className="text-gray-500 text-sm font-medium">{stat.name}</h3>
              <p className="text-2xl font-bold text-[#1e293b] mt-1">{stat.value}</p>
            </Card>
          </div>
        ))}
      </div>

      {/* Recent Activity Table */}
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 stagger-5">
        <Card noPadding className="overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
            <h2 className="text-lg font-bold text-[#1e293b]">Recent Reservations</h2>
            <Link href="/admin/reservations" className="text-sm text-blue-600 font-medium hover:text-blue-800 transition-colors">
              View all
            </Link>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Guest & Code</th>
                  <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Room</th>
                  <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Dates</th>
                  <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Source</th>
                  <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Amount</th>
                  <th className="py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {recentReservations.map((res) => {
                  const room = MOCK_ROOMS.find(r => r.id === res.roomId);
                  
                  return (
                    <tr key={res.id} className="hover:bg-gray-50/80 transition-colors group">
                      <td className="py-4 px-6">
                        <div className="font-medium text-[#1e293b] group-hover:text-blue-600 transition-colors">{res.guestName}</div>
                        <div className="text-xs text-gray-400 mt-1">{res.bookingCode}</div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="text-sm text-gray-700 font-medium">{room?.name || 'Unknown Room'}</div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="text-sm text-gray-700">{res.checkIn}</div>
                        <div className="text-xs text-gray-400 mt-1">to {res.checkOut}</div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-sm text-gray-500 bg-gray-50 px-2 py-1 rounded border border-gray-100">
                          {res.source.replace('_', '.')}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <div className="text-sm font-bold text-[#1e293b]">${res.totalAmount}</div>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <Badge status={getStatusType(res.status) as any} dot>
                          {res.status.charAt(0).toUpperCase() + res.status.slice(1)}
                        </Badge>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}
