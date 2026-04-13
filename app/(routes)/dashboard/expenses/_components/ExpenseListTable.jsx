"use client";

import { motion } from "framer-motion";
import {
  Calendar,
  IndianRupee,
  Receipt,
  Repeat2,
  Tag,
  Trash2,
  Wallet,
} from "lucide-react";
import moment from "moment";
import React from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import EditExpense from "./EditExpense";

function ExpenseListTable({ expensesList, refreshData, loading, emptyTitle, emptyDescription }) {
  const deleteExpense = async (expense) => {
    const response = await fetch("/api/transactions", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: expense.id,
        userId: expense.userId,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to delete transaction");
    }

    toast.success("Expense Deleted!", {
      description: `${expense.name} has been removed`,
      icon: "🗑️",
    });
  };

  const formatDate = (dateString) => {
    const parsed = moment(dateString, [moment.ISO_8601, "YYYY-MM-DD", "DD/MM/YYYY", "DD/MM/yyyy"], true);

    if (parsed.isValid()) {
      return parsed.format("DD MMM YYYY");
    }

    const date = new Date(dateString);
    return Number.isNaN(date.getTime())
      ? dateString
      : date.toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        });
  };

  const getRecurrenceLabel = (expense) => {
    if (!expense?.isRecurring) {
      return "One-time";
    }

    return `${String(expense.recurrence ?? "monthly").replace(/^[a-z]/, (match) => match.toUpperCase())}`;
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

  if (loading) {
    return (
      <motion.div 
        className="mt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-8 w-8 rounded-lg bg-slate-200 animate-pulse" />
              <div className="h-6 w-32 rounded bg-slate-200 animate-pulse" />
            </div>
            {[...Array(5)].map((_, i) => (
              <div key={i} className="grid grid-cols-4 gap-4 border-b border-slate-100 p-4">
                <div className="h-4 w-24 rounded bg-slate-200 animate-pulse" />
                <div className="h-4 w-16 rounded bg-slate-200 animate-pulse" />
                <div className="h-4 w-20 rounded bg-slate-200 animate-pulse" />
                <div className="h-4 w-12 rounded bg-slate-200 animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    );
  }
  
  
  return (
    <motion.div 
      className="mt-8"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div className="flex items-center gap-3 mb-6" variants={itemVariants}>
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-2">
          <Receipt className="h-5 w-5 text-slate-700" />
        </div>
        <h2 className="text-2xl font-semibold text-slate-900">
          Latest Expenses
        </h2>
      </motion.div>

      {expensesList.length === 0 ? (
        <motion.div 
          className="rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-sm"
          variants={itemVariants}
        >
          <Receipt className="mx-auto mb-4 h-16 w-16 text-slate-300" />
          <h3 className="mb-2 text-lg font-semibold text-slate-700">
            {emptyTitle ?? "No Expenses Yet"}
          </h3>
          <p className="text-slate-500">
            {emptyDescription ?? "Start adding expenses to track your spending"}
          </p>
        </motion.div>
      ) : (
        <motion.div 
          className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
          variants={itemVariants}
        >
          {/* Table Header */}
          <div className="hidden border-b border-slate-200 bg-slate-50 p-4 md:grid md:grid-cols-5">
            <div className="flex items-center gap-2 font-semibold text-slate-700">
              <Receipt className="w-4 h-4" />
              <span>Name</span>
            </div>
            <div className="flex items-center gap-2 font-semibold text-slate-700">
              <IndianRupee className="w-4 h-4" />
              <span>Amount</span>
            </div>
            <div className="flex items-center gap-2 font-semibold text-slate-700">
              <Tag className="w-4 h-4" />
              <span>Tags</span>
            </div>
            <div className="flex items-center gap-2 font-semibold text-slate-700">
              <Calendar className="w-4 h-4" />
              <span>Date</span>
            </div>
            <div className="flex items-center gap-2 font-semibold text-slate-700">
              <span>Actions</span>
            </div>
          </div>

          {/* Table Rows */}
          {expensesList.map((expense, index) => (
            <motion.div
              key={expense.id}
              className="group grid grid-cols-1 gap-4 border-b border-slate-100 p-4 transition-colors duration-200 hover:bg-slate-50 md:grid-cols-5 md:gap-0"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.04 }}
            >
              <div className="flex flex-col gap-2 md:flex-row md:items-center">
                <div className="flex items-center">
                  <div className="mr-3 h-2 w-2 rounded-full bg-slate-400 opacity-0 transition-opacity group-hover:opacity-100" />
                  <div>
                    <span className="block font-medium text-slate-800">{expense.name}</span>
                    {expense.budgetName ? (
                      <span className="mt-1 flex items-center gap-1 text-xs text-slate-500">
                        <Wallet className="w-3 h-3" />
                        {expense.budgetName}
                      </span>
                    ) : null}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-1 font-semibold text-slate-800">
                <IndianRupee className="w-4 h-4 text-slate-600" />
                <span>{parseFloat(expense.amount || 0).toLocaleString('en-IN')}</span>
              </div>
              
              <div className="flex flex-wrap items-center gap-2 text-slate-600">
                <span className="flex items-center gap-1 rounded-full bg-slate-100 px-2 py-1 text-xs">
                  <Tag className="w-3 h-3" />
                  {expense.category ?? "General"}
                </span>
                <span
                  className={`text-xs px-2 py-1 rounded-full flex items-center gap-1 ${
                    expense.isRecurring
                      ? "bg-blue-100 text-blue-700"
                      : "bg-emerald-100 text-emerald-700"
                  }`}
                >
                  <Repeat2 className="w-3 h-3" />
                  {getRecurrenceLabel(expense)}
                </span>
              </div>
              
              <div className="flex items-center text-slate-600">
                <span className="rounded-full bg-slate-100 px-2 py-1 text-sm">
                  {formatDate(expense.createdAt)}
                </span>
              </div>

              <div className="flex items-center gap-2 md:justify-end">
                <EditExpense expense={expense} onSuccess={refreshData} />
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="ghost" className="h-9 px-3 text-red-500 hover:text-red-700 hover:bg-red-50">
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="rounded-2xl">
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete expense?</AlertDialogTitle>
                      <AlertDialogDescription className="text-gray-600">
                        This removes {expense.name} permanently. This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel className="rounded-xl">Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        className="rounded-xl bg-red-600 hover:bg-red-700"
                        onClick={async () => {
                          try {
                            await deleteExpense(expense);
                            refreshData?.();
                          } catch (error) {
                            toast.error("Failed to delete expense", {
                              description: "Please try again",
                            });
                          }
                        }}
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
      
      {expensesList.length > 0 && (
        <motion.div 
          className="mt-4 text-center"
          variants={itemVariants}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 shadow-sm">
            <Receipt className="h-4 w-4 text-slate-500" />
            <span className="text-sm font-medium text-slate-600">
              Showing {expensesList.length} expense{expensesList.length !== 1 ? 's' : ''}
            </span>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

export default ExpenseListTable;