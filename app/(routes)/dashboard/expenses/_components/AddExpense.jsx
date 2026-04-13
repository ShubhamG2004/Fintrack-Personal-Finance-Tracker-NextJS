import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  CalendarDays,
  IndianRupee,
  Loader,
  Plus,
  Receipt,
  Repeat2,
  Tag,
  Wallet,
} from "lucide-react";
import moment from "moment";
import React, { useState } from "react";
import { toast } from "sonner";

const recurrenceOptions = [
  { label: "Weekly", value: "weekly" },
  { label: "Biweekly", value: "biweekly" },
  { label: "Monthly", value: "monthly" },
  { label: "Yearly", value: "yearly" },
];

function AddExpense({ budgetId, user, refreshData }) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("General");
  const [isRecurring, setIsRecurring] = useState(false);
  const [recurrence, setRecurrence] = useState("monthly");
  const [loading, setLoading] = useState(false);

  const addNewExpense = async () => {
    if (!name || !amount) return;
    
    setLoading(true);
    try {
      const response = await fetch("/api/transactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          amount: parseFloat(amount),
          budgetId,
          category: category.trim() || "General",
          createdAt: moment().format("YYYY-MM-DD"),
          userId: user?.primaryEmailAddress?.emailAddress,
          isRecurring,
          recurrence: isRecurring ? recurrence : "one-time",
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create transaction");
      }

      const result = await response.json();

      if (result) {
        const alertSuffix = result.isAnomaly ? " (flagged for review)" : "";

        toast.success("Expense Added Successfully", {
          description: `${name} - ₹${amount} added${alertSuffix}`,
          action: {
            label: "Dismiss",
            onClick: () => {},
          },
        });

        if (result?.anomaly?.isAnomaly) {
          toast.warning("Anomaly detected", {
            description: `${result.anomaly.reason} (confidence ${Math.round(
              result.anomaly.confidence * 100
            )}%)`,
          });
        }

        refreshData();
        setName("");
        setAmount("");
        setCategory("General");
        setIsRecurring(false);
        setRecurrence("monthly");
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
      className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      <div>
        <motion.div 
          className="mb-6 flex items-center gap-3"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-2">
            <Plus className="h-5 w-5 text-slate-700" />
          </div>
          <h2 className="text-lg font-semibold text-slate-900">
            Add New Expense
          </h2>
        </motion.div>
        
        <motion.div 
          className="space-y-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
              <Receipt className="w-4 h-4" />
              Expense Name
            </label>
            <Input
              className="h-11 rounded-xl border-slate-300 bg-white focus-visible:ring-slate-300"
              placeholder="e.g. Groceries, Dining Out"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
              <Tag className="w-4 h-4" />
              Category
            </label>
            <Input
              className="h-11 rounded-xl border-slate-300 bg-white focus-visible:ring-slate-300"
              placeholder="e.g. Groceries, Travel, Utilities"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>
          
          <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
              <Wallet className="w-4 h-4" />
              Expense Amount
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                <IndianRupee className="w-4 h-4" />
              </span>
              <Input
                type="number"
                className="h-11 rounded-xl border-slate-300 bg-white pl-10 focus-visible:ring-slate-300"
                placeholder="e.g. 1500"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="flex items-center gap-2 font-semibold text-slate-800">
                  <Repeat2 className="w-4 h-4 text-slate-600" />
                  Recurring transaction
                </p>
                <p className="mt-1 text-sm text-slate-500">
                  Keep this expense on a schedule for predictable spending.
                </p>
              </div>
              <Button
                type="button"
                variant={isRecurring ? "default" : "outline"}
                className={isRecurring ? "bg-slate-900 hover:bg-slate-800" : "border-slate-300"}
                onClick={() => setIsRecurring((current) => !current)}
              >
                {isRecurring ? "Enabled" : "Disabled"}
              </Button>
            </div>

            <div className={`mt-4 ${isRecurring ? "grid" : "opacity-60 pointer-events-none"}`}>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {recurrenceOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setRecurrence(option.value)}
                    className={`rounded-xl border px-3 py-2 text-sm font-medium transition-all duration-200 ${
                      recurrence === option.value
                        ? "border-slate-900 bg-slate-900 text-white"
                        : "border-slate-300 bg-white text-slate-600 hover:border-slate-400"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
              <p className="mt-3 flex items-center gap-1 text-xs text-slate-500">
                <CalendarDays className="w-3 h-3" />
                {isRecurring
                  ? `Next charge marked as ${recurrence}.`
                  : "Turn on recurring mode to store a schedule."}
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Button
            disabled={!name || !amount || loading}
            onClick={addNewExpense}
            className="mt-6 h-12 w-full rounded-xl bg-slate-900 text-white hover:bg-slate-800 disabled:opacity-70"
          >
            {loading ? <Loader className="h-4 w-4 animate-spin" /> : "Add Expense"}
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default AddExpense;