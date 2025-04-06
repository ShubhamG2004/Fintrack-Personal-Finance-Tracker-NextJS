import{
    integer,numeric, pgTable, serial, text, timestamp, varchar
} from 'drizzle-orm/pg-core';


// budgtes schema
export const Budgets = pgTable('budgets',{
    id:serial('id').primaryKey(),
    name:varchar('name', {length: 255}).notNull(),
    amount:varchar('amount').notNull(),
    Icon:varchar('icon').notNull(),
    CreatedBy: varchar('created_by', {length: 255}).notNull(),
    CreatedAt: timestamp('created_at').notNull().defaultNow(),
})


// income schema
export const Incomes = pgTable('incomes',{
    id:serial('id').primaryKey(),
    name:varchar('name', {length: 255}).notNull(),
    amount:varchar('amount').notNull(),
    Icon:varchar('icon').notNull(),
    CreatedBy: varchar('created_by', {length: 255}).notNull(),
    CreatedAt: timestamp('created_at').notNull().defaultNow(),
})

// Expenses schema
export const Expenses = pgTable('expenses',{
    id:serial('id').primaryKey(),
    name:varchar('name', {length: 255}).notNull(),
    amount:varchar('amount').notNull(),
    Icon:varchar('icon').notNull(),
    budgetId: integer('budgetId').references(() => Budgets.id).notNull(),
    CreatedBy: varchar('created_by', {length: 255}).notNull(),
    CreatedAt: timestamp('created_at').notNull().defaultNow(),
})