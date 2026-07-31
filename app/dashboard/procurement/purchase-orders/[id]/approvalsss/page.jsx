"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Sidebar from "../../../../users/components/Sidebar";
import Topbar from "../../../../users/components/Topbar";

export default function PurchaseOrderApprovalPage() {
  const { id } = useParams();
  const router = useRouter();

  const [po, setPo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPO();
  }, [id]);

  const fetchPO = async () => {
    try {
      const res = await fetch(`/api/purchase-orders/${id}`);
      const data = await res.json();

      setPo(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

const updateStatus = async (status) => {
  try {
    const res = await fetch(
      `/api/purchase-orders/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status,
        }),
      }
    );

    const data = await res.json();

    if (res.ok) {
      alert(`Purchase Order ${status}`);

      router.push(
        "/dashboard/procurement/purchase-orders"
      );
    } else {
      alert(data.error || "Failed to update status");
    }
  } catch (error) {
    console.log(error);
    alert("Something went wrong");
  }
};

  if (loading) {
    return <div>Loading...</div>;
  }

  const totalAmount =
    po?.items?.reduce(
      (sum, item) =>
        sum + item.quantity * item.unitPrice,
      0
    ) || 0;

  return (
    <div className="flex min-h-screen bg-[#F7F7FA]">
      <Sidebar />

      <div className="flex-1 flex flex-col ml-[74px]">
        <Topbar />

        <div className="pt-[95px] px-8 pb-8">

          <div className="flex items-center text-sm mb-6">
            <span className="text-[#7A008C]">
              Procurement
            </span>
            <span className="mx-2">{">"}</span>
            <span className="text-[#7A008C]">
              Purchase Orders
            </span>
            <span className="mx-2">{">"}</span>
            <span>Approval</span>
          </div>

          <div className="bg-white rounded-3xl border border-gray-200 shadow-lg p-8">

            <h1 className="text-3xl font-bold text-[#7A008C] mb-6">
              Purchase Order Approval
            </h1>

            <div className="grid grid-cols-3 gap-5 mb-8">

              <div className="border rounded-xl p-4">
                <p className="text-sm text-gray-500">
                  PO Number
                </p>
                <p className="font-semibold">
                  {po.poNumber}
                </p>
              </div>

              <div className="border rounded-xl p-4">
                <p className="text-sm text-gray-500">
                  RFQ Number
                </p>
                <p className="font-semibold">
                  {po.rfq?.rfqNumber}
                </p>
              </div>

              <div className="border rounded-xl p-4">
                <p className="text-sm text-gray-500">
                  Vendor
                </p>
                <p className="font-semibold">
                  {po.vendor?.vendorName}
                </p>
              </div>

              <div className="border rounded-xl p-4">
                <p className="text-sm text-gray-500">
                  Project
                </p>
                <p className="font-semibold">
                  {po.project?.projectName}
                </p>
              </div>

              <div className="border rounded-xl p-4">
                <p className="text-sm text-gray-500">
                  Order Date
                </p>
                <p className="font-semibold">
                  {new Date(
                    po.orderDate
                  ).toLocaleDateString()}
                </p>
              </div>

              <div className="border rounded-xl p-4">
                <p className="text-sm text-gray-500">
                  Expected Delivery
                </p>
                <p className="font-semibold">
                  {new Date(
                    po.expectedDeliveryDate
                  ).toLocaleDateString()}
                </p>
              </div>

            </div>

            <div className="overflow-x-auto border rounded-xl mb-8">

              <table className="w-full text-sm">

                <thead className="bg-[#F4F1F8]">
                  <tr>
                    <th className="px-4 py-3 text-left">
                      Product
                    </th>
                    <th className="px-4 py-3 text-left">
                      Quantity
                    </th>
                    <th className="px-4 py-3 text-left">
                      Unit Price
                    </th>
                    <th className="px-4 py-3 text-left">
                      Total
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {po.items?.map((item) => (
                    <tr
                      key={item.id}
                      className="border-t"
                    >
                      <td className="px-4 py-4">
                        {
                          item.product
                            ?.productName
                        }
                      </td>

                      <td className="px-4 py-4">
                        {item.quantity}
                      </td>

                      <td className="px-4 py-4">
                        ₹{item.unitPrice}
                      </td>

                      <td className="px-4 py-4 font-semibold">
                        ₹
                        {(
                          item.quantity *
                          item.unitPrice
                        ).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>

              </table>

            </div>

            <div className="flex justify-end mb-8">
              <div className="border rounded-xl p-5 w-[300px]">
                <div className="flex justify-between">
                  <span>Total Amount</span>
                  <span className="font-bold text-[#7A008C]">
                    ₹
                    {totalAmount.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
<div className="flex justify-end gap-4 mt-10">

  <button
    onClick={() => router.back()}
    className="
      px-6
      h-11
      rounded-lg
      border
      border-[#D0D5DD]
      bg-white
      text-[#344054]
      font-medium
      hover:bg-gray-50
    "
  >
    Cancel
  </button>

  <button
    onClick={() => updateStatus("Draft")}
    className="
      px-6
      h-11
      rounded-lg
      border
      border-[#B014A6]
      text-[#B014A6]
      font-medium
      hover:bg-[#FDF4FF]
    "
  >
    Save as Draft
  </button>

  <button
    onClick={() => updateStatus("Approved")}
    className="
      px-6
      h-11
      rounded-lg
      bg-[#B014A6]
      text-white
      font-medium
      hover:bg-[#920D88]
    "
  >
    Send to Approval
  </button>

</div>
            

          </div>
          
        </div>
      </div>
    </div>
  );
}