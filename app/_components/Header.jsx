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
                    <div className='flex items-center gap-4'>
                        <Link href='/dashboard'>
                            <Button variant="ghost" className='text-blue-600 hover:bg-blue-50'>
                                Dashboard
                            </Button>
                        </Link>
                        <UserButton 
                            afterSignOutUrl="/"
                            appearance={{
                                elements: {
                                    avatarBox: "w-10 h-10 border-2 border-blue-100",
                                }
                            }}
                        />
                    </div>
                ) : (
                    <div className='flex gap-3 items-center'>
                        <Link href='/sign-in'>
                            <Button variant="outline" className="rounded-full border-blue-300 text-blue-600 hover:text-blue-700 hover:border-blue-400 transition-colors">
                                Sign In
                            </Button>
                        </Link>
                        <Link href='/sign-up'>
                            <Button className="rounded-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white shadow-md hover:shadow-lg transition-all">
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