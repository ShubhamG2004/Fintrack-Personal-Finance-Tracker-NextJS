"use client";
import React, { useEffect, useMemo, useState } from "react";
import { UserButton, useUser } from "@clerk/nextjs";
import CardInfo from "./_components/CardInfo";
import { db } from "@/utils/dbConfig";
import { desc, eq, getTableColumns, sql } from "drizzle-orm";
import { Budgets, Expenses, Incomes } from "@/utils/schema";
import BarChartDashboard from "./_components/BarChartDashboard";
import BudgetItem from "./budgets/_components/BudgetItem";
import ExpenseListTable from "./expenses/_components/ExpenseListTable";
import AlertBanner from "@/components/dashboard/AlertBanner";
import AlertPanel from "@/components/dashboard/AlertPanel";
import ExpenseChart from "@/components/dashboard/ExpenseChart";
import FinancialHealthCard from "@/components/dashboard/FinancialHealthCard";
import moment from "moment";

function Dashboard() {
  const { user } = useUser();

  const [budgetList, setBudgetList] = useState([]);
  const [incomeList, setIncomeList] = useState([]);
  const [expensesList, setExpensesList] = useState([]);
  const [alerts, setAlerts] = useState([]);

  const anomalyExpenses = expensesList.filter(
    (expense) => Number(expense?.amount) > 10000
  );

  const categoryData = useMemo(() => {
    const grouped = expensesList.reduce((acc, expense) => {
      const category = expense?.category || "General";
      const amount = Number(expense?.amount || 0);

      if (!acc[category]) {
        acc[category] = 0;
      }

      acc[category] += amount;
      return acc;
    }, {});

    return Object.entries(grouped)
      .map(([category, amount]) => ({
        category,
        amount: Number(amount.toFixed(2)),
      }))
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 6);
  }, [expensesList]);

  const monthlyTrend = useMemo(() => {
    const grouped = expensesList.reduce((acc, expense) => {
      if (!expense?.createdAt) return acc;

      const parsed = moment(
        expense.createdAt,
        [moment.ISO_8601, "YYYY-MM-DD", "DD/MM/YYYY", "DD/MM/yyyy"],
        true
      );

      if (!parsed.isValid()) return acc;

      const key = parsed.format("YYYY-MM");
      const amount = Number(expense?.amount || 0);

      if (!acc[key]) {
        acc[key] = 0;
      }

      acc[key] += amount;
      return acc;
    }, {});

    return Object.entries(grouped)
      .map(([month, total]) => ({
        month,
        total: Number(total.toFixed(2)),
      }))
      .sort((a, b) => a.month.localeCompare(b.month));
  }, [expensesList]);

  const spendingInsight = useMemo(() => {
    if (monthlyTrend.length < 2) {
      return "Add data across two months to generate a spending trend insight.";
    }

    const current = monthlyTrend[monthlyTrend.length - 1].total;
    const previous = monthlyTrend[monthlyTrend.length - 2].total;

    if (!previous) {
      return "Previous month baseline is zero, trend insight unavailable.";
    }

    const delta = ((current - previous) / previous) * 100;
    const direction = delta >= 0 ? "more" : "less";

    return `You spent ${Math.abs(delta).toFixed(1)}% ${direction} than last month.`;
  }, [monthlyTrend]);

  useEffect(() => {
    if (!user) return;

    getBudgetList();
    loadAlerts();

    const intervalId = setInterval(() => {
      loadAlerts();
    }, 10000);

    return () => clearInterval(intervalId);
  }, [user]);

  const loadAlerts = async () => {
    try {
      const userId = user?.primaryEmailAddress?.emailAddress;
      if (!userId) return;

      const response = await fetch(
        `/api/alerts?userId=${encodeURIComponent(userId)}&limit=8`,
        { cache: "no-store" }
      );

      if (!response.ok) return;

      const data = await response.json();
      setAlerts(data);
    } catch (error) {
      console.error("Failed to load alert history", error);
    }
  };

  /**
   * Used to get budget List
   */
  const getBudgetList = async () => {
    const result = await db
      .select({
        ...getTableColumns(Budgets),
        totalSpend: sql`sum(${Expenses.amount})`.mapWith(Number),
        totalItem: sql`count(${Expenses.id})`.mapWith(Number),
      })
      .from(Budgets)
      .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
      .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
      .groupBy(Budgets.id)
      .orderBy(desc(Budgets.id));
    
    setBudgetList(result);
    getAllExpenses();
    getIncomeList();
  };

  /**
   * Get Income stream list
   */
  const getIncomeList = async () => {
    try {
      const result = await db
        .select({
          ...getTableColumns(Incomes),
          totalAmount: sql`SUM(CAST(${Incomes.amount} AS NUMERIC))`.mapWith(Number),
        })
        .from(Incomes)
        .where(eq(Incomes.createdBy, user?.primaryEmailAddress?.emailAddress))
        .groupBy(Incomes.id)
        .orderBy(desc(Incomes.id));

      setIncomeList(result);
    } catch (error) {
      console.error("Error fetching income list:", error);
    }
  };

  /**
   * Used to get All expenses belong to users
   */
  const getAllExpenses = async () => {
    const result = await db
      .select({
        id: Expenses.id,
        name: Expenses.name,
        amount: Expenses.amount,
        createdAt: Expenses.createdAt,
        category: Budgets.name,
      })
      .from(Budgets)
      .rightJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
      .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
      .orderBy(desc(Expenses.id));
    
    setExpensesList(result);
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-bold text-4xl">Hi, {user?.fullName} 👋</h1>
          <p className="text-gray-500">
            Here&apos;s what&apos;s happening with your money. Let&apos;s manage your expenses.
          </p>
        </div>
        <UserButton afterSignOutUrl="/" />
      </div>

      <CardInfo budgetList={budgetList} incomeList={incomeList} />

      {anomalyExpenses.length > 0 && (
        <div className="mt-6">
          <AlertBanner
            message={`${anomalyExpenses.length} high-value transaction(s) need review. ${spendingInsight}`}
          />
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 mt-6 gap-5">
        <div className="lg:col-span-2 space-y-5">
          <BarChartDashboard budgetList={budgetList} />
          <ExpenseChart data={categoryData} />
          <ExpenseListTable
            expensesList={expensesList}
            refreshData={getBudgetList}
          />
        </div>
        
        <div className="space-y-5">
          <FinancialHealthCard userId={user?.primaryEmailAddress?.emailAddress} />
          <AlertPanel alerts={alerts} />
          <h2 className="font-bold text-lg">Latest Budgets</h2>
          {budgetList?.length > 0 ? (
            budgetList.map((budget, index) => (
              <BudgetItem budget={budget} key={budget.id || index} />
            ))
          ) : (
            [1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="h-[180px] w-full bg-slate-200 rounded-lg animate-pulse"
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;