export default function TransactionList({ transactions = [] }) {
  if (!transactions.length) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-4 text-sm text-slate-500 shadow-sm">
        No transactions yet.
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <h3 className="mb-3 text-base font-semibold text-slate-950">Recent Transactions</h3>
      <ul className="space-y-2">
        {transactions.map((transaction) => (
          <li
            key={transaction.id}
            className="flex items-center justify-between rounded-xl border border-slate-200 px-3 py-2"
          >
            <span className="font-medium text-slate-700">{transaction.name}</span>
            <span className="text-sm font-medium text-slate-500">₹{Number(transaction.amount)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
