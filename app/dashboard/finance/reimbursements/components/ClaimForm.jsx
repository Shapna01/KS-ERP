"use client";

import { ChevronDown } from "lucide-react";

export default function ClaimForm({
  form,
  setForm,
  projects,
}) {
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="grid grid-cols-3 gap-6 p-8">

      <div>

        <label className="block text-sm font-medium text-gray-600 mb-2">
          Claim ID
        </label>

        <input
          readOnly
          value={form.claimId}
          className="w-full h-11 rounded-lg border bg-gray-50 px-4 text-sm"
        />

      </div>

      <div>

        <label className="block text-sm font-medium text-gray-600 mb-2">
          User Name
        </label>

        <input
          readOnly
          value={form.userName}
          className="w-full h-11 rounded-lg border bg-gray-50 px-4 text-sm"
        />

      </div>

      <div>

        <label className="block text-sm font-medium text-gray-600 mb-2">
          User ID
        </label>

        <input
          readOnly
          value={form.userId}
          className="w-full h-11 rounded-lg border bg-gray-50 px-4 text-sm"
        />

      </div>

      <div>

        <label className="block text-sm font-medium text-gray-600 mb-2">
          User Department
        </label>

        <input
          readOnly
          value={form.department}
          className="w-full h-11 rounded-lg border bg-gray-50 px-4 text-sm"
        />

      </div>

      <div>

        <label className="block text-sm font-medium text-gray-600 mb-2">
          User Team
        </label>

        <input
          readOnly
          value={form.team}
          className="w-full h-11 rounded-lg border bg-gray-50 px-4 text-sm"
        />

      </div>

      <div>

        <label className="block text-sm font-medium text-gray-600 mb-2">
          Submission Date
        </label>

        <input
          readOnly
          value={form.submissionDate}
          className="w-full h-11 rounded-lg border bg-gray-50 px-4 text-sm"
        />

      </div>

      <div>

        <label className="block text-sm font-medium text-gray-700 mb-2">
          Claim Category
          <span className="text-red-500">*</span>
        </label>

        <div className="relative">

          <select
            name="claimCategory"
            value={form.claimCategory}
            onChange={handleChange}
            className="appearance-none w-full h-11 rounded-lg border px-4 pr-10 text-sm"
          >
            <option value="">
              Select Category
            </option>

            <option>Travel</option>
            <option>Food</option>
            <option>Fuel</option>
            <option>Accommodation</option>
            <option>Medical</option>
            <option>Goods</option>

          </select>

          <ChevronDown
            size={18}
            className="absolute right-3 top-3 text-gray-400"
          />

        </div>

      </div>

      <div>

        <label className="block text-sm font-medium text-gray-700 mb-2">
          Project
          <span className="text-red-500">*</span>
        </label>

        <div className="relative">

          <select
            name="projectId"
            value={form.projectId}
            onChange={handleChange}
            className="appearance-none w-full h-11 rounded-lg border px-4 pr-10 text-sm"
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
            className="absolute right-3 top-3 text-gray-400"
          />

        </div>

      </div>

      <div>

        <label className="block text-sm font-medium text-gray-700 mb-2">
          Enter Amount (£)
          <span className="text-red-500">*</span>
        </label>

        <input
          type="number"
          name="amount"
          value={form.amount}
          onChange={handleChange}
          placeholder="0.00"
          className="w-full h-11 rounded-lg border px-4 text-sm"
        />

      </div>

      <div className="col-span-3">

        <label className="block text-sm font-medium text-gray-700 mb-2">
          Reason for Request
        </label>

        <textarea
          rows={4}
          name="reason"
          value={form.reason}
          onChange={handleChange}
          placeholder="Enter reason..."
          className="w-full rounded-lg border p-4 resize-none text-sm"
        />

      </div>

    </div>
  );
}