"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Sidebar from "../../../users/components/Sidebar";
import Topbar from "../../../users/components/Topbar";
import {
  ArrowLeft,
  Upload,
  X,
  ChevronDown,
} from "lucide-react";

export default function NewClaimPage() {
  const fileInputRef = useRef(null);
const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [projects, setProjects] = useState([]);

  const [form, setForm] = useState({
    claimId: "",
    userId: "",
    userName: "",
    department: "",
    team: "",
    submissionDate: "",
    claimCategory: "",
    projectId: "",
    amount: "",
    reason: "",
    receipts: [],
    status: "Draft",
  });

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      const today = new Date().toISOString().split("T")[0];
 
      setForm((prev) => ({
        ...prev,
        claimId: `PR-${Math.floor(100000 + Math.random() * 900000)}`,
        userId: "1", 
        userName: "Akshay Kumar",
        department: "Design Department",
        team: "Software Designer",
        submissionDate: today,
      }));

      const res = await fetch("/api/projects");

      if (res.ok) {
        const data = await res.json();
        setProjects(Array.isArray(data) ? data : []);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (status) => {
  try {
    if (!form.claimCategory) {
      alert("Please select claim category");
      return;
    }

    if (!form.projectId) {
      alert("Please select project");
      return;
    }

    if (!form.amount || Number(form.amount) <= 0) {
      alert("Please enter a valid amount");
      return;
    }

    setLoading(true);

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

    console.log("Submitting reimbursement...");

    const res = await fetch(
      "/api/reimbursements",
      {
        method: "POST",
        body,
      }
    );

    const data = await res.json();

    console.log("API RESPONSE:", data);

    if (!res.ok) {
      throw new Error(
        data.error ||
        data.message ||
        "Unable to save reimbursement"
      );
    }

    alert(
      status === "Draft"
        ? "Draft saved successfully"
        : "Claim submitted successfully"
    );

    router.push(
      "/dashboard/finance/reimbursements"
    );

  } catch (error) {
    console.error(
      "REIMBURSEMENT ERROR:",
      error
    );

    alert(error.message);

  } finally {
    setLoading(false);
  }
};

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

return (
  <div className="flex min-h-screen bg-[#F7F7FA]">

    <Sidebar />

    <div className="flex-1 flex flex-col ml-[74px]">

      <Topbar />

      <div className="flex-1 overflow-y-auto pt-[95px] px-8 pb-40">


<div className="text-sm text-gray-500 mb-8">

  <span className="text-[#7A008C]">
    Finance
  </span>

  <span className="mx-2">{">"}</span>

  <span className="text-gray-700">
    Reimbursements
  </span>

  <span className="mx-2">{">"}</span>

  <span>
    New Claim
  </span>

</div>

<div className="mb-8">

  <h1 className="text-3xl font-semibold text-[#7A008C]">
    Create New Claim
  </h1>

  <p className="text-gray-500 mt-2">
    Submit a new reimbursement claim for work-related expenses.
    Add expense details and upload supporting receipts for approval.
  </p>

</div>

      <form className="bg-white rounded-3xl border border-gray-200 shadow-sm">

        <div className="grid grid-cols-3 gap-6 px-8 py-8">

          <div>

            <label className="mb-2 block text-xs font-medium text-gray-500">
              Claim ID (Auto-Generated)
            </label>

            <input
              readOnly
              value={form.claimId}
              className="h-11 w-full rounded-md border border-gray-300 bg-gray-50 px-4 text-sm"
            />

          </div>

          <div>

            <label className="mb-2 block text-xs font-medium text-gray-500">
              User Name (Auto-Fetched)
            </label>

            <input
              readOnly
              value={form.userName}
              className="h-11 w-full rounded-md border border-gray-300 bg-gray-50 px-4 text-sm"
            />

          </div>

          <div>

            <label className="mb-2 block text-xs font-medium text-gray-500">
              User ID (Auto-Fetched)
            </label>

            <input
              readOnly
              value={form.userId}
              className="h-11 w-full rounded-md border border-gray-300 bg-gray-50 px-4 text-sm"
            />

          </div>

          <div>

            <label className="mb-2 block text-xs font-medium text-gray-500">
              User Department (Auto-Fetched)
            </label>

            <input
              readOnly
              value={form.department}
              className="h-11 w-full rounded-md border border-gray-300 bg-gray-50 px-4 text-sm"
            />

          </div>

          <div>

            <label className="mb-2 block text-xs font-medium text-gray-500">
              User Team (Auto-Fetched)
            </label>

            <input
              readOnly
              value={form.team}
              className="h-11 w-full rounded-md border border-gray-300 bg-gray-50 px-4 text-sm"
            />

          </div>

          <div>

            <label className="mb-2 block text-xs font-medium text-gray-500">
              Submission Date (Auto-Fetched)
            </label>

            <input
              readOnly
              value={form.submissionDate}
              className="h-11 w-full rounded-md border border-gray-300 bg-gray-50 px-4 text-sm"
            />

          </div>

          <div>

            <label className="mb-2 block text-xs font-medium text-gray-700">
              Claim Category
              <span className="text-red-500">
                {" "}*
              </span>
            </label>

            <div className="relative">

              <select
                name="claimCategory"
                value={form.claimCategory}
                onChange={handleChange}
                className="h-11 w-full appearance-none rounded-md border border-gray-300 bg-white px-4 pr-10 text-sm outline-none focus:border-[#A000A9]"
              >
                <option value="">
                  Select Category
                </option>

                <option>
                  Travel
                </option>

                <option>
                  Food
                </option>

                <option>
                  Goods
                </option>

                <option>
                  Fuel
                </option>

                <option>
                  Accommodation
                </option>

                <option>
                  Medical
                </option>

              </select>

              <ChevronDown
                size={18}
                className="absolute right-3 top-3.5 text-gray-400"
              />

            </div>

          </div>

          <div>

            <label className="mb-2 block text-xs font-medium text-gray-700">
              Project ID
              <span className="text-red-500">
                {" "}*
              </span>
            </label>

            <div className="relative">

              <select
                name="projectId"
                value={form.projectId}
                onChange={handleChange}
                className="h-11 w-full appearance-none rounded-md border border-gray-300 bg-white px-4 pr-10 text-sm outline-none focus:border-[#A000A9]"
              >

                <option value="">
                  Select Project
                </option>

                {projects.map((project) => (
                  <option
                    key={project.id}
                    value={project.id}
                  >
                    {project.projectName}
                  </option>
                ))}

              </select>

              <ChevronDown
                size={18}
                className="absolute right-3 top-3.5 text-gray-400"
              />

            </div>

          </div>

          <div>

            <label className="mb-2 block text-xs font-medium text-gray-700">
              Enter Amount (£)
              <span className="text-red-500">
                {" "}*
              </span>
            </label>

            <input
              type="number"
              name="amount"
              value={form.amount}
              onChange={handleChange}
              placeholder="0.00"
              className="h-11 w-full rounded-md border border-gray-300 px-4 text-sm outline-none focus:border-[#A000A9]"
            />

          </div>

          <div className="col-span-3">

            <label className="mb-2 block text-xs font-medium text-gray-700">
              Reason for Request
            </label>

            <textarea
              rows={3}
              name="reason"
              value={form.reason}
              onChange={handleChange}
              placeholder="Enter the reason for reimbursement..."
              className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm outline-none resize-none focus:border-[#A000A9]"
            />

          </div>
                  </div>


        <div className="border-t border-gray-200 px-8 py-8">

          <h3 className="text-sm font-semibold text-[#111827]">
            Receipts Attachment
          </h3>

          <p className="mt-1 text-xs text-gray-500">
            Upload supporting documents for this reimbursement claim.
          </p>

          <div className="mt-6 flex items-start gap-5">

            <div>

              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Receipt
                <span className="text-red-500"> *</span>
              </label>

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="rounded-md border border-[#A000A9] bg-white px-5 py-2 text-sm font-medium text-[#A000A9] hover:bg-[#FAF3FB]"
              >
                Browse Files
              </button>

              <input
                ref={fileInputRef}
                hidden
                multiple
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) => {
                  const files = Array.from(e.target.files || []);

                  setForm((prev) => ({
                    ...prev,
                    receipts: [...prev.receipts, ...files],
                  }));

                  e.target.value = "";
                }}
              />

            </div>

            <div className="pt-9 text-xs text-gray-400">
              Maximum File Size : 50 MB
            </div>

          </div>


          <div className="mt-5 space-y-3">

            {form.receipts.length === 0 ? (

              <div className="rounded-md border border-dashed border-gray-300 p-6 text-center text-sm text-gray-400">
                No files uploaded
              </div>

            ) : (

              form.receipts.map((file, index) => (

                <div
                  key={index}
                  className="flex items-center justify-between rounded-md border border-gray-200 bg-[#FAFAFA] px-4 py-3"
                >

                  <div className="flex items-center gap-3">

                    <Upload
                      size={18}
                      className="text-[#A000A9]"
                    />

                    <div>

                      <p className="text-sm font-medium text-[#2563EB] underline cursor-pointer">
                        {file.name}
                      </p>

                      <p className="text-xs text-gray-400">
                        {(file.size / 1024).toFixed(1)} KB
                      </p>

                    </div>

                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setForm((prev) => ({
                        ...prev,
                        receipts: prev.receipts.filter(
                          (_, i) => i !== index
                        ),
                      }));
                    }}
                    className="rounded-md p-1 text-red-500 hover:bg-red-50"
                  >
                    <X size={18} />
                  </button>

                </div>

              ))

            )}

          </div>

        </div>


        <div className="flex justify-end gap-3 border-t border-gray-200 px-8 py-6 bg-white">

          <Link
            href="/dashboard/finance/reimbursements"
            className="rounded-md px-5 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100"
          >
            Cancel
          </Link>

          <button
            type="button"
            disabled={loading}
            onClick={() => handleSubmit("Draft")}
            className="rounded-md border border-[#A000A9] px-5 py-2 text-sm font-semibold text-[#A000A9] hover:bg-[#FAF3FB] disabled:opacity-60"
          >
            {loading ? "Saving..." : "Save as Draft"}
          </button>

          <button
  type="button"
  disabled={loading}
  onClick={() => handleSubmit("Draft")}
  className="rounded-md border border-[#A000A9] px-5 py-2 text-sm font-semibold text-[#A000A9] hover:bg-[#FAF3FB] disabled:opacity-60"
>
  {loading ? "Saving..." : "Save as Draft"}
</button>

<button
  type="button"
  disabled={loading}
  onClick={() => handleSubmit("Submitted")}
  className="rounded-md bg-[#A000A9] px-6 py-2 text-sm font-semibold text-white hover:bg-[#87008F] disabled:opacity-60"
>
  {loading ? "Submitting..." : "Submit"}
</button>
        </div>

      </form>
</div>
</div>
    </div>
  );
}