"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";

export default function VendorQuotationPage() {
  const { id } = useParams();
const [selectedQuotes, setSelectedQuotes] = useState([]);
  const [groupedQuotes, setGroupedQuotes] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const router = useRouter();

const [createdPOs, setCreatedPOs] = useState([]);
  
 useEffect(() => {
  if (id) {
    fetchData();
  }
}, [id]);

const handleUnitPriceChange = (productId, quoteId, value) => {
  const updatedGroups = { ...groupedQuotes };

  updatedGroups[productId].quotations = updatedGroups[
    productId
  ].quotations.map((quote) => {
    if (quote.id === quoteId) {
      const unitPrice = Number(value) || 0;

      return {
        ...quote,
        costPerUnit: unitPrice,
        totalCost: unitPrice * Number(quote.quantity),
      };
    }

    return quote;
  });

  setGroupedQuotes(updatedGroups);
};

const fetchData = async () => {
  const res = await fetch(
    `/api/vendor-quotation?rfqId=${id}`
  );

  const data = await res.json();

  console.log("Vendor Quotations:", data);

  const grouped = {};

  data.forEach((quote) => {
    if (!grouped[quote.product.id]) {
      grouped[quote.product.id] = {
        productName: quote.product.productName,
        quotations: [],
      };
    }

    grouped[quote.product.id].quotations.push({
      id: quote.id,
      productId: quote.productId,

      rfqId: quote.rfqId,
      projectId: quote.rfq.projectId,

      product: quote.product,
      vendor: quote.vendor,

      quantity: quote.quantity,
      costPerUnit: quote.costPerUnit,
      expectedDeliveryDate:
        quote.expectedDeliveryDate,
      totalCost: quote.totalCost,

      includeDeliveryCharge:
        quote.includeDeliveryCharge
          ? "Yes"
          : "No",

      returnAvailable:
        quote.returnAvailable
          ? "Yes"
          : "No",

      replacementAvailable:
        quote.replacementAvailable
          ? "Yes"
          : "No",
    });
  });

  setGroupedQuotes(grouped);
};

const createPurchaseOrder = async () => {
  if (selectedQuotes.length === 0) {
  alert("Please choose at least one vendor.");
  return;
}

 const created = [];

for (const quote of selectedQuotes) {
  const res = await fetch("/api/purchase-orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      rfqId: Number(id),
      vendorId: quote.vendor.id,
      projectId: quote.projectId,
      orderDate: new Date(),
      expectedDeliveryDate: quote.expectedDeliveryDate,
      items: [
        {
          productId: quote.product.id,
          quantity: Number(quote.quantity),
          unitPrice: Number(quote.costPerUnit),
        },
      ],
    }),
  });

  const data = await res.json();

  if (res.ok) {
    created.push(data);
  } else {
    alert(data.error);
  }
}

