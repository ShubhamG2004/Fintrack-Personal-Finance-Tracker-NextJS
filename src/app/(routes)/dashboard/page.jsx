'use client'

import React,{useState, useEffect} from 'react'
import { UserButton, useUser } from '@clerk/nextjs'
import CardInfo from './_components/CardInfo';
import { eq, getTableColumns } from 'drizzle-orm';
import { BarChart, Bug } from 'lucide-react';
import { Expenses } from '@/utils/schema';


function Dashboard(){
    const [budgetList, setBudgetList] = useState([]);
    const [incomeList, setIncomeList] = useState([]);
    const [expenseList, setExpenseList] = useState([]); 
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        user && getBudgetList()
    },[user])

    const getBudgetList = async () => {
        const result = await db
          .select({
            ...getTableColumns(Budgets),
    
            totalSpend: sql`sum(${Expenses.amount})`.mapWith(Number),
            totalItem: sql`count(${Expenses.id})`.mapWith(Number),
          })
          .from(Budgets)
          .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
          .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
          .groupBy(Budgets.id)
          .orderBy(desc(Budgets.id));
        setBudgetList(result);
        getAllExpenses();
        getIncomeList();
      };

      /**
   * Used to get All expenses belong to users
   */
  const getAllExpenses = async () => {
    const result = await db
      .select({
        id: Expenses.id,
        name: Expenses.name,
        amount: Expenses.amount,
        createdAt: Expenses.createdAt,
      })
      .from(Budgets)
      .rightJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
      .where(eq(Budgets.createdBy, user?.primaryEmailAddress.emailAddress))
      .orderBy(desc(Expenses.id));
    setExpensesList(result);
  };

  const getIncomeList = async () => {
    try {
      const result = await db
        .select({
          ...getTableColumns(Incomes),
          totalAmount: sql`SUM(CAST(${Incomes.amount} AS NUMERIC))`.mapWith(
            Number
          ),
        })
        .from(Incomes)
        .groupBy(Incomes.id); // Assuming you want to group by ID or any other relevant column

      setIncomeList(result);
    } catch (error) {
      console.error("Error fetching income list:", error);
    }
  };

    const {user} = useUser();
    return(
        <div className='p-8'>
            <h2 className='font-bold text-4xl'>hi, {user?.fullName}</h2>
            <p className='text-gray-500'>Here's what happeing with your money. Lets Manage Your Expenses</p>
            <CardInfo budgetList={budgetList} incomeList={incomeList} />

            <div className='grid grid-cols-1 lg:grid-cols-3 gap-4 mt-6'>
                <div className='lg:col-span-2'>
                    <BarChartDashboard budgetList={budgetList}/>
                    <ExpenseListTable 
                        expenseList={expenseList}
                        refreshData ={() =>getBudgetList()}
                    />
                </div>

                <div className="grid gap-5">
                    <h2 className="font-bold text-lg">Latest Budgets</h2>
                    {budgetList?.length > 0
                        ? budgetList.map((budget, index) => (
                            <BudgetItem budget={budget} key={index} />
                        ))
                        : [1, 2, 3, 4].map((item, index) => (
                            <div
                            className="h-[180xp] w-full
                            bg-slate-200 rounded-lg animate-pulse"
                            ></div>
                        ))}
                </div>
            </div>
        </div>
    )
}

export default Dashboard;