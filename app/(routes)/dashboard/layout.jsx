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
            <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-slate-50">
                <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
                <p className="text-sm text-slate-600">Loading your dashboard...</p>
            </div>
        )
    }

    return (
        <div className="flex min-h-screen flex-row bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.08),transparent_24%),linear-gradient(to_bottom,#f8fafc,#ffffff)]">
            <SideNav />
            
            <div className="flex flex-1 flex-col md:ml-64">
                <DashboardHeader />
                <main className="flex-1 overflow-y-auto p-4 md:p-6">
                    {children}
                </main>
            </div>
        </div>
    )
}

export default DashboardLayout