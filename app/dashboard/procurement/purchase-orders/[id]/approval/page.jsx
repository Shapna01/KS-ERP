"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import Sidebar from "../../../../users/components/Sidebar";
import Topbar from "../../../../users/components/Topbar";

export default function ApprovalPage() {
  const { id } = useParams();
  const router = useRouter();

  const [po, setPo] = useState(null);
  const [remarks, setRemarks] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      fetchPO();
    }
  }, [id]);

  async function fetchPO() {
    try {
      const res = await fetch(`/api/purchase-orders/${id}`);

      if (!res.ok) {
        throw new Error("Failed to load PO");
      }

      const data = await res.json();
      setPo(data);
    } catch (err) {
      console.log(err);
    }
  }

  async function updateStatus(status) {
    setLoading(true);

    try {
      const res = await fetch(`/api/purchase-orders/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error);
        return;
      }

      if (status === "Approved") {
        router.push(`/dashboard/purchase-orders/${id}/vendor`);
      } else {
        router.push("/dashboard/purchase-orders");
      }
    } catch (err) {
      console.log(err);
      alert("Something went wrong");
    }

    setLoading(false);
  }

  if (!po) {
    return <div className="p-10">Loading...</div>;
  }

  const total =  (po.items || []).reduce(
    (sum, item) => sum + item.quantity * item.unitPrice,
    0
  );

  return (
    <div className="flex min-h-screen bg-[#FCFAFE]">

      <Sidebar />

      <div className="flex-1 flex flex-col ml-[74px]">

        <Topbar />

        <div className="pt-[95px] px-8 pb-10">

          <div className="flex items-center text-sm mb-8">

            <span className="text-[#7A008C]">
              Procurement
            </span>

            <span className="mx-2">›</span>

            <span className="text-[#7A008C]">
              Purchase Orders
            </span>

            <span className="mx-2">›</span>

            <span className="text-[#667085]">
              Approval
            </span>

          </div>

          <div className="bg-white rounded-2xl border p-8">

            <h1 className="text-2xl font-bold mb-8">
              Purchase Order Approval
            </h1>

            <div className="grid grid-cols-3 gap-6">

              <div>
                <label className="text-sm text-gray-500">
                  PO Number
                </label>

                <input
                  readOnly
                  value={po.poNumber}
                  className="w-full h-11 border rounded-lg px-3 bg-gray-50"
                />
              </div>

              <div>
                <label className="text-sm text-gray-500">
                  Vendor
                </label>

                <input
                  readOnly
                  value={po.vendor?.vendorName || ""}
                  className="w-full h-11 border rounded-lg px-3 bg-gray-50"
                />
              </div>

              <div>
                <label className="text-sm text-gray-500">
                  Project
                </label>

                <input
                  readOnly
                  value={po.project?.projectName || ""}
                  className="w-full h-11 border rounded-lg px-3 bg-gray-50"
                />
              </div>

            </div>

            <div className="mt-10">

              <table className="w-full border rounded-xl">

                <thead className="bg-[#F9F3FD]">

                  <tr>

                    <th className="p-3 text-left">
                      Item
                    </th>

                    <th className="p-3 text-center">
                      Qty
                    </th>

                    <th className="p-3 text-center">
                      Price
                    </th>

                    <th className="p-3 text-right">
                      Amount
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {po.items?.map((item) => (

                    <tr
                      key={item.id}
                      className="border-t"
                    >

                      <td className="p-3">
                        {item.product?.productName}
                      </td>

                      <td className="p-3 text-center">
                        {item.quantity}
                      </td>

                      <td className="p-3 text-center">
                        ₹{item.unitPrice}
                      </td>

                      <td className="p-3 text-right">
                        ₹{item.quantity * item.unitPrice}
                      </td>

                    </tr>

                  ))}

                  <tr className="border-t bg-[#FAF5FF]">

                    <td
                      colSpan={3}
                      className="p-3 text-right font-bold"
                    >
                      Total
                    </td>

                    <td className="p-3 text-right font-bold text-[#B014A6]">
                      ₹{total.toLocaleString()}
                    </td>

                  </tr>

                </tbody>

              </table>

            </div>

            <div className="mt-8">

              <label className="text-sm font-medium">
                Approval Remarks
              </label>

              <textarea
                rows={4}
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                className="w-full border rounded-xl mt-2 p-4"
                placeholder="Enter remarks..."
              />

            </div>

            <div className="flex justify-end gap-4 mt-10">

              <button
                onClick={() => router.back()}
                className="px-6 h-11 border rounded-lg"
              >
                Back
              </button>

              <button
                disabled={loading}
                onClick={() => updateStatus("Rejected")}
                className="px-6 h-11 rounded-lg bg-red-600 text-white"
              >
                Reject
              </button>

              <button
                disabled={loading}
                onClick={() => updateStatus("Approved")}
                className="px-6 h-11 rounded-lg bg-[#7A008C] text-white"
              >
                Approve
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}