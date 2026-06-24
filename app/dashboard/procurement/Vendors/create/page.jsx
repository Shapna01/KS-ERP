"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "../../users/components/Sidebar";
import Topbar from "../../users/components/Topbar";

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

    primaryContactName: "",
    primaryContactNumber: "",
    primaryContactMail: "",
    primaryFax: "",
    primaryWebsite: "",
    primaryUpiId: "",

    alternateContactName: "",
    alternateContactNumber: "",
    alternateContactMail: "",
    alternateFax: "",
    alternateWebsite: "",
    alternateUpiId: "",

    beneficiaryName: "",
    accountNumber: "",
    bankName: "",
    branchName: "",
    ifscCode: "",
    upiId: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/vendors", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      alert("Vendor created successfully");
      router.push("/dashboard/vendors");
    } else {
      alert("Failed to create vendor");
    }
  };

  return (
    <div className="flex min-h-screen bg-[#F7F7FA]">
      <Sidebar />

      <div className="flex-1 flex flex-col ml-[74px]">
        <Topbar />

        <div className="pt-[72px] px-8 py-7 overflow-y-auto">

          <div className="text-sm mb-8 text-gray-500">
            <span className="text-[#7A008C]">Procurement</span>
            <span className="mx-2">{">"}</span>
            <span className="text-[#7A008C]">Vendor Management</span>
            <span className="mx-2">{">"}</span>
            <span>Create New</span>
          </div>

          <div className="bg-white border rounded-2xl p-8">

            <h1 className="text-3xl font-semibold mb-2">
              Create New Vendor
            </h1>

            <p className="text-gray-500 text-sm mb-8">
              Create a new vendor profile by entering company and contact details.
            </p>

            <form onSubmit={handleSubmit}>

              <h2 className="text-lg font-semibold mb-6">
                Basic Information
              </h2>

              <div className="grid grid-cols-2 gap-6">

                <div>
                  <label>Vendor Name</label>
                  <input
                    type="text"
                    name="vendorName"
                    value={formData.vendorName}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-3 mt-2"
                  />
                </div>

                <div>
                  <label>Established Date</label>
                  <input
                    type="date"
                    name="establishedDate"
                    value={formData.establishedDate}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-3 mt-2"
                  />
                </div>

                <div>
                  <label>PAN Number</label>
                  <input
                    type="text"
                    name="panNumber"
                    value={formData.panNumber}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-3 mt-2"
                  />
                </div>

                <div>
                  <label>GST Number</label>
                  <input
                    type="text"
                    name="gstNumber"
                    value={formData.gstNumber}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-3 mt-2"
                  />
                </div>

                <div>
                  <label>Service Category</label>
                  <input
                    type="text"
                    name="serviceCategory"
                    value={formData.serviceCategory}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-3 mt-2"
                  />
                </div>

                <div>
                  <label>Legal Structure</label>
                  <input
                    type="text"
                    name="legalStructure"
                    value={formData.legalStructure}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-3 mt-2"
                  />
                </div>

                <div>
                  <label>Annual Sales</label>
                  <input
                    type="text"
                    name="annualSales"
                    value={formData.annualSales}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-3 mt-2"
                  />
                </div>

                <div>
                  <label>MSME Registered</label>
                  <select
                    name="msmeRegistered"
                    value={formData.msmeRegistered}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-3 mt-2"
                  >
                    <option value="">Select</option>
                    <option>Yes</option>
                    <option>No</option>
                  </select>
                </div>

              </div>

              <div className="mt-6">
                <label>Address</label>

                <textarea
                  rows="4"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-3 mt-2"
                />
              </div>
              <h2 className="text-lg font-semibold mt-10 mb-6">
                Primary Contact Details
              </h2>

              <div className="grid grid-cols-2 gap-6">

                <div>
                  <label>Contact Person Name</label>
                  <input
                    type="text"
                    name="primaryContactName"
                    value={formData.primaryContactName}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-3 mt-2"
                  />
                </div>

                <div>
                  <label>Contact Number</label>
                  <input
                    type="text"
                    name="primaryContactNumber"
                    value={formData.primaryContactNumber}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-3 mt-2"
                  />
                </div>

                <div>
                  <label>Email Address</label>
                  <input
                    type="email"
                    name="primaryContactMail"
                    value={formData.primaryContactMail}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-3 mt-2"
                  />
                </div>

                <div>
                  <label>Fax Number</label>
                  <input
                    type="text"
                    name="primaryFax"
                    value={formData.primaryFax}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-3 mt-2"
                  />
                </div>

                <div>
                  <label>Website</label>
                  <input
                    type="text"
                    name="primaryWebsite"
                    value={formData.primaryWebsite}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-3 mt-2"
                  />
                </div>

                <div>
                  <label>UPI ID</label>
                  <input
                    type="text"
                    name="primaryUpiId"
                    value={formData.primaryUpiId}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-3 mt-2"
                  />
                </div>

              </div>


              <h2 className="text-lg font-semibold mt-10 mb-6">
                Alternate Contact Details
              </h2>

              <div className="grid grid-cols-2 gap-6">

                <div>
                  <label>Contact Person Name</label>
                  <input
                    type="text"
                    name="alternateContactName"
                    value={formData.alternateContactName}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-3 mt-2"
                  />
                </div>

                <div>
                  <label>Contact Number</label>
                  <input
                    type="text"
                    name="alternateContactNumber"
                    value={formData.alternateContactNumber}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-3 mt-2"
                  />
                </div>

                <div>
                  <label>Email Address</label>
                  <input
                    type="email"
                    name="alternateContactMail"
                    value={formData.alternateContactMail}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-3 mt-2"
                  />
                </div>

                <div>
                  <label>Fax Number</label>
                  <input
                    type="text"
                    name="alternateFax"
                    value={formData.alternateFax}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-3 mt-2"
                  />
                </div>

                <div>
                  <label>Website</label>
                  <input
                    type="text"
                    name="alternateWebsite"
                    value={formData.alternateWebsite}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-3 mt-2"
                  />
                </div>

                <div>
                  <label>UPI ID</label>
                  <input
                    type="text"
                    name="alternateUpiId"
                    value={formData.alternateUpiId}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-3 mt-2"
                  />
                </div>

              </div>


<div className="mt-10">

  <h2 className="text-lg font-semibold text-gray-800">
    Account Details
  </h2>

  <p className="text-sm text-gray-500 mt-1 mb-6">
    Enter the vendor's bank and account details to ensure accurate and timely payments.
  </p>

  <div className="grid grid-cols-3 gap-6 mb-6">

    <div>
      <label className="block text-xs text-gray-500 mb-2">
        Beneficiary Name *
      </label>
      <input
        type="text"
        name="beneficiaryName"
        value={formData.beneficiaryName}
        onChange={handleChange}
        className="w-full border rounded-md px-3 py-2"
      />
    </div>

    <div>
      <label className="block text-xs text-gray-500 mb-2">
        Account Number *
      </label>
      <input
        type="text"
        name="accountNumber"
        value={formData.accountNumber}
        onChange={handleChange}
        className="w-full border rounded-md px-3 py-2"
      />
    </div>

    <div>
      <label className="block text-xs text-gray-500 mb-2">
        Bank Name *
      </label>
      <input
        type="text"
        name="bankName"
        value={formData.bankName}
        onChange={handleChange}
        className="w-full border rounded-md px-3 py-2"
      />
    </div>

  </div>

  <div className="grid grid-cols-3 gap-6">

    <div>
      <label className="block text-xs text-gray-500 mb-2">
        Branch Name *
      </label>
      <input
        type="text"
        name="branchName"
        value={formData.branchName}
        onChange={handleChange}
        className="w-full border rounded-md px-3 py-2"
      />
    </div>

    <div>
      <label className="block text-xs text-gray-500 mb-2">
        IFSC Code *
      </label>
      <input
        type="text"
        name="ifscCode"
        value={formData.ifscCode}
        onChange={handleChange}
        className="w-full border rounded-md px-3 py-2"
      />
    </div>

    <div>
      <label className="block text-xs text-gray-500 mb-2">
        UPI ID *
      </label>
      <input
        type="text"
        name="upiId"
        value={formData.upiId}
        onChange={handleChange}
        className="w-full border rounded-md px-3 py-2"
      />
    </div>

  </div>

</div>

<div className="flex justify-end gap-4 border-t mt-10 pt-6">

  <button
    type="button"
    onClick={() => router.push("/dashboard/vendors")}
    className="text-sm text-gray-500"
  >
    Cancel
  </button>

  <button
    type="submit"
    className="bg-[#7A008C] hover:bg-[#69007a] text-white px-6 py-2 rounded-md"
  >
    Create Vendor ✓
  </button>

</div>
            </form>

          </div>

        </div>

      </div>

    </div>
  );
}