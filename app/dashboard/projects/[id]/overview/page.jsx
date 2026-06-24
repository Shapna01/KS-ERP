"use client";
import { useEffect, useState } from "react";
import Sidebar from "../../../users/components/Sidebar";
import Topbar from "../../../users/components/Topbar";
import Link from "next/link";
export default function ProjectOverviewPage() {
const [members, setMembers] = useState([]);
const [activeTab, setActiveTab] = useState("team");
const [requisitions, setRequisitions] = useState([]);
const [workOrderDocs, setWorkOrderDocs] = useState([]);
const [purchases, setPurchases] = useState([]);
useEffect(() => {
  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/users");
      const data = await res.json();
      setMembers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  fetchUsers();
}, []);
useEffect(() => {
  fetchPRs();
}, []);

const fetchPRs = async () => {
  const res = await fetch("/api/purchase-requisitions");
  const data = await res.json();
  setRequisitions(data);
};


return ( 

<div className="flex min-h-screen bg-gradient-to-br from-[#F7F7FA] to-[#F3F4F6]"><Sidebar />

  <div className="flex-1 flex flex-col overflow-hidden ml-[74px]">
    <Topbar />

    <div className="flex-1 overflow-y-auto pt-[72px] px-10 py-8 text-gray-600">

      <div className="text-sm mb-6 flex items-center">
        <span className="text-[#7A008C] font-medium">
          Projects
        </span>
        <span className="mx-2 text-gray-400">{">"}</span>
        <span className="text-gray-500">
          Video Management System
        </span>
      </div>

      <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm">

        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold text-[#7A008C] tracking-tight">
                Video Management System
              </h1>

              <span className="bg-yellow-100 text-yellow-700 text-xs px-3 py-1 rounded-full">
                In Progress
              </span>
            </div>

            <p className="text-gray-500 text-sm mt-2">
              Enables reviewers to approve, hold, or reject
              purchase requests according to set rules.
            </p>
          </div>

          <div className="flex gap-3">
            <button className="border border-green-500 text-green-600 px-5 h-10 rounded-xl hover:bg-green-50 transition">
              Mark as Completed
            </button>

            <button className="border border-[#7A008C] text-[#7A008C] px-5 h-10 rounded-xl hover:bg-[#7A008C] hover:text-white transition">
              Edit Project
            </button>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-6 mt-10">
          <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 hover:shadow-sm transition">
            <p className="text-xs text-gray-500">
              Project Manager
            </p>
            <p className="font-medium mt-1">
              Vignesh G
            </p>
          </div>

          <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 hover:shadow-sm transition">
            <p className="text-xs text-gray-500">
              Total Team Members
            </p>
            <p className="font-medium mt-1">
              20
            </p>
          </div>

          <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 hover:shadow-sm transition">
            <p className="text-xs text-gray-500">
              Start Date
            </p>
            <p className="font-medium mt-1">
              20/02/2024
            </p>
          </div>

          <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 hover:shadow-sm transition">
            <p className="text-xs text-gray-500">
              Project Duration
            </p>
            <p className="font-medium mt-1">
              12 Months
            </p>
          </div>
        </div>

        <div className="mt-10 border rounded-3xl bg-gradient-to-r from-[#FFF7FD] to-white p-6 shadow-sm">
          <h3 className="font-semibold text-[#7A008C] mb-4">
            Project Wallet
          </h3>

          <div className="mb-4">
            <p className="text-xs text-gray-500">
              Estimated Budget
            </p>
            <p className="font-semibold">
              Rs. 23.67 Cr
            </p>
          </div>

          <div className="h-3 bg-[#F0D8EC] rounded-full overflow-hidden">
            <div className="w-1/4 h-full bg-[#7A008C]" />
          </div>

          <div className="grid grid-cols-3 gap-4 mt-5">

            <div className="border rounded-xl bg-white p-4">
              <p className="text-xs text-gray-500">
                Spent
              </p>
              <p className="font-semibold">
                Rs. 23.67 Cr
              </p>
            </div>

            <div className="border rounded-xl bg-white p-4">
              <p className="text-xs text-gray-500">
                Available
              </p>
              <p className="font-semibold">
                Rs. 23.67 Cr
              </p>
            </div>

            <div className="border rounded-xl bg-white p-4">
              <p className="text-xs text-gray-500">
                Cost Overrun
              </p>
              <p className="font-semibold">
                -----
              </p>
            </div>

          </div>
        </div>

        <div className="mt-8 flex gap-2 bg-gray-100 p-2 rounded-2xl w-fit">
  <button
    onClick={() => setActiveTab("team")}
    className={`px-5 py-2 rounded-xl text-sm font-medium transition ${
      activeTab === "team"
        ? "border-b-2 border-[#7A008C] text-[#7A008C]"
        : ""
    }`}
  >
    Team Members ({members.length})
  </button>

  <button
    onClick={() => setActiveTab("requisitions")}
    className={`px-5 py-2 rounded-xl text-sm font-medium transition ${
      activeTab === "requisitions"
        ? "border-b-2 border-[#7A008C] text-[#7A008C]"
        : ""
    }`}
  >
    Purchase Requisitions ({requisitions.length})
  </button>

  <button
    onClick={() => setActiveTab("docs")}
    className={`px-5 py-2 rounded-xl text-sm font-medium transition ${
      activeTab === "docs"
        ? "border-b-2 border-[#7A008C] text-[#7A008C]"
        : ""
    }`}
  >
    Work Order Docs ({workOrderDocs.length})
  </button>

  <button
    onClick={() => setActiveTab("purchase")}
    className={`px-5 py-2 rounded-xl text-sm font-medium transition ${
      activeTab === "purchase"
        ? "border-b-2 border-[#7A008C] text-[#7A008C]"
        : ""
    }`}
  >
    Purchase ({purchases.length})
  </button>
</div>

        {activeTab === "team" && (
  <div className="flex justify-between items-center mt-6">
    <h3 className="font-medium">
      Users ({members.length})
    </h3>

    <div className="flex gap-3">
      <input
        placeholder="Search"
        className="border rounded-lg h-10 px-3"
      />

      <button className="bg-[#7A008C] text-white px-4 rounded-lg">
        Add New User
      </button>
    </div>
  </div>
)}

        {activeTab === "team" && (
          <div className="overflow-x-auto mt-6 rounded-xl border border-gray-100 shadow-sm">
            <table className="w-full text-sm">
              <thead>
               <tr className="bg-gray-50 text-gray-600 text-xs uppercase">
                  <th className="p-3 text-left">S.No</th>
                  <th className="p-3 text-left">Users</th>
                  <th className="p-3 text-left">Designation</th>
                  <th className="p-3 text-left">Department</th>
                  <th className="p-3 text-left">Team</th>
                  <th className="p-3 text-left">Added On</th>
                  <th className="p-3 text-left">Reporting Manager</th>
                  <th className="p-3 text-left">Action</th>
                </tr>
              </thead>

      <tbody>
        {members.map((member, index) => (
          <tr key={member.id} className="border-b hover:bg-gray-50 transition">
            <td className="p-3">{index + 1}</td>
            <td className="p-3">{member.name || "-"}</td>
            <td className="p-3">{member.role || "-"}</td>
            <td className="p-3">{member.department || "-"}</td>
            <td className="p-3">{member.team || "-"}</td>
            <td className="p-3">
              {member.joining_date
                ? new Date(member.joining_date).toLocaleDateString()
                : "-"}
            </td>
            <td className="p-3">{member.reporting_to || "-"}</td>
            <td className="p-3">
              <button className="px-3 py-1 text-xs bg-[#7A008C] hover:bg-[#66006f] text-white rounded-lg transition">
                View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      )}

      {activeTab === "requisitions" && (
  <div className="mt-5 bg-white border rounded-2xl p-6">

    <div className="flex justify-between items-center mb-6">
      <h3 className="font-semibold text-lg">
        Purchase Requisitions
      </h3>

      <Link
  href="/dashboard/projects/create-pr"
  className="bg-[#7A008C] text-white px-4 py-2 rounded-lg hover:bg-[#66006f]"
>
  + Raise PR Request
</Link>
    </div>

    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
        <tr className="bg-gray-50 border">
          <th className="p-3">S.No</th>
          <th className="p-3">PR No</th>
          <th className="p-3">PR Reason</th>
          <th className="p-3">Priority</th>
          <th className="p-3">Exp.Del Date</th>
          <th className="p-3">Submission Status</th>
          <th className="p-3">Category</th>
          <th className="p-3">Track Status</th>
          <th className="p-3">Action</th>
        </tr>
      </thead>

        <tbody>
  {requisitions.map((pr, index) => (
    <tr key={pr.id} className="border-b">

      <td className="p-3">{index + 1}</td>

      <td className="p-3">{pr.prNumber}</td>

      <td className="p-3 max-w-xs">
        {pr.reason}
      </td>

      <td className="p-3">
        <span className="px-2 py-1 rounded bg-blue-100 text-blue-600 text-xs">
          {pr.priority}
        </span>
      </td>

      <td className="p-3">
        {pr.expectedDeliveryDate
          ? new Date(pr.expectedDeliveryDate).toLocaleDateString()
          : "-"}
      </td>

      <td className="p-3">
        <span className="px-2 py-1 rounded bg-green-100 text-green-600 text-xs">
          Submitted
        </span>
      </td>

      <td className="p-3">{pr.category}</td>

      <td className="p-3">
        <span className="px-2 py-1 rounded bg-yellow-100 text-yellow-700 text-xs">
          {pr.status}
        </span>
      </td>

      <td className="p-3">
        <button className="text-[#7A008C] font-bold">
          ...
        </button>
      </td>

    </tr>
  ))}
</tbody> 
      </table>
    </div>

  </div>
)}

      {activeTab === "docs" && (
        <div className="mt-5 p-6 border rounded-lg bg-white">
          Work Order Documents List
        </div>
      )}

      {activeTab === "purchase" && (
        <div className="mt-5 p-6 border rounded-lg bg-white">
          Purchase List
        </div>
      )}

      </div>

    </div>
  </div>
</div>

);
}
