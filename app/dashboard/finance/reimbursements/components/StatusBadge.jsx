"use client";

export default function StatusBadge({ status = "" }) {
  const value = String(status).trim();

  const styles = {
    Draft: {
      bg: "bg-gray-100",
      text: "text-gray-700",
      dot: "bg-gray-500",
    },
    Submitted: {
      bg: "bg-blue-100",
      text: "text-blue-700",
      dot: "bg-blue-600",
    },
    Pending: {
      bg: "bg-yellow-100",
      text: "text-yellow-700",
      dot: "bg-yellow-500",
    },
    Approved: {
      bg: "bg-green-100",
      text: "text-green-700",
      dot: "bg-green-600",
    },
    Rejected: {
      bg: "bg-red-100",
      text: "text-red-700",
      dot: "bg-red-600",
    },
    Processing: {
      bg: "bg-purple-100",
      text: "text-purple-700",
      dot: "bg-purple-600",
    },
    Paid: {
      bg: "bg-emerald-100",
      text: "text-emerald-700",
      dot: "bg-emerald-600",
    },
    Cancelled: {
      bg: "bg-red-100",
      text: "text-red-700",
      dot: "bg-red-600",
    },
    Returned: {
      bg: "bg-orange-100",
      text: "text-orange-700",
      dot: "bg-orange-500",
    },
  };

  const current =
    styles[value] || {
      bg: "bg-gray-100",
      text: "text-gray-700",
      dot: "bg-gray-500",
    };

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${current.bg} ${current.text}`}
    >
      <span
        className={`h-2 w-2 rounded-full ${current.dot}`}
      />

      {value || "-"}
    </span>
  );
}