'use client'

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { useUser, UserButton } from "@clerk/nextjs";

function Header() {
    const { user, isSignedIn } = useUser();

    return (
        <header className='sticky top-0 z-50 bg-white/80 backdrop-blur-md p-4 border-b shadow-sm'>
            <div className='max-w-7xl mx-auto flex justify-between items-center'>
                <Link href="/" className='flex items-center gap-2 group'>
                    <div className='transition-transform duration-300 group-hover:scale-110'>
                        <Image 
                            src="/assets/logo.png" 
                            alt="FinTrack Logo" 
                            width={50} 
                            height={50}
                            className='drop-shadow-md'
                        />  
                    </div>
                    <span className='text-blue-600 font-bold text-2xl tracking-tight'>
                        <span className='text-blue-600 font-extrabold'>FinTrack</span>
                    </span>
                </Link>

                {isSignedIn ? (
                    <div className='flex items-center gap-3'>
                        <Link href="/dashboard">
                            <Button 
                                variant="ghost"
                                className="
                                px-5 py-2 bg-blue-600 text-white 
                                hover:bg-white hover:text-blue-600 
                                hover:border-blue-600 border-2 border-transparent
                                focus:outline-none focus:ring-2 focus:ring-blue-300 
                                transition-all duration-200 font-medium tracking-wide 
                                uppercase shadow-sm hover:shadow-md focus:shadow-lg rounded-full
                                "
                            >
                                Dashboard
                            </Button>
                        </Link>
                        <UserButton 
                            afterSignOutUrl="/"
                            appearance={{
                                elements: {
                                    avatarBox: "w-10 h-10 border-2 border-blue-100 shadow-sm",
                                    userButtonPopoverCard: "shadow-xl rounded-xl border border-gray-100",
                                    userButtonTrigger: "focus:shadow-md focus:ring-2 focus:ring-blue-200"
                                }
                            }}
                        />
                    </div>
                ) : (
                    <div className='flex gap-3 items-center'>
                        <Link href='/sign-in'>
                            <Button 
                                variant="outline" 
                                className="
                                    rounded-full border-blue-300 text-blue-600 
                                    hover:text-blue-700 hover:border-blue-400 
                                    px-5 py-2 border-2 transition-all
                                    hover:shadow-sm focus:ring-2 focus:ring-blue-200
                                    focus:border-blue-400
                                "
                            >
                                Sign In
                            </Button>
                        </Link>
                        <Link href='/sign-up'>
                            <Button className="
                                rounded-full bg-gradient-to-r from-blue-600 to-blue-500 
                                hover:from-blue-700 hover:to-blue-600 text-white 
                                shadow-md hover:shadow-lg transition-all
                                px-6 py-2 border-2 border-blue-500/10
                                focus:ring-2 focus:ring-blue-300 focus:ring-offset-2
                            ">
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