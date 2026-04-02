const severityStyles = {
  HIGH: "bg-red-100 text-red-700 border-red-200",
  MEDIUM: "bg-amber-100 text-amber-700 border-amber-200",
  LOW: "bg-blue-100 text-blue-700 border-blue-200",
};

export default function AlertPanel({ alerts = [] }) {
  if (!alerts.length) {
    return (
      <div className="rounded-2xl border bg-white p-4 text-sm text-gray-500 shadow-sm">
        No alert history yet.
      </div>
    );
  }

  return (
    <div className="rounded-2xl border bg-white p-4 shadow-sm">
      <h3 className="mb-3 text-base font-semibold">Alert History</h3>
      <div className="space-y-3">
        {alerts.map((alert) => (
          <div key={alert.id} className="rounded-xl border p-3">
            <div className="mb-2 flex items-center justify-between gap-2">
              <span
                className={`rounded-full border px-2 py-0.5 text-xs font-semibold ${severityStyles[alert.severity] ?? severityStyles.LOW}`}
              >
                {alert.severity}
              </span>
              <span className="text-xs text-gray-500">
                {new Date(alert.createdAt).toLocaleString("en-IN")}
              </span>
            </div>
            <p className="text-sm font-medium text-gray-700">{alert.message}</p>
            <p className="mt-1 text-xs text-gray-500">
              Confidence: {Math.round((alert.confidence ?? 0) * 100)}%
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
