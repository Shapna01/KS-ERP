"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateVendorForm({
  closeModal,
  
  onVendorCreated,
}){
  const [formData, setFormData] = useState({
    vendorName: "",
    establishedDate: "",
    panNumber: "",
    gstNumber: "",
    serviceCategory: "",
    legalStructure: "",
    annualSales: "",
    msmeRegistered: "No",
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
const [vendorList, setVendorList] = useState([]);
const router = useRouter();
const fetchVendors = async () => {
  const res = await fetch("/api/vendor");
  const data = await res.json();
  setVendorList(data);
};
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
  const newVendor = await res.json();

  alert("Vendor Created Successfully");

  if (onVendorCreated) {
    onVendorCreated(newVendor);
  }

  closeModal();
}
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">

      <div>
        <h2 className="text-lg font-semibold mb-4">
          Company Details
        </h2>

        <div className="grid grid-cols-3 gap-4">

          <input
            name="vendorName"
            placeholder="Vendor Name"
            onChange={handleChange}
            className="border rounded-lg p-3"
          />

          <input
            type="date"
            name="establishedDate"
            onChange={handleChange}
            className="border rounded-lg p-3"
          />

          <input
            name="gstNumber"
            placeholder="GST Number"
            onChange={handleChange}
            className="border rounded-lg p-3"
          />

          <input
            name="panNumber"
            placeholder="PAN Number"
            onChange={handleChange}
            className="border rounded-lg p-3"
          />

          <input
            name="serviceCategory"
            placeholder="Service Category"
            onChange={handleChange}
            className="border rounded-lg p-3"
          />

          <input
            name="legalStructure"
            placeholder="Legal Structure"
            onChange={handleChange}
            className="border rounded-lg p-3"
          />

          <textarea
            name="address"
            placeholder="Address"
            onChange={handleChange}
            className="border rounded-lg p-3 col-span-3"
          />
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-4">
          Contact Details
        </h2>

        <div className="grid grid-cols-3 gap-4">
          <input
            name="contactName"
            placeholder="Contact Name"
            onChange={handleChange}
            className="border rounded-lg p-3"
          />

          <input
            name="contactNumber"
            placeholder="Contact Number"
            onChange={handleChange}
            className="border rounded-lg p-3"
          />

          <input
            name="contactEmail"
            placeholder="Email"
            onChange={handleChange}
            className="border rounded-lg p-3"
          />
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-4">
          Bank Details
        </h2>

        <div className="grid grid-cols-3 gap-4">
          <input
            name="bankName"
            placeholder="Bank Name"
            onChange={handleChange}
            className="border rounded-lg p-3"
          />

          <input
            name="accountNumber"
            placeholder="Account Number"
            onChange={handleChange}
            className="border rounded-lg p-3"
          />

          <input
            name="ifscCode"
            placeholder="IFSC Code"
            onChange={handleChange}
            className="border rounded-lg p-3"
          />
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={closeModal}
          className="border px-5 py-2 rounded-lg"
        >
          Cancel
        </button>

        <button
          type="submit"
          className="bg-[#7A008C] text-white px-5 py-2 rounded-lg"
        >
          Create Vendor
        </button>
      </div>

    </form>
  );
}