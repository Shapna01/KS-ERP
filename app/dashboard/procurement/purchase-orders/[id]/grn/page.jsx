"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import Sidebar from "../../../../users/components/Sidebar";
import Topbar from "../../../../users/components/Topbar";

export default function GRNPage() {
  const { id } = useParams();
  const router = useRouter();

  const [po, setPo] = useState(null);
  const [receivedItems, setReceivedItems] = useState([]);
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
      throw new Error("Failed to fetch Purchase Order");
    }

    const data = await res.json();

    setPo(data);

    const items = (data.items || []).map((item) => {
      const alreadyReceived =
        (data.goodsReceipts || []).reduce((total, grn) => {
          const grnItem = (grn.items || []).find(
            (x) => x.purchaseOrderItemId === item.id
          );

          return total + (grnItem?.receivedQuantity || 0);
        }, 0);

      const remaining = Math.max(
        item.quantity - alreadyReceived,
        0
      );

      return {
        itemId: item.id,

        productName: item.product?.productName || "",

        ordered: item.quantity,

        alreadyReceived,

        remaining,

        received: remaining,

        accepted: remaining,

        rejected: 0,

        remarks: "",
      };
    });

    setReceivedItems(items);
  } catch (error) {
    console.error(error);
    alert("Failed to load Purchase Order");
  }
}

  function handleChange(index, field, value) {
  const updated = [...receivedItems];

  let numberValue = Number(value);

  if (Number.isNaN(numberValue)) {
    numberValue = 0;
  }

  if (numberValue < 0) {
    numberValue = 0;
  }

  const item = updated[index];

  if (field === "received") {
    numberValue = Math.min(
      numberValue,
      item.remaining
    );

    item.received = numberValue;

    item.accepted = Math.min(
      item.accepted,
      numberValue
    );

    item.rejected =
      numberValue - item.accepted;
  }

  if (field === "accepted") {
    numberValue = Math.min(
      numberValue,
      item.received
    );

    item.accepted = numberValue;

    item.rejected =
      item.received - item.accepted;
  }

  if (field === "rejected") {
    numberValue = Math.min(
      numberValue,
      item.received
    );

    item.rejected = numberValue;

    item.accepted =
      item.received - item.rejected;
  }

  if (field === "remarks") {
    item.remarks = value;
  }

  setReceivedItems(updated);
}
  if (!po) {
    return <div className="p-10">Loading...</div>;
  }

  async function generateGRN() {
  try {
    setLoading(true);

    for (const item of receivedItems) {
      if (item.received <= 0) {
        alert(
          `Please enter received quantity for ${item.productName}`
        );
        return;
      }

      if (
        item.accepted + item.rejected !==
        item.received
      ) {
        alert(
          `${item.productName}: Accepted + Rejected must equal Received`
        );
        return;
      }

      if (item.received > item.remaining) {
        alert(
          `${item.productName}: Received quantity cannot exceed remaining quantity`
        );
        return;
      }
    }

const payload = {
  purchaseOrderId: Number(po.id),

  receivedDate: new Date().toISOString(),

  items: receivedItems.map((item) => ({
    purchaseOrderItemId: Number(item.itemId),

    receivedQuantity: Number(item.received),

    acceptedQuantity: Number(item.accepted),

    rejectedQuantity: Number(item.rejected),

    remarks: item.remarks || "",
  })),
};

console.log(
  "GRN Request Body:",
  JSON.stringify(payload, null, 2)
);
    const res = await fetch("/api/grn", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(payload),
    });

    const data = await res.json();

    console.log("GRN API Response:", data);

    if (!res.ok) {
      throw new Error(
        data.message ||
        data.error ||
        "Failed to generate GRN"
      );
    }

    alert(
      `${data.grnNumber} generated successfully`
    );

    router.push(
      `/dashboard/procurement/purchase-orders/${id}`
    );

  } catch (error) {
    console.error(
      "Generate GRN error:",
      error
    );

    alert(
      error.message ||
      "Failed to generate GRN"
    );
  } finally {
    setLoading(false);
  }
}

  const totalOrdered = receivedItems.reduce(
    (sum, item) => sum + item.ordered,
    0
  );

  const totalReceived = receivedItems.reduce(
    (sum, item) => sum + item.received,
    0
  );

  const totalAccepted = receivedItems.reduce(
    (sum, item) => sum + item.accepted,
    0
  );

  const totalRejected = receivedItems.reduce(
    (sum, item) => sum + item.rejected,
    0
  );

  return (
    <div className="flex min-h-screen bg-gray-50">

      <Sidebar />

      <div className="flex-1 flex flex-col ml-[74px]">

        <Topbar />

        <div className="pt-[95px] px-8 pb-10">


          <div className="flex items-center text-sm mb-8">

           <span className="font-medium text-gray-600">
              Procurement
            </span>

            <span className="mx-2">›</span>

           <span className="font-medium text-gray-600">
              Purchase Orders
            </span>

            <span className="mx-2">›</span>

            <span className="text-gray-500">
              Goods Receipt Note
            </span>

          </div>


          <div className="bg-white rounded-2xl border border-gray-200 shadow-md p-8">

            <h1 className="text-3xl font-semibold text-gray-800">
              Goods Receipt Note
            </h1>

            <p className="mt-2 text-gray-500">
              Verify received goods and generate the GRN.
            </p>


            <div className="grid grid-cols-3 gap-5 mt-8">

              <div>
                <label className="block mb-2 text-[12px] font-medium uppercase tracking-wide text-gray-500">
                  GRN Number
                </label>

                <input
                  readOnly
                  value={po.goodsReceipts?.[0]?.grnNumber || ""}
                  className="
                        w-full
                        h-11
                        rounded-xl
                        border
                        border-gray-300
                        bg-gray-50
                        text-gray-700
                        px-4
                        text-[14px]
                        placeholder:text-[#98A2B3]
                        focus:border-[#7A008C]
                        focus:ring-2
                        focus:ring-[#F4E8FF]
                        focus:outline-none
                        transition
                        "
                />
              </div>

              <div>
                <label className="block mb-2 text-[12px] font-medium uppercase tracking-wide text-[#667085]">
                  GRN Date
                </label>

                <input
                  readOnly
                  value={new Date().toLocaleDateString()}
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
focus:border-[#7A008C]
focus:ring-2
focus:ring-[#F4E8FF]
focus:outline-none
transition
"
                />
              </div>

              <div>
                <label className="block mb-2 text-[12px] font-medium uppercase tracking-wide text-[#667085]">
                  Purchase Order
                </label>

                <input
                  readOnly
                  value={po.poNumber}
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
focus:border-[#7A008C]
focus:ring-2
focus:ring-[#F4E8FF]
focus:outline-none
transition
"
                />
              </div>

              <div>
                <label className="block mb-2 text-[12px] font-medium uppercase tracking-wide text-[#667085]">
                  Vendor
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
focus:border-[#7A008C]
focus:ring-2
focus:ring-[#F4E8FF]
focus:outline-none
transition
"
                />
              </div>

              <div>
                <label className="block mb-2 text-[12px] font-medium uppercase tracking-wide text-[#667085]">
                  Project
                </label>

                <input
                  readOnly
                  value={po.project?.projectName || ""}
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
focus:border-[#7A008C]
focus:ring-2
focus:ring-[#F4E8FF]
focus:outline-none
transition
"
                />
              </div>

              <div>
                <label className="block mb-2 text-[12px] font-medium uppercase tracking-wide text-[#667085]">
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
                    focus:outline-none
                    "
                />
              </div>

            </div>

            <div className="mt-10">

              <h2 className="text-xl font-semibold text-gray-800">
                Goods Receipt Items
              </h2>

              <p className="text-sm text-[#667085] mb-5">
                Verify the quantity received from the vendor.
              </p>

              <div className="
                overflow-hidden
                rounded-2xl
                border
                border-[#EAECF0]
                bg-white
              ">

                <table className="w-full text-sm">

                  <thead className="bg-[#F9FAFB] border-b border-[#EAECF0]">
                  <tr>
                    <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-[#667085]">
                      S.No
                    </th>

                    <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-[#667085]">
                      Item
                    </th>

                    <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-[#667085]">
                      Ordered
                    </th>

                    <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-[#667085]">
                      Already Received
                    </th>

                    <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-[#667085]">
                      Remaining
                    </th>

                    <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-[#667085]">
                      Received
                    </th>

                    <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-[#667085]">
                      Accepted
                    </th>

                    <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-[#667085]">
                      Rejected
                    </th>
                  </tr>
                </thead>

                  <tbody>
                  {receivedItems.map((item, index) => (
                    <tr
                      key={item.itemId}
                      className="border-t border-gray-200 hover:bg-gray-50 transition"
                    >

                      <td className="px-5 py-4 text-[14px] text-gray-700">
                        {index + 1}
                      </td>

                      <td className="px-5 py-4 text-[14px] font-medium text-gray-800">
                        {item.productName}
                      </td>

                      <td className="px-5 py-4 text-[14px] text-gray-700">
                        {item.ordered}
                      </td>

                      <td className="px-5 py-4 text-[14px] text-gray-500">
                        {item.alreadyReceived}
                      </td>

                      <td className="px-5 py-4 text-[14px] font-medium text-orange-600">
                        {item.remaining}
                      </td>

                      <td className="px-5 py-4">
                        <input
                          type="number"
                          min="0"
                          max={item.remaining}
                          value={item.received}
                          onChange={(e) =>
                            handleChange(
                              index,
                              "received",
                              e.target.value
                            )
                          }
                          className="w-20 h-10 rounded-lg border border-gray-300 bg-white text-center text-[14px] text-gray-700 focus:border-[#7A008C] focus:ring-2 focus:ring-[#F4E8FF] focus:outline-none"
                        />
                      </td>

                      <td className="px-5 py-4">
                        <input
                          type="number"
                          min="0"
                          max={item.received}
                          value={item.accepted}
                          onChange={(e) =>
                            handleChange(
                              index,
                              "accepted",
                              e.target.value
                            )
                          }
                          className="w-20 h-10 rounded-lg border border-gray-300 bg-white text-center text-[14px] text-gray-700 focus:border-[#7A008C] focus:ring-2 focus:ring-[#F4E8FF] focus:outline-none"
                        />
                      </td>

                      <td className="px-5 py-4">
                        <input
                          type="number"
                          min="0"
                          max={item.received}
                          value={item.rejected}
                          onChange={(e) =>
                            handleChange(
                              index,
                              "rejected",
                              e.target.value
                            )
                          }
                          className="w-20 h-10 rounded-lg border border-gray-300 bg-white text-center text-[14px] text-gray-700 focus:border-[#7A008C] focus:ring-2 focus:ring-[#F4E8FF] focus:outline-none"
                        />
                      </td>

                    </tr>
                  ))}
                </tbody>
                </table>

              </div>

            </div>


            <div className="grid grid-cols-4 gap-5 mt-10">

              <div className="
                  rounded-2xl
                  border
                  border-[#EAECF0]
                  bg-white
                  p-6
                  shadow-sm
                  ">

                <p className="
                    block
                    mb-2
                    text-[12px]
                    font-medium
                    uppercase
                    tracking-wide
                    text-[#667085]
                    ">
                  Ordered Qty
                </p>

                <h2 className="mt-2 text-3xl font-semibold text-gray-800">
                  {totalOrdered}
                </h2>

              </div>

              <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm ">

                <p className="
                    block
                    mb-2
                    text-[12px]
                    font-medium
                    uppercase
                    tracking-wide
                    text-[#667085]
                    ">
                  Received Qty
                </p>

                <h2 className="text-2xl font-bold mt-2 text-green-600">
                  {totalReceived}
                </h2>

              </div>

              <div className="bg-[#EEF4FF] rounded-xl border p-5">

                <p className="text-xs text-gray-500">
                  Accepted Qty
                </p>

                <h2 className="text-2xl font-bold mt-2 text-blue-600">
                  {totalAccepted}
                </h2>

              </div>

              <div className="bg-[#FEF3F2] rounded-xl border p-5">

                <p className="text-xs text-gray-500">
                  Rejected Qty
                </p>

                <h2 className="text-2xl font-bold mt-2 text-red-600">
                  {totalRejected}
                </h2>

              </div>

            </div>


            <div className="mt-10">

              <label className="block text-sm font-medium mb-2">
                Overall Remarks
              </label>

              <textarea
                rows={4}
                placeholder="Enter inspection remarks..."
                className="
w-full
rounded-xl
border
border-gray-300
bg-gray-50
p-4
text-[14px]
text-gray-700
placeholder:text-[#98A2B3]
focus:border-[#7A008C]
focus:ring-2
focus:ring-[#F4E8FF]
focus:outline-none
transition
"
              />

            </div>

            <div className="mt-10">

              <h2 className="text-xl font-semibold text-[#111827] mb-5">
                Attachments
              </h2>

              <div className="grid grid-cols-3 gap-5">

                <div className="
rounded-2xl
border-2
border-dashed
border-[#D0D5DD]
bg-gray-50
p-8
text-center
hover:border-[#7A008C]
hover:bg-purple-50
transition
">

                  <p className="font-medium text-gray-700">
                    Delivery Challan
                  </p>

                  <input
                    type="file"
                    className="mt-4 w-full"
                  />

                </div>

                <div className="
rounded-2xl
border-2
border-dashed
border-[#D0D5DD]
bg-[#FCFCFD]
p-8
text-center
hover:border-[#7A008C]
hover:bg-[#FAF5FF]
transition
">

                  <p className="font-medium">
                    Packing List
                  </p>

                  <input
                    type="file"
                    className="mt-4 w-full"
                  />

                </div>

                <div className="
rounded-2xl
border-2
border-dashed
border-[#D0D5DD]
bg-[#FCFCFD]
p-8
text-center
hover:border-[#7A008C]
hover:bg-[#FAF5FF]
transition
">

                  <p className="font-medium">
                    Goods Images
                  </p>

                  <input
                    type="file"
                    multiple
                    className="mt-4 w-full"
                  />

                </div>

              </div>

            </div>


            <div className="mt-10">

              <h2 className="text-xl font-semibold text-gray-800 mb-5">
                Inspection Details
              </h2>

              <div className="grid grid-cols-3 gap-5">

                <div>

                  <label className="text-xs text-gray-500">
                    Inspected By
                  </label>

                  <input
                    value="Store Manager"
                    readOnly
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
focus:border-[#7A008C]
focus:ring-2
focus:ring-[#F4E8FF]
focus:outline-none
transition
"
                  />

                </div>

                <div>

                  <label className="text-xs text-gray-500">
                    Inspection Date
                  </label>

                  <input
                    value={new Date().toLocaleDateString()}
                    readOnly
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
focus:border-[#7A008C]
focus:ring-2
focus:ring-[#F4E8FF]
focus:outline-none
transition
"
                  />

                </div>

                <div>

                  <label className="
block
mb-2
text-[12px]
font-medium
uppercase
tracking-wide
text-[#667085]
">
                    Inspection Status
                  </label>

                  <select
className="
w-full
h-11
rounded-xl
border
border-gray-300
bg-gray-50
px-4
text-gray-700
focus:border-[#7A008C]
focus:ring-2
focus:ring-purple-100
"
>

                    <option>Passed</option>
                    <option>Partially Accepted</option>
                    <option>Rejected</option>

                  </select>

                </div>

              </div>

            </div>

            <div className="flex justify-end gap-4 mt-12">

              <button
                onClick={() => router.back()}
                className="
h-11
px-6
rounded-xl
border
border-gray-300
bg-white
text-gray-700
hover:bg-gray-100
transition
">
                Back
              </button>

              <button
                className="
h-11
px-6
rounded-xl
border
border-[#7A008C]
text-[#7A008C]
bg-white
hover:bg-purple-50
transition
"
              >
                Save Draft
              </button>

              <button
                disabled={loading}
                onClick={generateGRN}
                className="
h-11
px-6
rounded-xl
bg-[#7A008C]
text-white
font-medium
shadow-md
hover:bg-[#65007A]
transition
disabled:opacity-50
"
             >
                {loading ? "Generating..." : "Generate GRN"}
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}