import { z } from "zod";

export const transactionSchema = z.object({
  name: z.string().trim().min(2, "Name is required"),
  amount: z.coerce.number().positive("Amount must be greater than zero"),
  budgetId: z.coerce.number().int().positive("Budget id is invalid"),
  category: z.string().trim().optional(),
  createdAt: z.string().trim().min(1, "createdAt is required"),
  userId: z.string().trim().min(3, "userId is required"),
});

export const parseTransactionInput = (payload) => transactionSchema.parse(payload);
