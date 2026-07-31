"use client";

import Link from "next/link";

export default function ActionButtons({
  loading,
  form,
}) {
  const handleSubmit = async (status) => {
    try {
      const body = new FormData();

      body.append("claimId", form.claimId);
      body.append("userId", form.userId);
      body.append("userName", form.userName);
      body.append("department", form.department);
      body.append("team", form.team);
      body.append("submissionDate", form.submissionDate);
      body.append("claimCategory", form.claimCategory);
      body.append("projectId", form.projectId);
      body.append("amount", form.amount);
      body.append("reason", form.reason);
      body.append("status", status);

      form.receipts.forEach((file) => {
        body.append("receipts", file);
      });

      const res = await fetch(
        "/api/reimbursements",
        {
          method: "POST",
          body,
        }
      );

      if (!res.ok) {
        alert("Unable to save claim.");
        return;
      }

      alert(
        status === "Draft"
          ? "Draft saved successfully."
          : "Claim submitted successfully."
      );

      window.location.href =
        "/dashboard/finance/reimbursements";

    } catch (err) {

      console.log(err);

      alert("Something went wrong.");

    }
  };

  return (
    <div className="flex justify-end gap-3 border-t border-gray-200 bg-white px-8 py-6">

      <Link
        href="/dashboard/finance/reimbursements"
        className="h-11 px-6 rounded-xl border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-100"
      >
        Cancel
      </Link>

      <button
        onClick={() => handleSubmit("Rejected")}
        className="h-11 px-6 rounded-xl border border-red-500 text-red-600 hover:bg-red-50"
      >
        Reject
      </button>

      <button
        onClick={() => handleSubmit("Draft")}
        className="h-11 px-6 rounded-xl border border-[#A000A9] text-[#A000A9] hover:bg-[#FAF3FB]"
      >
        Save as Draft
      </button>

      <button
        disabled={loading}
        onClick={() => handleSubmit("Submitted")}
        className="h-11 px-8 rounded-xl bg-[#A000A9] text-white hover:bg-[#87008F] disabled:opacity-60"
      >
        {loading ? "Submitting..." : "Approve"}
      </button>

    </div>
  );
}