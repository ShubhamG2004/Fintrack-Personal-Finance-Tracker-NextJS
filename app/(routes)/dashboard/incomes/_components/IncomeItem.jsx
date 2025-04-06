import Link from "next/link";
import React from "react";
import { IndianRupee, TrendingUp } from "lucide-react";

function IncomeItem({ budget }) {
  return (
    <div className="p-6 bg-white border border-gray-200 rounded-xl hover:shadow-md cursor-pointer transition-all duration-300 hover:border-green-200 group">
      {/* Header Section */}
      <div className="flex justify-between items-start">
        <div className="flex gap-3 items-center">
          <div className="text-2xl p-3 bg-green-100 rounded-full flex items-center justify-center group-hover:bg-green-200 transition-colors">
            {budget?.icon || '💰'}
          </div>
          <div>
            <h2 className="font-bold text-gray-800">{budget.name}</h2>
            <p className="text-sm text-gray-500 mt-1">
              {budget.totalItem || 0} {budget.totalItem === 1 ? 'Source' : 'Sources'}
            </p>
          </div>
        </div>
        <div className="text-right">
          <div className="flex items-center justify-end font-bold text-green-600 text-lg">
            <IndianRupee className="w-4 h-4" />
            {budget.amount?.toLocaleString('en-IN')}
          </div>
          <p className="text-xs text-gray-400 mt-1">Monthly Income</p>
        </div>
      </div>

      {/* Optional: Add progress indicator if needed */}
      {/* <div className="mt-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-gray-500">Progress</span>
          <span className="text-xs font-medium text-green-600">100%</span>
        </div>
        <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
          <div 
            className="h-full rounded-full bg-green-500 transition-all duration-500"
            style={{ width: '100%' }}
          ></div>
        </div>
      </div> */}

      {/* Optional: Add trending indicator */}
      <div className="mt-4 flex items-center gap-1 text-sm text-green-600">
        <TrendingUp className="w-4 h-4" />
        <span>Regular income</span>
      </div>
    </div>
  );
}

export default IncomeItem;