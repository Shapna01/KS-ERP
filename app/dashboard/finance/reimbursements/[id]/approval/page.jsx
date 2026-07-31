"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

import Sidebar from "../../../../users/components/Sidebar";
import Topbar from "../../../../users/components/Topbar";

import {
  ArrowLeft,
  Eye,
  FileText,
  CheckCircle2,
  XCircle,
} from "lucide-react";

export default function ReimbursementApprovalPage() {
  const params = useParams();
  const router = useRouter();

  const id = params.id;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [claim, setClaim] = useState(null);

  const [remarks, setRemarks] = useState("");

  useEffect(() => {
    if (id) {
      fetchClaim();
    }
  }, [id]);

  const fetchClaim = async () => {
    try {
      setLoading(true);

      const res = await fetch(`/api/reimbursements/${id}`);

      if (!res.ok) {
        throw new Error("Unable to fetch reimbursement.");
      }

      const data = await res.json();

      setClaim(data);
      setRemarks(data.managerRemarks || "");
    } catch (err) {
      console.log(err);
      alert("Unable to load reimbursement.");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (status) => {
    try {
      setSaving(true);

      const res = await fetch(`/api/reimbursements/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status,
          managerRemarks: remarks,
        }),
      });

      if (!res.ok) {
        alert("Unable to update reimbursement.");
        return;
      }

      alert(
        status === "Approved"
          ? "Claim Approved Successfully"
          : "Claim Rejected Successfully"
      );

      router.push("/dashboard/finance/reimbursements");
    } catch (err) {
      console.log(err);
      alert("Something went wrong.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen bg-[#F7F7FA]">
        <Sidebar />

        <div className="flex-1 ml-[74px]">
          <Topbar />

          <div className="pt-[120px] px-8">
            <div className="bg-white rounded-3xl border border-gray-200 p-10 text-center">
              <div className="text-lg font-semibold text-[#7A008C]">
                Loading Reimbursement...
              </div>

              <p className="text-gray-500 mt-2">
                Please wait while we fetch the reimbursement details.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#F7F7FA]">

      <Sidebar />

      <div className="flex-1 flex flex-col ml-[74px]">

        <Topbar />

        <div className="flex-1 overflow-y-auto pt-[95px] px-8 pb-8">

          <div className="text-sm text-gray-500 mb-8">

            <span className="text-[#7A008C]">
              Finance
            </span>

            <span className="mx-2">{">"}</span>

            <span>
              Reimbursements
            </span>

            <span className="mx-2">{">"}</span>

            <span className="text-gray-700">
              Approval
            </span>

          </div>

          <div className="flex items-start justify-between mb-8">

            <div>

              <Link
                href="/dashboard/finance/reimbursements"
                className="inline-flex items-center gap-2 text-[#7A008C] hover:underline mb-4"
              >
                <ArrowLeft size={18} />
                Back
              </Link>

              <h1 className="text-3xl font-bold text-[#7A008C]">
                Reimbursement Approval
              </h1>

              <p className="text-gray-500 mt-2">
                Review the reimbursement claim before approving or rejecting it.
              </p>

            </div>

            <div
              className={`px-5 py-2 rounded-full text-sm font-semibold
                ${
                  claim?.status === "Approved"
                    ? "bg-green-100 text-green-700"
                    : claim?.status === "Rejected"
                    ? "bg-red-100 text-red-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
            >
              {claim?.status}
            </div>

          </div>
          <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">

            <div className="px-8 py-6 border-b border-gray-200">

              <h2 className="text-lg font-semibold text-[#111827]">
                Claim Information
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                Employee reimbursement request details.
              </p>

            </div>

            <div className="grid grid-cols-3 gap-6 p-8">

              <div>

                <label className="block text-xs font-medium text-gray-500 mb-2">
                  Claim ID
                </label>

                <div className="h-11 rounded-lg border border-gray-300 bg-gray-50 px-4 flex items-center">
                  {claim?.claimId}
                </div>

              </div>

              <div>

                <label className="block text-xs font-medium text-gray-500 mb-2">
                  Employee Name
                </label>

                <div className="h-11 rounded-lg border border-gray-300 bg-gray-50 px-4 flex items-center">
                  {claim?.userName}
                </div>

              </div>

              <div>

                <label className="block text-xs font-medium text-gray-500 mb-2">
                  Employee ID
                </label>

                <div className="h-11 rounded-lg border border-gray-300 bg-gray-50 px-4 flex items-center">
                  {claim?.userId}
                </div>

              </div>

              <div>

                <label className="block text-xs font-medium text-gray-500 mb-2">
                  Department
                </label>

                <div className="h-11 rounded-lg border border-gray-300 bg-gray-50 px-4 flex items-center">
                  {claim?.department}
                </div>

              </div>

              <div>

                <label className="block text-xs font-medium text-gray-500 mb-2">
                  Team
                </label>

                <div className="h-11 rounded-lg border border-gray-300 bg-gray-50 px-4 flex items-center">
                  {claim?.team}
                </div>

              </div>

              <div>

                <label className="block text-xs font-medium text-gray-500 mb-2">
                  Submission Date
                </label>

                <div className="h-11 rounded-lg border border-gray-300 bg-gray-50 px-4 flex items-center">
                  {claim?.submissionDate}
                </div>

              </div>

              <div>

                <label className="block text-xs font-medium text-gray-500 mb-2">
                  Claim Category
                </label>

                <div className="h-11 rounded-lg border border-gray-300 bg-gray-50 px-4 flex items-center">
                  {claim?.claimCategory}
                </div>

              </div>

              <div>

                <label className="block text-xs font-medium text-gray-500 mb-2">
                  Project
                </label>

                <div className="h-11 rounded-lg border border-gray-300 bg-gray-50 px-4 flex items-center">
                  {claim?.project?.projectName || claim?.projectName || "-"}
                </div>

              </div>

              <div>

                <label className="block text-xs font-medium text-gray-500 mb-2">
                  Amount
                </label>

                <div className="h-11 rounded-lg border border-gray-300 bg-gray-50 px-4 flex items-center font-semibold text-[#7A008C]">
                  £{Number(claim?.amount || 0).toLocaleString()}
                </div>

              </div>
              <div className="col-span-3">

                <label className="block text-xs font-medium text-gray-500 mb-2">
                  Reason for Reimbursement
                </label>

                <div className="rounded-xl border border-gray-300 bg-gray-50 p-5 min-h-[120px] whitespace-pre-wrap">
                  {claim?.reason || "-"}
                </div>

              </div>

            </div>

          </div>
          <div className="mt-8 bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">

            <div className="px-8 py-6 border-b border-gray-200">

              <h2 className="text-lg font-semibold text-[#111827]">
                Receipt Attachment
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                Supporting documents uploaded by the employee.
              </p>

            </div>

            <div className="p-8">

              {claim?.receipts && claim.receipts.length > 0 ? (

                <div className="space-y-4">

                  {claim.receipts.map((receipt, index) => (

                    <div
                      key={index}
                      className="flex items-center justify-between rounded-xl border border-gray-200 bg-[#FAFAFA] px-5 py-4"
                    >

                      <div className="flex items-center gap-4">

                        <div className="h-11 w-11 rounded-xl bg-[#F4E8F6] flex items-center justify-center">

                          <FileText
                            size={22}
                            className="text-[#7A008C]"
                          />

                        </div>

                        <div>

                          <p className="font-semibold text-[#111827]">
                            {receipt.fileUrl
                            ? receipt.fileUrl.split("/").pop()
                            : `Receipt ${index + 1}`}
                          </p>

                          <p className="text-xs text-gray-500">
                            Uploaded Receipt #{index + 1}
                          </p>

                        </div>

                      </div>

                      
                        
                      <a href={receipt.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 rounded-lg border border-[#7A008C] px-4 py-2 text-sm font-medium text-[#7A008C] hover:bg-[#F8F0FA]"
                      >

                        <Eye size={18} />

                        View Receipt

                      </a>

                    </div>

                  ))}

                </div>

              ) : (

                <div className="rounded-xl border border-dashed border-gray-300 py-14 text-center">

                  <FileText
                    size={40}
                    className="mx-auto text-gray-300"
                  />

                  <p className="mt-4 text-gray-400">
                    No receipt uploaded.
                  </p>

                </div>

              )}

            </div>

          </div>

          <div className="mt-8 bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">

            <div className="px-8 py-6 border-b border-gray-200">

              <h2 className="text-lg font-semibold text-[#111827]">
                Reviewer Remarks
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                Add comments before approving or rejecting this reimbursement.
              </p>

            </div>

            <div className="p-8">

              <label className="block text-sm font-medium text-gray-700 mb-2">
                Remarks
              </label>

              <textarea
                rows={6}
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                placeholder="Write your remarks here..."
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none resize-none focus:border-[#7A008C]"
              />

            </div>

          </div>
          <div className="mt-8 flex justify-end gap-4">

            <Link
              href="/dashboard/finance/reimbursements"
              className="rounded-xl border border-gray-300 px-8 py-3 font-medium text-gray-700 hover:bg-gray-100 transition"
            >
              Cancel
            </Link>

            <button
              type="button"
              disabled={saving}
              onClick={() => updateStatus("Rejected")}
              className="flex items-center gap-2 rounded-xl bg-red-600 px-8 py-3 font-semibold text-white hover:bg-red-700 disabled:opacity-60 transition"
            >
              <XCircle size={20} />

              {saving ? "Processing..." : "Reject"}
            </button>

            <button
              type="button"
              disabled={saving}
              onClick={() => updateStatus("Approved")}
              className="flex items-center gap-2 rounded-xl bg-[#7A008C] px-8 py-3 font-semibold text-white hover:bg-[#630072] disabled:opacity-60 transition"
            >
              <CheckCircle2 size={20} />

              {saving ? "Processing..." : "Approve"}
            </button>

          </div>

        </div>

      </div>

    </div>

  );
}