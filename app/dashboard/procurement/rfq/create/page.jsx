"use client";

import Sidebar from "../../../users/components/Sidebar";
import Topbar from "../../../users/components/Topbar";

export default function CreateRFQPage() {
  return (
    <div className="flex min-h-screen bg-[#F7F7FA]">
      <Sidebar />

      <div className="flex-1 flex flex-col ml-[74px]">
        <Topbar />

        <div className="flex-1 overflow-y-auto pt-[72px] p-8">
          {/* Breadcrumb */}
          <div className="text-sm text-gray-500 mb-4">
            Procurement &gt; RFQ &gt; Create RFQ
          </div>

          {/* Title */}
          <h1 className="text-[30px] font-semibold text-[#7A008C]">
            Create Request For Quotation
          </h1>

          <p className="text-sm text-gray-500 mt-2 mb-8">
            Create quotation requests by selecting approved requisitions and inviting vendors.
          </p>

          {/* Main Card */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            
            {/* Stepper */}
            <div className="flex items-center mb-8">
              <div className="flex-1 bg-[#7A008C] h-2 rounded-full"></div>
              <div className="flex-1 bg-gray-200 h-2"></div>
              <div className="flex-1 bg-gray-200 h-2 rounded-full"></div>
            </div>

            {/* PR Details */}
            <h2 className="font-semibold text-lg mb-4">
              Purchase Requisition Details
            </h2>

            <div className="grid grid-cols-4 gap-4 mb-6">
              <input
                className="border rounded-lg p-3"
                placeholder="PR No"
              />

              <input
                className="border rounded-lg p-3"
                placeholder="Project"
              />

              <input
                className="border rounded-lg p-3"
                placeholder="RFQ Number"
              />

              <input
                className="border rounded-lg p-3"
                placeholder="Department"
              />
            </div>

            {/* Vendor Section */}
            <h2 className="font-semibold text-lg mb-4">
              Select Vendors
            </h2>

            <div className="border rounded-xl p-4 mb-6">
              Vendor selection table goes here
            </div>

            {/* Item Section */}
            <h2 className="font-semibold text-lg mb-4">
              Added Items
            </h2>

            <div className="border rounded-xl p-4 mb-6">
              Item table goes here
            </div>

            {/* Attachments */}
            <h2 className="font-semibold text-lg mb-4">
              Attachments
            </h2>

            <div className="border rounded-xl p-4 mb-8">
              Attachment table goes here
            </div>

            {/* Footer Buttons */}
            <div className="flex justify-end gap-3">
              <button className="border px-5 py-2 rounded-lg">
                Cancel
              </button>

              <button className="border border-[#7A008C] text-[#7A008C] px-5 py-2 rounded-lg">
                Save as Draft
              </button>

              <button className="bg-[#7A008C] text-white px-5 py-2 rounded-lg">
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}