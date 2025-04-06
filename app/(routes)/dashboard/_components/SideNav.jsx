'use client';

import React, { useEffect } from "react";
import Image from 'next/image';
import {
  LayoutGrid,
  PiggyBank,
  ReceiptText,
  ShieldCheck,
  IndianRupee,
} from 'lucide-react';
import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import Link from "next/link";

function SideNav() {
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

  useEffect(() => {
    console.log(path);
  }, [path]);

  return (
    <div className="h-screen p-5 border-r shadow-sm bg-gradient-to-b from-blue-50 to-white flex flex-col">
      {/* Logo Section */}
      <div className="flex flex-col items-center mb-10">
        <div className="p-3 bg-white rounded-xl shadow-md mb-3 transform hover:scale-105 transition-transform">
          <Image 
            src="/assets/logo.png" 
            alt="logo" 
            width={60} 
            height={60} 
          />
        </div>
        <span className="text-blue-600 font-bold text-2xl bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
          FinTrack
        </span>
        <span className="text-xs text-gray-400 mt-1">Personal Finance</span>
      </div>

      {/* Menu Items */}
      <div className="flex-1 space-y-2 mt-5">
        {menuList.map((menu) => (
          <Link href={menu.path} key={menu.id}>
            <div className={`
              flex items-center gap-3 p-3 rounded-xl transition-all duration-200
              hover:bg-blue-100 hover:text-blue-600 hover:shadow-md
              ${path === menu.path 
                ? "bg-blue-600 text-white shadow-md hover:bg-blue-700 hover:text-white" 
                : "text-gray-600"}
            `}>
              <div className={`p-2 rounded-lg ${path === menu.path ? "bg-blue-500" : "bg-blue-100"}`}>
                <menu.icon className={path === menu.path ? "text-white" : "text-blue-600"} size={20} />
              </div>
              <span className="font-medium">{menu.name}</span>
              {path === menu.path && (
                <div className="ml-auto w-2 h-2 bg-white rounded-full"></div>
              )}
            </div>
          </Link>
        ))}
      </div>

      {/* User Section */}
      <div className="mt-auto p-4 flex items-center justify-between bg-white rounded-xl shadow-sm">
        <div className="flex items-center gap-3">
          <UserButton appearance={{
            elements: {
              avatarBox: "h-10 w-10 border-2 border-blue-200",
            }
          }} />
          <div>
            <p className="text-sm font-medium text-gray-700">Your Account</p>
            <p className="text-xs text-gray-400">Premium</p>
          </div>
        </div>
        <div className="p-2 bg-blue-100 rounded-lg">
          <ShieldCheck className="text-blue-600" size={16} />
        </div>
      </div>
    </div>
  );
}

export default SideNav;