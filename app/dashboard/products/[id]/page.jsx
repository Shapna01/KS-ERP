"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Sidebar from "../../users/components/Sidebar";
import Topbar from "../../users/components/Topbar";

export default function ProductDetailsPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (id) fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const res = await fetch(`/api/products/${id}`);
      const data = await res.json();
      setProduct(data);
    } catch (error) {
      console.log(error);
    }
  };

  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }


  return (
    <div className="flex min-h-screen bg-[#F7F7FA]">
      <Sidebar />

      <div className="flex-1 flex flex-col ml-[74px]">
        <Topbar />

        <div className="pt-[72px] px-8 py-7 text-gray-600">

          <div className="text-sm mb-8">
            <span className="text-[#7A008C]">Procurement</span>
            <span className="mx-2">{">"}</span>
            <span className="text-[#7A008C]">Product Catalogue</span>
            <span className="mx-2">{">"}</span>
            <span>Product No</span>
          </div>

          <div className="flex justify-between items-start mb-8">

            <div>
              <h1 className="text-[30px] font-semibold text-[#7A008C]">
                {product.productName}
              </h1>

              <p className="text-sm text-gray-500 mt-3">
                Product information and vendor details.
              </p>
            </div>

            <button className="border border-[#7A008C] text-[#7A008C] px-5 py-2 rounded-lg hover:bg-[#7A008C] hover:text-white">
              Edit Product
            </button>

          </div>

          <div className="flex gap-8 border-b mb-8">
            <button className="pb-3 border-b-2 border-[#7A008C] text-[#7A008C] font-medium">
              General Details
            </button>

            <button className="pb-3 text-gray-500">
              Purchase Orders
            </button>
          </div>

          <div className="bg-white rounded-2xl border p-8">

            <h2 className="font-semibold mb-6">
              General Details
            </h2>

            <div className="space-y-6">

              <div>
                <label className="text-sm text-gray-500 block mb-2">
                  Product Name
                </label>

                <input
                  value={product.productName}
                  readOnly
                  className="w-full border rounded-lg p-3 bg-[#FAFAFA]"
                />
              </div>

              <div>
                <label className="text-sm text-gray-500 block mb-2">
                  Product Code
                </label>

                <input
                  value={product.productCode}
                  readOnly
                  className="w-full border rounded-lg p-3 bg-[#FAFAFA]"
                />
              </div>

              <div className="grid grid-cols-2 gap-6">

                <div>
                  <label className="text-sm text-gray-500 block mb-2">
                    Creation Date
                  </label>

                  <input
                    value={new Date(product.createdAt).toLocaleDateString()}
                    readOnly
                    className="w-full border rounded-lg p-3 bg-[#FAFAFA]"
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-500 block mb-2">
                    Associated Vendors
                  </label>

                  <input
                    value={
                      product.productVendors?.length
                        ? product.productVendors
                            .map((v) => v.vendor.vendorName)
                            .join(", ")
                        : "-"
                    }
                    readOnly
                    className="w-full border rounded-lg p-3 bg-[#FAFAFA]"
                  />
                </div>

              </div>

              <div>
                <label className="text-sm text-gray-500 block mb-2">
                  Specification Document
                </label>

                <input
                  value={product.specification || "-"}
                  readOnly
                  className="w-full border rounded-lg p-3 bg-[#FAFAFA]"
                />
              </div>

              <div>
                <label className="text-sm text-gray-500 block mb-2">
                  Estimated Price
                </label>

                <input
                  value={`₹ ${product.estimatedPrice || 0}`}
                  readOnly
                  className="w-full border rounded-lg p-3 bg-[#FAFAFA]"
                />
              </div>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
}