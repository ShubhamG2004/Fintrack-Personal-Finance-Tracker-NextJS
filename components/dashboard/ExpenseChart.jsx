"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function ExpenseChart({ data = [] }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <h3 className="mb-4 text-base font-semibold text-slate-950">Expenses by Category</h3>
      <div className="h-64 w-full sm:h-72">
        <ResponsiveContainer>
          <BarChart data={data} margin={{ top: 0, right: 8, left: -8, bottom: 8 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="category" tickLine={false} axisLine={false} stroke="#64748b" minTickGap={24} tickMargin={8} />
            <YAxis tickLine={false} axisLine={false} stroke="#64748b" />
            <Tooltip
              cursor={{ fill: "rgba(59,130,246,0.06)" }}
              contentStyle={{
                borderRadius: 12,
                border: "1px solid #e2e8f0",
                boxShadow: "0 12px 32px rgba(15, 23, 42, 0.08)",
              }}
            />
            <Bar dataKey="amount" fill="#2563eb" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
