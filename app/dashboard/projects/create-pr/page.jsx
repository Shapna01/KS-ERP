"use client";

import Sidebar from "../../users/components/Sidebar";
import Topbar from "../../users/components/Topbar";
import PRForm from "../pr/PRForm";

export default function CreatePRPage() {
  return (
    <div className="bg-[#F7F7FA] min-h-screen">
      <Sidebar />
      <Topbar />

      <div className="ml-[74px] pt-[100px] px-8 py-6">

        <div className="flex items-center text-sm mb-3">
          <span className="text-[#7A008C] font-medium">
            Projects
          </span>

          <span className="mx-2 text-gray-400">›</span>

          <span className="text-gray-500">
            Purchase Requisition
          </span> 
        </div>

        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#7A008C] tracking-tight">
              Raise Purchase Requisition
            </h1>

            <p className="text-sm text-gray-500 mt-2">
              Create a purchase requisition by entering item or service details
              and submitting it for approval.
            </p>
          </div>

          <button className="px-5 py-2.5 bg-white border border-[#7A008C] text-[#7A008C] rounded-2xl shadow-sm hover:bg-purple-50 transition">
            Back to Project
          </button>
        </div>

        <PRForm />
      </div>
    </div>
  );
}