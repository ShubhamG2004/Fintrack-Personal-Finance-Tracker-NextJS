"use client"
import { motion } from 'framer-motion';
import { db } from '@/utils/dbConfig';
import { Budgets, Expenses } from '@/utils/schema';
import { desc, eq } from 'drizzle-orm';
import React, { useEffect, useMemo, useState } from 'react'
import ExpenseListTable from './_components/ExpenseListTable';
import { useUser } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import moment from 'moment';
import { Calendar, Filter, IndianRupee, BarChart3, BadgePercent, Download, ArrowUpDown, Receipt, Repeat2, RotateCcw, Search, Tag, TrendingDown, Clock3, PieChart } from 'lucide-react';

function ExpensesScreen() {
  const [expensesList, setExpensesList] = useState([]);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [recurrenceFilter, setRecurrenceFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const { user } = useUser();

  async function getAllExpenses() {
    setLoading(true);
    const result = await db.select({
      id: Expenses.id,
      name: Expenses.name,
      amount: Expenses.amount,
      category: Expenses.category,
      createdAt: Expenses.createdAt,
      budgetId: Expenses.budgetId,
      budgetName: Budgets.name,
      userId: Expenses.userId,
      isRecurring: Expenses.isRecurring,
      recurrence: Expenses.recurrence,
    }).from(Budgets)
      .rightJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
      .where(eq(Budgets.createdBy, user?.primaryEmailAddress.emailAddress))
      .orderBy(desc(Expenses.id));
    
    setExpensesList(result);
    
    // Calculate total expenses
    const total = result.reduce((sum, expense) => sum + parseFloat(expense.amount || 0), 0);
    setTotalExpenses(total);
    setLoading(false);
  }

  useEffect(() => {
    user && getAllExpenses();
  }, [user])

  const categoryOptions = useMemo(() => {
    const uniqueCategories = new Set(
      expensesList
        .map((expense) => expense.category || 'General')
        .filter(Boolean)
    );

    return ['all', ...Array.from(uniqueCategories).sort()];
  }, [expensesList]);

  const filteredExpenses = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    const items = expensesList.filter((expense) => {
      const name = String(expense.name ?? '').toLowerCase();
      const category = String(expense.category ?? 'General').toLowerCase();
      const budgetName = String(expense.budgetName ?? '').toLowerCase();
      const createdAt = String(expense.createdAt ?? '').toLowerCase();
      const recurrence = String(expense.recurrence ?? 'one-time').toLowerCase();
      const isRecurring = Boolean(expense.isRecurring);

      const matchesSearch =
        !query ||
        name.includes(query) ||
        category.includes(query) ||
        budgetName.includes(query) ||
        createdAt.includes(query);

      const matchesCategory =
        categoryFilter === 'all' || category === categoryFilter.toLowerCase();

      const matchesRecurrence =
        recurrenceFilter === 'all' ||
        (recurrenceFilter === 'recurring' && isRecurring) ||
        (recurrenceFilter === 'one-time' && !isRecurring) ||
        recurrence === recurrenceFilter.toLowerCase();

      return matchesSearch && matchesCategory && matchesRecurrence;
    });

    return [...items].sort((left, right) => {
      const leftAmount = Number(left.amount ?? 0);
      const rightAmount = Number(right.amount ?? 0);
      const leftName = String(left.name ?? '').toLowerCase();
      const rightName = String(right.name ?? '').toLowerCase();
      const leftDate = moment(left.createdAt, [moment.ISO_8601, 'YYYY-MM-DD', 'DD/MM/YYYY', 'DD/MM/yyyy'], true).valueOf();
      const rightDate = moment(right.createdAt, [moment.ISO_8601, 'YYYY-MM-DD', 'DD/MM/YYYY', 'DD/MM/yyyy'], true).valueOf();

      switch (sortBy) {
        case 'oldest':
          return leftDate - rightDate;
        case 'amount-high':
          return rightAmount - leftAmount;
        case 'amount-low':
          return leftAmount - rightAmount;
        case 'name-az':
          return leftName.localeCompare(rightName);
        case 'newest':
        default:
          return rightDate - leftDate;
      }
    });
  }, [expensesList, searchTerm, categoryFilter, recurrenceFilter, sortBy]);

  const expenseInsights = useMemo(() => {
    const recurringCount = expensesList.filter((expense) => expense.isRecurring).length;
    const averageExpense = expensesList.length > 0
      ? expensesList.reduce((sum, expense) => sum + Number(expense.amount ?? 0), 0) / expensesList.length
      : 0;

    const categoryTotals = expensesList.reduce((accumulator, expense) => {
      const category = String(expense.category ?? 'General');
      accumulator[category] = (accumulator[category] ?? 0) + Number(expense.amount ?? 0);
      return accumulator;
    }, {});

    const topCategory = Object.entries(categoryTotals).sort((left, right) => right[1] - left[1])[0];

    const latestExpense = expensesList[0];

    return {
      recurringCount,
      averageExpense,
      topCategory: topCategory ? { name: topCategory[0], amount: topCategory[1] } : null,
      latestExpense,
    };
  }, [expensesList]);

  const exportVisibleExpenses = () => {
    if (filteredExpenses.length === 0) {
      return;
    }

    const headers = ['Name', 'Amount', 'Category', 'Recurring', 'Recurrence', 'Date', 'Budget'];
    const rows = filteredExpenses.map((expense) => [
      expense.name,
      Number(expense.amount ?? 0).toFixed(2),
      expense.category ?? 'General',
      expense.isRecurring ? 'Yes' : 'No',
      expense.isRecurring ? expense.recurrence ?? 'monthly' : 'one-time',
      expense.createdAt,
      expense.budgetName ?? '',
    ]);

    const escapeCsvCell = (value) => `"${String(value ?? '').replace(/"/g, '""')}"`;
    const csv = [headers, ...rows]
      .map((row) => row.map(escapeCsvCell).join(','))
      .join('\n');

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = `fintrack-expenses-${moment().format('YYYY-MM-DD')}.csv`;
    anchor.click();
    URL.revokeObjectURL(url);
  };

  const hasFilters = Boolean(searchTerm || categoryFilter !== 'all' || recurrenceFilter !== 'all');

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <div className='p-6 md:p-10 bg-gradient-to-br from-white via-red-50/30 to-orange-50/30 min-h-screen'>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        className='mb-8'
      >
        <div className='flex items-center gap-3 mb-4'>
          <div className='p-3 bg-gradient-to-r from-red-500 to-orange-500 rounded-xl shadow-lg'>
            <Receipt className='w-8 h-8 text-white' />
          </div>
          <div>
            <h1 className='font-extrabold text-4xl bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent'>
              My Expenses
            </h1>
            <p className='text-gray-600 mt-1'>Track and analyze your spending patterns</p>
          </div>
        </div>

        <div className='bg-white/70 backdrop-blur-lg border border-white/20 shadow-lg rounded-2xl p-4 mb-6'>
          <div className='grid grid-cols-1 lg:grid-cols-3 gap-4'>
            <div className='relative'>
              <Search className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400' />
              <Input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder='Search by name, category, budget, or date'
                className='pl-10 h-11 rounded-xl border-gray-200 bg-white/80'
              />
            </div>

            <div className='space-y-2'>
              <label className='text-sm font-medium text-gray-700 flex items-center gap-2'>
                <Tag className='w-4 h-4' />
                Category
              </label>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className='h-11 w-full rounded-xl border border-gray-200 bg-white/80 px-3 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-orange-200'
              >
                {categoryOptions.map((option) => (
                  <option key={option} value={option}>
                    {option === 'all' ? 'All categories' : option}
                  </option>
                ))}
              </select>
            </div>

            <div className='space-y-2'>
              <label className='text-sm font-medium text-gray-700 flex items-center gap-2'>
                <Repeat2 className='w-4 h-4' />
                Schedule
              </label>
              <select
                value={recurrenceFilter}
                onChange={(e) => setRecurrenceFilter(e.target.value)}
                className='h-11 w-full rounded-xl border border-gray-200 bg-white/80 px-3 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-orange-200'
              >
                <option value='all'>All transactions</option>
                <option value='recurring'>Recurring only</option>
                <option value='one-time'>One-time only</option>
                <option value='weekly'>Weekly</option>
                <option value='biweekly'>Biweekly</option>
                <option value='monthly'>Monthly</option>
                <option value='yearly'>Yearly</option>
              </select>
            </div>
          </div>

          <div className='mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4'>
            <div className='space-y-2'>
              <label className='text-sm font-medium text-gray-700 flex items-center gap-2'>
                <ArrowUpDown className='w-4 h-4' />
                Sort
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className='h-11 w-full rounded-xl border border-gray-200 bg-white/80 px-3 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-orange-200'
              >
                <option value='newest'>Newest first</option>
                <option value='oldest'>Oldest first</option>
                <option value='amount-high'>Amount: high to low</option>
                <option value='amount-low'>Amount: low to high</option>
                <option value='name-az'>Name: A to Z</option>
              </select>
            </div>

            <div className='space-y-2'>
              <label className='text-sm font-medium text-gray-700 flex items-center gap-2'>
                <Download className='w-4 h-4' />
                Export
              </label>
              <Button
                type='button'
                onClick={exportVisibleExpenses}
                disabled={filteredExpenses.length === 0}
                className='h-11 w-full rounded-xl bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 disabled:opacity-60 disabled:cursor-not-allowed'
              >
                Export CSV
              </Button>
            </div>

            <div className='space-y-2'>
              <label className='text-sm font-medium text-gray-700 flex items-center gap-2'>
                <Filter className='w-4 h-4' />
                Active filters
              </label>
              <div className='h-11 flex items-center gap-2 rounded-xl border border-gray-200 bg-white/80 px-3 text-sm text-gray-600'>
                <Filter className='w-4 h-4 text-gray-400' />
                {hasFilters ? 'Custom view enabled' : 'All expenses'}
              </div>
            </div>

            <div className='space-y-2'>
              <label className='text-sm font-medium text-gray-700 flex items-center gap-2'>
                <PieChart className='w-4 h-4' />
                Insight
              </label>
              <div className='h-11 flex items-center gap-2 rounded-xl border border-gray-200 bg-white/80 px-3 text-sm text-gray-600'>
                <BadgePercent className='w-4 h-4 text-gray-400' />
                {expenseInsights.topCategory ? expenseInsights.topCategory.name : 'No data yet'}
              </div>
            </div>
          </div>

          <div className='mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
            <p className='text-sm text-gray-600'>
              Showing <span className='font-semibold text-gray-800'>{filteredExpenses.length}</span> of <span className='font-semibold text-gray-800'>{expensesList.length}</span> transactions
            </p>

            <Button
              type='button'
              variant='ghost'
              onClick={() => {
                setSearchTerm('');
                setCategoryFilter('all');
                setRecurrenceFilter('all');
              }}
              disabled={!hasFilters}
              className='w-fit gap-2 text-gray-600 hover:text-gray-800'
            >
              <RotateCcw className='w-4 h-4' />
              Reset filters
            </Button>
          </div>
        </div>
        
        {/* Stats Cards */}
        <div className='grid grid-cols-1 md:grid-cols-4 gap-4 mb-6'>
          <motion.div 
            className='bg-white/70 backdrop-blur-lg p-4 rounded-xl border border-white/20 shadow-lg'
            whileHover={{ scale: 1.02, boxShadow: "0 8px 32px rgba(239,68,68,0.15)" }}
          >
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm text-gray-600'>Total Expenses</p>
                <div className='flex items-center gap-1'>
                  <IndianRupee className='w-5 h-5 text-red-500' />
                  <p className='font-bold text-xl text-gray-800'>
                    {loading ? '...' : totalExpenses.toLocaleString('en-IN')}
                  </p>
                </div>
              </div>
              <TrendingDown className='w-8 h-8 text-red-500' />
            </div>
          </motion.div>
          
          <motion.div 
            className='bg-white/70 backdrop-blur-lg p-4 rounded-xl border border-white/20 shadow-lg'
            whileHover={{ scale: 1.02, boxShadow: "0 8px 32px rgba(59,130,246,0.15)" }}
          >
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm text-gray-600'>Total Transactions</p>
                <p className='font-bold text-xl text-gray-800'>
                  {loading ? '...' : expensesList.length}
                </p>
              </div>
              <BarChart3 className='w-8 h-8 text-blue-500' />
            </div>
          </motion.div>
          
          <motion.div 
            className='bg-white/70 backdrop-blur-lg p-4 rounded-xl border border-white/20 shadow-lg'
            whileHover={{ scale: 1.02, boxShadow: "0 8px 32px rgba(139,92,246,0.15)" }}
          >
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm text-gray-600'>This Month</p>
                <p className='font-bold text-xl text-gray-800'>Active</p>
              </div>
              <Calendar className='w-8 h-8 text-purple-500' />
            </div>
          </motion.div>
          
          <motion.div 
            className='bg-white/70 backdrop-blur-lg p-4 rounded-xl border border-white/20 shadow-lg'
            whileHover={{ scale: 1.02, boxShadow: "0 8px 32px rgba(34,197,94,0.15)" }}
          >
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm text-gray-600'>Filters</p>
                <p className='font-bold text-xl text-gray-800'>Available</p>
              </div>
              <Filter className='w-8 h-8 text-green-500' />
            </div>
          </motion.div>
        </div>
      </motion.div>
      
      <ExpenseListTable 
        refreshData={() => getAllExpenses()}
        expensesList={filteredExpenses}
        loading={loading}
        emptyTitle={hasFilters ? 'No Matching Transactions' : 'No Expenses Yet'}
        emptyDescription={hasFilters ? 'Try adjusting or clearing the filters to see more results.' : 'Start adding expenses to track your spending'}
      />

      <div className='mt-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4'>
        <motion.div
          className='bg-white/70 backdrop-blur-lg p-4 rounded-xl border border-white/20 shadow-lg'
          whileHover={{ scale: 1.02, boxShadow: '0 8px 32px rgba(239,68,68,0.15)' }}
        >
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm text-gray-600'>Average Expense</p>
              <div className='flex items-center gap-1'>
                <IndianRupee className='w-5 h-5 text-red-500' />
                <p className='font-bold text-xl text-gray-800'>
                  {loading ? '...' : expenseInsights.averageExpense.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                </p>
              </div>
            </div>
            <Clock3 className='w-8 h-8 text-red-500' />
          </div>
        </motion.div>

        <motion.div
          className='bg-white/70 backdrop-blur-lg p-4 rounded-xl border border-white/20 shadow-lg'
          whileHover={{ scale: 1.02, boxShadow: '0 8px 32px rgba(249,115,22,0.15)' }}
        >
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm text-gray-600'>Recurring Transactions</p>
              <p className='font-bold text-xl text-gray-800'>
                {loading ? '...' : expenseInsights.recurringCount}
              </p>
            </div>
            <Repeat2 className='w-8 h-8 text-orange-500' />
          </div>
        </motion.div>

        <motion.div
          className='bg-white/70 backdrop-blur-lg p-4 rounded-xl border border-white/20 shadow-lg'
          whileHover={{ scale: 1.02, boxShadow: '0 8px 32px rgba(59,130,246,0.15)' }}
        >
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm text-gray-600'>Top Category</p>
              <p className='font-bold text-xl text-gray-800'>
                {loading ? '...' : expenseInsights.topCategory?.name ?? 'N/A'}
              </p>
              <p className='text-xs text-gray-500 mt-1'>
                {expenseInsights.topCategory ? `₹${expenseInsights.topCategory.amount.toLocaleString('en-IN')}` : 'No category data yet'}
              </p>
            </div>
            <PieChart className='w-8 h-8 text-blue-500' />
          </div>
        </motion.div>

        <motion.div
          className='bg-white/70 backdrop-blur-lg p-4 rounded-xl border border-white/20 shadow-lg'
          whileHover={{ scale: 1.02, boxShadow: '0 8px 32px rgba(34,197,94,0.15)' }}
        >
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm text-gray-600'>Latest Entry</p>
              <p className='font-bold text-xl text-gray-800'>
                {loading ? '...' : expenseInsights.latestExpense?.name ?? 'N/A'}
              </p>
              <p className='text-xs text-gray-500 mt-1'>
                {expenseInsights.latestExpense ? expenseInsights.latestExpense.createdAt : 'No transactions yet'}
              </p>
            </div>
            <BadgePercent className='w-8 h-8 text-green-500' />
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default ExpensesScreen