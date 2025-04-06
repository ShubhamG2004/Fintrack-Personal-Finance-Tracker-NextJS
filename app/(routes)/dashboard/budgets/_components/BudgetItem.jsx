import Link from "next/link";
import React from "react";
import { IndianRupee } from "lucide-react";

function BudgetItem({ budget }) {
  const calculateProgressPerc = () => {
    const perc = (budget.totalSpend / budget.amount) * 100;
    return perc > 100 ? 100 : perc.toFixed(2);
  };

  const progressPercentage = calculateProgressPerc();
  const isOverBudget = progressPercentage >= 100;

  return (
    <Link href={"/dashboard/expenses/" + budget?.id}>
      <div className="p-5 border border-gray-200 rounded-xl hover:shadow-md cursor-pointer h-[180px] transition-all duration-300 hover:border-indigo-100 bg-white">
        {/* Header Section */}
        <div className="flex justify-between items-start">
          <div className="flex gap-3 items-center">
            <div className="text-2xl p-3 bg-indigo-50 rounded-full flex items-center justify-center">
              {budget?.icon || '💰'}
            </div>
            <div>
              <h2 className="font-bold text-gray-800">{budget.name}</h2>
              <p className="text-xs text-gray-500 mt-1">
                {budget.totalItem || 0} {budget.totalItem === 1 ? 'Item' : 'Items'}
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center justify-end font-bold text-indigo-600 text-lg">
              <IndianRupee className="w-4 h-4" />
              {budget.amount.toLocaleString('en-IN')}
            </div>
            <p className="text-xs text-gray-400 mt-1">Total Budget</p>
          </div>
        </div>

        {/* Progress Section */}
        <div className="mt-6">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center text-xs">
              <span className="text-gray-600 font-medium">
                <IndianRupee className="inline w-3 h-3 mr-0.5" />
                {budget.totalSpend ? budget.totalSpend.toLocaleString('en-IN') : 0}
              </span>
              <span className="text-gray-400 mx-1">•</span>
              <span className="text-gray-500">Spent</span>
            </div>
            <div className="flex items-center text-xs">
              <span className="text-gray-500">Remaining</span>
              <span className="text-gray-400 mx-1">•</span>
              <span className={`font-medium ${isOverBudget ? 'text-red-500' : 'text-green-500'}`}>
                <IndianRupee className="inline w-3 h-3 mr-0.5" />
                {Math.max(0, budget.amount - (budget.totalSpend || 0)).toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                isOverBudget ? 'bg-red-400' : 'bg-indigo-500'
              }`}
              style={{
                width: `${progressPercentage}%`,
              }}
            ></div>
          </div>

          {/* Percentage Indicator */}
          <div className="text-right mt-1">
            <span className={`text-xs font-medium ${
              isOverBudget ? 'text-red-500' : 'text-indigo-600'
            }`}>
              {progressPercentage}% {isOverBudget ? 'Over Budget' : 'Used'}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default BudgetItem;