"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import Sidebar from "../../../../users/components/Sidebar";
import Topbar from "../../../../users/components/Topbar";

export default function InvoicePage() {
  const { id } = useParams();
  const router = useRouter();
const [remarks, setRemarks] = useState("");
  const [po, setPo] = useState(null);
  const [loading, setLoading] = useState(false);
const [invoiceFile, setInvoiceFile] = useState(null);
const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  useEffect(() => {
    if (id) {
      fetchPO();
    }
  }, [id]);

 async function fetchPO() {
  try {
    const res = await fetch(`/api/purchase-orders/${id}`);

    if (!res.ok) {
      throw new Error("Failed to fetch purchase order");
    }

    const data = await res.json();

    console.log("API RESPONSE ");
    console.log(data);

    const purchaseOrder = data.purchaseOrder ?? data;

    console.log("PURCHASE ORDER");
    console.log(purchaseOrder);

    const normalizedItems =
      purchaseOrder.items ??
      purchaseOrder.purchaseOrderItems ??
      purchaseOrder.PurchaseOrderItems ??
      purchaseOrder.poItems ??
      [];

    console.log("NORMALIZED ITEMS");
    console.log(normalizedItems);

    setPo({
      ...purchaseOrder,
      items: normalizedItems,
    });

  } catch (error) {
    console.error("Fetch PO Error:", error);
  }
}
async function approveInvoice() {
  if (!po) {
    alert("Purchase Order data not available");
    return;
  }

  if (!invoiceFile) {
    alert("Please upload the vendor invoice before submitting.");
    return;
  }

  setLoading(true);

  try {
    console.log("APPROVING INVOICE");
    console.log("PO:", po);

const items = Array.isArray(po.items) ? po.items : [];

console.log("INVOICE ITEMS");
console.log(items);

if (items.length === 0) {
  alert("No purchase order items found");
  return;
}

    const subTotal = items.reduce(
      (sum, item) =>
        sum + Number(item.quantity || 0) * Number(item.unitPrice || 0),
      0
    );

    const gst = subTotal * 0.18;

    const grandTotal = subTotal + gst;

    const firstGRN = po.goodsReceipts?.[0] || null;

    const invoiceNumber = po.poNumber
      ? `INV-${po.poNumber}`
      : `INV-${po.id}`;

    const invoiceBody = {
      purchaseOrderId: Number(po.id),

      goodsReceiptId: firstGRN?.id
        ? Number(firstGRN.id)
        : null,

      invoiceNumber,

      invoiceType: "Vendor Invoice",

      invoiceDate: new Date().toISOString(),

      dueDate: po.dueDate || null,

      quantity: items.reduce(
        (sum, item) => sum + Number(item.quantity || 0),
        0
      ),

      amount: subTotal,

      cgst: gst / 2,

      sgst: gst / 2,

      igst: 0,

      grandTotal,

      paymentTerms: po.paymentTerms || null,

      paymentMethod: po.paymentMethod || null,

      financeRemarks: remarks || null,

      invoiceFile: invoiceFile?.name || null,

      invoiceStatus: "Approved",

      matchingStatus: "Matched",
    };

    console.log("INVOICE BODY");
    console.log(invoiceBody);

    const invoiceRes = await fetch("/api/invoices", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(invoiceBody),
    });

    const invoiceData = await invoiceRes.json();

    console.log("Invoice API Response:", invoiceData);

    if (!invoiceRes.ok) {
      throw new Error(
        invoiceData.error || "Invoice creation failed"
      );
    }

    console.log("Invoice created successfully");

    const poUpdateRes = await fetch(
      `/api/purchase-orders/${id}`,
      {
        method: "PATCH",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          status: "Closed",
        }),
      }
    );

    const poUpdateData = await poUpdateRes.json();

    console.log("PO Update Response:", poUpdateData);

    if (!poUpdateRes.ok) {
      throw new Error(
        poUpdateData.error ||
        "Invoice created but PO status update failed"
      );
    }


   setShowSuccessPopup(true);

  } catch (error) {

    console.error("APPROVE INVOICE ERROR");
    console.error(error);

    alert(error.message || "Failed to create invoice");

  } finally {

    setLoading(false);

  }
}

  if (!po) {
    return <div className="p-10">Loading...</div>;
  }

  const subTotal = (po.items || []).reduce(
    (sum, item) => sum + item.quantity * item.unitPrice,
    0
  );

  const gst = subTotal * 0.18;
  const grandTotal = subTotal + gst;

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
              Invoice
            </span>

          </div>

