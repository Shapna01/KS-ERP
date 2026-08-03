"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import Sidebar from "../../users/components/Sidebar";
import Topbar from "../../users/components/Topbar";
import ProcurementSidebar from "../components/ProcurementSidebar";
export default function PurchaseOrdersPage() {
  const [purchaseOrders, setPurchaseOrders] = useState([]);

  useEffect(() => {
    fetchPurchaseOrders();
  }, []);

  const fetchPurchaseOrders = async () => {
    try {
      const res = await fetch("/api/purchase-orders");
      const data = await res.json();
      console.log("Purchase Orders API:", data);
      setPurchaseOrders(data);
      
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#F7F7FA]">
      <Sidebar />
      <ProcurementSidebar />
      <div className="flex-1 flex flex-col ml-[74px]">
        <Topbar />

        <div className="flex-1 overflow-y-auto pt-[100px] ml-[250px] px-8 py-7">

          <div className="flex items-center text-sm mb-8 font-medium">
            <span className="text-[#7A008C]">Procurement</span>
            <span className="mx-2">{">"}</span>
            <span className="text-gray-700">Purchase Orders</span>
          </div>

          <div className="flex justify-between items-start mb-8">

            <div>
             <h1 className="text-4xl font-bold text-[#7A008C] tracking-tight">
                Purchase Orders
              </h1>

              <p className="text-sm text-gray-600 mt-2">
                Manage all purchase orders.
              </p>
            </div>

            <Link
              href="/dashboard/procurement/purchase-orders/create"
              className="bg-[#7A008C] text-white px-6 py-3 rounded-xl shadow-md hover:bg-[#650074] transition-all duration-200"
            >
              + Create New
            </Link>

          </div>

          <div className="bg-white rounded-3xl border border-gray-200 shadow-lg p-7">

            <div className="flex justify-between items-center mb-5">

              <h2 className="text-lg font-semibold text-gray-800">
                Purchase Orders ({purchaseOrders.length})
              </h2>

              <div className="relative">
                <Search
                  className="absolute left-3 top-3 text-gray-400"
                  size={18}
                />

                <input
                placeholder="Search Purchase Orders..."
                className="w-[300px] h-11 rounded-xl border border-gray-300 bg-white pl-10 pr-4 text-gray-700 placeholder:text-gray-400 focus:border-[#7A008C] focus:ring-2 focus:ring-[#7A008C]/20 outline-none transition"
                />
              </div>

            </div>

            <div className="overflow-x-auto rounded-2xl border border-gray-200">

              <table className="w-full text-sm">

                <thead>
  <tr className="bg-[#F9FAFB] text-[11px] text-[#667085]">
    <th className="px-4 py-3">
      <input type="checkbox" />
    </th>

    <th className="px-4 py-3 text-left">PO Number</th>
    <th className="px-4 py-3 text-left">Project No</th>
    <th className="px-4 py-3 text-left">RFQ No</th>
    <th className="px-4 py-3 text-left">Department</th>
    <th className="px-4 py-3 text-left">Priority</th>
    <th className="px-4 py-3 text-left">Category</th>
    <th className="px-4 py-3 text-left">Type</th>
    <th className="px-4 py-3 text-left">Status</th>
    <th className="px-4 py-3 text-left">Amount (Rs)</th>
    <th className="px-4 py-3 text-left">Exp.Del Date</th>
    <th className="px-4 py-3 text-center">Actions</th>
  </tr>
</thead>

<tbody>

{purchaseOrders.length > 0 ? (
  purchaseOrders.map((po) => (
  <tr
  key={po.id}
  className="border-t border-[#EAECF0] text-[12px]"
>
  <td className="px-4 py-4 text-black">
    <input type="checkbox" />
  </td>

  <td className="px-4 py-4 text-black">
  <Link
      href={`/dashboard/procurement/purchase-orders/${po.id}`}

    className="text-[#7A008C] font-medium hover:underline"
  >
    {po.poNumber}
  </Link>
</td>

  <td className="px-4 py-4 text-black">
    {po.project?.projectCode || po.project?.id}
  </td>

  <td className="px-4 py-4 text-black text-black ">
    {po.rfq?.rfqNumber}
  </td>

  <td className="px-4 py-4 text-black">
      {po.rfq?.purchaseRequisition?.requestorDept}

  </td>

  <td className="px-4 py-4 ">
    <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-[10px]">
       {po.rfq?.purchaseRequisition?.priority}

    </span>
  </td>

  <td className="px-4 py-4 text-black">
     {po.rfq?.purchaseRequisition?.category}
  </td>

  <td className="px-4 py-4 text-black">
    One-time
  </td>

  <td className="px-4 py-4 ">
  <span
    className={`px-2 py-1 rounded text-[10px] ${
      po.status === "Closed"
        ? "bg-green-100 text-green-700"
        : po.status === "Approved"
        ? "bg-blue-100 text-blue-700"
        : po.status === "Receive Goods"
        ? "bg-yellow-100 text-yellow-700"
        : "bg-gray-100 text-gray-700"
    }`}
  >
    {po.status || "Purchase Order"}
  </span>
</td>

  <td className="px-4 py-4 text-black ">
    ₹
    {po.items
      ?.reduce(
        (sum, item) =>
          sum + item.quantity * item.unitPrice,
        0
      )
      .toLocaleString()}
  </td>

  <td className="px-4 py-4 text-black">
    {new Date(
      po.expectedDeliveryDate
    ).toLocaleDateString()}
  </td>

  <td className="px-4 py-4 text-center">
    <button className="text-[#C11574] text-xl">
      ...
    </button>
  </td>
</tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={6}
                        className="text-center py-12 text-gray-500 font-medium"
                      >
                        No Purchase Orders Found
                      </td>
                    </tr>
                  )}

                </tbody>

              </table>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
}