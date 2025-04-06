"use client";

import { UserButton } from "@clerk/nextjs";
import React from "react";
import { Search, Bell, HelpCircle } from "lucide-react";
import Image from "next/image";

function DashboardHeader() {
  return (
    <div className="p-4 border-b flex justify-between items-center bg-white sticky top-0 z-10">
      {/* Left Section - Search Bar */}
      <div className="flex items-center bg-gray-50 rounded-lg px-3 py-2 w-1/3">
        <Search className="text-gray-400 mr-2" size={18} />
        <input
          type="text"
          placeholder="Search..."
          className="bg-transparent border-none outline-none w-full text-sm text-gray-600 placeholder-gray-400"
        />
      </div>

      {/* Right Section - Icons & User */}
      <div className="flex items-center space-x-4">
        <button className="p-2 rounded-full hover:bg-gray-100 relative">
          <Bell className="text-gray-600" size={20} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        
        <button className="p-2 rounded-full hover:bg-gray-100">
          <HelpCircle className="text-gray-600" size={20} />
        </button>
        
        <div className="flex items-center space-x-2 ml-4">
          <div className="border-2 border-blue-100 rounded-full">
            <UserButton 
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  avatarBox: "h-9 w-9",
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardHeader;