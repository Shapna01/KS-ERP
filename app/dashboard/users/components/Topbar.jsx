"use client";

import {
  Search,
  Moon,
  Sun,
  Bell,
  Settings,
  ChevronDown,
} from "lucide-react";

export default function Topbar() {
  return (
    <div className="h-[72px] bg-white border-b border-gray-200 flex items-center justify-between px-6">
      
      <div className="relative w-[420px]">

        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
        />

        <input
          type="text"
          placeholder="Search"
          className="w-full h-[42px] rounded-xl border border-gray-200 bg-[#FAFAFC] pl-11 pr-4 text-sm outline-none focus:border-purple-500"
        />

      </div>

      <div className="flex items-center gap-5">

        <div className="flex items-center gap-3">
          
          <div className="w-8 h-8 rounded-full bg-purple-700 flex items-center justify-center">
            <Moon size={15} className="text-white" />
          </div>

          <Sun size={17} className="text-gray-400 cursor-pointer" />
        </div>

        <Bell
          size={18}
          className="text-gray-400 cursor-pointer"
        />

        <Settings
          size={18}
          className="text-gray-400 cursor-pointer"
        />

        <div className="w-[1px] h-6 bg-gray-200"></div>

        <div className="flex items-center gap-3 cursor-pointer">

          <span className="text-sm font-medium text-gray-700">
            KS Smart
          </span>

          <ChevronDown
            size={16}
            className="text-gray-500"
          />

        </div>

        <div className="w-10 h-10 rounded-full bg-purple-700 flex items-center justify-center text-white font-medium">
          S
        </div>

      </div>
    </div>
  );
}