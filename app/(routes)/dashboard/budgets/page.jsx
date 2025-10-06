'use client'
import React from 'react'
import { motion } from 'framer-motion'
import BudgetList from './_components/BudgetList'
import { Wallet, TrendingUp, Target, PlusCircle } from 'lucide-react'

function Budget() {
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <div className='p-6 md:p-10 bg-gradient-to-br from-white via-indigo-50/30 to-purple-50/30 min-h-screen'>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        className='mb-8'
      >
        <div className='flex items-center gap-3 mb-4'>
          <div className='p-3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl shadow-lg'>
            <Wallet className='w-8 h-8 text-white' />
          </div>
          <div>
            <h1 className='font-extrabold text-4xl bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent'>
              My Budgets
            </h1>
            <p className='text-gray-600 mt-1'>Track and manage your spending goals</p>
          </div>
        </div>
        
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-6'>
          <motion.div 
            className='bg-white/70 backdrop-blur-lg p-4 rounded-xl border border-white/20 shadow-lg'
            whileHover={{ scale: 1.02, boxShadow: "0 8px 32px rgba(99,102,241,0.15)" }}
          >
            <div className='flex items-center gap-3'>
              <Target className='w-6 h-6 text-indigo-500' />
              <div>
                <p className='text-sm text-gray-600'>Active Goals</p>
                <p className='font-bold text-lg text-gray-800'>Track Progress</p>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className='bg-white/70 backdrop-blur-lg p-4 rounded-xl border border-white/20 shadow-lg'
            whileHover={{ scale: 1.02, boxShadow: "0 8px 32px rgba(139,92,246,0.15)" }}
          >
            <div className='flex items-center gap-3'>
              <TrendingUp className='w-6 h-6 text-purple-500' />
              <div>
                <p className='text-sm text-gray-600'>Smart Insights</p>
                <p className='font-bold text-lg text-gray-800'>Optimize Spending</p>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className='bg-white/70 backdrop-blur-lg p-4 rounded-xl border border-white/20 shadow-lg'
            whileHover={{ scale: 1.02, boxShadow: "0 8px 32px rgba(34,197,94,0.15)" }}
          >
            <div className='flex items-center gap-3'>
              <PlusCircle className='w-6 h-6 text-green-500' />
              <div>
                <p className='text-sm text-gray-600'>Quick Actions</p>
                <p className='font-bold text-lg text-gray-800'>Create & Manage</p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
      
      <BudgetList/>
    </div>
  )
}

export default Budget