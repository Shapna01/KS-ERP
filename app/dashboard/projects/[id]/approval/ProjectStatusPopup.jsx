"use client";

import { Check, X, Hourglass, X as Close } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ProjectStatusPopup({
  open,
  status,
  onClose,
}) {
    const router = useRouter();
  if (!open) return null;

  const config = {
    Approved: {
      icon: <Check size={36} />,
      bg: "bg-green-200",
      text: "The Project has been approved Successfully.",
    },
    Rejected: {
      icon: <X size={32} />,
      bg: "bg-red-200",
      text: "The Project has been rejected.",
    },
    Hold: {
      icon: <Hourglass size={34} />,
      bg: "bg-gray-200",
      text: "The Project has been Put on Hold.",
    },
  };

  const item = config[status];

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">

      <div className="w-[420px] rounded-2xl bg-white shadow-xl overflow-hidden">

        <div className="flex justify-between items-center border-b px-6 py-4">
          <h2 className="font-semibold text-lg">
            Project Status
          </h2>

         <button
  onClick={() => {
    onClose();

    if (status === "Approved") {
      router.push("/projects");
    }
  }}
>
  <Close size={18} />
</button>
        </div>

        <div className="py-12 flex flex-col items-center">

          <div
            className={`w-16 h-16 rounded-full flex items-center justify-center ${item.bg}`}
          >
            {item.icon}
          </div>

          <p className="text-center mt-8 text-gray-700 w-64">
            {item.text}
          </p>

        </div>

      </div>

    </div>
  );
}