<div className="bg-white rounded-[24px] border border-[#EAECF0] shadow-[0_4px_20px_rgba(16,24,40,0.04)] p-8">
            <h1 className="text-2xl font-bold text-[#111827]">
              Vendor Invoice
            </h1>

            <p className="text-[#667085] mt-2">
              Review the vendor invoice before approving payment.
            </p>


            <div className="grid grid-cols-3 gap-5 mt-10">

              <div>

                <div>
                <label className="block text-sm mb-2">
                  Invoice Number
                </label>

                <input
                readOnly
                value={po?.poNumber ? `INV-${po.poNumber}` : ""}
                className="w-full h-11 rounded-xl border border-gray-300 px-4 bg-gray-100"
              />
              </div>

              </div>

              <div>

                <label className="text-xs text-gray-500">
                  Invoice Date
                </label>

                <input
                  readOnly
                  value={
                    po.invoiceDate
                      ? new Date(po.invoiceDate).toLocaleDateString()
                      : new Date().toLocaleDateString()
                  }
                  className="w-full h-11 rounded-xl border border-[#EAECF0] bg-[#F9FAFB] px-4 text-[14px] text-[#344054] focus:outline-none"/>

              </div>

              <div>

                <label className="text-xs text-gray-500">
                  Purchase Order
                </label>

                <input
                  readOnly
                  value={po.poNumber}
                  className="w-full h-11 rounded-xl border border-[#EAECF0] bg-[#F9FAFB] px-4 text-[14px] text-[#344054] focus:outline-none"   />

              </div>

              <div>

                <label className="text-xs text-gray-500">
                  GRN Number
                </label>

                <input
                  readOnly
                  value={po.goodsReceipts?.[0]?.grnNumber || ""}
                  className="w-full h-11 rounded-xl border border-[#EAECF0] bg-[#F9FAFB] px-4 text-[14px] text-[#344054] focus:outline-none" />

              </div>

              <div>

                <label className="text-xs text-gray-500">
                  Vendor
                </label>

                <input
                  readOnly
                  value={po.vendor?.vendorName || ""}
                  className="w-full h-11 rounded-xl border border-[#EAECF0] bg-[#F9FAFB] px-4 text-[14px] text-[#344054] focus:outline-none"/>

              </div>

              <div>

                <label className="text-xs text-gray-500">
                  Project
                </label>

                <input
                  readOnly
                  value={po.project?.projectName || ""}
                  className="w-full h-11 rounded-xl border border-[#EAECF0] bg-[#F9FAFB] px-4 text-[14px] text-[#344054] focus:outline-none"/>

              </div>

            </div>


            <div className="grid grid-cols-2 gap-6 mt-10">

              <div>

                <label className="text-xs text-gray-500">
                  Billing Address
                </label>

                <textarea
                  readOnly
                  rows={3}
                  value={po.billingAddress || ""}
                  className="w-full border rounded-lg p-3 bg-gray-50"
                />

              </div>

              <div>

                <label className="text-xs text-gray-500">
                  Delivery Address
                </label>

                <textarea
                  readOnly
                  rows={3}
                  value={po.deliveryAddress || ""}
                  className="w-full border rounded-lg p-3 bg-gray-50"
                />

              </div>

            </div>

<div className="mt-10">

  <h2 className="
