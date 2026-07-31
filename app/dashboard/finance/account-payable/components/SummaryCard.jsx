"use client";

export default function SummaryCard({
  title,
  value,
  emoji,
}) {
  const formatCurrency = (amount) => {
    if (amount === null || amount === undefined) return "₹0";

    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm">

      <div className="flex items-center justify-between">

        <div>

          <p className="text-sm text-gray-500">
            {title}
          </p>

          <h2 className="text-2xl font-bold text-[#7A008C] mt-3">
            {formatCurrency(value)}
          </h2>

        </div>

        <div className="w-14 h-14 rounded-2xl bg-[#F6E5FA] flex items-center justify-center text-3xl">
          {emoji}
        </div>

      </div>

    </div>
  );
}