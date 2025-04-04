'use client'; 


import React, {useEffect} from "react";
import Image from 'next/image'
import {
    LayoutGrid,
    PiggyBank,
    ReceiptText,
    ShieldCheck,
    CircleDollarSign,
} from 'lucide-react'
import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import Link from "next/link";

function SideNav(){
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
            icon: CircleDollarSign, 
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

    return(
        <div className="h-screen p-5 border shadow-sm">
            <div className="flex flex-col items-center mb-5">
                <Image 
                    src="/assets/logo.png" 
                    alt="logo" 
                    width={100} 
                    height={100} 
                    className="mb-5" 
                />
                <span className="text-blue-800 font-bold text-xl">FinTrack</span>
            </div>
            <div className="mt-5">
                {menuList.map((menu, index) => (
                    <Link href={menu.path} key={menu.id}>
                        <div className={`flex gap-2 items-center text-gray-500 mb-2 p-4 cursor-pointer rounded-full hover:text-primary hover:bg-blue-100 ${path === menu.path ? "bg-blue-100 text-primary" : ""}`}>
                            <menu.icon />
                            {menu.name}
                        </div>
                    </Link>
                ))}
            </div>
            <div className="fixed bottom-5 p-4">
                <UserButton />
            </div>
        </div>
    )
}

export default SideNav;