import { db } from "@/utils/dbConfig";
import { Expenses } from "@/utils/schema";
import { and, desc, eq, ilike, or } from "drizzle-orm";

const buildExpensePayload = (data) => ({
  name: data.name,
  amount: parseFloat(data.amount),
  ...(data.budgetId !== undefined && { budgetId: Number(data.budgetId) }),
  category: data.category ?? "General",
  isRecurring: Boolean(data.isRecurring),
  recurrence: data.recurrence ?? "one-time",
  userId: data.userId,
  createdAt: data.createdAt,
});

export const saveTransaction = async (data) => {
  const payload = buildExpensePayload(data);

  const [saved] = await db.insert(Expenses).values(payload).returning();
  return saved;
};

export const updateTransaction = async (data) => {
  const payload = buildExpensePayload(data);

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

  if (limit) {
    query = query.limit(Number(limit));
  }

  return query;
};
