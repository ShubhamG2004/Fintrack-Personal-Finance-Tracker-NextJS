import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { db } from "@/utils/dbConfig";
import { Budgets, Expenses } from "@/utils/schema";
import { IndianRupee, Loader, PlusCircle } from "lucide-react";
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
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300">
      <div className="flex items-center gap-2 mb-4">
        <PlusCircle className="w-5 h-5 text-indigo-600" />
        <h2 className="font-bold text-lg text-gray-800">Add New Expense</h2>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Expense Name
          </label>
          <Input
            className="focus-visible:ring-indigo-200"
            placeholder="e.g. Groceries, Dining Out"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Expense Amount
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              <IndianRupee className="w-4 h-4" />
            </span>
            <Input
              type="number"
              className="pl-8 focus-visible:ring-indigo-200"
              placeholder="e.g. 1500"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
        </div>
      </div>

      <Button
        disabled={!name || !amount || loading}
        onClick={addNewExpense}
        className="mt-6 w-full h-11 rounded-xl bg-indigo-600 hover:bg-indigo-700 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {loading ? (
          <Loader className="w-4 h-4 animate-spin" />
        ) : (
          <span className="flex items-center gap-2">
            <PlusCircle className="w-4 h-4" />
            Add Expense
          </span>
        )}
      </Button>
    </div>
  );
}

export default AddExpense;