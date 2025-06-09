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
          className="md:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
          onClick={closeMobileMenu}
        />
      )}

      {/* Sidebar - Desktop */}
      <div 
        className={`
          fixed h-screen p-3 md:p-5 border-r shadow-sm bg-gradient-to-b from-blue-50 to-white flex-col
          ${isMobile ? 
            `w-64 z-50 transform transition-transform duration-300 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}` : 
            'hidden md:flex w-64'}
        `}
      >
        {/* Logo Section */}
        <div className="flex flex-col items-center mb-5 md:mb-10">
          <div className="p-2 md:p-3 bg-white rounded-xl shadow-md mb-2 md:mb-3 transform hover:scale-105 transition-transform">
            <Image 
              src="/assets/logo.png" 
              alt="logo" 
              width={isMobile ? 40 : 60} 
              height={isMobile ? 40 : 60} 
            />
          </div>
          <span className="text-blue-600 font-bold text-xl md:text-2xl bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
            FinTrack
          </span>
          <span className="text-xs text-gray-400 mt-1">Personal Finance</span>
        </div>

        {/* Menu Items */}
        <div className="flex-1 space-y-1 md:space-y-2 mt-3 md:mt-5">
          {menuList.map((menu) => (
            <Link href={menu.path} key={menu.id} onClick={closeMobileMenu}>
              <div className={`
                flex items-center gap-2 md:gap-3 p-2 md:p-3 rounded-lg md:rounded-xl transition-all duration-200
                hover:bg-blue-100 hover:text-blue-600 hover:shadow-md
                ${path === menu.path 
                  ? "bg-blue-600 text-white shadow-md hover:bg-blue-700 hover:text-white" 
                  : "text-gray-600"}
              `}>
                <div className={`p-1 md:p-2 rounded-md md:rounded-lg ${path === menu.path ? "bg-blue-500" : "bg-blue-100"}`}>
                  <menu.icon className={path === menu.path ? "text-white" : "text-blue-600"} size={18} />
                </div>
                <span className="font-medium text-sm md:text-base">{menu.name}</span>
                {path === menu.path && (
                  <div className="ml-auto w-1.5 h-1.5 md:w-2 md:h-2 bg-white rounded-full"></div>
                )}
              </div>
            </Link>
          ))}
        </div>

        {/* User Section */}
        <div className="mt-auto p-2 md:p-4 flex items-center justify-between bg-white rounded-lg md:rounded-xl shadow-sm">
          <div className="flex items-center gap-2 md:gap-3">
            <UserButton appearance={{
              elements: {
                avatarBox: "h-8 w-8 md:h-10 md:w-10 border-2 border-blue-200",
              }
            }} />
            <div>
              <p className="text-xs md:text-sm font-medium text-gray-700">Your Account</p>
              <p className="text-[10px] md:text-xs text-gray-400">Premium</p>
            </div>
          </div>
          <div className="p-1 md:p-2 bg-blue-100 rounded-md md:rounded-lg">
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