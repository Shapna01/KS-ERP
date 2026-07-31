"use client";

export default function StatusBadge({ status }) {
  const styles = {
    Approved: "bg-green-100 text-green-700",
    Pending: "bg-yellow-100 text-yellow-700",
    Rejected: "bg-red-100 text-red-700",
    Draft: "bg-gray-100 text-gray-700",
    Closed: "bg-blue-100 text-blue-700",
    Active: "bg-green-100 text-green-700",
    Inactive: "bg-gray-100 text-gray-700",
    "Purchase Order": "bg-blue-100 text-blue-700",

    Paid: "bg-green-100 text-green-700",
    Unpaid: "bg-red-100 text-red-700",
    "Partially Paid": "bg-yellow-100 text-yellow-700",

    Submitted: "bg-blue-100 text-blue-700",
    Processing: "bg-yellow-100 text-yellow-700",
    Cancelled: "bg-red-100 text-red-700",
    Overdue: "bg-red-100 text-red-700",

    Matched: "bg-green-100 text-green-700",
    "Partially Matched": "bg-yellow-100 text-yellow-700",
    Mismatch: "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`inline-flex items-center justify-center px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
        styles[status] || "bg-gray-100 text-gray-700"
      }`}
    >
      {status}
    </span>
  );
}