"use client"
import React, { useEffect, useState } from 'react'
import CreateBudget from './CreateBudget'
import { db } from '@/utils/dbConfig'
import { desc, eq, getTableColumns, sql } from 'drizzle-orm'
import { Budgets, Expenses } from '@/utils/schema'
import { useUser } from '@clerk/nextjs'
import BudgetItem from './BudgetItem'
import { IndianRupee } from 'lucide-react'

function BudgetList() {
  const [budgetList, setBudgetList] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    user && getBudgetList();
  }, [user])

  const getBudgetList = async () => {
    const result = await db.select({
      ...getTableColumns(Budgets),
      totalSpend: sql`sum(${Expenses.amount})`.mapWith(Number),
      totalItem: sql`count(${Expenses.id})`.mapWith(Number)
    }).from(Budgets)
      .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
      .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
      .groupBy(Budgets.id)
      .orderBy(desc(Budgets.id));

    setBudgetList(result);
  }

  return (
    <div className='mt-8'>
      <div className='flex items-center justify-between mb-6'>
        <h2 className='text-2xl font-bold text-gray-800'>Your Budgets</h2>
        <div className='flex items-center text-sm bg-blue-50 px-3 py-1 rounded-full'>
          <IndianRupee className='w-4 h-4 mr-1 text-blue-600' />
          <span className='text-blue-600'>All amounts in INR</span>
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        <CreateBudget refreshData={() => getBudgetList()} />
        
        {budgetList?.length > 0 ? 
          budgetList.map((budget, index) => (
            <BudgetItem budget={budget} key={index} />
          ))
          :
          Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className='w-full bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl h-[180px] animate-pulse overflow-hidden'>
              <div className='h-full w-full flex flex-col p-5'>
                <div className='w-10 h-10 rounded-full bg-gray-200 mb-3'></div>
                <div className='w-3/4 h-5 bg-gray-200 rounded mb-2'></div>
                <div className='w-1/2 h-4 bg-gray-200 rounded mb-4'></div>
                <div className='w-full h-3 bg-gray-200 rounded mb-1'></div>
                <div className='w-2/3 h-3 bg-gray-200 rounded'></div>
              </div>
            </div>
          ))
        }
      </div>

      {budgetList?.length > 0 && (
        <div className='mt-6 text-center text-sm text-gray-500'>
          Showing {budgetList.length} budget{budgetList.length !== 1 ? 's' : ''}
        </div>
      )}
    </div>
  )
}

export default BudgetList