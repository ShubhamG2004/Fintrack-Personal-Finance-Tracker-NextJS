const severityStyles = {
  HIGH: "bg-red-50 text-red-700 border-red-200",
  MEDIUM: "bg-amber-50 text-amber-700 border-amber-200",
  LOW: "bg-blue-50 text-blue-700 border-blue-200",
};

export default function AlertPanel({ alerts = [] }) {
  if (!alerts.length) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-4 text-sm text-slate-500 shadow-sm">
        No alert history yet.
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <h3 className="mb-3 text-base font-semibold text-slate-950">Alert History</h3>
      <div className="space-y-3">
        {alerts.map((alert) => (
          <div key={alert.id} className="rounded-xl border border-slate-200 bg-slate-50 p-3">
            <div className="mb-2 flex items-center justify-between gap-2">
              <span
                className={`rounded-full border px-2 py-0.5 text-xs font-semibold ${severityStyles[alert.severity] ?? severityStyles.LOW}`}
              >
                {alert.severity}
              </span>
              <span className="text-xs text-slate-500">
                {new Date(alert.createdAt).toLocaleString("en-IN")}
              </span>
            </div>
            <p className="text-sm font-medium text-slate-700">{alert.message}</p>
            <p className="mt-1 text-xs text-slate-500">
              Confidence: {Math.round((alert.confidence ?? 0) * 100)}%
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
