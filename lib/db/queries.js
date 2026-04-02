import { db } from "@/utils/dbConfig";
import { Expenses } from "@/utils/schema";

export const saveTransaction = async (data) => {
  const payload = {
    name: data.name,
    amount: parseFloat(data.amount),
    budgetId: data.budgetId,
    category: data.category ?? "General",
    userId: data.userId,
    createdAt: data.createdAt,
  };

  const [saved] = await db.insert(Expenses).values(payload).returning();
  return saved;
};
