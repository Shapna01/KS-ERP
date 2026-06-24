// components/projects/StatusBadge.jsx

export default function StatusBadge({
  status,
}) {
  const styles = {
    Approved:
      "bg-green-100 text-green-700",
    Rejected:
      "bg-red-100 text-red-700",
    "Yet to Approve":
      "bg-yellow-100 text-yellow-700",
    "On Hold":
      "bg-gray-100 text-gray-700",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-medium ${
        styles[status] ||
        "bg-gray-100 text-gray-700"
      }`}
    >
      {status}
    </span>
  );
}