"use client";

import { X } from "lucide-react";

export default function ReasonModal({
  open,
  title,
  reason,
  setReason,
  onClose,
  onSubmit,
  
}) {

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-[520px] bg-white rounded-2xl shadow-xl">

        <div className="flex items-center justify-between px-6 py-5 border-b">
          <h2 className="text-lg font-semibold text-[#111827]">
            {title}
          </h2>

          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-gray-100"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-6">
          <div className="flex justify-between mb-2">
            <label className="text-sm text-gray-700">
              Type your reason here
            </label>

            <span className="text-xs text-gray-400">
              {reason.length}/200
            </span>
          </div>

          <textarea
            maxLength={200}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Placeholder"
            className="w-full h-32 p-3 border border-gray-300 rounded-lg resize-none outline-none focus:ring-2 focus:ring-[#7A008C]"
          />
        </div>

        <div className="flex justify-end gap-3 px-6 py-4 border-t">
          <button
            onClick={onClose}
            className="text-[#7A008C] font-medium"
          >
            Cancel
          </button>

          <button
            onClick={onSubmit}
            className="px-5 py-2 bg-[#7A008C] text-white rounded-lg"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}