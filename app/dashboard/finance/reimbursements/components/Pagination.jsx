"use client";

import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function Pagination({
  page = 1,
  totalPages = 5,
  perPage = 10,
  total = 48,
  onPageChange,
}) {
  return (
    <div className="flex items-center justify-between px-6 py-5 bg-white border-t border-gray-200">

      <div className="flex items-center gap-3">

        <span className="text-sm text-gray-600">
          Showing
        </span>

        <select
          className="h-9 rounded-lg border border-gray-300 px-3 text-sm outline-none focus:border-[#7A008C]"
          defaultValue={perPage}
        >
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={30}>30</option>
          <option value={50}>50</option>
        </select>

        <span className="text-sm text-gray-600">
          of {total} entries
        </span>

      </div>

      <div className="flex items-center gap-2">

        <button
          disabled={page === 1}
          onClick={() => onPageChange?.(page - 1)}
          className={`w-10 h-10 rounded-lg border flex items-center justify-center transition ${
            page === 1
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "hover:bg-gray-100"
          }`}
        >
          <ChevronLeft size={18} />
        </button>

        {Array.from(
          { length: totalPages },
          (_, index) => (
            <button
              key={index}
              onClick={() =>
                onPageChange?.(index + 1)
              }
              className={`w-10 h-10 rounded-lg text-sm font-medium transition ${
                page === index + 1
                  ? "bg-[#7A008C] text-white"
                  : "border border-gray-300 hover:bg-gray-100"
              }`}
            >
              {index + 1}
            </button>
          )
        )}

        <button
          disabled={page === totalPages}
          onClick={() => onPageChange?.(page + 1)}
          className={`w-10 h-10 rounded-lg border flex items-center justify-center transition ${
            page === totalPages
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "hover:bg-gray-100"
          }`}
        >
          <ChevronRight size={18} />
        </button>

      </div>

    </div>
  );
}