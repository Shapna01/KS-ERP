"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Sidebar from "../../../../users/components/Sidebar";
import Topbar from "../../../../users/components/Topbar";

export default function ClosePOPage() {
  const { id } = useParams();
  const router = useRouter();

  const [po, setPo] = useState(null);

  useEffect(() => {
    if (id) {
      fetchPO();
    }
  }, [id]);

  const fetchPO = async () => {
    const res = await fetch(`/api/purchase-orders/${id}`);
    const data = await res.json();
    setPo(data);
  };

  const closePO = async () => {
    const res = await fetch(`/api/purchase-orders/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: "Closed",
      }),
    });

    if (res.ok) {
      alert("Purchase Order Closed Successfully");
      router.push(`/dashboard/purchase-orders/${id}`);
    } else {
      alert("Failed to close Purchase Order");
    }
  };

  if (!po) {
    return <div className="p-10">Loading...</div>;
  }

  return (
    <div className="flex min-h-screen bg-[#FCFAFE]">
      <Sidebar />

      <div className="flex-1 flex flex-col ml-[74px]">
        <Topbar />

        <div className="flex-1 pt-[95px] px-8 pb-10">

          <h1 className="text-3xl font-bold mb-8">
            Close Purchase Order
          </h1>

          <div className="bg-white rounded-2xl border p-8">

            <div className="grid grid-cols-2 gap-6">

              <div>
                <label className="text-sm text-gray-500">
                  PO Number
                </label>

                <input
                  value={po.poNumber}
                  readOnly
                  className="w-full h-11 border rounded-lg px-4 bg-gray-50"
                />
              </div>

              <div>
                <label className="text-sm text-gray-500">
                  Vendor
                </label>

                <input
                  value={po.vendor?.vendorName || ""}
                  readOnly
                  className="w-full h-11 border rounded-lg px-4 bg-gray-50"
                />
              </div>

              <div>
                <label className="text-sm text-gray-500">
                  Project
                </label>

                <input
                  value={po.project?.projectName || ""}
                  readOnly
                  className="w-full h-11 border rounded-lg px-4 bg-gray-50"
                />
              </div>

              <div>
                <label className="text-sm text-gray-500">
                  Current Status
                </label>

                <input
                  value={po.status}
                  readOnly
                  className="w-full h-11 border rounded-lg px-4 bg-gray-50"
                />
              </div>

            </div>

            <div className="mt-8 p-6 rounded-xl bg-green-50 border border-green-200">

              <h2 className="text-lg font-semibold text-green-700">
                Ready to Close
              </h2>

              <p className="text-gray-600 mt-2">
                Goods have been received and invoices have been processed.
                Closing this Purchase Order will complete the procurement workflow.
              </p>

            </div>

            <div className="flex justify-end gap-4 mt-8">

              <button
                onClick={() => router.back()}
                className="px-6 py-3 border rounded-lg"
              >
                Back
              </button>

              <button
                onClick={closePO}
                className="px-6 py-3 rounded-lg bg-green-600 text-white"
              >
                Close Purchase Order
              </button>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
}