import { getFinancialDataset } from "@/lib/db/queries";

const RECURRENCE_MONTHLY_MULTIPLIER = {
  weekly: 4.33,
  biweekly: 2.17,
  monthly: 1,
  yearly: 1 / 12,
};

const toAmount = (value) => {
  const parsed = Number(value ?? 0);
  return Number.isFinite(parsed) ? parsed : 0;
};

const roundCurrency = (value) => Number(value.toFixed(2));

const parseDateValue = (value) => {
  if (!value) {
    return null;
  }

  if (value instanceof Date) {
    return Number.isNaN(value.getTime()) ? null : value;
  }

  const isoParsed = new Date(value);
  if (!Number.isNaN(isoParsed.getTime())) {
    return isoParsed;
  }

  const slashDate = String(value).match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (!slashDate) {
    return null;
  }

  const day = Number(slashDate[1]);
  const month = Number(slashDate[2]);
  const year = Number(slashDate[3]);
  const parsed = new Date(Date.UTC(year, month - 1, day));

  return Number.isNaN(parsed.getTime()) ? null : parsed;
};

const inCurrentMonth = (date, now) => {
  return (
    date.getUTCFullYear() === now.getUTCFullYear() &&
    date.getUTCMonth() === now.getUTCMonth()
  );
};

const getHealthScore = ({
  budgetUtilization,
  projectedUtilization,
  recurringCoverage,
  recurringToIncome,
}) => {
  let score = 100;

  if (budgetUtilization > 1) {
    score -= Math.min(35, (budgetUtilization - 1) * 70);
  } else {
    score += Math.min(8, (1 - budgetUtilization) * 10);
  }

  if (projectedUtilization > 1) {
    score -= Math.min(25, (projectedUtilization - 1) * 55);
  }

  if (recurringCoverage > 0.6) {
    score -= Math.min(20, recurringCoverage * 25);
  }

  if (recurringToIncome > 0.5) {
    score -= Math.min(20, recurringToIncome * 35);
  } else {
    score += Math.min(10, (0.5 - recurringToIncome) * 20);
  }

  return Math.max(0, Math.min(100, Math.round(score)));
};

const getRiskBand = (score) => {
  if (score >= 80) {
    return "LOW";
  }

  if (score >= 55) {
    return "MEDIUM";
  }

  return "HIGH";
};

const getSummaryMessage = ({ score, budgetUtilization, projectedUtilization }) => {
  if (score >= 80) {
    return "Spending is controlled. Keep your current trajectory.";
  }

  if (projectedUtilization > 1) {
    return "Current pace may exceed your monthly budget. Consider trimming variable costs.";
  }

  if (budgetUtilization > 1) {
    return "You are over budget this month. Review recurring and discretionary spend.";
  }

  return "Financial posture is stable, but there is room to improve spending efficiency.";
};

export const getFinancialInsights = async ({ userId }) => {
  const { expenses, budgets, incomes } = await getFinancialDataset({ userId });
  const now = new Date();
  const monthDays = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + 1, 0)
  ).getUTCDate();
  const windowStart = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

  const totalBudget = budgets.reduce((sum, budget) => sum + toAmount(budget.amount), 0);
  const totalIncome = incomes.reduce((sum, income) => sum + toAmount(income.amount), 0);

  let spentThisMonth = 0;
  let spentLast30Days = 0;
  const categoryTotals = new Map();

  for (const expense of expenses) {
    const amount = toAmount(expense.amount);
    const parsedDate = parseDateValue(expense.createdAt);

    if (!parsedDate) {
      continue;
    }

    if (parsedDate >= windowStart && parsedDate <= now) {
      spentLast30Days += amount;
    }

    if (inCurrentMonth(parsedDate, now)) {
      spentThisMonth += amount;
      const category = expense.category || "General";
      categoryTotals.set(category, (categoryTotals.get(category) ?? 0) + amount);
    }
  }

  const recurringMonthlyCommitment = expenses.reduce((sum, expense) => {
    if (!expense.isRecurring) {
      return sum;
    }

    const amount = toAmount(expense.amount);
    const multiplier = RECURRENCE_MONTHLY_MULTIPLIER[expense.recurrence] ?? 1;
    return sum + amount * multiplier;
  }, 0);

  const averageDailySpend = spentLast30Days / 30;
  const projectedMonthSpend = averageDailySpend * monthDays;

  const budgetUtilization = totalBudget > 0 ? spentThisMonth / totalBudget : 0;
  const projectedUtilization = totalBudget > 0 ? projectedMonthSpend / totalBudget : 0;
  const recurringCoverage = totalBudget > 0 ? recurringMonthlyCommitment / totalBudget : 0;
  const recurringToIncome = totalIncome > 0 ? recurringMonthlyCommitment / totalIncome : 0;

  const healthScore = getHealthScore({
    budgetUtilization,
    projectedUtilization,
    recurringCoverage,
    recurringToIncome,
  });

  const topCategories = Array.from(categoryTotals.entries())
    .map(([name, amount]) => ({ name, amount: roundCurrency(amount) }))
    .sort((left, right) => right.amount - left.amount)
    .slice(0, 3);

  return {
    score: healthScore,
    riskBand: getRiskBand(healthScore),
    summary: getSummaryMessage({
      score: healthScore,
      budgetUtilization,
      projectedUtilization,
    }),
    metrics: {
      totalBudget: roundCurrency(totalBudget),
      totalIncome: roundCurrency(totalIncome),
      spentThisMonth: roundCurrency(spentThisMonth),
      projectedMonthSpend: roundCurrency(projectedMonthSpend),
      recurringMonthlyCommitment: roundCurrency(recurringMonthlyCommitment),
      budgetUtilization: Number((budgetUtilization * 100).toFixed(1)),
      projectedUtilization: Number((projectedUtilization * 100).toFixed(1)),
    },
    topCategories,
    generatedAt: new Date().toISOString(),
  };
};