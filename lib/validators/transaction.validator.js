import { z } from "zod";

const recurrenceOptions = ["one-time", "weekly", "biweekly", "monthly", "yearly"];

export const transactionSchema = z.object({
  name: z.string().trim().min(2, "Name is required"),
  amount: z.coerce.number().positive("Amount must be greater than zero"),
  budgetId: z.coerce.number().int().positive("Budget id is invalid"),
  category: z.string().trim().optional(),
  createdAt: z.string().trim().min(1, "createdAt is required"),
  userId: z.string().trim().min(3, "userId is required"),
  isRecurring: z.coerce.boolean().optional().default(false),
  recurrence: z.enum(recurrenceOptions).optional().default("one-time"),
});

export const parseTransactionInput = (payload) => transactionSchema.parse(payload);

export const transactionUpdateSchema = z.object({
  id: z.coerce.number().int().positive("Transaction id is invalid"),
  name: z.string().trim().min(2, "Name is required").optional(),
  amount: z.coerce.number().positive("Amount must be greater than zero").optional(),
  budgetId: z.coerce.number().int().positive("Budget id is invalid").optional(),
  category: z.string().trim().optional(),
  createdAt: z.string().trim().optional(),
  userId: z.string().trim().min(3, "userId is required"),
  isRecurring: z.coerce.boolean().optional(),
  recurrence: z.enum(recurrenceOptions).optional(),
});

export const parseTransactionUpdateInput = (payload) =>
  transactionUpdateSchema.parse(payload);

export const transactionDeleteSchema = z.object({
  id: z.coerce.number().int().positive("Transaction id is invalid"),
  userId: z.string().trim().min(3, "userId is required"),
});

export const parseTransactionDeleteInput = (payload) =>
  transactionDeleteSchema.parse(payload);
