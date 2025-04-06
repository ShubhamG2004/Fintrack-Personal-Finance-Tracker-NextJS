"use client";
import { db } from "@/utils/dbConfig";
import { Budgets, Expenses } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { desc, eq, getTableColumns, sql } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import BudgetItem from "../../budgets/_components/BudgetItem";
import AddExpense from "../_components/AddExpense";
import ExpenseListTable from "../_components/ExpenseListTable";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2, PenBox, Trash } from "lucide-react";
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
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import EditBudget from "../_components/EditBudget";

function ExpensesScreen({ params }) {
  const { user } = useUser();
  const [budgetInfo, setBudgetInfo] = useState(null);
  const [expensesList, setExpensesList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    user && getBudgetInfo();
  }, [user]);

  const getBudgetInfo = async () => {
    setLoading(true);
    try {
      const result = await db
        .select({
          ...getTableColumns(Budgets),
          totalSpend: sql`sum(${Expenses.amount})`.mapWith(Number),
          totalItem: sql`count(${Expenses.id})`.mapWith(Number),
        })
        .from(Budgets)
        .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
        .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
        .where(eq(Budgets.id, params.id))
        .groupBy(Budgets.id);

      setBudgetInfo(result[0]);
      await getExpensesList();
    } catch (error) {
      toast.error("Failed to load budget");
    } finally {
      setLoading(false);
    }
  };

  const getExpensesList = async () => {
    try {
      const result = await db
        .select()
        .from(Expenses)
        .where(eq(Expenses.budgetId, params.id))
        .orderBy(desc(Expenses.id));
      setExpensesList(result);
    } catch (error) {
      toast.error("Failed to load expenses");
    }
  };

  const deleteBudget = async () => {
    setDeleting(true);
    try {
      await db.delete(Expenses).where(eq(Expenses.budgetId, params.id));
      await db.delete(Budgets).where(eq(Budgets.id, params.id));

      toast.success("Budget Deleted", {
        description: "All related expenses have been removed",
      });
      router.replace("/dashboard/budgets");
    } catch (error) {
      toast.error("Failed to delete budget");
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto">
      <div className="flex flex-col gap-6">
        {/* Header Section */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.back()}
              className="rounded-full hover:bg-gray-100"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              Expense Management
            </h1>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 justify-end">
            <EditBudget
              budgetInfo={budgetInfo}
              refreshData={getBudgetInfo}
            />

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="destructive"
                  className="gap-2 rounded-full"
                >
                  <Trash className="w-4 h-4" />
                  Delete Budget
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="rounded-xl">
                <AlertDialogHeader>
                  <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
                  <AlertDialogDescription className="text-gray-600">
                    This will permanently delete the "{budgetInfo?.name}" budget and all 
                    {budgetInfo?.totalItem} associated expenses. This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="rounded-xl">Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={deleteBudget}
                    disabled={deleting}
                    className="rounded-xl bg-red-600 hover:bg-red-700"
                  >
                    {deleting ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      "Delete Permanently"
                    )}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>

        {/* Budget and Add Expense Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {budgetInfo ? (
            <BudgetItem budget={budgetInfo} />
          ) : (
            <div className="h-48 bg-gray-100 rounded-xl animate-pulse"></div>
          )}
          <AddExpense
            budgetId={params.id}
            user={user}
            refreshData={getBudgetInfo}
          />
        </div>

        {/* Expenses Table */}
        <div className="mt-2">
          <ExpenseListTable
            expensesList={expensesList}
            refreshData={getBudgetInfo}
          />
        </div>
      </div>
    </div>
  );
}

export default ExpensesScreen;