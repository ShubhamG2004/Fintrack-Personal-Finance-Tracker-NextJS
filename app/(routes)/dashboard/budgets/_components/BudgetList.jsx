"use client"
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import CreateBudget from './CreateBudget'
import { db } from '@/utils/dbConfig'
import { desc, eq, getTableColumns, sql } from 'drizzle-orm'
import { Budgets, Expenses } from '@/utils/schema'
import { useUser } from '@clerk/nextjs'
import BudgetItem from './BudgetItem'
import { IndianRupee, Sparkles } from 'lucide-react'

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <motion.div 
      className='mt-8'
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div className='flex items-center justify-between mb-6' variants={itemVariants}>
        <div className='flex items-center gap-3'>
          <Sparkles className='w-6 h-6 text-indigo-500 animate-pulse' />
          <h2 className='text-2xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent'>Your Budgets</h2>
        </div>
        <motion.div 
          className='flex items-center text-sm bg-gradient-to-r from-blue-50 to-indigo-50 px-4 py-2 rounded-full border border-blue-100 shadow-sm'
          whileHover={{ scale: 1.05, boxShadow: "0 4px 16px rgba(59,130,246,0.15)" }}
        >
          <IndianRupee className='w-4 h-4 mr-1 text-blue-600 animate-bounce' />
          <span className='text-blue-600 font-medium'>All amounts in INR</span>
        </motion.div>
      </motion.div>

      <motion.div 
        className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
        variants={containerVariants}
      >
        <motion.div variants={itemVariants}>
          <CreateBudget refreshData={() => getBudgetList()} />
        </motion.div>
        
        {budgetList?.length > 0 ? 
          budgetList.map((budget, index) => (
            <motion.div key={index} variants={itemVariants}>
              <BudgetItem budget={budget} />
            </motion.div>
          ))
          :
          Array.from({ length: 5 }).map((_, index) => (
            <motion.div 
              key={index} 
              variants={itemVariants}
              className='w-full bg-gradient-to-br from-white/60 via-indigo-50/30 to-purple-50/30 backdrop-blur-lg rounded-2xl h-[200px] animate-pulse overflow-hidden border border-white/20 shadow-lg'
            >
              <div className='h-full w-full flex flex-col p-6'>
                <div className='w-12 h-12 rounded-full bg-gradient-to-r from-indigo-200 to-purple-200 mb-4 animate-pulse'></div>
                <div className='w-3/4 h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg mb-3 animate-pulse'></div>
                <div className='w-1/2 h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded mb-6 animate-pulse'></div>
                <div className='w-full h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded mb-2 animate-pulse'></div>
                <div className='w-2/3 h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse'></div>
              </div>
            </motion.div>
          ))
        }
      </motion.div>

      {budgetList?.length > 0 && (
        <motion.div 
          className='mt-8 text-center'
          variants={itemVariants}
        >
          <div className='inline-flex items-center gap-2 bg-white/70 backdrop-blur-lg px-4 py-2 rounded-full border border-white/20 shadow-sm'>
            <Sparkles className='w-4 h-4 text-indigo-500' />
            <span className='text-sm text-gray-600 font-medium'>
              Showing {budgetList.length} budget{budgetList.length !== 1 ? 's' : ''}
            </span>
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}

export default BudgetList