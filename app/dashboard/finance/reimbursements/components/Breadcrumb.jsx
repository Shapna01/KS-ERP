"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function Breadcrumb({ claimId }) {
  return (
    <div className="flex items-center text-sm mb-8">

      <Link
        href="/dashboard/finance/reimbursements"
        className="text-[#A000A9] hover:underline"
      >
        Reimbursement
      </Link>

      <ChevronRight
        size={15}
        className="mx-2 text-gray-400"
      />

      <span className="text-[#A000A9]">
        Claims
      </span>

      <ChevronRight
        size={15}
        className="mx-2 text-gray-400"
      />

      <span className="text-gray-600">
        {claimId}
      </span>

    </div>
  );
}