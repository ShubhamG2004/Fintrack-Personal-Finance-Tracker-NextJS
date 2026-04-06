'use client'

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { useUser, UserButton } from "@clerk/nextjs";

function Header() {
    const { isSignedIn } = useUser();

    return (
        <header className='sticky top-0 z-50 border-b border-slate-200/80 bg-white/75 shadow-[0_1px_0_rgba(15,23,42,0.02)] backdrop-blur-xl'>
            <div className='mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8'>
                <Link href="/" className='group flex items-center gap-3'>
                    <div className='rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 p-1.5 shadow-lg shadow-blue-600/20 transition-transform duration-300 group-hover:scale-105'>
                        <Image 
                            src="/assets/logo.png" 
                            alt="FinTrack Logo" 
                            width={34} 
                            height={34}
                            className='rounded-xl bg-white/90 p-1'
                        />  
                    </div>
                    <div>
                        <span className='block text-xs font-semibold uppercase tracking-[0.3em] text-slate-500'>FinTrack</span>
                        <span className='block text-lg font-semibold tracking-tight text-slate-900'>AI finance OS</span>
                    </div>
                </Link>

                {isSignedIn ? (
                    <div className='flex items-center gap-3'>
                        <Link href="/dashboard">
                            <Button 
                                variant="ghost"
                                className="rounded-full border border-slate-200 bg-slate-900 px-5 py-2 text-white shadow-sm transition-all duration-200 hover:bg-slate-800 hover:text-white"
                            >
                                Dashboard
                            </Button>
                        </Link>
                        <UserButton 
                            afterSignOutUrl="/"
                            appearance={{
                                elements: {
                                    avatarBox: "h-10 w-10 border-2 border-white shadow-sm",
                                    userButtonPopoverCard: "rounded-2xl border border-slate-200 shadow-2xl",
                                    userButtonTrigger: "focus:shadow-md focus:ring-2 focus:ring-blue-200"
                                }
                            }}
                        />
                    </div>
                ) : (
                    <div className='flex items-center gap-3'>
                        <Link href='/sign-in'>
                            <Button 
                                variant="outline" 
                                className="rounded-full border-slate-300 bg-white px-5 py-2 text-slate-700 transition-all hover:border-slate-400 hover:bg-slate-50"
                            >
                                Sign In
                            </Button>
                        </Link>
                        <Link href='/sign-up'>
                            <Button className="rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-2 text-white shadow-lg shadow-blue-600/20 transition-all hover:from-blue-700 hover:to-cyan-600">
                                Get Started
                            </Button>
                        </Link>
                    </div>
                )}
            </div>
        </header>
    )
}

export default Header;