text-[20px]
font-semibold
text-[#101828]
mb-2
">
    Invoice Items
  </h2>

  <p className="text-sm text-[#667085] mb-5">
    Vendor supplied items and invoice summary.
  </p>

 <div className="
overflow-hidden
rounded-2xl
border
border-[#EAECF0]
bg-white
shadow-sm
">

    <table className="w-full text-sm">

      <thead className="bg-[#FCFAFF]">

        <tr>

          <th className="p-3 text-left">S.No</th>

          <th className="p-3 text-left">Item</th>

          <th className="p-3 text-center">HSN</th>

          <th className="p-3 text-center">Qty</th>

          <th className="p-3 text-center">Unit</th>

          <th className="p-3 text-center">Rate</th>

          <th className="p-3 text-center">GST %</th>

          <th className="p-3 text-right">Amount</th>

        </tr>

      </thead>

      <tbody>

        {po.items?.map((item, index) => {

          const amount = item.quantity * item.unitPrice;

          return (

            <tr
              key={item.id}
             className="
border-t
border-[#F2F4F7]
hover:bg-[#FCFCFD]
transition
"
            >

              <td className="
px-5
py-3
text-left
text-xs
font-semibold
uppercase
tracking-wide
text-[#667085]
" >
                {index + 1}
              </td>

              <td className="p-3 font-medium">
                {item.product?.productName}
              </td>

              <td className="p-3 text-center">
                {item.product?.hsnCode || "-"}
              </td>

              <td className="p-3 text-center">
                {item.quantity}
              </td>

              <td className="p-3 text-center">
                {item.unit || "Nos"}
              </td>

              <td className="p-3 text-center">
                ₹ {item.unitPrice.toLocaleString()}
              </td>

              <td className="p-3 text-center">
                18%
              </td>

              <td className="p-3 text-right font-medium">
                ₹ {amount.toLocaleString()}
              </td>

            </tr>

          );

        })}

      </tbody>

    </table>

  </div>

</div>

<div className="grid grid-cols-4 gap-5 mt-10">

  <div className="bg-[#F9FAFB] border rounded-xl p-5">

    <p className="text-xs text-gray-500">
      Sub Total
    </p>

    <h2 className="text-2xl font-bold mt-2">
      ₹ {subTotal.toLocaleString()}
    </h2>

  </div>

  <div className="bg-[#EEF4FF] border rounded-xl p-5">

    <p className="text-xs text-gray-500">
      CGST (9%)
    </p>

    <h2 className="text-2xl font-bold text-blue-600 mt-2">
      ₹ {(gst / 2).toLocaleString()}
    </h2>

  </div>

  <div className="bg-[#EEF4FF] border rounded-xl p-5">

    <p className="text-xs text-gray-500">
      SGST (9%)
    </p>

    <h2 className="text-2xl font-bold text-blue-600 mt-2">
      ₹ {(gst / 2).toLocaleString()}
    </h2>

  </div>

  <div className="bg-[#ECFDF3] border rounded-xl p-5">

    <p className="text-xs text-gray-500">
      Grand Total
    </p>

    <h2 className="text-2xl font-bold text-green-600 mt-2">
      ₹ {grandTotal.toLocaleString()}
    </h2>

  </div>

</div>

<div className="mt-10">

  <h2 className="text-xl font-semibold mb-5">
    Payment Information
  </h2>

  <div className="grid grid-cols-3 gap-5">

    <div>

      <label className="text-xs text-gray-500">
        Payment Terms
      </label>

      <input
        readOnly
        value={po.paymentTerms || "Net 30"}
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

    <div>

      <label className="text-xs text-gray-500">
        Payment Method
      </label>

      <input
        readOnly
        value={po.modeOfPayment || ""}
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

    <div>

      <label className="text-xs text-gray-500">
        Due Date
      </label>

      <input
        readOnly
        value={
          po.dueDate
            ? new Date(po.dueDate).toLocaleDateString()
            : "-"
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

</div>

<div className="mt-10">

  <h2 className="text-xl font-semibold mb-5">
    Vendor Invoice Attachment
  </h2>

  <div className="border-2
border-dashed
border-[#D6BBFB]
bg-[#FCFAFF]
rounded-2xl p-6 text-center">

    <p className="text-sm text-[#667085]">
      Upload Vendor Invoice (PDF/Image)
    </p>

    <input
  type="file"
  onChange={(e) => setInvoiceFile(e.target.files[0])}
  className="
mt-5
block
w-full
text-sm
text-[#344054]
file:mr-4
file:rounded-lg
file:border-0
file:bg-[#7A008C]
file:px-5
file:py-2
file:text-white
hover:file:bg-[#650073]
"
/>

  </div>

</div>

<div className="mt-10">

  <h2 className="text-xl font-semibold mb-5">
    Approval Details
  </h2>

  <div className="grid grid-cols-3 gap-5">

    <div>

      <label className="text-xs text-gray-500">
        Checked By
      </label>

      <input
        readOnly
        value="Finance Manager"
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

    <div>

      <label className="text-xs text-gray-500">
        Approval Date
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
focus:outline-none
"
      />

    </div>

    <div>

      <label className="text-xs text-gray-500">
        Invoice Status
      </label>

      <input
        readOnly
        value={po.status}
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

</div>

<div className="mt-10">

  <label className="block text-sm font-medium mb-2">
    Finance Remarks
  </label>

 <textarea
  rows={4}
  value={remarks}
  onChange={(e) => setRemarks(e.target.value)}
  placeholder="Enter finance remarks..."
  className="
w-full
rounded-xl
border
border-[#EAECF0]
bg-[#F9FAFB]
px-4
py-3
text-[14px]
text-[#344054]
resize-none
focus:outline-none
"
/>

</div>
<div className="flex justify-end gap-4 mt-12">

  <button
    onClick={() => router.back()}
    className="
px-6
h-11
rounded-xl
border
border-[#D0D5DD]
bg-white
text-[#344054]
font-medium
hover:bg-[#F9FAFB]
transition
"
  >
    Back
  </button>

  <button
    className="
    px-6
    h-11
    rounded-xl
    border
    border-[#D6BBFB]
    bg-[#FCFAFF]
    text-[#7A008C]
    font-medium
    hover:bg-[#F9F5FF]
    transition
    "
  >
    Save Draft
  </button>

  <button
    disabled={loading}
    onClick={approveInvoice}
    className="
px-6
h-11
rounded-xl
bg-[#7A008C]
text-white
font-medium
hover:bg-[#650073]
disabled:opacity-50
transition
"
  >
    {loading ? "Approving..." : "Approve Invoice"}
  </button>

</div>
</div>

        </div>

      </div>
{showSuccessPopup && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">

    <div className="w-[420px] rounded-2xl bg-white p-8 shadow-2xl">

      <div className="flex flex-col items-center text-center">

        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <svg
            className="h-8 w-8 text-green-600"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        <h2 className="mt-5 text-xl font-semibold text-gray-900">
          Invoice Submitted Successfully
        </h2>

        <p className="mt-2 text-sm text-gray-500">
          The vendor invoice has been submitted and approved successfully.
        </p>

        <div className="mt-6 w-full rounded-xl bg-gray-50 p-4 text-left">

          <div className="flex justify-between">
            <span className="text-sm text-gray-500">
              Invoice Number
            </span>

            <span className="text-sm font-semibold text-gray-800">
              {po?.poNumber
                ? `INV-${po.poNumber}`
                : `INV-${po?.id}`}
            </span>
          </div>

          <div className="mt-3 flex justify-between">
            <span className="text-sm text-gray-500">
              Status
            </span>

            <span className="text-sm font-semibold text-green-600">
              Approved
            </span>
          </div>

        </div>

        <button
          onClick={() => {
            setShowSuccessPopup(false);
            router.push(
              `/dashboard/procurement/purchase-orders/${id}`
            );
          }}
          className="
            mt-6
            w-full
            h-11
            rounded-xl
            bg-[#7A008C]
            text-white
            font-medium
            hover:bg-[#650073]
            transition
          "
        >
          Continue
        </button>

      </div>

    </div>

  </div>
)}
    </div>
  );
}