"use client";

import { useState } from "react";
import { MOCK_RESORT_INFO } from "@/lib/mock-data";
import { Save, Building, Clock, MapPin, Phone, Mail, Link as LinkIcon, AlertCircle } from "lucide-react";
import { Card } from "@/components/admin/ui/Card";
import { Button } from "@/components/admin/ui/Button";

export default function SettingsPage() {
  const [isSaving, setIsSaving] = useState(false);
  
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      // We would show a toast notification here in a real app
    }, 1000);
  };

  return (
    <div className="space-y-6 pb-20">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div>
          <h1 className="text-2xl font-bold text-[#1e293b]">Resort Settings</h1>
          <p className="text-gray-500 mt-1">Manage public information, contact details, and core policies.</p>
        </div>
        <Button onClick={handleSave} icon={isSaving ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin block"></span> : <Save className="w-4 h-4" />} disabled={isSaving}>
          {isSaving ? "Saving..." : "Save Changes"}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500 stagger-1">
        
        {/* Left Column - General Info */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-4">
              <Building className="w-5 h-5 text-gray-400" />
              <h2 className="text-lg font-bold text-[#1e293b]">General Information</h2>
            </div>
            
            <form className="space-y-5" onSubmit={handleSave}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="sm:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Property Name</label>
                  <input type="text" defaultValue={MOCK_RESORT_INFO.name} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1e293b] focus:bg-white outline-none transition-all" />
                </div>
                
                <div className="sm:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Tagline</label>
                  <input type="text" defaultValue={MOCK_RESORT_INFO.tagline} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1e293b] focus:bg-white outline-none transition-all" />
                </div>

                <div className="sm:col-span-2 mt-4 flex items-center gap-2 border-b border-gray-100 pb-4">
                  <Clock className="w-5 h-5 text-gray-400" />
                  <h3 className="text-base font-bold text-[#1e293b]">Check-in Policies</h3>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Check-in Time</label>
                  <input type="time" defaultValue={MOCK_RESORT_INFO.checkInTime} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1e293b] focus:bg-white outline-none transition-all text-gray-700" />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Check-out Time</label>
                  <input type="time" defaultValue={MOCK_RESORT_INFO.checkOutTime} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1e293b] focus:bg-white outline-none transition-all text-gray-700" />
                </div>
              </div>
            </form>
          </Card>

          <Card>
            <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-4">
              <Phone className="w-5 h-5 text-gray-400" />
              <h2 className="text-lg font-bold text-[#1e293b]">Contact Information</h2>
            </div>
            
            <div className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5 flex items-center gap-2">
                    <Mail className="w-4 h-4 text-gray-400" /> Primary Email
                  </label>
                  <input type="email" defaultValue={MOCK_RESORT_INFO.email} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1e293b] focus:bg-white outline-none transition-all" />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5 flex items-center gap-2">
                    <Phone className="w-4 h-4 text-gray-400" /> Phone Number
                  </label>
                  <input type="tel" defaultValue={MOCK_RESORT_INFO.phone} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1e293b] focus:bg-white outline-none transition-all" />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5 flex items-center gap-2">
                    <Phone className="w-4 h-4 text-green-500" /> WhatsApp Number
                  </label>
                  <input type="tel" defaultValue={MOCK_RESORT_INFO.whatsapp} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1e293b] focus:bg-white outline-none transition-all" />
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-100">
                <label className="block text-sm font-semibold text-gray-700 mb-1.5 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gray-400" /> Physical Address
                </label>
                <textarea rows={3} defaultValue={MOCK_RESORT_INFO.address} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1e293b] focus:bg-white outline-none transition-all resize-none" />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5 flex items-center gap-2">
                  <LinkIcon className="w-4 h-4 text-gray-400" /> Google Maps Link
                </label>
                <input type="url" defaultValue={MOCK_RESORT_INFO.mapsUrl} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#1e293b] focus:bg-white outline-none transition-all" />
              </div>
            </div>
          </Card>
        </div>

        {/* Right Column - Integrations / Info */}
        <div className="space-y-6">
          <Card className="bg-[#1e293b] text-white border-none">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-6 h-6 text-blue-400 shrink-0" />
              <div>
                <h3 className="font-bold text-white mb-2">Notice</h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Changes made here will immediately reflect on the public website. Please ensure all contact information and maps URLs are tested before saving.
                </p>
              </div>
            </div>
          </Card>

          <Card>
            <h3 className="font-bold text-[#1e293b] mb-4">Integrations</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 text-blue-700 rounded flex items-center justify-center font-bold text-xs">
                    BC
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#1e293b]">Booking.com</p>
                    <p className="text-xs text-gray-500">Not connected</p>
                  </div>
                </div>
                <Button variant="secondary" size="sm">Connect</Button>
              </div>

              <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg bg-gray-50">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-100 text-green-700 rounded flex items-center justify-center font-bold text-xs">
                    WA
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#1e293b]">WhatsApp Widget</p>
                    <p className="text-xs text-green-600 font-medium">Active</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">Configure</Button>
              </div>
            </div>
          </Card>
        </div>

      </div>
    </div>
  );
}
