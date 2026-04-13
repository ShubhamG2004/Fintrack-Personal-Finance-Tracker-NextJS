import { db } from "@/utils/dbConfig";
import { Budgets, Expenses, Incomes } from "@/utils/schema";
import { and, desc, eq, ilike, or } from "drizzle-orm";

const buildExpensePayload = (data, { partial = false } = {}) => ({
  ...(data.name !== undefined && { name: data.name }),
  ...(data.amount !== undefined && { amount: parseFloat(data.amount) }),
  ...(data.budgetId !== undefined && { budgetId: Number(data.budgetId) }),
  ...(data.category !== undefined && { category: data.category ?? "General" }),
  ...(partial
    ? data.isRecurring !== undefined && { isRecurring: Boolean(data.isRecurring) }
    : { isRecurring: Boolean(data.isRecurring) }),
  ...(partial
    ? data.recurrence !== undefined && { recurrence: data.recurrence }
    : { recurrence: data.recurrence ?? "one-time" }),
  ...(data.userId !== undefined && { userId: data.userId }),
  ...(data.createdAt !== undefined && { createdAt: data.createdAt }),
});

export const saveTransaction = async (data) => {
  const payload = buildExpensePayload(data);

  const [saved] = await db.insert(Expenses).values(payload).returning();
  return saved;
};

export const updateTransaction = async (data) => {
  const payload = buildExpensePayload(data, { partial: true });

  const [updated] = await db
    .update(Expenses)
    .set(payload)
    .where(and(eq(Expenses.id, data.id), eq(Expenses.userId, data.userId)))
    .returning();

  return updated ?? null;
};

export const deleteTransaction = async ({ id, userId }) => {
  const [deleted] = await db
    .delete(Expenses)
    .where(and(eq(Expenses.id, id), eq(Expenses.userId, userId)))
    .returning();

  return deleted ?? null;
};

export const getTransactions = async ({
  userId,
  budgetId,
  search,
  category,
  recurrence,
  limit,
} = {}) => {
  const filters = [];

  if (userId) {
    filters.push(eq(Expenses.userId, userId));
  }

  if (budgetId) {
    filters.push(eq(Expenses.budgetId, Number(budgetId)));
  }

  if (category && category !== "all") {
    filters.push(eq(Expenses.category, category));
  }

  if (recurrence && recurrence !== "all") {
    if (recurrence === "recurring") {
      filters.push(eq(Expenses.isRecurring, true));
    } else if (recurrence === "one-time") {
      filters.push(eq(Expenses.isRecurring, false));
    } else {
      filters.push(eq(Expenses.recurrence, recurrence));
    }
  }

  if (search) {
    const searchTerm = `%${search}%`;
    filters.push(
      or(
        ilike(Expenses.name, searchTerm),
        ilike(Expenses.category, searchTerm),
        ilike(Expenses.createdAt, searchTerm)
      )
    );
  }

  let query = db.select().from(Expenses);

  if (filters.length > 0) {
    query = query.where(and(...filters));
  }

  query = query.orderBy(desc(Expenses.id));

  const parsedLimit = Number(limit);

  if (limit && !Number.isNaN(parsedLimit)) {
    query = query.limit(parsedLimit);
  }

  return query;
};

export const getFinancialDataset = async ({ userId }) => {
  const [expenses, budgets, incomes] = await Promise.all([
    db
      .select({
        id: Expenses.id,
        amount: Expenses.amount,
        category: Expenses.category,
        createdAt: Expenses.createdAt,
        isRecurring: Expenses.isRecurring,
        recurrence: Expenses.recurrence,
      })
      .from(Expenses)
      .where(eq(Expenses.userId, userId)),
    db
      .select({
        id: Budgets.id,
        amount: Budgets.amount,
      })
      .from(Budgets)
      .where(eq(Budgets.createdBy, userId)),
    db
      .select({
        id: Incomes.id,
        amount: Incomes.amount,
      })
      .from(Incomes)
      .where(eq(Incomes.createdBy, userId)),
  ]);

  return {
    expenses,
    budgets,
    incomes,
  };
};
