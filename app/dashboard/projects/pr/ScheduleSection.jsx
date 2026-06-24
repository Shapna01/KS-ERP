"use client";

import { useState } from "react";

export default function ScheduleSection() {
  const [requestType, setRequestType] = useState("One Time");
  const [frequency, setFrequency] = useState("Monthly");

  return (
    <div className="border border-gray-100 rounded-3xl bg-white shadow-sm p-8 mb-10">
      <h2 className="text-2xl font-bold text-[#7A008C] tracking-tight mb-8">
        Request Schedule
      </h2>

      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-4">
          Request Type
        </label>

        <div className="flex gap-5">
          <label
  className={`flex items-center gap-3 px-5 py-3 border rounded-2xl cursor-pointer transition
  ${
    requestType === "One Time"
      ? "border-[#7A008C] bg-purple-50"
      : "border-gray-200 bg-white hover:border-[#7A008C]/40"
  }`}
>
            <input
              type="radio"
              value="One Time"
              checked={requestType === "One Time"}
              onChange={(e) => setRequestType(e.target.value)}
            />
            One Time
          </label>

          <label
  className={`flex items-center gap-3 px-5 py-3 border rounded-2xl cursor-pointer transition
  ${
    requestType === "One Time"
      ? "border-[#7A008C] bg-purple-50"
      : "border-gray-200 bg-white hover:border-[#7A008C]/40"
  }`}
>
            <input
              type="radio"
              className="accent-[#7A008C] w-4 h-4"
              value="Recurring"
              checked={requestType === "Recurring"}
              onChange={(e) => setRequestType(e.target.value)}
            />
            Recurring
          </label>
        </div>
      </div>

      {requestType === "Recurring" && (
        <div className="mt-8 border border-gray-100 bg-gray-50 rounded-2xl p-6">
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Frequency
            </label>

            <select
              value={frequency}
              onChange={(e) => setFrequency(e.target.value)}
              className="w-full border rounded-lg px-4 py-3"
            >
              <option>Daily</option>
              <option>Weekly</option>
              <option>Monthly</option>
              <option>Quarterly</option>
              <option>Yearly</option>
            </select>
          </div>

         <div className="grid grid-cols-2 gap-8 mt-6">

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Start Date
              </label>

              <input
                type="date"
                className="w-full h-12 border border-gray-200 rounded-2xl px-4
focus:outline-none focus:ring-2 focus:ring-[#7A008C]/20
focus:border-[#7A008C] transition"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                End Date
              </label>

              <input
                type="date"
                className="w-full h-12 border border-gray-200 rounded-2xl px-4
focus:outline-none focus:ring-2 focus:ring-[#7A008C]/20
focus:border-[#7A008C] transition"
              />
            </div>

          </div>
        </div>
      )}
    </div>
  );
}