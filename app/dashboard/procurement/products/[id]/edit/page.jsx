"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import Sidebar from "../../../../users/components/Sidebar";
import Topbar from "../../../../users/components/Topbar";

export default function EditProductPage() {

  const { id } = useParams();
  const router = useRouter();

  const [vendors, setVendors] = useState([]);

  const [formData, setFormData] = useState({
    productName: "",
    productCode: "",
    estimatedPrice: "",
    vendorId: "",
    specification: "",
  });

  useEffect(() => {
    fetchProduct();
    fetchVendors();
  }, []);

  const fetchProduct = async () => {

    const res = await fetch(`/api/products/${id}`);
    const data = await res.json();

    setFormData({
      productName: data.productName,
      productCode: data.productCode,
      estimatedPrice: data.estimatedPrice,
      specification: data.specification,
      vendorId:
        data.productVendors?.[0]?.vendor?.id || "",
    });

  };

  const fetchVendors = async () => {
    const res = await fetch("/api/vendor");
    const data = await res.json();

    setVendors(data);
  };

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    const res = await fetch(`/api/products/${id}`, {

      method: "PUT",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(formData),

    });

    if (!res.ok) {

      alert("Update Failed");

      return;

    }

    alert("Product Updated");

    router.push(`/dashboard/procurement/products/${id}`);

  };

  return (

    <div className="flex min-h-screen bg-[#F7F7FA]">

      <Sidebar />

      <div className="flex-1 ml-[74px]">

        <Topbar />

        <div className="pt-[95px] px-8">

          <div className="bg-white rounded-3xl border border-gray-200 p-8">

            <h1 className="text-3xl font-semibold text-[#7A008C] mb-8">
              Edit Product
            </h1>

            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-2 gap-6"
            >

              <div>

                <label>Product Name</label>

                <input
                  name="productName"
                  value={formData.productName}
                  onChange={handleChange}
                  className="w-full border rounded-xl p-3 mt-2"
                />

              </div>

              <div>

                <label>Product Code</label>

                <input
                  name="productCode"
                  value={formData.productCode}
                  onChange={handleChange}
                  className="w-full border rounded-xl p-3 mt-2"
                />

              </div>

              <div>

                <label>Estimated Price</label>

                <input
                  type="number"
                  name="estimatedPrice"
                  value={formData.estimatedPrice}
                  onChange={handleChange}
                  className="w-full border rounded-xl p-3 mt-2"
                />

              </div>

              <div>

                <label>Vendor</label>

                <select
                  name="vendorId"
                  value={formData.vendorId}
                  onChange={handleChange}
                  className="w-full border rounded-xl p-3 mt-2"
                >

                  <option value="">
                    Select Vendor
                  </option>

                  {vendors.map((vendor) => (

                    <option
                      key={vendor.id}
                      value={vendor.id}
                    >
                      {vendor.vendorName}
                    </option>

                  ))}

                </select>

              </div>

              <div className="col-span-2">

                <label>Specification</label>

                <input
                  name="specification"
                  value={formData.specification}
                  onChange={handleChange}
                  className="w-full border rounded-xl p-3 mt-2"
                />

              </div>

              <div className="col-span-2 flex justify-end gap-4 mt-6">

                <button
                  type="button"
                  onClick={() => router.back()}
                  className="px-6 py-3 border rounded-xl"
                >
                  Cancel
                </button>

                <button
                  className="px-8 py-3 bg-[#7A008C] text-white rounded-xl"
                >
                  Update Product
                </button>

              </div>

            </form>

          </div>

        </div>

      </div>

    </div>

  );
}