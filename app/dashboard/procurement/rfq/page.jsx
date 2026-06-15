"use client";

import Sidebar from "../../users/components/Sidebar";
import Topbar from "../../users/components/Topbar";
import Link from "next/link";

export default function RFQPage() {
  const rfqs = [
    {
      id: "PR 01-CF 2345",
      project: "ID 234",
      rfq: "RFQ-TF 4567",
      department: "Design",
      priority: "Urgent",
      category: "Goods",
      type: "Recurring",
      status: "Submitted",
    },
    {
      id: "PR 01-CF 3456",
      project: "ID 232",
      rfq: "RFQ-TF 4597",
      department: "Development",
      priority: "Critical",
      category: "Goods",
      type: "One-time",
      status: "Submitted",
    },
  ];

  return (
    <div className="flex min-h-screen bg-[#F7F7FA]">
      <Sidebar />

      <div className="flex-1 flex flex-col ml-[74px]">
        <Topbar />

        <div className="flex-1 overflow-y-auto pt-[72px]">
          <div className="flex h-full">
            <div className="w-[240px] bg-white border-r border-gray-200 min-h-screen">
              <div className="p-5 border-b">
                <h2 className="font-semibold text-gray-800">
                  Procurement
                </h2>
              </div>

              <nav className="p-2">
                <button className="w-full text-left px-4 py-3 text-sm text-gray-600 hover:bg-gray-100 rounded-lg">
                  Purchase Requests
                </button>

                <button className="w-full text-left px-4 py-3 text-sm bg-[#F4E8F6] text-[#7A008C] rounded-lg font-medium">
                  Request for Quotation
                </button>

                <button className="w-full text-left px-4 py-3 text-sm text-gray-600 hover:bg-gray-100 rounded-lg">
                  Purchase Orders
                </button>

                <button className="w-full text-left px-4 py-3 text-sm text-gray-600 hover:bg-gray-100 rounded-lg">
                  Vendors Master
                </button>

                <button className="w-full text-left px-4 py-3 text-sm text-gray-600 hover:bg-gray-100 rounded-lg">
                  Products Catalogue
                </button>

                <button className="w-full text-left px-4 py-3 text-sm text-gray-600 hover:bg-gray-100 rounded-lg">
                  Configuration
                </button>
              </nav>
            </div>

            <div className="flex-1 p-8">
              <div className="text-sm text-gray-500 mb-4">
                Procurement &gt; Approved PRs
              </div>

              <div className="flex items-start justify-between mb-8">
                <div>
                  <h1 className="text-[30px] font-semibold text-[#7A008C]">
                    Request for Quotation
                  </h1>

                  <p className="text-sm text-gray-500 mt-2 max-w-4xl leading-6">
                    Create and manage RFQs from approved purchase requisitions.
                  </p>
                </div>

                <Link href="/dashboard/procurement/rfq/create">
                  <button className="bg-[#7A008C] hover:bg-[#5f006d] text-white px-5 h-11 rounded-lg text-sm font-medium">
                    + Create RFQ
                  </button>
                </Link>
              </div>

              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="font-semibold text-[24px] text-black mb-4">
                      Purchase Requisition Details ({rfqs.length})
                    </h2>

                    <div className="flex gap-6 text-sm">
                      <button className="text-[#7A008C] border-b-2 border-[#7A008C] pb-2 font-medium">
                        All
                      </button>

                      <button className="text-gray-500">
                        Awaiting RFQ
                      </button>

                      <button className="text-gray-500">
                        Submitted RFQ
                      </button>

                      <button className="text-gray-500">
                        RFQ Drafts
                      </button>
                    </div>
                  </div>

                  <input
                    type="text"
                    placeholder="Search"
                    className="h-10 border rounded-lg px-4 text-sm outline-none w-[260px]"
                  />
                </div>

                <div className="overflow-hidden rounded-xl border">
                  <table className="w-full text-sm">
                    <thead className="bg-[#F8F8FC]">
                      <tr className="text-left text-gray-500">
                        <th className="p-4">PR No</th>
                        <th className="p-4">Project</th>
                        <th className="p-4">RFQ No</th>
                        <th className="p-4">Department</th>
                        <th className="p-4">Priority</th>
                        <th className="p-4">Category</th>
                        <th className="p-4">Type</th>
                        <th className="p-4">Status</th>
                        <th className="p-4">Action</th>
                      </tr>
                    </thead>

                    <tbody>
                      {rfqs.map((item, index) => (
                        <tr
                          key={index}
                          className="border-t hover:bg-gray-50"
                        >
                          <td className="p-4">{item.id}</td>
                          <td className="p-4">{item.project}</td>
                          <td className="p-4">{item.rfq}</td>
                          <td className="p-4">{item.department}</td>
                          <td className="p-4">{item.priority}</td>
                          <td className="p-4">{item.category}</td>
                          <td className="p-4">{item.type}</td>

                          <td className="p-4">
                            <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full">
                              {item.status}
                            </span>
                          </td>

                          <td className="p-4">
                            <button className="text-[#7A008C] font-medium">
                              View RFQ
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="flex items-center justify-between mt-6 text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    Showing
                    <select className="border rounded-lg px-2 py-1 bg-white">
                      <option>07</option>
                    </select>
                    of 20 items
                  </div>

                  <div className="flex gap-2">
                    <button className="border px-3 py-2 rounded-lg bg-white">
                      Prev
                    </button>

                    <button className="bg-[#7A008C] text-white px-3 py-2 rounded-lg">
                      1
                    </button>

                    <button className="border px-3 py-2 rounded-lg bg-white">
                      2
                    </button>

                    <button className="border px-3 py-2 rounded-lg bg-white">
                      5
                    </button>

                    <button className="border px-3 py-2 rounded-lg bg-white">
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}