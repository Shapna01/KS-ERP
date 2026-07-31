"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";import Sidebar from "../../../users/components/Sidebar";
import Topbar from "../../../users/components/Topbar";
import Link from "next/link";
import { useParams } from "next/navigation";
import ProjectSidebar from "../../components/ProjectSidebar";

export default function ProjectOverviewPage() {
const [members, setMembers] = useState([]);
const [activeTab, setActiveTab] = useState("team");
const [requisitions, setRequisitions] = useState([]);
const [workOrderDocs, setWorkOrderDocs] = useState([]);
const [purchases, setPurchases] = useState([]);
const { id } = useParams();
console.log("Project ID:", id);
const [project, setProject] = useState(null);

useEffect(() => {
  if (!id) return;

  fetch(`/api/projects/${id}`)
    .then((res) => res.json())
    .then((data) => setProject(data));
}, [id]);




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
  if (id) {
    fetchPRs();
  }
}, [id]);


const fetchPRs = async () => {
  const res = await fetch(`/api/projects/${id}/purchase-requisitions`);
  const data = await res.json();
  setRequisitions(data);
};

 const duration =
  project?.startDate && project?.endDate
    ? Math.ceil(
        (new Date(project.endDate) - new Date(project.startDate)) /
        (1000 * 60 * 60 * 24 * 30)
      )
    : 0;
    useEffect(() => {
  if (id) {
    fetchPurchaseOrders();
  }
}, [id]);

