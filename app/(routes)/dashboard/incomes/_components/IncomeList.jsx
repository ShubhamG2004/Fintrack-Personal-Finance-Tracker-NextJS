"use client";
import React, { useEffect, useState } from "react";
import CreateIncomes from "./CreateIncomes";
import { db } from "@/utils/dbConfig";
import { desc, eq, getTableColumns, sql } from "drizzle-orm";
import { Incomes, Expenses } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import IncomeItem from "./IncomeItem";
import { IndianRupee, Loader2 } from "lucide-react";

function IncomeList() {
  const [incomeList, setIncomeList] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useUser();

  useEffect(() => {
    user && getIncomeList();
  }, [user]);

  const getIncomeList = async () => {
    setLoading(true);
    try {
      const result = await db
        .select({
          ...getTableColumns(Incomes),
          totalSpend: sql`sum(${Expenses.amount})`.mapWith(Number),
          totalItem: sql`count(${Expenses.id})`.mapWith(Number),
        })
        .from(Incomes)
        .leftJoin(Expenses, eq(Incomes.id, Expenses.budgetId))
        .where(eq(Incomes.createdBy, user?.primaryEmailAddress?.emailAddress))
        .groupBy(Incomes.id)
        .orderBy(desc(Incomes.id));
      setIncomeList(result);
    } catch (error) {
      console.error("Error fetching income list:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <IndianRupee className="w-6 h-6 text-green-600" />
          Income Sources
        </h2>
        <div className="text-sm text-gray-500">
          {loading ? "Loading..." : `${incomeList.length} sources`}
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[1, 2, 3, 4, 5].map((item) => (
            <div
              key={item}
              className="w-full bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl h-[180px] animate-pulse"
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <CreateIncomes refreshData={getIncomeList} />
          {incomeList.length > 0 ? (
            incomeList.map((income) => (
              <IncomeItem key={income.id} budget={income} />
            ))
          ) : (
            <div className="col-span-full text-center py-10">
              <p className="text-gray-500">No income sources found</p>
              <p className="text-sm text-gray-400 mt-2">
                Add your first income source to get started
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default IncomeList;