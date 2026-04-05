import {
  boolean,
    integer,
    numeric,
    pgTable,
    serial,
    varchar,
  } from "drizzle-orm/pg-core";
  
  export const Budgets = pgTable("budgets", {
    id: serial("id").primaryKey(),
    name: varchar("name").notNull(),
    amount: varchar("amount").notNull(),
    icon: varchar("icon"),
    createdBy: varchar("createdBy").notNull(),
  });
  
  export const Incomes = pgTable("incomes", {
    id: serial("id").primaryKey(),
    name: varchar("name").notNull(),
    amount: varchar("amount").notNull(),
    icon: varchar("icon"),
    createdBy: varchar("createdBy").notNull(),
  });
  export const Expenses = pgTable("expenses", {
    id: serial("id").primaryKey(),
    name: varchar("name").notNull(),
    amount: numeric("amount").notNull().default(0),
    category: varchar("category").default("General"),
    isRecurring: boolean("isRecurring").notNull().default(false),
    recurrence: varchar("recurrence").notNull().default("one-time"),
    budgetId: integer("budgetId").references(() => Budgets.id),
    userId: varchar("userId").notNull(),
    createdAt: varchar("createdAt").notNull(),
  });