'use client'

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { useUser, UserButton } from "@clerk/nextjs";

function Header() {
    const { user, isSignedIn } = useUser();

    return (
        <div className='p-5 flex justify-between items-center border shadow-sm'>
            <div className='flex flex-row items-center gap-2'>
                <Image 
                    src="/assets/logo.png" 
                    alt="logo" 
                    width={50} 
                    height={50}
                />  
                <span className='text-blue-500 font-bold text-xl'>FinTrack</span>
            </div>
            {isSignedIn ? (
                <UserButton afterSignOutUrl="/"/>
            ) : (
                <div className='flex gap-3 items-center'>
                    <Link href='/dashboard'>
                        <Button variant="outline" className="rounded-full">
                            Dashboard
                        </Button>
                    </Link>
                    <Link href='/sign-up'>
                        <Button className="rounded-full">
                            Get Started
                        </Button>
                    </Link>
                </div>
            )}
        </div>
    )
}

export default Header;