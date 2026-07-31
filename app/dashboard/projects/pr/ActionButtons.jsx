"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
export default function ActionButtons({ formData }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const saveDraft = async () => {
    try {
      setLoading(true);      
      alert("Purchase Requisition saved as Draft.");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

const submitPR = async () => {
  if (!formData?.projectId) {
    alert("Project is required");
    return;
  }

  if (!formData?.expectedDeliveryDate) {
    alert("Please select Expected Delivery Date");
    return;
  }

  try {
    setLoading(true);

    const res = await fetch("/api/purchase-requisitions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...formData,
        projectId: Number(formData.projectId), 
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data?.error || "Request failed");
    }

    alert("Purchase Requisition Submitted Successfully");
    router.push(`/dashboard/projects/${formData.projectId}`);
  } catch (err) {
    console.error("submitPR error:", err.message);
    alert(err.message);
  } finally {
    setLoading(false);
  }
};

  return (
      <div className="sticky bottom-0 bg-white border-t border-gray-100 mt-10 pt-6 pb-2 flex justify-end gap-4">      <button
        type="button"
        className="px-6 py-3 rounded-2xl border border-gray-200 bg-white text-gray-600
        hover:bg-gray-50 transition font-medium"
      >
        Cancel
      </button>

      <button
        type="button"
        onClick={saveDraft}
        disabled={loading}
className="px-6 py-3 rounded-2xl border border-[#7A008C]
text-[#7A008C] bg-white font-medium
hover:bg-purple-50 transition-all duration-200
disabled:opacity-50"      >
        Save as Draft
      </button>

      <button
        type="button"
        onClick={submitPR} 
        disabled={loading}
className="bg-[#7A008C] text-white px-8 py-3 rounded-2xl
shadow-md hover:bg-[#66006f]
hover:scale-[1.02]
transition-all duration-200
font-medium
disabled:opacity-50"      >
        {loading ? (
  <span className="flex items-center gap-2">
    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
    Submitting...
  </span>
) : (
  "Submit PR"
)}
      </button>
    </div>
  );
}