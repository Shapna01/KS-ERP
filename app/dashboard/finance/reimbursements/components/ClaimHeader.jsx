"use client";

import { ClipboardList } from "lucide-react";

export default function ClaimHeader({ claimId }) {
  return (
    <div className="flex items-start justify-between mb-8">

      <div>

        <h1 className="text-[36px] font-bold text-[#222]">
          {claimId}
        </h1>

        <p className="mt-2 text-sm text-gray-500 max-w-4xl">
          Create a purchase requisition by entering item or service
          details and submitting it for approval as per the configured
          workflow.
        </p>

      </div>

      <button
        type="button"
        className="flex items-center gap-2 rounded-md border border-[#A000A9] px-4 py-2 text-[#A000A9] hover:bg-[#FAF3FB]"
      >
        <ClipboardList size={17} />
        Audit Log
      </button>

    </div>
  );
}