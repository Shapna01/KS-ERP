"use client";

import Sidebar from "../../../users/components/Sidebar";
import Topbar from "../../../users/components/Topbar";
import Link from "next/link";

export default function CreateRFQPage() {
  return (
    <div className="flex min-h-screen bg-[#F7F7FA]">
      <Sidebar />

      <div className="flex-1 flex flex-col ml-[74px]">
        <Topbar />

        <div className="flex-1 overflow-y-auto pt-[72px] px-8 py-6">
          {/* Breadcrumb */}
          <div className="text-xs text-[#7A008C] mb-4">
            Procurement &gt; PR RFQ 2345 &gt; Create RFQ
          </div>

          {/* Header */}
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-[28px] font-semibold text-black">
                Create Request For Quotation
              </h1>

              <p className="text-sm text-gray-500 mt-2">
                Create quotation requests by selecting approved purchase
                requisitions and sending it for approval as per the configured
                workflow.
              </p>
            </div>

            <button className="border border-[#7A008C] text-[#7A008C] px-4 py-2 rounded-lg text-sm">
              Audit Log
            </button>
          </div>

          {/* Main Card */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            {/* Stepper */}
            <div className="mb-8">
              <div className="grid grid-cols-3 text-xs text-center text-gray-500 mb-2">
                <span className="font-medium text-[#7A008C]">
                  RFQ Creation
                </span>
                <span>Vendor Quotation</span>
                <span>Purchase Order</span>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div className="h-2 bg-[#7A008C] rounded-full"></div>
                <div className="h-2 bg-gray-200 rounded-full"></div>
                <div className="h-2 bg-gray-200 rounded-full"></div>
              </div>
            </div>

            {/* Purchase Requisition Details */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div>
                <label className="text-xs text-gray-500">
                  PR Number
                </label>
                <input
                  className="w-full border rounded-md p-2 mt-1"
                  defaultValue="PR-01-CF-2345"
                />
              </div>

              <div>
                <label className="text-xs text-gray-500">
                  Project Number
                </label>
                <input
                  className="w-full border rounded-md p-2 mt-1"
                  defaultValue="ID 234"
                />
              </div>

              <div>
                <label className="text-xs text-gray-500">
                  Requester Department
                </label>
                <input
                  className="w-full border rounded-md p-2 mt-1"
                  defaultValue="Design Department"
                />
              </div>

              <div>
                <label className="text-xs text-gray-500">
                  Category
                </label>
                <select className="w-full border rounded-md p-2 mt-1">
                  <option>Goods</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-gray-500">
                  Priority
                </label>
                <select className="w-full border rounded-md p-2 mt-1">
                  <option>Normal</option>
                  <option>Urgent</option>
                  <option>Critical</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-gray-500">
                  Expected Date
                </label>
                <input
                  type="date"
                  className="w-full border rounded-md p-2 mt-1"
                />
              </div>

              <div>
                <label className="text-xs text-gray-500">
                  Request Type
                </label>
                <select className="w-full border rounded-md p-2 mt-1">
                  <option>Recurring</option>
                  <option>One Time</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-gray-500">
                  Due Date
                </label>
                <input
                  type="date"
                  className="w-full border rounded-md p-2 mt-1"
                />
              </div>

              <div>
                <label className="text-xs text-gray-500">
                  Lead Confirmation Before
                </label>
                <select className="w-full border rounded-md p-2 mt-1">
                  <option>1 Day</option>
                  <option>3 Days</option>
                  <option>5 Days</option>
                </select>
              </div>
            </div>

            {/* Delivery Address */}
            <div className="mb-5">
              <label className="text-xs text-gray-500">
                Delivery Address
              </label>

              <textarea
                rows={2}
                className="w-full border rounded-md p-3 mt-1"
                placeholder="Enter Delivery Address"
              />
            </div>

            {/* Notes */}
            <div className="mb-6">
              <label className="text-xs text-gray-500">
                Notes For Vendors
              </label>

              <textarea
                rows={2}
                className="w-full border rounded-md p-3 mt-1"
                placeholder="Notes for vendors"
              />
            </div>

            {/* Review Settings */}
            <div className="border rounded-lg p-4 mb-6 bg-gray-50">
              <p className="text-sm text-gray-600">
                Allows reviewers to approve, hold, or reject purchase
                requisitions based on configured approval rules and authority
                levels.
              </p>
            </div>

            {/* Review Type */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div>
                <label className="text-xs text-gray-500">
                  Review Type
                </label>

                <select className="w-full border rounded-md p-2 mt-1">
                  <option>One Time</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-gray-500">
                  Due Date
                </label>

                <input
                  type="date"
                  className="w-full border rounded-md p-2 mt-1"
                />
              </div>
            </div>

            {/* Vendors */}
            <h2 className="font-semibold text-sm mb-3">
              Select Vendors
            </h2>

            <div className="border rounded-xl overflow-hidden mb-8">
              <table className="w-full text-sm">
                <thead className="bg-[#F8F8FC]">
                  <tr>
                    <th className="p-3">S.No</th>
                    <th className="p-3 text-left">Vendor Name</th>
                    <th className="p-3 text-left">Contact No</th>
                    <th className="p-3 text-left">Mail</th>
                    <th className="p-3 text-left">GST No</th>
                    <th className="p-3 text-left">Address</th>
                  </tr>
                </thead>

                <tbody>
                  <tr className="border-t">
                    <td className="p-3 text-center">1</td>
                    <td className="p-3">Apex Solutions Pvt Ltd</td>
                    <td className="p-3">+91 9876543210</td>
                    <td className="p-3">sales@apex.com</td>
                    <td className="p-3">29AAACC1234Q1Z9</td>
                    <td className="p-3">Chennai</td>
                  </tr>
                </tbody>
              </table>

              <div className="p-3 border-t">
                <button className="text-[#7A008C] text-sm">
                  + Add Vendor
                </button>
              </div>
            </div>

            {/* Items */}
            <h2 className="font-semibold text-sm mb-3">
              Added Items
            </h2>

            <div className="border rounded-xl overflow-hidden mb-8">
              <table className="w-full text-sm">
                <thead className="bg-[#F8F8FC]">
                  <tr>
                    <th className="p-3">S.No</th>
                    <th className="p-3 text-left">Item Name</th>
                    <th className="p-3 text-left">Item Code</th>
                    <th className="p-3">Qty</th>
                    <th className="p-3">Est Rate</th>
                    <th className="p-3">Unit</th>
                    <th className="p-3 text-left">Remarks</th>
                  </tr>
                </thead>

                <tbody>
                  <tr className="border-t">
                    <td className="p-3 text-center">1</td>
                    <td className="p-3">Desktop PC</td>
                    <td className="p-3">IT-001</td>
                    <td className="p-3 text-center">5</td>
                    <td className="p-3 text-center">45000</td>
                    <td className="p-3 text-center">Nos</td>
                    <td className="p-3">Design Team</td>
                  </tr>

                  <tr className="border-t">
                    <td className="p-3 text-center">2</td>
                    <td className="p-3">Monitor</td>
                    <td className="p-3">IT-002</td>
                    <td className="p-3 text-center">5</td>
                    <td className="p-3 text-center">12000</td>
                    <td className="p-3 text-center">Nos</td>
                    <td className="p-3">24 inch Monitor</td>
                  </tr>
                </tbody>
              </table>

              <div className="p-3 border-t">
                <button className="text-[#7A008C] text-sm">
                  + Add Item
                </button>
              </div>
            </div>

            {/* Additional Info */}
            <h2 className="font-semibold text-sm mb-3">
              Additional Info
            </h2>

            <div className="grid grid-cols-4 gap-4 mb-8">
              <select className="border rounded-md p-2">
                <option>Items Received in Delivery Charges</option>
              </select>

              <select className="border rounded-md p-2">
                <option>Delivery Type</option>
              </select>

              <select className="border rounded-md p-2">
                <option>Return Responsibility</option>
              </select>

              <select className="border rounded-md p-2">
                <option>Replacement Responsibility</option>
              </select>
            </div>

            {/* Attachments */}
            <h2 className="font-semibold text-sm mb-3">
              Attachments
            </h2>

            <div className="border rounded-xl overflow-hidden mb-8">
              <table className="w-full text-sm">
                <thead className="bg-[#F8F8FC]">
                  <tr>
                    <th className="p-3">S.No</th>
                    <th className="p-3 text-left">
                      Attachment Name
                    </th>
                    <th className="p-3 text-left">
                      Uploaded Files
                    </th>
                  </tr>
                </thead>

                <tbody>
                  <tr className="border-t">
                    <td className="p-3 text-center">1</td>
                    <td className="p-3">Tech Specification</td>
                    <td className="p-3 text-blue-600">
                      TechSpecification.pdf
                    </td>
                  </tr>

                  <tr className="border-t">
                    <td className="p-3 text-center">2</td>
                    <td className="p-3">Regulatory Quotation</td>
                    <td className="p-3 text-blue-600">
                      RegulatoryQuotation.pdf
                    </td>
                  </tr>

                  <tr className="border-t">
                    <td className="p-3 text-center">3</td>
                    <td className="p-3">Communication Trail</td>
                    <td className="p-3 text-blue-600">
                      CommunicationTrail.pdf
                    </td>
                  </tr>

                  <tr className="border-t">
                    <td className="p-3 text-center">4</td>
                    <td className="p-3">Other Supporting Docs</td>
                    <td className="p-3 text-blue-600">
                      OtherDocuments.pdf
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Footer */}
            <div className="flex justify-end gap-3">
              <Link href="/dashboard/procurement/rfq">
                <button className="border px-5 py-2 rounded-lg">
                  Cancel
                </button>
              </Link>

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