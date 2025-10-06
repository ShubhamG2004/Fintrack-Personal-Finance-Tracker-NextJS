import { motion } from "framer-motion";
import { db } from "@/utils/dbConfig";
import { Expenses } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { Trash2, Receipt, IndianRupee, Calendar, AlertCircle, Sparkles } from "lucide-react";
import React from "react";
import { toast } from "sonner";

function ExpenseListTable({ expensesList, refreshData, loading }) {
  const deleteExpense = async (expense) => {
    const result = await db
      .delete(Expenses)
      .where(eq(Expenses.id, expense.id))
      .returning();

    if (result) {
      toast.success("Expense Deleted!", {
        description: `${expense.name} has been removed`,
        icon: "🗑️"
      });
      refreshData();
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
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
        <div className="bg-white/70 backdrop-blur-lg rounded-2xl border border-white/20 shadow-lg overflow-hidden">
          <div className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-gradient-to-r from-orange-200 to-red-200 rounded-lg animate-pulse" />
              <div className="w-32 h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse" />
            </div>
            {[...Array(5)].map((_, i) => (
              <div key={i} className="grid grid-cols-4 gap-4 p-4 border-b border-gray-100/50">
                <div className="w-24 h-4 bg-gray-200 rounded animate-pulse" />
                <div className="w-16 h-4 bg-gray-200 rounded animate-pulse" />
                <div className="w-20 h-4 bg-gray-200 rounded animate-pulse" />
                <div className="w-12 h-4 bg-gray-200 rounded animate-pulse" />
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
        <Sparkles className="w-6 h-6 text-orange-500 animate-pulse" />
        <h2 className="text-2xl font-extrabold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
          Latest Expenses
        </h2>
      </motion.div>

      {expensesList.length === 0 ? (
        <motion.div 
          className="bg-white/70 backdrop-blur-lg rounded-2xl border border-white/20 shadow-lg p-12 text-center"
          variants={itemVariants}
        >
          <Receipt className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-600 mb-2">No Expenses Yet</h3>
          <p className="text-gray-500">Start adding expenses to track your spending</p>
        </motion.div>
      ) : (
        <motion.div 
          className="bg-white/70 backdrop-blur-lg rounded-2xl border border-white/20 shadow-lg overflow-hidden"
          variants={itemVariants}
        >
          {/* Table Header */}
          <div className="grid grid-cols-4 bg-gradient-to-r from-orange-50 to-red-50 p-4 border-b border-orange-100">
            <div className="flex items-center gap-2 font-bold text-gray-700">
              <Receipt className="w-4 h-4" />
              <span>Name</span>
            </div>
            <div className="flex items-center gap-2 font-bold text-gray-700">
              <IndianRupee className="w-4 h-4" />
              <span>Amount</span>
            </div>
            <div className="flex items-center gap-2 font-bold text-gray-700">
              <Calendar className="w-4 h-4" />
              <span>Date</span>
            </div>
            <div className="flex items-center gap-2 font-bold text-gray-700">
              <AlertCircle className="w-4 h-4" />
              <span>Action</span>
            </div>
          </div>

          {/* Table Rows */}
          {expensesList.map((expense, index) => (
            <motion.div
              key={expense.id}
              className="grid grid-cols-4 p-4 border-b border-gray-100/50 hover:bg-orange-50/50 transition-all duration-200 group"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ x: 4 }}
            >
              <div className="flex items-center">
                <div className="w-2 h-2 bg-orange-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="font-medium text-gray-800">{expense.name}</span>
              </div>
              
              <div className="flex items-center gap-1 font-semibold text-gray-700">
                <IndianRupee className="w-4 h-4 text-orange-500" />
                <span>{parseFloat(expense.amount || 0).toLocaleString('en-IN')}</span>
              </div>
              
              <div className="flex items-center text-gray-600">
                <span className="text-sm bg-gray-100 px-2 py-1 rounded-full">
                  {formatDate(expense.createdAt)}
                </span>
              </div>
              
              <div className="flex items-center">
                <motion.button
                  onClick={() => deleteExpense(expense)}
                  className="flex items-center gap-1 text-red-500 hover:text-red-700 hover:bg-red-50 px-3 py-1 rounded-lg transition-all duration-200 font-medium text-sm"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Delete</span>
                </motion.button>
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
          <div className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-lg px-4 py-2 rounded-full border border-white/20 shadow-sm">
            <Receipt className="w-4 h-4 text-orange-500" />
            <span className="text-sm text-gray-600 font-medium">
              Showing {expensesList.length} expense{expensesList.length !== 1 ? 's' : ''}
            </span>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

export default ExpenseListTable;