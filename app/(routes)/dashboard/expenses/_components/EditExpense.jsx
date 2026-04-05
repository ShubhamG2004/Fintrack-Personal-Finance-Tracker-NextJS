"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  CalendarDays,
  IndianRupee,
  Loader2,
  PenBox,
  Receipt,
  Repeat2,
  Tag,
} from "lucide-react";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const recurrenceOptions = [
  { label: "Weekly", value: "weekly" },
  { label: "Biweekly", value: "biweekly" },
  { label: "Monthly", value: "monthly" },
  { label: "Yearly", value: "yearly" },
];

const normalizeDateForInput = (value) => {
  const parsed = moment(value, [moment.ISO_8601, "YYYY-MM-DD", "DD/MM/YYYY", "DD/MM/yyyy"], true);
  return parsed.isValid() ? parsed.format("YYYY-MM-DD") : moment().format("YYYY-MM-DD");
};

function EditExpense({ expense, onSuccess }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("General");
  const [createdAt, setCreatedAt] = useState(moment().format("YYYY-MM-DD"));
  const [isRecurring, setIsRecurring] = useState(false);
  const [recurrence, setRecurrence] = useState("monthly");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!expense || !open) {
      return;
    }

    setName(expense.name ?? "");
    setAmount(String(expense.amount ?? ""));
    setCategory(expense.category ?? "General");
    setCreatedAt(normalizeDateForInput(expense.createdAt));
    setIsRecurring(Boolean(expense.isRecurring));
    setRecurrence(expense.recurrence ?? "monthly");
  }, [expense, open]);

  const onUpdateExpense = async () => {
    if (!name || !amount) {
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/transactions", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: expense.id,
          userId: expense.userId,
          name,
          amount: parseFloat(amount),
          budgetId: expense.budgetId,
          category: category.trim() || "General",
          createdAt,
          isRecurring,
          recurrence: isRecurring ? recurrence : "one-time",
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update transaction");
      }

      await response.json();
      onSuccess?.();
      setOpen(false);

      toast.success("Expense Updated", {
        description: `${name} has been updated successfully`,
      });
    } catch (error) {
      toast.error("Failed to update expense", {
        description: "Please try again",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="h-9 px-3 text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50">
          <PenBox className="w-4 h-4" />
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg rounded-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <PenBox className="w-5 h-5 text-indigo-600" />
            Update Expense
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            Edit the expense details, category, date, or recurring schedule.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
              <Receipt className="w-4 h-4" />
              Expense Name
            </label>
            <Input
              className="focus-visible:ring-indigo-200 border-indigo-200 focus:border-indigo-400 rounded-xl h-11"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
              <Tag className="w-4 h-4" />
              Category
            </label>
            <Input
              className="focus-visible:ring-indigo-200 border-indigo-200 focus:border-indigo-400 rounded-xl h-11"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
              <IndianRupee className="w-4 h-4" />
              Amount
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                <IndianRupee className="w-4 h-4" />
              </span>
              <Input
                type="number"
                className="pl-10 focus-visible:ring-indigo-200 border-indigo-200 focus:border-indigo-400 rounded-xl h-11"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
              <CalendarDays className="w-4 h-4" />
              Transaction Date
            </label>
            <Input
              type="date"
              className="focus-visible:ring-indigo-200 border-indigo-200 focus:border-indigo-400 rounded-xl h-11"
              value={createdAt}
              onChange={(e) => setCreatedAt(e.target.value)}
            />
          </div>

          <div className="rounded-2xl border border-indigo-100 bg-gradient-to-br from-indigo-50/80 to-slate-50/80 p-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="font-semibold text-gray-800 flex items-center gap-2">
                  <Repeat2 className="w-4 h-4 text-indigo-500" />
                  Recurring transaction
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Mark this expense as a repeating charge.
                </p>
              </div>
              <Button
                type="button"
                variant={isRecurring ? "default" : "outline"}
                className={isRecurring ? "bg-indigo-600 hover:bg-indigo-700" : "border-indigo-200"}
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
                        ? "border-indigo-600 bg-indigo-600 text-white shadow-md"
                        : "border-indigo-100 bg-white text-gray-600 hover:border-indigo-200 hover:text-indigo-600"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
              <p className="mt-3 text-xs text-gray-500 flex items-center gap-1">
                <CalendarDays className="w-3 h-3" />
                {isRecurring
                  ? `Saved as a ${recurrence} transaction.`
                  : "Enable recurring mode to store a schedule."}
              </p>
            </div>
          </div>
        </div>

        <DialogFooter className="sm:justify-start gap-2">
          <DialogClose asChild>
            <Button
              variant="outline"
              className="flex-1 h-11 rounded-xl border-gray-300 hover:bg-gray-50"
            >
              Cancel
            </Button>
          </DialogClose>
          <Button
            disabled={!name || !amount || loading}
            onClick={onUpdateExpense}
            className="flex-1 h-11 rounded-xl bg-indigo-600 hover:bg-indigo-700 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Update Expense"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default EditExpense;
