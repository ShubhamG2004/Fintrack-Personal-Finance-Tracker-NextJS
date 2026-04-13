import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import { IndianRupee, AlertTriangle } from "lucide-react";

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
        className="group h-[200px] cursor-pointer rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-200 hover:border-slate-300 hover:shadow-md"
        whileHover={{ scale: 1.01, y: -2 }}
        whileTap={{ scale: 0.98 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      >
        <div className="flex items-start justify-between">
          <div className="flex gap-3 items-center">
            <div className="flex items-center justify-center rounded-full border border-slate-200 bg-slate-50 p-3 text-2xl">
              {budget?.icon || '💰'}
            </div>
            <div>
              <h2 className="font-semibold text-slate-800">{budget.name}</h2>
              <div className="mt-1 flex items-center gap-1">
                <p className="text-xs text-slate-500">
                  {budget.totalItem || 0} {budget.totalItem === 1 ? 'Item' : 'Items'}
                </p>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center justify-end text-lg font-semibold text-slate-800">
              <IndianRupee className="w-4 h-4" />
              <span>
                {budget.amount.toLocaleString('en-IN')}
              </span>
            </div>
            <p className="mt-1 text-xs text-slate-400">Total Budget</p>
          </div>
        </div>

        <div className="mt-6">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center rounded-full bg-slate-100 px-2 py-1 text-xs">
              <span className="font-medium text-slate-600">
                <IndianRupee className="inline w-3 h-3 mr-0.5" />
                {budget.totalSpend ? budget.totalSpend.toLocaleString('en-IN') : 0}
              </span>
              <span className="mx-1 text-slate-400">•</span>
              <span className="text-slate-500">Spent</span>
            </div>
            <div className="flex items-center rounded-full bg-slate-100 px-2 py-1 text-xs">
              <span className="text-slate-500">Remaining</span>
              <span className="mx-1 text-slate-400">•</span>
              <span className={`font-medium ${isOverBudget ? 'text-red-500' : 'text-green-500'}`}>
                <IndianRupee className="inline w-3 h-3 mr-0.5" />
                {Math.max(0, budget.amount - (budget.totalSpend || 0)).toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-200">
            <motion.div
              className={`h-full rounded-full transition-all duration-700 ${
                isOverBudget 
                  ? 'bg-red-500' 
                  : 'bg-slate-800'
              }`}
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 0.9, delay: 0.15, ease: "easeOut" }}
            />
          </div>

          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center gap-1">
              {isOverBudget && <AlertTriangle className="w-3 h-3 text-red-500" />}
              <span className={`text-xs font-medium ${
                isOverBudget ? 'text-red-500' : 'text-slate-700'
              }`}>
                {progressPercentage}% {isOverBudget ? 'Over Budget' : 'Used'}
              </span>
            </div>
            <div
              className={`text-xs px-2 py-1 rounded-full ${
                isOverBudget 
                  ? 'bg-red-50 text-red-600 border border-red-200'
                  : progressPercentage > 75
                  ? 'bg-yellow-50 text-yellow-600 border border-yellow-200'
                  : 'bg-green-50 text-green-600 border border-green-200'
              }`}
            >
              {isOverBudget ? '⚠️ Over' : progressPercentage > 75 ? '⚡ High' : '✅ Good'}
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

export default BudgetItem;