"use client";

import useSWR from "swr";
import { Activity, BadgeIndianRupee, CircleGauge, ShieldAlert } from "lucide-react";

const fetcher = async (url) => {
  const response = await fetch(url, { cache: "no-store" });
  if (!response.ok) {
    throw new Error("Failed to fetch insights");
  }

  return response.json();
};

const riskStyles = {
  LOW: "border-emerald-200 bg-emerald-50 text-emerald-700",
  MEDIUM: "border-amber-200 bg-amber-50 text-amber-700",
  HIGH: "border-red-200 bg-red-50 text-red-700",
};

const scoreStyles = {
  LOW: "text-emerald-600",
  MEDIUM: "text-amber-600",
  HIGH: "text-red-600",
};

export default function FinancialHealthCard({ userId }) {
  const shouldFetch = Boolean(userId);
  const { data, error, isLoading } = useSWR(
    shouldFetch ? `/api/insights?userId=${encodeURIComponent(userId)}` : null,
    fetcher,
    {
      refreshInterval: 30000,
      dedupingInterval: 10000,
      revalidateOnFocus: false,
    }
  );

  if (!userId) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm animate-pulse">
        <div className="h-5 w-40 rounded bg-slate-200" />
        <div className="mt-4 h-16 w-16 rounded-full bg-slate-200" />
        <div className="mt-4 h-4 w-full rounded bg-slate-200" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-5 text-sm text-red-700 shadow-sm">
        Unable to load financial health insights.
      </div>
    );
  }

  const riskBand = data.riskBand ?? "MEDIUM";
  const metrics = data.metrics ?? {};
  const topCategories = Array.isArray(data.topCategories) ? data.topCategories : [];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-base font-semibold text-slate-950">Financial Health</h3>
        <span
          className={`rounded-full border px-2 py-1 text-xs font-semibold ${riskStyles[riskBand] ?? riskStyles.MEDIUM}`}
        >
          {riskBand} RISK
        </span>
      </div>

      <div className="mt-4 flex items-center gap-4">
        <div className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-slate-100 bg-slate-50">
          <span className={`text-2xl font-bold ${scoreStyles[riskBand] ?? scoreStyles.MEDIUM}`}>
            {data.score}
          </span>
        </div>
        <p className="text-sm text-slate-600">{data.summary}</p>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-3 text-sm text-slate-700">
        <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-3 py-2">
          <span className="flex items-center gap-2">
            <Activity className="h-4 w-4 text-slate-500" />
            Budget Utilization
          </span>
          <strong>{metrics.budgetUtilization ?? 0}%</strong>
        </div>

        <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-3 py-2">
          <span className="flex items-center gap-2">
            <CircleGauge className="h-4 w-4 text-slate-500" />
            Projected Spend
          </span>
          <strong>Rs {Number(metrics.projectedMonthSpend ?? 0).toLocaleString("en-IN")}</strong>
        </div>

        <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-3 py-2">
          <span className="flex items-center gap-2">
            <BadgeIndianRupee className="h-4 w-4 text-slate-500" />
            Recurring Commitments
          </span>
          <strong>
            Rs {Number(metrics.recurringMonthlyCommitment ?? 0).toLocaleString("en-IN")}
          </strong>
        </div>

        <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-3 py-2">
          <span className="flex items-center gap-2">
            <ShieldAlert className="h-4 w-4 text-slate-500" />
            Monthly Budget
          </span>
          <strong>Rs {Number(metrics.totalBudget ?? 0).toLocaleString("en-IN")}</strong>
        </div>
      </div>

      <div className="mt-5">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
          Top Categories This Month
        </p>
        {topCategories.length > 0 ? (
          <div className="space-y-2">
            {topCategories.map((category) => (
              <div
                key={category.name}
                className="flex items-center justify-between rounded-lg border border-slate-200 px-3 py-2 text-sm"
              >
                <span>{category.name}</span>
                <strong>Rs {Number(category.amount ?? 0).toLocaleString("en-IN")}</strong>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-slate-500">No categorized spending in this month yet.</p>
        )}
      </div>
    </div>
  );
}