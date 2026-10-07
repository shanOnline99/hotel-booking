"use client";

import { useState } from "react";
import { MOCK_ROOMS } from "@/lib/mock-data";
import { Plus, MoreVertical, Edit2, Trash2, Image as ImageIcon, X } from "lucide-react";
import { Room } from "@/types";
import { Button } from "@/components/admin/ui/Button";
import { Card } from "@/components/admin/ui/Card";
import { Badge } from "@/components/admin/ui/Badge";

export default function RoomsPage() {
  const [rooms, setRooms] = useState<Room[]>(MOCK_ROOMS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this room?")) {
      setRooms(rooms.filter((room) => room.id !== id));
      setActiveDropdown(null);
    }
  };

  return (
    <div className="space-y-6 pb-20">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div>
          <h1 className="text-2xl font-bold text-[#1e293b]">Rooms Management</h1>
          <p className="text-gray-500 mt-1">Manage your physical inventory and pricing.</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} icon={<Plus className="w-4 h-4" />}>
          Add New Room
        </Button>
      </div>

      {/* Rooms List */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {rooms.map((room, idx) => {
          const isDropdownOpen = activeDropdown === room.id;
          const staggerClass = `stagger-${Math.min((idx % 4) + 1, 5)}`; // max 5

          return (
            <div key={room.id} className={`animate-in fade-in slide-in-from-bottom-4 duration-500 ${staggerClass}`}>
              <Card noPadding className="flex flex-col sm:flex-row overflow-hidden group hover:border-[#1e293b]/20 h-full">
                {/* Room Image */}
                <div className="sm:w-56 h-48 sm:h-auto relative bg-gray-100 shrink-0 overflow-hidden">
                  {room.photos && room.photos.length > 0 ? (
                    <img 
                      src={room.photos[0]} 
                      alt={room.name} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <ImageIcon className="w-8 h-8" />
                    </div>
                  )}
                  {room.featured && (
                    <div className="absolute top-3 left-3">
                      <Badge status="warning">Featured</Badge>
                    </div>
                  )}
                </div>

                {/* Room Details */}
                <div className="p-6 flex-1 flex flex-col justify-between relative bg-white">
                  <div className="absolute top-5 right-5">
                    <button 
                      onClick={() => setActiveDropdown(isDropdownOpen ? null : room.id)}
                      className="p-1.5 text-gray-400 hover:text-[#1e293b] hover:bg-gray-100 rounded-md transition-colors"
                    >
                      <MoreVertical className="w-5 h-5" />
                    </button>

                    {/* Dropdown Menu */}
                    {isDropdownOpen && (
                      <div className="absolute right-0 top-8 w-40 bg-white rounded-lg shadow-xl border border-gray-100 z-50 animate-in fade-in zoom-in-95 duration-200">
                        <div className="py-1">
                          <button 
                            onClick={() => { setActiveDropdown(null); setIsModalOpen(true); }}
                            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                          >
                            <Edit2 className="w-4 h-4" /> Edit Room
                          </button>
                          <button 
                            onClick={() => handleDelete(room.id)}
                            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                          >
                            <Trash2 className="w-4 h-4" /> Delete
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-[#1e293b] group-hover:text-blue-600 transition-colors pr-8">{room.name}</h3>
                    <p className="text-sm text-gray-500 mt-2 line-clamp-2">{room.shortDescription}</p>
                    
                    <div className="grid grid-cols-2 gap-y-3 mt-5">
                      <div className="text-sm">
                        <span className="text-gray-400 block text-xs font-medium uppercase tracking-wider mb-0.5">Occupancy</span>
                        <span className="font-semibold text-gray-700 flex items-center gap-1.5">
                          <Users className="w-3.5 h-3.5 text-gray-400" />
                          Up to {room.maxOccupancy} Pax
                        </span>
                      </div>
                      <div className="text-sm">
                        <span className="text-gray-400 block text-xs font-medium uppercase tracking-wider mb-0.5">Bed Type</span>
                        <span className="font-semibold text-gray-700 truncate block pr-2" title={room.bedType}>{room.bedType}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-5 border-t border-gray-100 flex justify-between items-end">
                    <div className="text-sm">
                      <span className="text-gray-400 block text-xs font-medium uppercase tracking-wider mb-0.5">Size</span>
                      <span className="font-semibold text-[#1e293b]">{room.sizeSqm} m²</span>
                    </div>
                    <div className="text-right">
                      <span className="text-gray-400 block text-xs font-medium uppercase tracking-wider mb-0.5">Base Price</span>
                      <span className="text-2xl font-bold text-[#1e293b]">${room.basePrice}</span>
                      <span className="text-sm text-gray-500 font-medium">/night</span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          );
        })}
      </div>

      {/* Add/Edit Room Modal (UI Only) */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <Card noPadding className="w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50 rounded-t-xl">
              <h2 className="text-lg font-bold text-[#1e293b]">Add New Room</h2>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-900 transition-colors bg-white hover:bg-gray-200 p-1 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto">
              <form className="space-y-5">
                <div className="grid grid-cols-2 gap-5">
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Room Name</label>
                    <input type="text" className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1e293b] outline-none transition-shadow" placeholder="e.g. Ocean View Suite" />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Base Price ($)</label>
                    <input type="number" className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1e293b] outline-none transition-shadow" placeholder="150" />
                  </div>
                  
                  <div className="col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Short Description</label>
                    <input type="text" className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1e293b] outline-none transition-shadow" placeholder="Brief summary of the room" />
                  </div>
                  
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Max Occupancy</label>
                    <input type="number" className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1e293b] outline-none transition-shadow" placeholder="2" />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Bed Type</label>
                    <input type="text" className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1e293b] outline-none transition-shadow" placeholder="e.g. 1 King Bed" />
                  </div>
                </div>
              </form>
            </div>
            
            <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-3 rounded-b-xl bg-gray-50">
              <Button variant="ghost" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
              <Button variant="primary" onClick={() => setIsModalOpen(false)}>
                Save Room
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}

// Just adding a quick Users icon import that I used in the markup
import { Users } from "lucide-react";
