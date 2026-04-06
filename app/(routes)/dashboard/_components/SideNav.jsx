'use client';

import React, { useEffect, useState } from "react";
import Image from 'next/image';
import {
  LayoutGrid,
  PiggyBank,
  ReceiptText,
  ShieldCheck,
  IndianRupee,
  Menu,
  X,
} from 'lucide-react';
import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import Link from "next/link";

function SideNav() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const menuList = [
    {
      id: 1,
      name: "Dashboard",
      icon: LayoutGrid,
      path: "/dashboard",
    },
    {
      id: 2,
      name: "Incomes",
      icon: IndianRupee,
      path: "/dashboard/incomes",
    },
    {
      id: 3,
      name: "Budgets",
      icon: PiggyBank,
      path: "/dashboard/budgets",
    },
    {
      id: 4,
      name: "Expenses",
      icon: ReceiptText,
      path: "/dashboard/expenses",
    },
    {
      id: 5,
      name: "Upgrade",
      icon: ShieldCheck,
      path: "/dashboard/upgrade",
    },
  ];
  
  const path = usePathname();
  const isActive = (menuPath) => path === menuPath || path.startsWith(`${menuPath}/`);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Mobile Header */}
      {isMobile && (
        <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-white shadow-sm p-3 flex items-center justify-between border-b">
          <div className="flex items-center gap-2">
            <Image 
              src="/assets/logo.png" 
              alt="logo" 
              width={40} 
              height={40} 
              className="rounded-lg"
            />
            <span className="text-blue-600 font-bold text-xl bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
              FinTrack
            </span>
          </div>
          <button 
            onClick={toggleMobileMenu}
            className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      )}

      {/* Mobile Menu Overlay */}
      {isMobile && isMobileMenuOpen && (
        <div 
          className="fixed inset-0 z-40 bg-slate-950/50 backdrop-blur-sm md:hidden"
          onClick={closeMobileMenu}
        />
      )}

      {/* Sidebar - Desktop */}
      <div 
        className={`
          fixed flex h-screen flex-col border-r border-slate-200 bg-white/90 p-3 shadow-[0_10px_40px_rgba(15,23,42,0.08)] backdrop-blur-xl md:p-5
          ${isMobile ? 
            `w-64 z-50 transform transition-transform duration-300 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}` : 
            'hidden md:flex w-64'}
        `}
      >
        {/* Logo Section */}
        <div className="mb-5 flex flex-col items-center md:mb-10">
          <div className="mb-2 rounded-2xl border border-slate-200 bg-white p-2 shadow-sm transition-transform hover:scale-105 md:mb-3 md:p-3">
            <Image 
              src="/assets/logo.png" 
              alt="logo" 
              width={isMobile ? 40 : 60} 
              height={isMobile ? 40 : 60} 
            />
          </div>
          <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-xl font-bold text-transparent md:text-2xl">
            FinTrack
          </span>
          <span className="mt-1 text-xs text-slate-400">Personal Finance</span>
        </div>

        {/* Menu Items */}
        <div className="mt-3 flex-1 space-y-1 md:mt-5 md:space-y-2">
          {menuList.map((menu) => (
            <Link href={menu.path} key={menu.id} onClick={closeMobileMenu}>
              <div className={`
                flex items-center gap-2 rounded-lg p-2 transition-all duration-200 md:gap-3 md:rounded-2xl md:p-3
                hover:bg-slate-100 hover:text-slate-950
                ${isActive(menu.path) 
                  ? "bg-slate-950 text-white shadow-lg shadow-slate-950/10 hover:bg-slate-950 hover:text-white" 
                  : "text-slate-600"}
              `}>
                <div className={`rounded-md p-1 md:rounded-xl md:p-2 ${isActive(menu.path) ? "bg-white/10" : "bg-slate-100"}`}>
                  <menu.icon className={isActive(menu.path) ? "text-white" : "text-slate-600"} size={18} />
                </div>
                <span className="text-sm font-medium md:text-base">{menu.name}</span>
                {isActive(menu.path) && (
                  <div className="ml-auto h-1.5 w-1.5 rounded-full bg-white md:h-2 md:w-2"></div>
                )}
              </div>
            </Link>
          ))}
        </div>

        {/* User Section */}
        <div className="mt-auto flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 p-2 md:rounded-2xl md:p-4">
          <div className="flex items-center gap-2 md:gap-3">
            <UserButton appearance={{
              elements: {
                avatarBox: "h-8 w-8 border-2 border-white md:h-10 md:w-10",
              }
            }} />
            <div>
              <p className="text-xs font-medium text-slate-700 md:text-sm">Your Account</p>
              <p className="text-[10px] text-slate-400 md:text-xs">Premium</p>
            </div>
          </div>
          <div className="rounded-md bg-blue-100 p-1 md:rounded-xl md:p-2">
            <ShieldCheck className="text-blue-600" size={14} />
          </div>
        </div>
      </div>

      {/* Add padding for mobile header */}
      {isMobile && <div className="h-16 md:h-0" />}
    </>
  );
}

export default SideNav;