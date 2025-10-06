import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { db } from "@/utils/dbConfig";
import { Budgets, Expenses } from "@/utils/schema";
import { IndianRupee, Loader, PlusCircle, Receipt, Zap } from "lucide-react";
import moment from "moment";
import React, { useState } from "react";
import { toast } from "sonner";

function AddExpense({ budgetId, user, refreshData }) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const addNewExpense = async () => {
    if (!name || !amount) return;
    
    setLoading(true);
    try {
      const result = await db
        .insert(Expenses)
        .values({
          name: name,
          amount: parseFloat(amount),
          budgetId: budgetId,
          createdAt: moment().format("DD/MM/yyyy"),
          createdBy: user?.primaryEmailAddress?.emailAddress,
        })
        .returning({ insertedId: Budgets.id });

      if (result) {
        toast.success("Expense Added Successfully", {
          description: `${name} - ₹${amount} added`,
          action: {
            label: "Dismiss",
            onClick: () => {},
          },
        });
        refreshData();
        setName("");
        setAmount("");
      }
    } catch (error) {
      toast.error("Failed to add expense", {
        description: "Please try again",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      className="bg-white/70 backdrop-blur-lg p-6 rounded-2xl shadow-lg border border-white/20 hover:shadow-2xl transition-all duration-300 overflow-hidden relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      whileHover={{ y: -4, boxShadow: "0 20px 40px rgba(239,68,68,0.15)" }}
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50/20 via-white/10 to-red-50/20 opacity-0 hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative z-10">
        <motion.div 
          className="flex items-center gap-3 mb-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <motion.div 
            className="p-2 bg-gradient-to-r from-orange-400 to-red-500 rounded-lg shadow-sm"
            whileHover={{ rotate: 10, scale: 1.1 }}
            transition={{ duration: 0.2 }}
          >
            <PlusCircle className="w-5 h-5 text-white" />
          </motion.div>
          <h2 className="font-bold text-lg bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
            Add New Expense
          </h2>
        </motion.div>
        
        <motion.div 
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
              <Receipt className="w-4 h-4" />
              Expense Name
            </label>
            <motion.div whileFocus={{ scale: 1.02 }}>
              <Input
                className="focus-visible:ring-orange-200 border-orange-200 focus:border-orange-400 transition-colors bg-white/70 backdrop-blur-sm h-11 rounded-xl"
                placeholder="e.g. Groceries, Dining Out"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </motion.div>
          </div>
          
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
              <Zap className="w-4 h-4" />
              Expense Amount
            </label>
            <motion.div 
              className="relative"
              whileFocus={{ scale: 1.02 }}
            >
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                <IndianRupee className="w-4 h-4" />
              </span>
              <Input
                type="number"
                className="pl-10 focus-visible:ring-orange-200 border-orange-200 focus:border-orange-400 transition-colors bg-white/70 backdrop-blur-sm h-11 rounded-xl"
                placeholder="e.g. 1500"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              disabled={!name || !amount || loading}
              onClick={addNewExpense}
              className="mt-6 w-full h-12 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg"
            >
              {loading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <Loader className="w-4 h-4" />
                </motion.div>
              ) : (
                <span className="flex items-center gap-2">
                  <PlusCircle className="w-4 h-4 animate-pulse" />
                  Add Expense
                </span>
              )}
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default AddExpense;