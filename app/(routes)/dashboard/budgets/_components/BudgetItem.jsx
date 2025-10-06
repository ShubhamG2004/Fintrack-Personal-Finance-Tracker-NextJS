import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import { IndianRupee, TrendingUp, AlertTriangle } from "lucide-react";

function BudgetItem({ budget }) {
  const calculateProgressPerc = () => {
    const perc = (budget.totalSpend / budget.amount) * 100;
    return perc > 100 ? 100 : perc.toFixed(2);
  };

  const progressPercentage = calculateProgressPerc();
  const isOverBudget = progressPercentage >= 100;

  return (
    <Link href={"/dashboard/expenses/" + budget?.id}>
      <motion.div 
        className="p-6 bg-white/70 backdrop-blur-lg border border-white/20 rounded-2xl hover:shadow-2xl cursor-pointer h-[200px] transition-all duration-300 hover:border-indigo-200 shadow-lg group overflow-hidden relative"
        whileHover={{ 
          scale: 1.02, 
          boxShadow: "0 20px 40px rgba(99,102,241,0.15)",
          y: -4
        }}
        whileTap={{ scale: 0.98 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {/* Gradient overlay for visual appeal */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/20 via-white/10 to-purple-50/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Header Section */}
        <div className="flex justify-between items-start relative z-10">
          <div className="flex gap-3 items-center">
            <motion.div 
              className="text-2xl p-3 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center shadow-sm"
              whileHover={{ rotate: 10, scale: 1.1 }}
              transition={{ duration: 0.2 }}
            >
              {budget?.icon || '💰'}
            </motion.div>
            <div>
              <h2 className="font-bold text-gray-800 group-hover:text-indigo-700 transition-colors">{budget.name}</h2>
              <div className="flex items-center gap-1 mt-1">
                <TrendingUp className="w-3 h-3 text-gray-400" />
                <p className="text-xs text-gray-500">
                  {budget.totalItem || 0} {budget.totalItem === 1 ? 'Item' : 'Items'}
                </p>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center justify-end font-bold text-indigo-600 text-lg">
              <IndianRupee className="w-4 h-4 animate-pulse" />
              <motion.span
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {budget.amount.toLocaleString('en-IN')}
              </motion.span>
            </div>
            <p className="text-xs text-gray-400 mt-1">Total Budget</p>
          </div>
        </div>

        {/* Progress Section */}
        <div className="mt-6 relative z-10">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center text-xs bg-white/50 px-2 py-1 rounded-full">
              <span className="text-gray-600 font-medium">
                <IndianRupee className="inline w-3 h-3 mr-0.5" />
                {budget.totalSpend ? budget.totalSpend.toLocaleString('en-IN') : 0}
              </span>
              <span className="text-gray-400 mx-1">•</span>
              <span className="text-gray-500">Spent</span>
            </div>
            <div className="flex items-center text-xs bg-white/50 px-2 py-1 rounded-full">
              <span className="text-gray-500">Remaining</span>
              <span className="text-gray-400 mx-1">•</span>
              <span className={`font-medium ${isOverBudget ? 'text-red-500' : 'text-green-500'}`}>
                <IndianRupee className="inline w-3 h-3 mr-0.5" />
                {Math.max(0, budget.amount - (budget.totalSpend || 0)).toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 h-2.5 rounded-full overflow-hidden shadow-inner">
            <motion.div
              className={`h-full rounded-full transition-all duration-700 ${
                isOverBudget 
                  ? 'bg-gradient-to-r from-red-400 to-red-500' 
                  : 'bg-gradient-to-r from-indigo-400 to-purple-500'
              }`}
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            />
          </div>

          {/* Percentage Indicator */}
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center gap-1">
              {isOverBudget && <AlertTriangle className="w-3 h-3 text-red-500 animate-pulse" />}
              <span className={`text-xs font-medium ${
                isOverBudget ? 'text-red-500' : 'text-indigo-600'
              }`}>
                {progressPercentage}% {isOverBudget ? 'Over Budget' : 'Used'}
              </span>
            </div>
            <motion.div
              className={`text-xs px-2 py-1 rounded-full ${
                isOverBudget 
                  ? 'bg-red-50 text-red-600 border border-red-200'
                  : progressPercentage > 75
                  ? 'bg-yellow-50 text-yellow-600 border border-yellow-200'
                  : 'bg-green-50 text-green-600 border border-green-200'
              }`}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5 }}
            >
              {isOverBudget ? '⚠️ Over' : progressPercentage > 75 ? '⚡ High' : '✅ Good'}
            </motion.div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

export default BudgetItem;