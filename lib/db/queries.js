import { db } from "@/utils/dbConfig";
import { Expenses } from "@/utils/schema";

export const saveTransaction = async (data) => {
  const payload = {
    name: data.name,
    amount: parseFloat(data.amount),
    budgetId: data.budgetId,
    createdAt: data.createdAt,
  };

  const [saved] = await db.insert(Expenses).values(payload).returning();
  return saved;
};
