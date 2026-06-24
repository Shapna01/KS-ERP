"use client";

import Sidebar from "../users/components/Sidebar";
import Topbar from "../users/components/Topbar";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Search,
  Filter,
  Upload,
  MoreHorizontal,
} from "lucide-react";

export default function ApprovalsPage() {
  const [approvals, setApprovals] = useState([]);
const [loading, setLoading] = useState(true);
const [specFile, setSpecFile] = useState(null);
useEffect(() => {
  const fetchApprovals = async () => {
    try {
      const res = await fetch("/api/approvals");

      if (!res.ok) {
        throw new Error("Failed to fetch approvals");
      }

      const data = await res.json();
      setApprovals(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  fetchApprovals();
}, []);
  return (
    <div className="flex min-h-screen bg-[#F7F7FA]">
      <Sidebar />

      <div className="flex-1 flex flex-col ml-[74px]">
        <Topbar />

        <div className="flex-1 overflow-y-auto pt-[72px] ">
          <div className="px-8 py-7 ">
            <div className="flex items-start justify-between mb-8 text-black">
              <div>
                <h1 className="text-[30px] font-semibold text-[#7A008C] ">
                  Approval Workflow
                </h1>

                <p className="text-sm text-gray-500 mt-2 max-w-4xl leading-7">
                  Allows administrators to design and manage approval workflows
                  by specifying approval levels, approvers, escalation rules,
                  and conditions.
                </p>
              </div>

              <Link href="/dashboard/approvals/create">
              <button className="bg-[#7A008C] hover:bg-[#5f006d] text-white px-5 h-11 rounded-lg text-sm font-medium">
               + Add New
              </button>
              </Link>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="font-semibold text-[24px] mb-4 text-black">
                    Approvals Details ({approvals.length})
                  </h2>

                  <div className="flex gap-6 text-sm">
                    <button className="text-[#7A008C] border-b-2 border-[#7A008C] pb-2 font-medium">
                      All Approvals
                    </button>

                    <button className="text-gray-500">Activated</button>

                    <button className="text-gray-500">Deactivated</button>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Search
                      size={16}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                      type="text"
                      placeholder="Search"
                      className="h-10 border rounded-lg pl-10 pr-4 text-sm outline-none w-[260px]"
                    />
                  </div>

                  <button className="w-10 h-10 border rounded-lg flex items-center justify-center bg-white">
                    <Filter size={16} />
                  </button>

                  <label className="w-10 h-10 border rounded-lg flex items-center justify-center bg-white cursor-pointer">
  <Upload size={16} />

  <input
    type="file"
    className="hidden"
    onChange={(e) => setSelectedFile(e.target.files[0])}
  />
</label>
                </div>
              </div>

              <div className="overflow-hidden rounded-xl border">
              <table className="w-full text-sm">
                <thead className="bg-[#F8F8FC]">
                  <tr className="text-left text-gray-500">
                    <th className="p-4">
                      <input type="checkbox" />
                    </th>
                    <th className="p-4">Approval Name</th>
                    <th className="p-4">Approval Description</th>
                    <th className="p-4">Module Name</th>
                    <th className="p-4">Levels</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Created On</th>
                    <th className="p-4">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="8" className="text-center p-6">
                        Loading...
                      </td>
                    </tr>
                  ) : approvals.length === 0 ? (
                    <tr>
                      <td colSpan="8" className="text-center p-6">
                        No approvals found
                      </td>
                    </tr>
                  ) : (
                    approvals.map((item) => (
                      <tr
                        key={item.id}
                        className="border-t hover:bg-gray-50"
                      >
                        <td className="p-4">
                          <input type="checkbox" />
                        </td>

                        <td className="p-4 font-medium text-gray-700">
                          {item.name}
                        </td>

                        <td className="p-4 text-gray-500">
                          {item.description}
                        </td>

                        <td className="p-4 text-gray-600">
                          {item.module}
                        </td>

                        <td className="p-4 text-gray-600">
                          {item.levels}
                        </td>

                        <td className="p-4">
                          <span
                            className={`text-xs px-3 py-1 rounded-full ${
                              item.status === "Activated"
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            {item.status}
                          </span>
                        </td>

                        <td className="p-4 text-gray-600">
                          {new Date(item.createdAt).toLocaleDateString()}
                        </td>

                      <td className="p-4">
                        <MoreHorizontal
                          size={18}
                          className="text-[#7A008C] cursor-pointer"
                       />
                      </td>
                      </tr> 
                      ))
                      )}
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
  );
}