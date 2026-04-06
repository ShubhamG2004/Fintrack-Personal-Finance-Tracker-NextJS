export default function AlertBanner({ message }) {
  if (!message) return null;

  return (
    <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-medium text-amber-800 shadow-sm">
      <span className="font-semibold">Alert:</span> {message}
    </div>
  );
}
