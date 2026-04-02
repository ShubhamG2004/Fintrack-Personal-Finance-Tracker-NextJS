export default function AlertBanner({ message }) {
  if (!message) return null;

  return (
    <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
      Alert: {message}
    </div>
  );
}
