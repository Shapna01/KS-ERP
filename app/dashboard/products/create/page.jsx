"use client";

import { useEffect, useState } from "react";
import Sidebar from "../../users/components/Sidebar";
import Topbar from "../../users/components/Topbar";
import { useRouter } from "next/navigation";

export default function CreateProductPage() {
  const router = useRouter();
  const [specFile, setSpecFile] = useState(null);
  const [vendors, setVendors] = useState([]);

  const [formData, setFormData] = useState({
    productName: "",
    productCode: "",
    estimatedPrice: "",
    vendorId: "",
    specification: "",
  });

  useEffect(() => {
    fetchVendors();
  }, []);

  const fetchVendors = async () => {
    try {
      const res = await fetch("/api/vendors");
      const data = await res.json();
      setVendors(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  const form = new FormData();

  form.append("productName", formData.productName);
  form.append("productCode", formData.productCode);
  form.append("estimatedPrice", formData.estimatedPrice);
  form.append("vendorId", formData.vendorId);

  if (specFile) {
    form.append("specification", specFile);
  }
 
  const res = await fetch("/api/products", {
  method: "POST",
  body: form,
});

const result = await res.json();

if (!res.ok) {
  alert(result.error);
  return;
}

alert("Product Created Successfully");
router.push("/dashboard/products");
};



  return (
    <div className="flex min-h-screen bg-[#F7F7FA]">
      <Sidebar />

      <div className="flex-1 flex flex-col ml-[74px]">
        <Topbar />

        <div className="flex-1 overflow-y-auto pt-[100px] px-8 pb-7 text-gray-500">

          <div className="text-sm mb-8">
            <span className="text-[#7A008C]">Procurement</span>
            <span className="mx-2">{">"}</span>
            <span className="text-[#7A008C]">Product Catalogue</span>
            <span className="mx-2">{">"}</span>
            <span>Create New</span>
          </div>

          <div className="bg-white border border-gray-200 rounded-3xl shadow-sm p-8">

            <h1 className="text-3xl font-semibold mb-2">
              Create New Product
            </h1>

            <p className="text-gray-500 text-sm mb-8">
              Create a new product by defining its name, category and basic details.
            </p>

            <form onSubmit={handleSubmit} className="space-y-8">

  <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
    <h2 className="text-xl font-semibold text-gray-800 mb-6">
      Product Details
    </h2>

    <div className="grid grid-cols-2 gap-6">

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Product Name
        </label>

        <input
          type="text"
          name="productName"
          value={formData.productName}
          onChange={handleChange}
          placeholder="Enter Product Name"
          className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-[#7A008C]"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Product Code
        </label>

        <input
          type="text"
          name="productCode"
          value={formData.productCode}
          onChange={handleChange}
          placeholder="BA-ACT250"
          className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-[#7A008C]"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Estimated Price
        </label>

        <input
          type="number"
          name="estimatedPrice"
          value={formData.estimatedPrice}
          onChange={handleChange}
          placeholder="35000"
          className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-[#7A008C]"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Associated Vendor
        </label>

        <select
          name="vendorId"
          value={formData.vendorId}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-[#7A008C]"
        >
          <option value="">Select Vendor</option>

          {vendors.map((vendor) => (
            <option key={vendor.id} value={vendor.id}>
              {vendor.vendorName}
            </option>
          ))}
        </select>
      </div>

    </div>
  </div>

  <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">

    <h2 className="text-xl font-semibold text-gray-800 mb-6">
      Technical Specification
    </h2>

    <div className="border-2 border-dashed border-gray-300 rounded-2xl p-10 text-center">

      <input
        type="file"
        accept=".pdf,.doc,.docx"
        onChange={(e) => setSpecFile(e.target.files[0])}
        className="mb-4"
      />

      <p className="text-gray-500 text-sm">
        Upload specification document (.pdf, .doc, .docx)
      </p>

      {specFile && (
        <div className="mt-4 text-green-600 font-medium">
          Selected File: {specFile.name}
        </div>
      )}

    </div>

  </div>

  <div className="flex justify-end gap-4">

    <button
      type="button"
      onClick={() => router.push("/dashboard/products")}
      className="px-6 py-3 border border-gray-300 rounded-xl hover:bg-gray-100 transition"
    >
      Cancel
    </button>

    <button
      type="submit"
      className="px-8 py-3 bg-[#7A008C] text-white rounded-xl hover:bg-purple-900 transition"
    >
      Create Product
    </button>

  </div>

</form>

          </div>

        </div>
      </div>
    </div>
  );
}