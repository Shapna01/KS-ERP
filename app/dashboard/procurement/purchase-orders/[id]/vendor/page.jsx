"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import Sidebar from "../../../../users/components/Sidebar";
import Topbar from "../../../../users/components/Topbar";

export default function VendorPOPage() {
  const { id } = useParams();
  const router = useRouter();

  const [po, setPo] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      fetchPO();
    }
  }, [id]);

  async function fetchPO() {
    const res = await fetch(`/api/purchase-orders/${id}`);
    const data = await res.json();
    setPo(data);
  }

  async function updateStatus(status) {
    setLoading(true);

    const res = await fetch(`/api/purchase-orders/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status,
      }),
    });

    if (res.ok) {
      router.push(`/dashboard/procurement/purchase-orders/${id}/grn`
);
    } else {
      alert("Failed to update status");
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
            <span className="text-[#7A008C]">Procurement</span>
            <span className="mx-2">›</span>
            <span className="text-[#7A008C]">Purchase Orders</span>
            <span className="mx-2">›</span>
            <span className="text-[#667085]">Vendor PO</span>
          </div>

          <div className="bg-white rounded-3xl border border-[#E9E4F1] shadow-sm p-8">

            <h1 className="text-2xl font-bold mb-8">
              Vendor Purchase Order
            </h1>

            <div className="grid grid-cols-2 gap-6">

              <div>
                <label className="block mb-2 text-xs font-medium uppercase tracking-wide text-[#667085]">
                  Vendor Name
                </label>

                <input
                  readOnly
                  value={po.vendor?.vendorName || ""}
                  className="
w-full
h-11
rounded-xl
border
border-[#EAECF0]
bg-[#F9FAFB]
px-4
text-[14px]
text-[#344054]
placeholder:text-[#98A2B3]
focus:outline-none
"
                />
              </div>

              <div>
                <label className="block mb-2 text-xs font-medium uppercase tracking-wide text-[#667085]">
                  Vendor Email
                </label>

                <input
                  readOnly
                  value={po.vendor?.email || ""}
                  className="
w-full
h-11
rounded-xl
border
border-[#EAECF0]
bg-[#F9FAFB]
px-4
text-[14px]
text-[#344054]
placeholder:text-[#98A2B3]
focus:outline-none
"
                />
              </div>

              <div>
                <label className="block mb-2 text-xs font-medium uppercase tracking-wide text-[#667085]">
                  Vendor Phone
                </label>

                <input
                  readOnly
                  value={po.vendor?.phone || ""}
                  className="
w-full
h-11
rounded-xl
border
border-[#EAECF0]
bg-[#F9FAFB]
px-4
text-[14px]
text-[#344054]
placeholder:text-[#98A2B3]
focus:outline-none
"
                />
              </div>

              <div>
                <label className="block mb-2 text-xs font-medium uppercase tracking-wide text-[#667085]">
                  Delivery Date
                </label>

                <input
                  readOnly
                  value={
                    po.expectedDeliveryDate
                      ? new Date(
                          po.expectedDeliveryDate
                        ).toLocaleDateString()
                      : ""
                  }
                  className="
w-full
h-11
rounded-xl
border
border-[#EAECF0]
bg-[#F9FAFB]
px-4
text-[14px]
text-[#344054]
placeholder:text-[#98A2B3]
focus:outline-none
"
                />
              </div>

            </div>

            <div className="mt-10 overflow-hidden rounded-xl border">

              <table className="w-full">

                <thead className="bg-[#F9F3FD]">

                  <tr>

                    <th className="p-3 text-left">
                      Item
                    </th>

                    <th className="p-3 text-center">
                      Qty
                    </th>

                    <th className="p-3 text-center">
                      Unit Price
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
                        ₹ {item.unitPrice}
                      </td>

                      <td className="p-3 text-right">
                        ₹ {(item.quantity * item.unitPrice).toLocaleString()}
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
                      ₹ {total.toLocaleString()}
                    </td>

                  </tr>

                </tbody>

              </table>

            </div>

            <div className="mt-8">

              <label className="block mb-2 text-xs font-medium uppercase tracking-wide text-[#667085]">
                Delivery Address
              </label>

              <textarea
                readOnly
                rows={3}
                value={po.deliveryAddress || ""}
                className="w-full border rounded-xl p-4 bg-gray-50 mt-2"
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
                className="px-6 h-11 rounded-lg bg-blue-600 text-white"
                onClick={() => window.print()}
              >
                Print PO
              </button>

              <button
                className="px-6 h-11 rounded-lg bg-green-600 text-white"
                onClick={() =>
                  alert("Email functionality can be integrated here.")
                }
              >
                Send Email
              </button>

              <button
                disabled={loading}
                className="px-6 h-11 rounded-lg bg-[#7A008C] text-white"
                onClick={() => updateStatus("Vendor Accepted")}
              >
                Vendor Accepted
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}