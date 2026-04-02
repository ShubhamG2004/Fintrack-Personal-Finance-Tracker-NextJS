export default function TransactionList({ transactions = [] }) {
  if (!transactions.length) {
    return (
      <div className="rounded-2xl border bg-white p-4 text-sm text-gray-500 shadow-sm">
        No transactions yet.
      </div>
    );
  }

  return (
    <div className="rounded-2xl border bg-white p-4 shadow-sm">
      <h3 className="mb-3 text-base font-semibold">Recent Transactions</h3>
      <ul className="space-y-2">
        {transactions.map((transaction) => (
          <li
            key={transaction.id}
            className="flex items-center justify-between rounded-lg border px-3 py-2"
          >
            <span className="font-medium text-gray-700">{transaction.name}</span>
            <span className="text-sm text-gray-500">₹{Number(transaction.amount)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
