"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "../../../users/components/Sidebar";
import Topbar from "../../../users/components/Topbar";

export default function CreateVendorPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    vendorName: "",
    establishedDate: "",
    panNumber: "",
    gstNumber: "",
    serviceCategory: "",
    legalStructure: "",
    annualSales: "",
    msmeRegistered: "",
    address: "",

    contactName: "",
    contactNumber: "",
    contactEmail: "",
    fax: "",
    website: "",
    upiId: "", 

    beneficiaryName: "",
    accountNumber: "",
    bankName: "",
    branchName: "",
    ifscCode: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/vendor", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      alert("Vendor created successfully");
        router.push("/dashboard/procurement/vendors");

    } else {
      alert("Failed to create vendor");
    }
  };

  return (
    <div className="flex min-h-screen bg-[#F7F7FA]">
      <Sidebar />

      <div className="flex-1 flex flex-col ml-[74px]">
        <Topbar />

        <div className="pt-[100px] px-8 pb-8 text-gray-500">

          <div className="text-sm mb-8 text-gray-500">
            <span className="text-[#7A008C]">Procurement</span>
            <span className="mx-2">{">"}</span>
            <span className="text-[#7A008C]">Vendors Master</span>
            <span className="mx-2">{">"}</span>
            Create New
          </div>

          <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-8">

            <h1 className="text-3xl font-semibold mb-2">
              Create New Vendor
            </h1>

            <p className="text-gray-500 text-sm mb-10">
              Add a new vendor by entering their basic details and business information.
            </p>

            <form onSubmit={handleSubmit} className="space-y-8">

  <div className="py-10 border-b border-gray-200">
    <h2 className="text-xl font-semibold text-gray-800 mb-6">
      Company Details
    </h2>

    <div className="grid grid-cols-4 gap-6">

      <input
        name="vendorName"
        placeholder="Vendor Name"
        className="border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-[#7A008C]"
        onChange={handleChange}
      />

      <input
        type="date"
        name="establishedDate"
        className="border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-[#7A008C]"
        onChange={handleChange}
      />

      <input
        name="panNumber"
        placeholder="PAN Number"
        className="border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-[#7A008C]"
        onChange={handleChange}
      />

      <input
        name="gstNumber"
        placeholder="GST Number"
        className="border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-[#7A008C]"
        onChange={handleChange}
      />

      <input
        name="serviceCategory"
        placeholder="Service Category"
        className="border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-[#7A008C]"
        onChange={handleChange}
      />

      <input
        name="legalStructure"
        placeholder="Legal Structure"
        className="border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-[#7A008C]"
        onChange={handleChange}
      />

      <input
        name="annualSales"
        placeholder="Gross Annual Sales"
        className="border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-[#7A008C]"
        onChange={handleChange}
      />

      <select
        name="msmeRegistered"
        className="border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-[#7A008C]"
        onChange={handleChange}
      >
        <option>No</option>
        <option>Yes</option>
      </select>

    </div>

    <textarea
      name="address"
      rows="4"
      placeholder="Vendor Address"
      className="w-full border border-gray-300 rounded-xl px-4 py-3 mt-6 outline-none focus:border-[#7A008C]"
      onChange={handleChange}
    />
  </div>


  <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">

    <h2 className="text-xl font-semibold text-gray-800 mb-6">
      Contact Details
    </h2>

    <div className="grid grid-cols-3 gap-6">

      <input
        name="contactName"
        placeholder="Contact Name"
        className="border border-gray-300 rounded-xl px-4 py-3"
        onChange={handleChange}
      />

      <input
        name="contactNumber"
        placeholder="Contact Number"
        className="border border-gray-300 rounded-xl px-4 py-3"
        onChange={handleChange}
      />

      <input
        name="contactEmail"
        placeholder="Contact Email"
        className="border border-gray-300 rounded-xl px-4 py-3"
        onChange={handleChange}
      />

      <input
        name="fax"
        placeholder="Fax"
        className="border border-gray-300 rounded-xl px-4 py-3"
        onChange={handleChange}
      />

      <input
        name="website"
        placeholder="Website"
        className="border border-gray-300 rounded-xl px-4 py-3"
        onChange={handleChange}
      />

      <input
        name="upiId"
        placeholder="UPI ID"
        className="border border-gray-300 rounded-xl px-4 py-3"
        onChange={handleChange}
      />

    </div>

  </div>


  <div className="pt-10">

    <h2 className="text-xl font-semibold text-gray-800 mb-6">
      Account Details
    </h2>

    <div className="grid grid-cols-3 gap-6">

      <input
        name="beneficiaryName"
        placeholder="Beneficiary Name"
        className="border border-gray-300 rounded-xl px-4 py-3"
        onChange={handleChange}
      />

      <input
        name="accountNumber"
        placeholder="Account Number"
        className="border border-gray-300 rounded-xl px-4 py-3"
        onChange={handleChange}
      />

      <input
        name="bankName"
        placeholder="Bank Name"
        className="border border-gray-300 rounded-xl px-4 py-3"
        onChange={handleChange}
      />

      <input
        name="branchName"
        placeholder="Branch Name"
        className="border border-gray-300 rounded-xl px-4 py-3"
        onChange={handleChange}
      />

      <input
        name="ifscCode"
        placeholder="IFSC Code"
        className="border border-gray-300 rounded-xl px-4 py-3"
        onChange={handleChange}
      />

    </div>

  </div>


  <div className="flex justify-end gap-4">

    <button
      type="button"
      onClick={() => router.push("/dashboard/procurement/vendors")}
      className="px-6 py-3 border border-gray-300 rounded-xl hover:bg-gray-100"
    >
      Cancel
    </button>

    <button
      type="submit"
      className="px-8 py-3 bg-[#7A008C] text-white rounded-xl hover:bg-purple-900"
    >
      Create Vendor
    </button>

  </div>

</form>

          </div>

        </div>
      </div>
    </div>
  );
}