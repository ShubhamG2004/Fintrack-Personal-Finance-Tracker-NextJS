"use client"
import { motion } from 'framer-motion';
import { db } from '@/utils/dbConfig';
import { Budgets, Expenses } from '@/utils/schema';
import { desc, eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react'
import ExpenseListTable from './_components/ExpenseListTable';
import { useUser } from '@clerk/nextjs';
import { Receipt, TrendingDown, Calendar, IndianRupee, BarChart3, Filter } from 'lucide-react';

function ExpensesScreen() {
  const [expensesList, setExpensesList] = useState([]);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [loading, setLoading] = useState(true);
  const { user } = useUser();

  useEffect(() => {
    user && getAllExpenses();
  }, [user])

  /**
   * Used to get All expenses belong to users
   */
  const getAllExpenses = async () => {
    setLoading(true);
    const result = await db.select({
      id: Expenses.id,
      name: Expenses.name,
      amount: Expenses.amount,
      createdAt: Expenses.createdAt
    }).from(Budgets)
      .rightJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
      .where(eq(Budgets.createdBy, user?.primaryEmailAddress.emailAddress))
      .orderBy(desc(Expenses.id));
    
    setExpensesList(result);
    
    // Calculate total expenses
    const total = result.reduce((sum, expense) => sum + parseFloat(expense.amount || 0), 0);
    setTotalExpenses(total);
    setLoading(false);
  }

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <div className='p-6 md:p-10 bg-gradient-to-br from-white via-red-50/30 to-orange-50/30 min-h-screen'>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        className='mb-8'
      >
        <div className='flex items-center gap-3 mb-4'>
          <div className='p-3 bg-gradient-to-r from-red-500 to-orange-500 rounded-xl shadow-lg'>
            <Receipt className='w-8 h-8 text-white' />
          </div>
          <div>
            <h1 className='font-extrabold text-4xl bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent'>
              My Expenses
            </h1>
            <p className='text-gray-600 mt-1'>Track and analyze your spending patterns</p>
          </div>
        </div>
        
        {/* Stats Cards */}
        <div className='grid grid-cols-1 md:grid-cols-4 gap-4 mb-6'>
          <motion.div 
            className='bg-white/70 backdrop-blur-lg p-4 rounded-xl border border-white/20 shadow-lg'
            whileHover={{ scale: 1.02, boxShadow: "0 8px 32px rgba(239,68,68,0.15)" }}
          >
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm text-gray-600'>Total Expenses</p>
                <div className='flex items-center gap-1'>
                  <IndianRupee className='w-5 h-5 text-red-500' />
                  <p className='font-bold text-xl text-gray-800'>
                    {loading ? '...' : totalExpenses.toLocaleString('en-IN')}
                  </p>
                </div>
              </div>
              <TrendingDown className='w-8 h-8 text-red-500' />
            </div>
          </motion.div>
          
          <motion.div 
            className='bg-white/70 backdrop-blur-lg p-4 rounded-xl border border-white/20 shadow-lg'
            whileHover={{ scale: 1.02, boxShadow: "0 8px 32px rgba(59,130,246,0.15)" }}
          >
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm text-gray-600'>Total Transactions</p>
                <p className='font-bold text-xl text-gray-800'>
                  {loading ? '...' : expensesList.length}
                </p>
              </div>
              <BarChart3 className='w-8 h-8 text-blue-500' />
            </div>
          </motion.div>
          
          <motion.div 
            className='bg-white/70 backdrop-blur-lg p-4 rounded-xl border border-white/20 shadow-lg'
            whileHover={{ scale: 1.02, boxShadow: "0 8px 32px rgba(139,92,246,0.15)" }}
          >
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm text-gray-600'>This Month</p>
                <p className='font-bold text-xl text-gray-800'>Active</p>
              </div>
              <Calendar className='w-8 h-8 text-purple-500' />
            </div>
          </motion.div>
          
          <motion.div 
            className='bg-white/70 backdrop-blur-lg p-4 rounded-xl border border-white/20 shadow-lg'
            whileHover={{ scale: 1.02, boxShadow: "0 8px 32px rgba(34,197,94,0.15)" }}
          >
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm text-gray-600'>Filters</p>
                <p className='font-bold text-xl text-gray-800'>Available</p>
              </div>
              <Filter className='w-8 h-8 text-green-500' />
            </div>
          </motion.div>
        </div>
      </motion.div>
      
      <ExpenseListTable 
        refreshData={() => getAllExpenses()}
        expensesList={expensesList}
        loading={loading}
      />
    </div>
  )
}

export default ExpensesScreen