setCreatedPOs(created);
setShowPopup(true);
};
  return (
  <div className="min-h-screen bg-[#F7F7FA] p-8">

    <div className="mb-8">
      <h1 className="text-[32px] font-semibold text-[#1F1F1F]">
        Vendor Quotations
      </h1>

      <p className="text-[#7C7C7C] mt-2">
        Compare quotations received from vendors for each requested item.
      </p>
    </div>

    <div className="flex mb-8 overflow-hidden rounded-lg">
      <div className="flex-1 bg-[#F4DDF5] text-[#A000B4] text-center py-3 font-medium">
        RFQ Sent to Vendors
      </div>

      <div className="flex-1 bg-[#F4DDF5] text-[#A000B4] text-center py-3 font-medium border-l border-white">
        Vendors Quotation
      </div>

      <div className="flex-1 bg-[#D9D9D9] text-[#666] text-center py-3 font-medium border-l border-white">
        Purchase Order
      </div>
    </div>

    <div className="bg-white border border-[#E8E3EC] rounded-2xl p-8 shadow-sm">

      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="font-semibold text-[18px] text-[#1F1F1F]">
            Vendors Quotation
          </h2>

          <p className="text-[#8A8A8A] text-sm mt-1">
            Review and compare pricing, terms and conditions.
          </p>
        </div>

        <button className="border border-[#A000B4] text-[#A000B4] px-4 py-2 rounded-lg text-sm">
          Compare Quotations
        </button>
      </div>

      {Object.values(groupedQuotes).map((product, index) => (
        <div key={index} className="mb-10">

          <h3 className="font-semibold text-[13px] mb-3 text-[#444]">
            {index + 1}. {product.productName}
          </h3>

          <div className="overflow-x-auto rounded-lg border border-gray-200">
  <table className="w-full text-[12px] border-separate border-spacing-0">
    <thead className="bg-[#FAFAFA] text-[#666666]">
      <tr>
        <th className="px-3 py-3 border border-gray-200 text-left">S.No</th>
       <th className="px-3 py-3 border border-gray-200 text-left">Vendor Name</th>
        <th className="px-3 py-3 border border-gray-200 text-center">
          Cost Per Unit (Rs)
        </th>
        <th className="px-3 py-3 border border-gray-200 text-center">
          Tot.Units
        </th>
       <th className="px-3 py-3 border border-gray-200 text-center">
          Exp. Del. Date
        </th>
        <th className="px-3 py-3 border border-gray-200 text-center">
          Total Cost
        </th>
        <th className="px-3 py-3 border border-gray-200 text-center">
          Incl.Del.Charge
        </th>
        <th className="px-3 py-3 border border-gray-200 text-center">
          Returns
        </th>
        <th className="px-3 py-3 border border-gray-200 text-center">
          Replacement
        </th>
        <th className="px-3 py-3 border border-gray-200 text-center">
          Actions
        </th>
      </tr>
    </thead>

    <tbody>
      {product.quotations.map((quote, idx) => (
        <tr
  key={quote.id}
  className="text-gray-500 border-b border-[#ECECEC]"
>
          <td className="px-3 py-3 border border-gray-200">
            {idx + 1}
          </td>

          <td className="px-3 py-3 border border-gray-200">
            {quote.vendor.vendorName}
          </td>

          <td className="px-3 py-3 border border-gray-200 text-center">
            <input
              type="number"
              value={quote.costPerUnit}
              onChange={(e) =>
                handleUnitPriceChange(
                  quote.productId,
                  quote.id,
                  e.target.value
                )
              }
              className="w-24 border border-gray-200 rounded px-2 py-1 text-center"
            />
          </td>

          <td className="px-3 py-3 border border-gray-200 text-center">
            {quote.quantity}
          </td>

          <td className="px-3 py-3 border border-gray-200 text-center">
            {quote.expectedDeliveryDate}
          </td>

          <td className="px-3 py-3 border border-gray-200 text-center">
  ₹ {Number(quote.totalCost).toLocaleString()}
</td>

          <td className="px-3 py-3 border border-gray-200 text-center">
            {quote.includeDeliveryCharge}
          </td>

          <td className="px-3 py-3 border border-gray-200 text-center">
            {quote.returnAvailable}
          </td>

          <td className="px-3 py-3 border border-gray-200 text-center">
            {quote.replacementAvailable}
          </td>

          <td className="px-3 py-3 border border-gray-200">
            <div className="flex justify-center gap-2">
              <button
                onClick={() => {
  setSelectedQuotes((prev) => {
    const exists = prev.find((q) => q.id === quote.id);

    if (exists) {
   return prev.filter((q) => q.id !== quote.id);
    }

    return [...prev, quote];
  });
}}
                className={`px-4 py-1 rounded-md text-sm ${
  selectedQuotes.some((q) => q.id === quote.id)
    ? "bg-[#A000B4] text-white"
    : "bg-[#F4DDF5] text-[#A000B4]"
}`}
              >
                Choose
              </button>

              <button className="border border-[#D9D9D9] bg-[#F5F5F5] px-3 py-1 rounded text-[11px]">
                Cancel
              </button>
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
        </div>
      ))}

      <div className="flex justify-end gap-4 mt-8">
        <button className="text-gray-500">
          Cancel
        </button>

        <button className="border border-[#A000B4] text-[#A000B4] px-5 py-2 rounded-lg">
          Save as Draft
        </button>

       <button
  onClick={createPurchaseOrder}
  className="bg-[#A000B4] text-white px-5 py-2 rounded-lg"
>
  Confirm Order ✓
</button>
      </div>
      {showPopup && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
    <div className="w-[520px] bg-white rounded-xl shadow-xl overflow-hidden">

      <div className="flex justify-between items-center border-b px-6 py-4">
        <h2 className="font-semibold text-[18px] text-black">
          Purchase Orders Created
        </h2>

        <button
          onClick={() => setShowPopup(false)}
          className="text-gray-500 text-xl"
        >
          ×
        </button>
      </div>

      <div className="p-6">
        <p className="text-sm text-gray-600 mb-6">
          Purchase Order has been created for the selected vendor and linked to the applicable project(s).
        </p>

        

        <div className="flex justify-end gap-3">
          <button
            onClick={() => setShowPopup(false)}
            className="px-5 py-2 border rounded-lg text-gray-500"
          >
            Cancel
          </button>

          <button
            onClick={() => {
              window.location.href =
                "/dashboard/procurement/purchase-orders";
            }}
            className="px-5 py-2 bg-[#A000B4] text-white rounded-lg"
          >
            View Purchase Orders
          </button>
        </div>
      </div>
    </div>
  </div>
)}
    </div>
  </div>
);
}  