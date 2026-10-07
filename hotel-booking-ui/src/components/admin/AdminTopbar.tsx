"use client";

import { Bell, Menu } from "lucide-react";

interface AdminTopbarProps {
  toggleMobileMenu: () => void;
}

export function AdminTopbar({ toggleMobileMenu }: AdminTopbarProps) {
  return (
    <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-4 sm:px-8 z-10 shadow-sm shrink-0">
      <div className="flex items-center gap-4">
        <button 
          onClick={toggleMobileMenu}
          className="p-2 -ml-2 text-gray-500 hover:bg-gray-100 rounded-md lg:hidden"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>

      <div className="flex items-center gap-4 sm:gap-6">
        <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-full hover:bg-gray-50">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
        
        <div className="flex items-center gap-3 pl-4 sm:pl-6 border-l border-gray-100">
          <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm">
            A
          </div>
          <div className="text-sm hidden sm:block">
            <p className="font-medium text-gray-700">Admin User</p>
            <p className="text-xs text-gray-400">admin@hotel.com</p>
          </div>
        </div>
      </div>
    </header>
  );
}
