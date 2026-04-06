"use client";

import { UserButton } from "@clerk/nextjs";
import React from "react";
import { Search, Bell, HelpCircle, Command, Sparkles } from "lucide-react";

function DashboardHeader() {
  return (
    <div className="sticky top-0 z-10 border-b border-slate-200 bg-white/80 px-4 py-3 backdrop-blur-xl md:px-6">
      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0">
          <p className="text-xs font-medium uppercase tracking-[0.28em] text-slate-500">Command Center</p>
          <div className="mt-1 flex items-center gap-2">
            <h1 className="text-lg font-semibold text-slate-950 md:text-xl">FinTrack dashboard</h1>
            <span className="hidden items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700 sm:inline-flex">
              <Sparkles className="h-3 w-3" />
              Live
            </span>
          </div>
        </div>

        <div className="hidden w-full max-w-xl items-center rounded-full border border-slate-200 bg-slate-50 px-4 py-2 md:flex">
          <Search className="mr-2 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Search budgets, transactions, or alerts"
            className="w-full border-none bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
          />
          <span className="ml-3 inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-2 py-1 text-[11px] font-medium text-slate-500 shadow-sm">
            <Command className="h-3 w-3" />K
          </span>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button className="rounded-full border border-slate-200 bg-white p-2 text-slate-600 transition-colors hover:bg-slate-50">
            <Bell size={18} />
          </button>
          <button className="rounded-full border border-slate-200 bg-white p-2 text-slate-600 transition-colors hover:bg-slate-50 md:hidden">
            <Search size={18} />
          </button>
          <button className="rounded-full border border-slate-200 bg-white p-2 text-slate-600 transition-colors hover:bg-slate-50">
            <HelpCircle size={18} />
          </button>
          <div className="ml-1 rounded-full border border-slate-200 bg-white p-1 shadow-sm">
            <UserButton 
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  avatarBox: "h-8 w-8",
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