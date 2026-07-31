"use client";

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between mt-6">

      <div className="text-sm text-gray-500">
        Page {currentPage} of {totalPages}
      </div>

      <div className="flex gap-2">

        <button
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          className={`px-4 py-2 rounded-lg border ${
            currentPage === 1
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "hover:bg-gray-50"
          }`}
        >
          Previous
        </button>

        {Array.from(
          { length: totalPages },
          (_, index) => (
            <button
              key={index}
              onClick={() =>
                onPageChange(index + 1)
              }
              className={`w-10 h-10 rounded-lg ${
                currentPage === index + 1
                  ? "bg-[#7A008C] text-white"
                  : "border hover:bg-gray-50"
              }`}
            >
              {index + 1}
            </button>
          )
        )}

        <button
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className={`px-4 py-2 rounded-lg border ${
            currentPage === totalPages
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "hover:bg-gray-50"
          }`}
        >
          Next
        </button>

      </div>

    </div>
  );
}