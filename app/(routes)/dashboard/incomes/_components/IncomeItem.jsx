import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import { IndianRupee, TrendingUp, Star, ArrowUpRight } from "lucide-react";

function IncomeItem({ budget }) {
  return (
    <motion.div 
      className="p-6 bg-white/70 backdrop-blur-lg border border-white/20 rounded-2xl hover:shadow-2xl cursor-pointer transition-all duration-300 hover:border-green-200 group overflow-hidden relative h-[200px]"
      whileHover={{ 
        scale: 1.02, 
        boxShadow: "0 20px 40px rgba(34,197,94,0.15)",
        y: -4
      }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* Gradient overlay for visual appeal */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-50/20 via-white/10 to-emerald-50/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Header Section */}
      <div className="flex justify-between items-start relative z-10">
        <div className="flex gap-3 items-center">
          <motion.div 
            className="text-2xl p-3 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center shadow-sm"
            whileHover={{ rotate: 10, scale: 1.1 }}
            transition={{ duration: 0.2 }}
          >
            {budget?.icon || '💰'}
          </motion.div>
          <div>
            <h2 className="font-bold text-gray-800 group-hover:text-green-700 transition-colors">{budget.name}</h2>
            <div className="flex items-center gap-1 mt-1">
              <Star className="w-3 h-3 text-gray-400" />
              <p className="text-xs text-gray-500">
                {budget.totalItem || 0} {budget.totalItem === 1 ? 'Source' : 'Sources'}
              </p>
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="flex items-center justify-end font-bold text-green-600 text-lg">
            <IndianRupee className="w-4 h-4 animate-pulse" />
            <motion.span
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {budget.amount?.toLocaleString('en-IN')}
            </motion.span>
          </div>
          <p className="text-xs text-gray-400 mt-1">Monthly Income</p>
        </div>
      </div>

      {/* Progress Section - Enhanced */}
      <div className="mt-6 relative z-10">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center text-xs bg-white/50 px-2 py-1 rounded-full">
            <span className="text-green-600 font-medium">Active</span>
          </div>
          <div className="flex items-center text-xs bg-white/50 px-2 py-1 rounded-full">
            <span className="text-gray-600 font-medium">Recurring</span>
          </div>
        </div>

        {/* Progress Bar - Visual indicator */}
        <div className="w-full bg-gray-200 h-2.5 rounded-full overflow-hidden shadow-inner">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-green-400 to-emerald-500"
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          />
        </div>

        {/* Status Indicator */}
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-1 text-sm text-green-600">
            <TrendingUp className="w-4 h-4 animate-bounce" />
            <span className="font-medium">Regular Income</span>
          </div>
          <motion.div
            className="text-xs px-2 py-1 rounded-full bg-green-50 text-green-600 border border-green-200 flex items-center gap-1"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5 }}
          >
            <ArrowUpRight className="w-3 h-3" />
            <span>Stable</span>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export default IncomeItem;