"use client";

import { useState, useEffect, useRef } from "react";

export default function RegisterPaymentModal({
  open,
  onClose,
  purchaseOrderId,
  invoice,
  onSuccess,
}) {
  const [loading, setLoading] = useState(false);
const fileInputRef = useRef(null);
  const [form, setForm] = useState({
  paymentDate: "",
  amount: invoice?.amount || "",
  paymentMode: "Online",
  fromAccount: "",
  toAccount: "",
  utrNumber: "",
  reference: null,
  remarks: "",
 });

 useEffect(() => {
  if (invoice) {
    setForm((prev) => ({
      ...prev,
      amount: invoice.amount,
    }));
  }
}, [invoice]);


  if (!open) return null;

 const handleSubmit = async () => {
  try {
    if (!form.paymentDate) {
      alert("Please select Payment Date");
      return;
    }

    setLoading(true);

      const res = await fetch("/api/payments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
       body: JSON.stringify({
  purchaseOrderId,
  paymentDate: form.paymentDate,
  paymentMode: form.paymentMode,
  amount: Number(form.amount),
  referenceNo: form.utrNumber,  
  remarks: form.remarks,
})
      });

      if (!res.ok) {
        alert("Failed to register payment");
        return;
      }

      alert("Payment Registered");

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

      <div className="bg-white w-[860px] rounded-xl shadow-2xl overflow-hidden">

        <div className="flex items-center justify-between px-6 py-4 border-b">

          <h2 className="text-[18px] font-semibold text-gray-900">
            Register Payment
          </h2>

          <button
            onClick={onClose}
className="w-8 h-8 rounded border border-gray-300 flex items-center justify-center text-gray-500 hover:bg-red-50 hover:text-red-600 transition">
            ×
          </button>

        </div>

        <div className="px-5 py-4">
          <div className="grid grid-cols-2 gap-x-6 gap-y-3">
            <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Invoice Number <span className="text-red-500">*</span>
            </label>

            <input
                readOnly
                value={invoice?.invoiceNumber || ""}
                className="w-full h-10 rounded-md border border-gray-300 bg-gray-50 px-3 text-sm text-gray-700 cursor-not-allowed"
            />
            </div>

         <div>
  <label className="block text-xs font-medium text-gray-600 mb-1">
    Payment Date <span className="text-red-500">*</span>
  </label>

  <input
    type="date"
    value={form.paymentDate}
    onChange={(e) =>
      setForm({
        ...form,
        paymentDate: e.target.value,
      })
    }
    className="w-full h-10 rounded-md border border-gray-300 bg-white px-3 text-sm text-gray-900 focus:border-[#7A008C] focus:ring-2 focus:ring-[#7A008C]/20 outline-none"
  />
</div> 

          <div>

            <label className="block text-xs font-medium text-gray-600 mb-1">
              Payment Mode
            </label>

            <select
              className="w-full h-10 rounded-md border border-gray-300 bg-white px-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#7A008C] focus:ring-2 focus:ring-[#7A008C]/20 outline-none"
              value={form.paymentMode}
              onChange={(e) =>
                setForm({
                  ...form,
                  paymentMode: e.target.value,
                })
              }
            >
              <option>Online</option>
              <option>Cheque</option>
              <option>Cash</option>
              <option>NEFT</option>
              <option>RTGS</option>
              <option>UPI</option>
            </select>

          </div>
           <div>



            <label className="block text-xs font-medium text-gray-600 mb-1">

              Transaction From

            </label>



          <select

            value={form.fromAccount}

            onChange={(e)=>

            setForm({...form,fromAccount:e.target.value})

            }

            className="w-full h-10 rounded-md border border-gray-300 bg-white px-3 text-sm text-gray-900 focus:border-[#7A008C] focus:ring-2 focus:ring-[#7A008C]/20 outline-none"

            >

            <option>Select Account</option>

            <option>KS Smart Solutions Pvt Ltd</option>

            <option>Main Bank Account</option>

            </select>



         </div>

         <div>

            <label className="block text-xs font-medium text-gray-600 mb-1">
              Amount
            </label>

            <input
  type="number"
  value={form.amount}
  onChange={(e) =>
    setForm({
      ...form,
      amount: e.target.value,
    })
  }
  className="w-full h-10 rounded-md border border-gray-300 bg-white px-3 text-sm text-gray-900 focus:border-[#7A008C] focus:ring-2 focus:ring-[#7A008C]/20 outline-none"
/>

          </div>

          <div>

           <label className="block text-xs font-medium text-gray-600 mb-1">
              UTR Number
            </label>

            <input
              className="w-full h-10 rounded-md border border-gray-300 bg-white px-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#7A008C] focus:ring-2 focus:ring-[#7A008C]/20 outline-none"
              value={form.utrNumber}
              onChange={(e) =>
                setForm({
                  ...form,
                  utrNumber: e.target.value,
                })
              }
            />

          </div>

          

          <div>

            <label className="block text-xs font-medium text-gray-600 mb-1">
              Transaction To
            </label>

            <select
            value={form.toAccount}
            onChange={(e) =>
                setForm({
                ...form,
                toAccount: e.target.value,
                })
            }
            className="w-full h-10 rounded-md border border-gray-300 bg-white px-3 text-sm text-gray-900 focus:border-[#7A008C] focus:ring-2 focus:ring-[#7A008C]/20 outline-none"
            >
            <option>Select Vendor Account</option>
            <option>PRISM JOHNSON LIMITED</option>
            <option>Vendor Bank Account</option>
            </select>

          </div>

         <div className="col-span-2 mt-2">
  <label className="block text-sm font-medium text-gray-700 mb-3">
    Reference Documents
  </label>

  <div className="border border-dashed border-gray-300 rounded-lg p-4">

<input
  ref={fileInputRef}
  type="file"
  hidden
  onChange={(e) => {
    if (e.target.files?.length) {
      setForm((prev) => ({
        ...prev,
        reference: e.target.files[0],
      }));
    }
  }}
/>

    <div className="flex items-center justify-between">
        <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        className="px-4 py-2 text-sm border border-blue-500 text-blue-600 rounded-md hover:bg-blue-50"
        >
        Browse Files
        </button>

      <span className="text-xs text-gray-500">
        Maximum File Size : 50 MB
      </span>
    </div>

    {form.reference && (
      <div className="mt-3 flex items-center justify-between border rounded px-3 py-2">
        <span className="text-sm text-blue-600">
          {form.reference.name}
        </span>

        <button
          type="button"
          onClick={() =>
            setForm({
              ...form,
              reference: "",
            })
          }
          className="text-red-500 text-lg"
        >
          ×
        </button>
      </div>
    )}

  </div>
</div>

          </div>

        </div>

        <div className="flex justify-end gap-3 px-6 py-5 border-t bg-gray-50">

          <button
            onClick={onClose}
           className="px-5 h-9 rounded border border-gray-300 text-gray-600 hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            disabled={loading}
            onClick={handleSubmit}
            className="px-6 h-9 rounded bg-[#7A008C] text-white hover:bg-[#62006f]"
          >
            {loading ? "Saving..." : "Register Payment"}
          </button>

        </div>

      </div>

    </div>
  );
}