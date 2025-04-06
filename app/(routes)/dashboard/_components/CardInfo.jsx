import formatNumber from "@/utils/formatNumber"; 
import getFinancialAdvice from "@/utils/getFinancialAdvice"; 
import {
  PiggyBank,
  ReceiptText,
  Wallet,
  Sparkles,
  IndianRupee,
} from "lucide-react";
import React, { useEffect, useState } from "react";

function CardInfo({ budgetList, incomeList }) {
  const [totalBudget, setTotalBudget] = useState(0);
  const [totalSpend, setTotalSpend] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [financialAdvice, setFinancialAdvice] = useState("");

  useEffect(() => {
    if (budgetList.length > 0 || incomeList.length > 0) {
      CalculateCardInfo();
    }
  }, [budgetList, incomeList]);

  useEffect(() => {
    if (totalBudget > 0 || totalIncome > 0 || totalSpend > 0) {
      const fetchFinancialAdvice = async () => {
        const advice = await getFinancialAdvice(
          totalBudget,
          totalIncome,
          totalSpend
        );
        setFinancialAdvice(advice);
      };

      fetchFinancialAdvice();
    }
  }, [totalBudget, totalIncome, totalSpend]);

  const CalculateCardInfo = () => {
    let totalBudget_ = 0;
    let totalSpend_ = 0;
    let totalIncome_ = 0;

    budgetList.forEach((element) => {
      totalBudget_ = totalBudget_ + Number(element.amount);
      totalSpend_ = totalSpend_ + element.totalSpend;
    });

    incomeList.forEach((element) => {
      totalIncome_ = totalIncome_ + element.totalAmount;
    });

    setTotalIncome(totalIncome_);
    setTotalBudget(totalBudget_);
    setTotalSpend(totalSpend_);
  };

  return (
    <div>
      {budgetList?.length > 0 ? (
        <div>
          {/* AI Advice Card */}
          <div className="p-6 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl shadow-lg text-white mb-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center mb-3">
                  <h2 className="text-lg font-semibold mr-2">FinTrack AI</h2>
                  <Sparkles className="w-5 h-5 text-yellow-300 animate-pulse" />
                </div>
                <p className="text-sm font-light leading-relaxed">
                  {financialAdvice || "Analyzing your financial data..."}
                </p>
              </div>
              <div className="hidden md:block ml-4">
                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center">
                  <Sparkles className="w-8 h-8 text-yellow-300" />
                </div>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Total Budget Card */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 group">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Total Budget</p>
                  <h3 className="text-2xl font-bold text-gray-800">
                    ₹{formatNumber(totalBudget)}
                  </h3>
                </div>
                <div className="bg-blue-100 group-hover:bg-blue-600 transition-all duration-300 p-3 rounded-lg">
                  <PiggyBank className="text-blue-600 group-hover:text-white h-6 w-6" />
                </div>
              </div>
            </div>

            {/* Total Spend Card */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 group">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Total Spend</p>
                  <h3 className="text-2xl font-bold text-gray-800">
                    ₹{formatNumber(totalSpend)}
                  </h3>
                </div>
                <div className="bg-red-100 group-hover:bg-red-600 transition-all duration-300 p-3 rounded-lg">
                  <ReceiptText className="text-red-600 group-hover:text-white h-6 w-6" />
                </div>
              </div>
            </div>

            {/* Budget Count Card */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 group">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-500 mb-1">No. Of Budgets</p>
                  <h3 className="text-2xl font-bold text-gray-800">
                    {budgetList?.length}
                  </h3>
                </div>
                <div className="bg-green-100 group-hover:bg-green-600 transition-all duration-300 p-3 rounded-lg">
                  <Wallet className="text-green-600 group-hover:text-white h-6 w-6" />
                </div>
              </div>
            </div>

            {/* Income Card */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 group">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Total Income</p>
                  <h3 className="text-2xl font-bold text-gray-800">
                    ₹{formatNumber(totalIncome)}
                  </h3>
                </div>
                <div className="bg-purple-100 group-hover:bg-purple-600 transition-all duration-300 p-3 rounded-lg">
                  <IndianRupee className="text-purple-600 group-hover:text-white h-6 w-6" />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {[1, 2, 3, 4].map((item, index) => (
            <div
              className="h-[120px] w-full bg-gradient-to-r from-gray-100 to-gray-50 animate-pulse rounded-xl"
              key={index}
            ></div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CardInfo;