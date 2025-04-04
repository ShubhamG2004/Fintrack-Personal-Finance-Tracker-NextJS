'use client'

import React, { useEffect } from 'react'
import DashboardHeader from './_components/DashboardHeader'
import { db } from '../../../../utils/dbConfig'
import { Budgets } from '../../../../utils/schema'
import { useUser } from '@clerk/nextjs'
import { eq } from 'drizzle-orm'
import { useRouter } from 'next/navigation'
import SideNav from './_components/SideNav'

function DashboardLayout({ children }) {
    const { isLoaded, user } = useUser()
    const router = useRouter()

    useEffect(() => {
        if (isLoaded && user) {
            checkUserBudgets()
        }
    }, [isLoaded, user])

    const checkUserBudgets = async () => {
        try {
            const result = await db.select()
                .from(Budgets)
                .where(eq(Budgets.createdBy, user.primaryEmailAddress?.emailAddress))
            
            if (result?.length === 0) {
                router.replace('/dashboard/budgets')
            }
        } catch (error) {
            console.error('Error checking budgets:', error)
        }
    }

    if (!isLoaded) {
        return <div>Loading...</div> 
    }

    return (
        <div className="flex flex-row h-screen bg-gray-100">
            <div className='fixed md:w-64 hidden md:block'>
                <SideNav />
            </div>
            <div className='w-full md:ml-64'>
                <DashboardHeader />
                <div className='p-5'>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default DashboardLayout