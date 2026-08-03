"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import Sidebar from "@/app/dashboard/users/components/Sidebar";
import Topbar from "@/app/dashboard/users/components/Topbar";

export default function RegisterPaymentPage() {
  const { id } = useParams();
  const router = useRouter();

  const [po, setPo] = useState(null);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    paymentDate: "",
    paymentMode: "Bank Transfer",
    referenceNo: "",
    amount: "",
    remarks: "",
  });

  useEffect(() => {
    fetchPO();
  }, []);

  async function fetchPO() {
    try {
      const res = await fetch(`/api/account-payable/${id}`);
      const data = await res.json();

      setPo(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const res = await fetch("/api/payments", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        purchaseOrderId: id,
        ...form,
      }),
    });

    if (res.ok) {
      alert("Payment Registered Successfully");

      router.push(
        `/dashboard/finance/account-payable/${id}`
      );
    } else {
      const data = await res.json();
      alert(data.error);
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen bg-[#F7F7FA]">
        <Sidebar />

        <div className="flex-1 ml-[74px]">
          <Topbar />

          <div className="pt-[120px] px-8">
            Loading...
          </div>
        </div>
      </div>
    );
  }

  if (!po) return null;

  return (
    <div className="flex min-h-screen bg-[#F7F7FA]">

      <Sidebar />

      <div className="flex-1 flex flex-col ml-[74px]">

        <Topbar />

        <div className="pt-[95px] px-8 pb-8">

          <div className="text-sm text-gray-500 mb-6">

            <span className="text-[#7A008C]">
              Finance
            </span>

            <span className="mx-2">{">"}</span>

            <span className="text-[#7A008C]">
              Account Payable
            </span>

            <span className="mx-2">{">"}</span>

            <span>Register Payment</span>

          </div>

          <div className="mb-8">

            <h1 className="text-3xl font-semibold text-[#7A008C]">
              Register Payment
            </h1>

            <p className="text-gray-500 mt-2">
              Record vendor payment details.
            </p>

          </div>

          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-3xl border border-gray-200 p-8"
          >

            <div className="grid grid-cols-2 gap-6">

              <div>

                <label className="block text-sm text-gray-500 mb-2">
                  Purchase Order
                </label>

                <input
                  readOnly
                  value={po.poNumber}
                  className="w-full h-11 rounded-xl border border-gray-300 px-4 bg-gray-50"
                />

              </div>

              <div>

                <label className="block text-sm text-gray-500 mb-2">
                  Vendor
                </label>

                <input
                  readOnly
                  value={po.vendor}
                  className="w-full h-11 rounded-xl border border-gray-300 px-4 bg-gray-50"
                />

              </div>

              <div>

                <label className="block text-sm text-gray-500 mb-2">
                  Payment Date
                </label>

                <input
                  type="date"
                  name="paymentDate"
                  value={form.paymentDate}
                  onChange={handleChange}
                  className="w-full h-11 rounded-xl border border-gray-300 px-4"
                  required
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

                <label className="block text-sm text-gray-500 mb-2">
                  Payment Mode
                </label>

                <select
                  name="paymentMode"
                  value={form.paymentMode}
                  onChange={handleChange}
                  className="w-full h-11 rounded-xl border border-gray-300 px-4"
                >
                  <option>Bank Transfer</option>
                  <option>UPI</option>
                  <option>Cheque</option>
                  <option>Cash</option>
                  <option>NEFT</option>
                  <option>RTGS</option>
                </select>

              </div>

              <div>

                <label className="block text-sm text-gray-500 mb-2">
                  Reference Number
                </label>

                <input
                  type="text"
                  name="referenceNo" 
                  value={form.referenceNo}
                  onChange={handleChange}
                  placeholder="Enter Reference Number"
                  className="w-full h-11 rounded-xl border border-gray-300 px-4"
                />

              </div>

              <div>

                <label className="block text-sm text-gray-500 mb-2">
                  Amount
                </label>

                <input
                readOnly
                value={form.amount}
                className="w-full h-11 rounded-xl border border-gray-300 px-4 bg-gray-100"
                />

              </div>

            </div>

            <div className="mt-6">

              <label className="block text-sm text-gray-500 mb-2">
                Remarks
              </label>

              <textarea
                rows={5}
                name="remarks"
                value={form.remarks}
                onChange={handleChange}
                placeholder="Enter Remarks"
                className="w-full rounded-2xl border border-gray-300 p-4"
              />

            </div>

            <div className="flex justify-end gap-4 mt-8">

              <button
                type="button"
                onClick={() => router.back()}
                className="px-6 py-3 rounded-xl border border-gray-300"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-[#7A008C] text-white hover:bg-[#650074]"
              >
                Register Payment
              </button>

            </div>

          </form>

        </div>

      </div>

    </div>
  );
}