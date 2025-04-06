"use client"
import { db } from '@/utils/dbConfig';
import { Budgets, Expenses } from '@/utils/schema';
import { desc, eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react'
import ExpenseListTable from './_components/ExpenseListTable';
import { useUser } from '@clerk/nextjs';
import { IndianRupee, Loader2, Plus, Filter, Download } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import AddExpense from './_components/AddExpense';

function ExpensesScreen() {
  const [expensesList, setExpensesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterOpen, setFilterOpen] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    user && getAllExpenses();
  }, [user])

  const getAllExpenses = async () => {
    setLoading(true);
    try {
      const result = await db.select({
        id: Expenses.id,
        name: Expenses.name,
        amount: Expenses.amount,
        createdAt: Expenses.createdAt,
        budgetName: Budgets.name,
        budgetId: Budgets.id
      }).from(Budgets)
        .rightJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
        .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
        .orderBy(desc(Expenses.id));
      
      setExpensesList(result);
    } catch (error) {
      toast.error("Failed to load expenses", {
        description: "Please try again later",
        action: {
          label: "Retry",
          onClick: () => getAllExpenses()
        }
      });
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const exportToCSV = () => {
    // Basic CSV export functionality
    const headers = ['Name', 'Amount', 'Date', 'Budget'].join(',');
    const rows = expensesList.map(expense => 
      [expense.name, expense.amount, expense.createdAt, expense.budgetName].join(',')
    ).join('\n');
    
    const csvContent = `${headers}\n${rows}`;
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'expenses.csv';
    link.click();
    
    toast.success("Export started", {
      description: "Your expense data is being downloaded"
    });
  };

  return (
    <div className='p-4 md:p-8 max-w-7xl mx-auto'>
      <div className='flex flex-col gap-6'>
        {/* Header Section */}
        <div className='flex flex-col gap-4'>
          <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
            <div className='flex items-center gap-3'>
              <div className='p-2 rounded-lg bg-indigo-100 text-indigo-600'>
                <IndianRupee className='w-6 h-6' />
              </div>
              <div>
                <h1 className='text-2xl md:text-3xl font-bold text-gray-800'>Expense Tracker</h1>
                <p className='text-gray-500'>
                  {loading ? "Loading..." : `${expensesList.length} transactions`}
                </p>
              </div>
            </div>
            
            <div className='flex gap-3'>
              <Button 
                variant="outline" 
                className='gap-2'
                onClick={() => setFilterOpen(!filterOpen)}
              >
                <Filter className='w-4 h-4' />
                Filter
              </Button>
              <Button 
                variant="outline" 
                className='gap-2'
                onClick={exportToCSV}
              >
                <Download className='w-4 h-4' />
                Export
              </Button>
              <AddExpense 
                refreshData={getAllExpenses}
                budgets={expensesList.map(e => ({ id: e.budgetId, name: e.budgetName }))}
              >
                <Button className='gap-2'>
                  <Plus className='w-4 h-4' />
                  Add Expense
                </Button>
              </AddExpense>
            </div>
          </div>

          {filterOpen && (
            <div className='bg-gray-50 p-4 rounded-lg border border-gray-200 animate-in fade-in'>
              <h3 className='font-medium text-gray-700 mb-3'>Filter Options</h3>
              <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>Date Range</label>
                  <select className='w-full rounded-md border-gray-300'>
                    <option>All Time</option>
                    <option>This Month</option>
                    <option>Last Month</option>
                    <option>Custom Range</option>
                  </select>
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>Budget</label>
                  <select className='w-full rounded-md border-gray-300'>
                    <option>All Budgets</option>
                    {Array.from(new Set(expensesList.map(e => e.budgetName))).map(name => (
                      <option key={name}>{name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>Amount Range</label>
                  <select className='w-full rounded-md border-gray-300'>
                    <option>Any Amount</option>
                    <option>Under ₹1,000</option>
                    <option>₹1,000 - ₹5,000</option>
                    <option>Over ₹5,000</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Stats Summary */}
        {!loading && expensesList.length > 0 && (
          <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
            <div className='bg-white p-4 rounded-lg border border-gray-200 shadow-sm'>
              <p className='text-sm text-gray-500'>Total Spent</p>
              <p className='text-2xl font-bold flex items-center'>
                <IndianRupee className='w-5 h-5 mr-1' />
                {expensesList.reduce((sum, e) => sum + (e.amount || 0), 0).toLocaleString('en-IN')}
              </p>
            </div>
            <div className='bg-white p-4 rounded-lg border border-gray-200 shadow-sm'>
              <p className='text-sm text-gray-500'>Avg. Daily</p>
              <p className='text-2xl font-bold flex items-center'>
                <IndianRupee className='w-5 h-5 mr-1' />
                {(expensesList.reduce((sum, e) => sum + (e.amount || 0), 0) / 30).toLocaleString('en-IN', { maximumFractionDigits: 2 })}
              </p>
            </div>
            <div className='bg-white p-4 rounded-lg border border-gray-200 shadow-sm'>
              <p className='text-sm text-gray-500'>Transactions</p>
              <p className='text-2xl font-bold'>{expensesList.length}</p>
            </div>
            <div className='bg-white p-4 rounded-lg border border-gray-200 shadow-sm'>
              <p className='text-sm text-gray-500'>Budgets Used</p>
              <p className='text-2xl font-bold'>
                {new Set(expensesList.map(e => e.budgetId)).size}
              </p>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <div className='flex flex-col items-center justify-center h-64 gap-4'>
            <Loader2 className='w-10 h-10 animate-spin text-indigo-600' />
            <p className='text-gray-500'>Loading your expenses...</p>
          </div>
        ) : (
          /* Expenses Table */
          <div className='bg-white rounded-xl border border-gray-200 overflow-hidden'>
            <ExpenseListTable 
              refreshData={getAllExpenses}
              expensesList={expensesList}
            />
            
            {expensesList.length === 0 && (
              <div className='p-12 text-center'>
                <div className='mx-auto max-w-md'>
                  <IndianRupee className='mx-auto h-12 w-12 text-gray-400' />
                  <h3 className='mt-2 text-lg font-medium text-gray-900'>No expenses recorded</h3>
                  <p className='mt-1 text-gray-500'>
                    Get started by adding your first expense.
                  </p>
                  <div className='mt-6'>
                    <AddExpense 
                      refreshData={getAllExpenses}
                      budgets={[]}
                    >
                      <Button>
                        <Plus className='w-4 h-4 mr-2' />
                        Add Expense
                      </Button>
                    </AddExpense>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default ExpensesScreen