"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function HoldPage({ params }) {
  const [reason, setReason] = useState("");
  const router = useRouter();

  const submitHold = async () => {
    await fetch(
      `/api/projects/${params.id}/hold`,
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
        Reason For Hold
      </h1>

      <textarea
        value={reason}
        onChange={(e) =>
          setReason(e.target.value)
        }
        className="border w-full h-40 p-3"
      />

      <button
        onClick={submitHold}
        className="mt-4 bg-purple-700 text-white px-6 py-2 rounded"
      >
        Submit
      </button>
    </div>
  );
}