const fetchPurchaseOrders = async () => {
  const res = await fetch(`/api/projects/${id}/purchase-orders`);
  const data = await res.json();

setPurchases(
 Array.isArray(data)
 ? data
 : data.purchases || []
);
};
return ( 

<div className="flex min-h-screen bg-gradient-to-br from-[#F7F7FA] to-[#F3F4F6]"><Sidebar />

    <ProjectSidebar />

  <div className="flex-1 ml-[324px] bg-[#F7F7FA] min-h-screen">
    <Topbar />

    <div className="pt-[92px] px-10 pb-10 w-full">

      <div className="text-sm mb-6 flex items-center">
        <span className="text-[#7A008C] font-medium">
          Projects
        </span>
        <span className="mx-2 text-gray-400">{">"}</span>
        <span className="text-gray-500">
          {project?.projectName}
        </span>
      </div>

     <div className="bg-white rounded-[24px] border border-[#EAECF0] shadow-[0_2px_12px_rgba(16,24,40,0.06)] px-10 py-8">

        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-[28px] font-semibold text-[#7A008C] tracking-tight">
               {project?.projectName}
              </h1>

              <span className="px-3 py-1 rounded-full bg-[#FFF7D6] text-[#A15C00] text-xs font-medium">
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

        <div className="grid grid-cols-4 gap-6 mt-8">
          <div className="
bg-[#F8F9FC]
rounded-2xl
border
border-[#EAECF0]
h-[96px]
px-5
py-4
flex
flex-col
justify-center
">
            <p className="text-xs text-[#667085]">
Project Manager
</p>

<p className="mt-1 font-semibold">
{project?.projectManager}
</p>
          </div>

          <div className="
bg-[#F8F9FC]
rounded-2xl
border
border-[#EAECF0]
h-[96px]
px-5
py-4
flex
flex-col
justify-center
">
            <p className="text-[12px] font-medium text-[#667085]">
              Total Team Members
              </p>

              <p className="mt-1 text-[18px] font-semibold text-[#101828]">
              20
              </p>
          </div>

          <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 hover:shadow-sm transition">
            <p className="text-[12px] font-medium text-[#667085]">
              Start Date
            </p>
            <p className="mt-1 text-[18px] font-semibold text-[#101828]">
              {project?.startDate
  ? new Date(project.startDate).toLocaleDateString()
  : "-"}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 hover:shadow-sm transition">
            <p className="text-[12px] font-medium text-[#667085]">
Project Duration
</p>

<p className="mt-1 text-[18px] font-semibold text-[#101828]">
{duration} Months
</p>
          </div>
        </div>

        <div className="
mt-8
rounded-[24px]
border
border-[#F4D6EC]
bg-gradient-to-r
from-[#FFF7FD]
to-[#FFF]
p-8
">
          <h3 className="text-[12px] font-medium text-[#667085]">
            Project Wallet
          </h3>

          <div className="mb-4">
            <p className="text-sm font-medium text-[#667085]">
              Estimated Budget
              </p>

              <p className="text-[28px] font-bold text-[#7A008C] mt-1">
              ₹ {Number(project?.estimatedBudget || 0).toLocaleString()}
              </p>
          </div>

          <div className="w-full h-[10px] rounded-full bg-[#F2D9EA] overflow-hidden">
            <div
                className="h-full rounded-full bg-[#7A008C]"
                style={{width:"35%"}}
            />
        </div>

          <div className="grid grid-cols-3 gap-5 mt-5">

            <div className="bg-white
border
border-[#EAECF0]
rounded-2xl
p-5
shadow-sm
">
              <p className="text-[12px] font-medium text-[#667085]">
                Spent
              </p>
              <p className="text-[20px] font-bold text-[#101828] mt-1">
                Rs. 23.67 Cr
              </p>
            </div>

            <div className="
bg-white
border
border-[#EAECF0]
rounded-2xl
p-5
shadow-sm
">
              <p className="text-[12px] font-medium text-[#667085]">
                Available
              </p>
              <p className="font-semibold">
                Rs. 23.67 Cr
              </p>
            </div>

            <div className="
bg-white
border
border-[#EAECF0]
rounded-2xl
p-5
shadow-sm
">
              <p className="text-[12px] font-medium text-[#667085]">
                Cost Overrun
              </p>
              <p className="font-semibold">
                -----
              </p>
            </div>

          </div>
        </div>

        <div className="mt-8 border-b border-[#EAECF0] flex gap-8">
  <button
    onClick={() => setActiveTab("team")}
    className={`pb-4 text-[14px] font-medium transition ${
activeTab==="team"
? "text-[#7A008C] border-b-[3px] border-[#7A008C]"
: "text-[#667085] hover:text-[#7A008C]"
}`}
  >
    Team Members ({members.length})
  </button>

  <button
    onClick={() => setActiveTab("requisitions")}
    className={`pb-4 text-[14px] font-medium transition ${
activeTab==="team"
? "text-[#7A008C] border-b-[3px] border-[#7A008C]"
: "text-[#667085] hover:text-[#7A008C]"
}`}
  >
    Purchase Requisitions ({requisitions.length})
  </button>

  <button
    onClick={() => setActiveTab("docs")}
    className={`pb-4 text-[14px] font-medium transition ${
activeTab==="team"
? "text-[#7A008C] border-b-[3px] border-[#7A008C]"
: "text-[#667085] hover:text-[#7A008C]"
}`}
  >
    Work Order Docs ({workOrderDocs.length})
  </button>

  <button
    onClick={() => setActiveTab("purchase")}
    className={`pb-4 text-[14px] font-medium transition ${
    activeTab==="team"
    ? "text-[#7A008C] border-b-[3px] border-[#7A008C]"
    : "text-[#667085] hover:text-[#7A008C]"
    }`}
      >
    Purchase ({purchases.length})
  </button>
</div>

        {activeTab === "team" && (
        <div className="flex justify-between items-center mt-6">
          <h3 className="text-[18px] font-semibold text-[#101828]">
            Users ({members.length})
          </h3>

          <div className="flex gap-3">
            <input
              placeholder="Search"
              className="w-[260px] h-[42px] rounded-xl border border-[#D0D5DD] bg-white px-4 text-sm text-[#101828] placeholder:text-[#98A2B3] focus:border-[#7A008C] focus:ring-2 focus:ring-[#7A008C]/20 outline-none"
            />

            <button className="h-[42px] px-5 rounded-xl bg-[#7A008C] text-white text-sm font-semibold hover:bg-[#650070]">
              Add New User
            </button>
          </div>
        </div>
      )}

        {activeTab === "team" && (
          <div className="overflow-x-auto mt-6 rounded-xl border border-gray-100 shadow-sm">
            <table className="w-full text-sm">
              <thead>
               <tr className="bg-[#F9FAFB] text-[#667085] text-[12px] font-semibold uppercase">
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
            <td className="px-5 py-4 text-[14px] text-[#344054]">{index + 1}</td>
            <td className="px-5 py-4 text-[14px] text-[#344054]">{member.name || "-"}</td>
            <td className="px-5 py-4 text-[14px] text-[#344054]">{member.role || "-"}</td>
            <td className="px-5 py-4 text-[14px] text-[#344054]">{member.department || "-"}</td>
            <td className="px-5 py-4 text-[14px] text-[#344054]">{member.team || "-"}</td>
            <td className="px-5 py-4 text-[14px] text-[#344054]">
              {member.joining_date
                ? new Date(member.joining_date).toLocaleDateString()
                : "-"}
            </td>
            <td className="px-5 py-4 text-[14px] text-[#344054]">{member.reporting_to || "-"}</td>
            <td className="px-5 py-4 text-[14px] text-[#344054]">
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
      <h3 className="font-semibold text-lg text-black">
        Purchase Requisitions
      </h3>

    <Link
      href={{
        pathname: "/dashboard/projects/create-pr",
        query: { projectId: id },
      }}
      className="bg-[#7A008C] text-white px-4 py-2 rounded-lg hover:bg-[#66006f]"
    >
      + Raise PR Request
    </Link>
    </div>

    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
        <tr className="bg-gray-200 text-gray-600 ">
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

      <td className="px-5 py-4 text-[14px] text-[#344054]">{index + 1}</td>

      <td className="px-5 py-4 text-[14px] text-[#344054]">{pr.prNumber}</td>

      <td className="px-5 py-4 text-[14px] text-[#344054] max-w-xs">
        {pr.reason}
      </td>

      <td className="px-5 py-4 text-[14px] text-[#344054]">
        <span className="px-2 py-1 rounded bg-blue-100 text-blue-600 text-xs">
          {pr.priority}
        </span>
      </td>

      <td className="px-5 py-4 text-[14px] text-[#344054]">
        {pr.expectedDeliveryDate
          ? new Date(pr.expectedDeliveryDate).toLocaleDateString()
          : "-"}
      </td>

      <td className="px-5 py-4 text-[14px] text-[#344054]">
        <span className="px-2 py-1 rounded bg-green-100 text-green-600 text-xs">
          Submitted
        </span>
      </td>

      <td className="px-5 py-4 text-[14px] text-[#344054]">{pr.category}</td>

      <td className="px-5 py-4 text-[14px] text-[#344054]">
        <span className="px-2 py-1 rounded bg-yellow-100 text-yellow-700 text-xs">
          {pr.status}
        </span>
      </td>

      <td className="px-5 py-4 text-[14px] text-[#344054]">
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
        <div className="mt-5 bg-white border rounded-2xl p-6">

<div className="flex justify-between items-center mb-6">

<h3 className="font-semibold text-lg">
Purchase Orders ({purchases.length})
</h3>

<Link
href={{
pathname:"/dashboard/purchase/create-po",
query:{projectId:id}
}}
className="bg-[#7A008C] text-white px-4 py-2 rounded-lg"
>
+ Create PO
</Link>

</div>

<div className="overflow-x-auto">

<table className="w-full text-sm">

<thead>

<tr className="bg-gray-100">

<th className="p-3">PO Number</th>

<th className="p-3">Vendor</th>

<th className="p-3">Total Amount</th>

<th className="p-3">Invoice Amount</th>

<th className="p-3">Due Date</th>

<th className="p-3">Payment Status</th>

</tr>

</thead>

<tbody>

{purchases.map((po)=>{

const invoiceTotal = po.invoices.reduce(
(sum,i)=>sum+i.grandTotal,
0
);

const status =
invoiceTotal === 0
? "Unpaid"
: invoiceTotal < po.totalAmount
? "Partially Paid"
: "Fully Paid";

return(

<tr key={po.id} className="border-b">

<td className="p-3">
{po.poNumber}
</td>

<td className="p-3">
{po.vendor.vendorName}
</td>

<td className="p-3">
₹ {po.totalAmount.toLocaleString()}
</td>

<td className="p-3">
₹ {invoiceTotal.toLocaleString()}
</td>

<td className="p-3">
{
po.expectedDeliveryDate
? new Date(
po.expectedDeliveryDate
).toLocaleDateString()
: "-"
}
</td>

<td className="p-3">

<span
className={`px-2 py-1 rounded text-xs
${
status==="Fully Paid"
?"bg-green-100 text-green-700"
:status==="Partially Paid"
?"bg-yellow-100 text-yellow-700"
:"bg-red-100 text-red-700"
}`}
>

{status}

</span>

</td>

</tr>

);

})}

</tbody>

</table>

</div>

</div>
      )}

      </div>

    </div>
  </div>
</div>

);
}
