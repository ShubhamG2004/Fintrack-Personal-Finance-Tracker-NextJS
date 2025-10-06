'use client'
import React from "react";
import { motion } from 'framer-motion';
import IncomeList from "./_components/IncomeList";
import { TrendingUp, Wallet, DollarSign, BarChart3, Target, PieChart } from 'lucide-react';

function Income() {
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <div className='p-6 md:p-10 bg-gradient-to-br from-white via-green-50/30 to-emerald-50/30 min-h-screen'>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        className='mb-8'
      >
        <div className='flex items-center gap-3 mb-4'>
          <div className='p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl shadow-lg'>
            <TrendingUp className='w-8 h-8 text-white' />
          </div>
          <div>
            <h1 className='font-extrabold text-4xl bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent'>
              My Income Streams
            </h1>
            <p className='text-gray-600 mt-1'>Track and manage your revenue sources</p>
          </div>
        </div>
        
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-6'>
          <motion.div 
            className='bg-white/70 backdrop-blur-lg p-4 rounded-xl border border-white/20 shadow-lg'
            whileHover={{ scale: 1.02, boxShadow: "0 8px 32px rgba(34,197,94,0.15)" }}
          >
            <div className='flex items-center gap-3'>
              <Wallet className='w-6 h-6 text-green-500' />
              <div>
                <p className='text-sm text-gray-600'>Revenue Tracking</p>
                <p className='font-bold text-lg text-gray-800'>Monitor Growth</p>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className='bg-white/70 backdrop-blur-lg p-4 rounded-xl border border-white/20 shadow-lg'
            whileHover={{ scale: 1.02, boxShadow: "0 8px 32px rgba(16,185,129,0.15)" }}
          >
            <div className='flex items-center gap-3'>
              <BarChart3 className='w-6 h-6 text-emerald-500' />
              <div>
                <p className='text-sm text-gray-600'>Analytics</p>
                <p className='font-bold text-lg text-gray-800'>Income Insights</p>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className='bg-white/70 backdrop-blur-lg p-4 rounded-xl border border-white/20 shadow-lg'
            whileHover={{ scale: 1.02, boxShadow: "0 8px 32px rgba(5,150,105,0.15)" }}
          >
            <div className='flex items-center gap-3'>
              <Target className='w-6 h-6 text-green-600' />
              <div>
                <p className='text-sm text-gray-600'>Goals</p>
                <p className='font-bold text-lg text-gray-800'>Set Targets</p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
      
      <IncomeList />
    </div>
  );
}

export default Income;