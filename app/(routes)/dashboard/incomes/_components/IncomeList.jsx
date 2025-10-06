"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import CreateIncomes from "./CreateIncomes";
import { db } from "@/utils/dbConfig";
import { desc, eq, getTableColumns, sql } from "drizzle-orm";
import { Incomes, Expenses } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import IncomeItem from "./IncomeItem";
import { IndianRupee, Loader2, Sparkles, TrendingUp } from "lucide-react";

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <motion.div 
      className="mt-8"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div className="flex items-center justify-between mb-6" variants={itemVariants}>
        <div className="flex items-center gap-3">
          <Sparkles className="w-6 h-6 text-green-500 animate-pulse" />
          <h2 className="text-2xl font-extrabold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
            Income Sources
          </h2>
        </div>
        <motion.div 
          className="flex items-center gap-2 text-sm bg-gradient-to-r from-green-50 to-emerald-50 px-4 py-2 rounded-full border border-green-100 shadow-sm"
          whileHover={{ scale: 1.05, boxShadow: "0 4px 16px rgba(34,197,94,0.15)" }}
        >
          <TrendingUp className="w-4 h-4 text-green-600" />
          <span className="text-green-600 font-medium">
            {loading ? "Loading..." : `${incomeList.length} source${incomeList.length !== 1 ? 's' : ''}`}
          </span>
        </motion.div>
      </motion.div>

      {loading ? (
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
        >
          {[1, 2, 3, 4, 5].map((item) => (
            <motion.div
              key={item}
              variants={itemVariants}
              className="w-full bg-gradient-to-br from-white/60 via-green-50/30 to-emerald-50/30 backdrop-blur-lg rounded-2xl h-[200px] animate-pulse overflow-hidden border border-white/20 shadow-lg"
            >
              <div className="h-full w-full flex flex-col p-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-200 to-emerald-200 mb-4 animate-pulse"></div>
                <div className="w-3/4 h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg mb-3 animate-pulse"></div>
                <div className="w-1/2 h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded mb-6 animate-pulse"></div>
                <div className="w-full h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded mb-2 animate-pulse"></div>
                <div className="w-2/3 h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse"></div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
        >
          <motion.div variants={itemVariants}>
            <CreateIncomes refreshData={getIncomeList} />
          </motion.div>
          {incomeList.length > 0 ? (
            incomeList.map((income) => (
              <motion.div key={income.id} variants={itemVariants}>
                <IncomeItem budget={income} />
              </motion.div>
            ))
          ) : (
            <motion.div 
              className="col-span-full bg-white/70 backdrop-blur-lg rounded-2xl border border-white/20 shadow-lg p-12 text-center"
              variants={itemVariants}
            >
              <TrendingUp className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">No Income Sources Yet</h3>
              <p className="text-gray-500">Add your first income source to get started</p>
            </motion.div>
          )}
        </motion.div>
      )}
    </motion.div>
  );
}

export default IncomeList;