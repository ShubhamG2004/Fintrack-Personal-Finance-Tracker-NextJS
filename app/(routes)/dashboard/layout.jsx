'use client'

import React, { useEffect, useState } from 'react'
import DashboardHeader from './_components/DashboardHeader'
import { db } from "@/utils/dbConfig"
import { Budgets } from "@/utils/schema"
import { useUser } from '@clerk/nextjs'
import { eq } from 'drizzle-orm'
import { useRouter } from 'next/navigation'
import SideNav from './_components/SideNav'
import { Loader2 } from 'lucide-react'

function DashboardLayout({ children }) {
    const { isLoaded, user } = useUser()
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (isLoaded && user) {
            checkUserBudgets()
        } else {
            setIsLoading(false)
        }
    }, [isLoaded, user])

    const checkUserBudgets = async () => {
        try {
            setIsLoading(true)
            const result = await db.select()
                .from(Budgets)
                .where(eq(Budgets.createdBy, user.primaryEmailAddress?.emailAddress))
            
            if (result?.length === 0) {
                router.replace('/dashboard/budgets')
            }
        } catch (error) {
            console.error('Error checking budgets:', error)
        } finally {
            setIsLoading(false)
        }
    }

    if (!isLoaded || isLoading) {
        return (
            <div className="flex flex-col items-center justify-center h-screen gap-4">
                <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
                <p className="text-gray-600">Loading your dashboard...</p>
            </div>
        )
    }

    return (
        <div className="flex flex-row min-h-screen bg-gray-50">
            <SideNav />
            
            <div className="flex-1 flex flex-col md:ml-64">
                <DashboardHeader />
                <main className="flex-1 p-4 md:p-6 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    )
}

export default DashboardLayout