import formatNumber from "@/utils/formatNumber"; 
import getFinancialAdvice from "@/utils/getFinancialAdvice"; 
import {
  PiggyBank,
  ReceiptText,
  Wallet,
  Sparkles,
  IndianRupee,
} from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";

function CardInfo({ budgetList, incomeList }) {
  const [financialAdvice, setFinancialAdvice] = useState("");

  const { totalBudget, totalSpend, totalIncome } = useMemo(() => {
    let nextTotalBudget = 0;
    let nextTotalSpend = 0;
    let nextTotalIncome = 0;

    budgetList.forEach((element) => {
      nextTotalBudget = nextTotalBudget + Number(element.amount);
      nextTotalSpend = nextTotalSpend + Number(element.totalSpend ?? 0);
    });

    incomeList.forEach((element) => {
      nextTotalIncome = nextTotalIncome + Number(element.totalAmount ?? 0);
    });

    return {
      totalBudget: nextTotalBudget,
      totalSpend: nextTotalSpend,
      totalIncome: nextTotalIncome,
    };
  }, [budgetList, incomeList]);

  const budgetUtilization =
    totalBudget > 0 ? Math.min(100, Math.round((totalSpend / totalBudget) * 100)) : 0;

  const netBalance = totalIncome - totalSpend;

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

  return (
    <div>
      {budgetList?.length > 0 ? (
        <div className="space-y-4 sm:space-y-5">
          <div className="rounded-2xl border border-slate-200 bg-gradient-to-r from-slate-900 to-slate-800 p-4 text-white shadow-sm sm:p-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="mb-3 flex items-center">
                  <h2 className="mr-2 text-lg font-semibold">FinTrack AI Insight</h2>
                  <Sparkles className="h-5 w-5 text-sky-300" />
                </div>
                <p className="text-sm leading-relaxed text-slate-200">
                  {financialAdvice || "Analyzing your financial data..."}
                </p>
              </div>
              <div className="ml-4 hidden md:block">
                <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/20 bg-white/10">
                  <Sparkles className="h-6 w-6 text-sky-300" />
                </div>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 md:w-[420px]">
              <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">
                <p className="text-xs text-slate-300">Budget Utilization</p>
                <p className="text-sm font-semibold">{budgetUtilization}%</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">
                <p className="text-xs text-slate-300">Net Balance</p>
                <p className="text-sm font-semibold">₹{formatNumber(netBalance)}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-200 hover:shadow-md sm:p-5">
              <div className="flex justify-between items-center">
                <div>
                  <p className="mb-1 text-sm text-slate-500">Total Budget</p>
                  <h3 className="text-xl font-semibold text-slate-900 sm:text-2xl">
                    ₹{formatNumber(totalBudget)}
                  </h3>
                </div>
                <div className="rounded-xl bg-blue-50 p-3">
                  <PiggyBank className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-200 hover:shadow-md sm:p-5">
              <div className="flex justify-between items-center">
                <div>
                  <p className="mb-1 text-sm text-slate-500">Total Spend</p>
                  <h3 className="text-xl font-semibold text-slate-900 sm:text-2xl">
                    ₹{formatNumber(totalSpend)}
                  </h3>
                </div>
                <div className="rounded-xl bg-red-50 p-3">
                  <ReceiptText className="h-6 w-6 text-red-600" />
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-200 hover:shadow-md sm:p-5">
              <div className="flex justify-between items-center">
                <div>
                  <p className="mb-1 text-sm text-slate-500">No. of Budgets</p>
                  <h3 className="text-xl font-semibold text-slate-900 sm:text-2xl">
                    {budgetList?.length}
                  </h3>
                </div>
                <div className="rounded-xl bg-emerald-50 p-3">
                  <Wallet className="h-6 w-6 text-emerald-600" />
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-200 hover:shadow-md sm:p-5">
              <div className="flex justify-between items-center">
                <div>
                  <p className="mb-1 text-sm text-slate-500">Total Income</p>
                  <h3 className="text-xl font-semibold text-slate-900 sm:text-2xl">
                    ₹{formatNumber(totalIncome)}
                  </h3>
                </div>
                <div className="rounded-xl bg-violet-50 p-3">
                  <IndianRupee className="h-6 w-6 text-violet-600" />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {[1, 2, 3, 4].map((item, index) => (
            <div
              className="h-[120px] w-full animate-pulse rounded-2xl border border-slate-200 bg-slate-100"
              key={index}
            ></div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CardInfo;