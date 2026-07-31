"use client";

import { useState, useRef } from "react";
export default function AddInvoiceModal({
  open,
  onClose,
  purchaseOrderId,
  onSuccess,
}) {
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);
  const [form, setForm] = useState({
    invoiceType: "Advance",
    dueDate: "",
    referenceDocument: null,
    matchingStatus: "Not-Matched",
    amount: "",
    toBePaid: "Yes",
  });

  if (!open) return null;

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/invoices", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    purchaseOrderId,

    goodsReceiptId: null,

    invoiceNumber: `INV-${Date.now()}`,

    invoiceType: form.invoiceType,

    invoiceDate: new Date(),

    dueDate: form.dueDate,

    quantity: 1,

    amount: Number(form.amount),

    matchingStatus: form.matchingStatus,

    cgst: 0,

    sgst: 0,

    igst: 0,

    grandTotal: Number(form.amount),

    paymentTerms: form.referenceDocument,

    paymentMethod: "",

    invoiceFile: "",

    financeRemarks: "",
    
  }),
});

      if (!res.ok) {
        alert("Failed to create invoice");
        return;
      }

      alert("Invoice Added");

      onSuccess();

      onClose();
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

      <div className="bg-white rounded-2xl w-[760px] shadow-2xl border border-gray-200 overflow-hidden">

        <div className="flex justify-between items-center px-4 py-3 border-b">

        <h2 className="text-[22px] font-semibold">
           Add Invoice
        </h2>

        <button className="w-8 h-8 border rounded-md text-gray-500">
           ×
        </button>

        </div>

        <div className="p-6 grid grid-cols-3 gap-x-4 gap-y-5">

        <div>
        <label className="block text-xs font-medium text-gray-600 mb-2">
            Invoice Type <span className="text-red-500">*</span>
        </label>

        <select
            value={form.invoiceType}
            onChange={(e) =>
            setForm({
                ...form,
                invoiceType: e.target.value,
            })
            }
            className="w-full h-10 border border-gray-300 rounded-md px-3 text-sm focus:border-[#7A008C] outline-none"
        >
            <option>Advance</option>
            <option>Goods</option>
            <option>Service</option>
        </select>
        </div>

        <div>
        <label className="block text-xs font-medium text-gray-600 mb-2">
            Due Date <span className="text-red-500">*</span>
        </label>

        <input
            type="date"
            value={form.dueDate}
            onChange={(e) =>
            setForm({
                ...form,
                dueDate: e.target.value,
            })
            }
            className="w-full h-10 border border-gray-300 rounded-md px-3 text-sm"
        />
        </div>

        <div>
        <label className="block text-xs font-medium text-gray-600 mb-2">
            Invoice Number
            <span className="text-gray-400 text-[11px]">
            {" "}
            * (Auto-Generated)
            </span>
        </label>

        <input
            readOnly
            value="INV-001"
            className="w-full h-10 border border-gray-300 rounded-md bg-gray-50 px-3 text-sm"
        />
        </div>
           <div className="col-span-3">

  <label className="block text-xs font-medium text-gray-600 mb-2">
    Reference Documents
    <span className="text-red-500">*</span>
  </label>

<input
  ref={fileInputRef}
  type="file"
  hidden
  accept=".pdf,.jpg,.jpeg,.png,.doc,.docx,.xls,.xlsx"
onChange={(e) => {
  if (e.target.files?.length) {
    setForm((prev) => ({
      ...prev,
      referenceDocument: e.target.files[0],
      matchingStatus: "Matched",
    }));
  } else {
    setForm((prev) => ({
      ...prev,
      referenceDocument: null,
      matchingStatus: "Not-Matched",
    }));
  }
  }}
/>

  <div className="border border-dashed border-gray-300 rounded-md p-3">

    <div className="flex justify-between items-center">

      <button
        type="button"
        onClick={() => fileInputRef.current.click()}
        className="h-9 px-5 rounded border border-blue-500 text-blue-600 text-sm hover:bg-blue-50"
      >
        Browse Files
      </button>

      <span className="text-[11px] text-gray-400">
        Maximum File Size : 50 MB
      </span>

    </div>

    {form.referenceDocument && (

      <div className="mt-3 h-9 border rounded flex items-center justify-between px-3">

        <span className="text-blue-600 text-sm truncate">
          {form.referenceDocument.name}
        </span>

        <button
          type="button"
          className="text-red-500"
          onClick={() =>
  setForm({
    ...form,
    referenceDocument: null,
    matchingStatus: "Not-Matched",
  })
}
        >
          ✕
        </button>

      </div>

    )}

  </div>

</div>

<div>
<label className="block text-xs font-medium text-gray-600 mb-2">
3-Way Matching
<span className="text-red-500">*</span>
</label>

<input
  readOnly
  value={form.matchingStatus}
  className={`w-full h-10 rounded-md border px-3 text-sm ${
    form.matchingStatus === "Matched"
      ? "bg-green-50 text-green-700 border-green-200"
      : "bg-red-50 text-red-700 border-red-200"
  }`}
/>

</div>

<div>
<label className="block text-xs font-medium text-gray-600 mb-2">
To Be Paid
<span className="text-gray-400 text-[11px]">
{" "}
*(Auto Generated)
</span>
</label>

<input
readOnly
value="Yes"
className="w-full h-10 rounded-md border border-gray-300 bg-gray-50 px-3 text-sm"
/>

</div>

<div>
<label className="block text-xs font-medium text-gray-600 mb-2">
Amount (Rs)
<span className="text-gray-400 text-[11px]">
{" "}
*(Auto Fetched)
</span>
</label>

<input
readOnly
value={form.amount}
className="w-full h-10 rounded-md border border-gray-300 bg-gray-50 px-3 text-sm"
/>

</div>
        </div>

        <div className="flex justify-end gap-3 px-6 py-5 border-t border-gray-200 bg-[#FAFAFA]">

          <button
            onClick={onClose}
            className="h-10 px-6 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            disabled={loading}
            onClick={handleSubmit}
            className="h-10 px-6 rounded-lg bg-[#7A008C] text-white font-medium hover:bg-[#650074]"
          >
            {loading
              ? "Saving..."
              : "Add Invoice"}
          </button>

        </div>

      </div>

    </div>
  );
}