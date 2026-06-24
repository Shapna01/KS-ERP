"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RejectPage({ params }) {
  const [reason, setReason] = useState("");
  const router = useRouter();

  const submitReject = async () => {
    await fetch(
      `/api/projects/${params.id}/reject`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          reason,
        }),
      }
    );

    router.push("/dashboard/projects");
  };

  return (
    <div className="p-6">
      <h1 className="mb-4 text-xl font-semibold">
        Reason For Rejection
      </h1>

      <textarea
        value={reason}
        onChange={(e) =>
          setReason(e.target.value)
        }
        className="border w-full h-40 p-3"
      />

      <button
        onClick={submitReject}
        className="mt-4 bg-red-500 text-white px-6 py-2 rounded"
      >
        Submit
      </button>
    </div>
  );
}