"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ReasonModal from "./ReasonModal";
import ProjectStatusPopup from "./ProjectStatusPopup";
export default function ApprovalActions({ projectId }) {
  const router = useRouter();

  const [showModal, setShowModal] = useState(false);
  const [reason, setReason] = useState("");
  const [actionType, setActionType] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [popupStatus, setPopupStatus] = useState("");
  const handleSubmit = async () => {
  await fetch(`/api/projects/${projectId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      status: actionType,
      reason,
    }),
  });

  setShowModal(false);
  setReason("");

  if (actionType === "Rejected") {
    setPopupStatus("Rejected");
  } else if (actionType === "Hold") {
    setPopupStatus("Hold");
  }

  setShowPopup(true);
};
  const handleApprove = async () => {
  try {
    const response = await fetch(`/api/projects/${projectId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: "Approved",
      }),
    });

    if (response.ok) {
  setPopupStatus("Approved");
  setShowPopup(true);
}
  } catch (error) {
    console.error(error);
  }
};

  return (
    <>
      <div className="flex justify-center">
  <div className="bg-white border border-gray-100 shadow-sm rounded-3xl px-8 py-6 flex items-center gap-5">

        <button
          onClick={() => {
            setActionType("Hold");
            setShowModal(true);
          }}
          className="
            px-8 py-3 text-gray-900 
            rounded-2xl
            border border-yellow-200
            bg-yellow-50
            text-yellow-700
            font-medium
            shadow-sm
            hover:bg-yellow-100
            transition-all
            duration-200
            "
        >
          Hold
        </button>

        <button
          onClick={() => {
            setActionType("Rejected");
            setShowModal(true);
          }}
          className="
            px-8 py-3 text-gray-900 
            rounded-2xl
            border border-red-200
            bg-red-50
            text-red-600
            font-medium
            shadow-sm
            hover:bg-red-100
            transition-all
            duration-200
            "
        >
          Reject
        </button>

        <button
          onClick={handleApprove}
          className="
            px-10 py-3
            rounded-2xl
            bg-gradient-to-r
            from-[#7A008C]
            to-purple-700
            text-white
            font-semibold
            shadow-lg
            hover:scale-105
            hover:shadow-xl
            transition-all
            duration-200
            "
        >
          Approve
        </button>
        </div>
      </div>

      <ReasonModal
        open={showModal}
        title={
          actionType === "Hold"
            ? "What's your reason for hold?"
            : "What's your reason for rejection?"
        }
        reason={reason}
        setReason={setReason}
        onClose={() => {
          setShowModal(false);
          setReason("");
        }}
        onSubmit={handleSubmit}
      />
      <ProjectStatusPopup    
        open={showPopup}
        status={popupStatus}
        onClose={() => {
        setShowPopup(false);

    if (popupStatus === "Approved") {
      router.push(`/dashboard/projects/${projectId}/assign-team`);
    } else {
      router.push("/dashboard/projects");
    }
  }}
/>
    </>
  );
}