"use client";

import { useEffect, useState } from "react";
import Sidebar from "../users/components/Sidebar";
import Topbar from "../users/components/Topbar";
import Link from "next/link";
import { Search } from "lucide-react";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/products");
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#F7F7FA]">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden ml-[74px]">
        <Topbar />

        <div className="flex-1 overflow-y-auto pt-[95px] px-8 pb-8 bg-[#F7F7FA] text-gray-600">

          <div className="text-sm mb-8 text-gray-500">
            <span className="text-[#7A008C]">Procurement</span>
            <span className="mx-2">{">"}</span>
            <span className="text-gray-500">Product Catalogue</span>
          </div>

          <div className="flex justify-between items-start mb-8">

            <div>
              <h1 className="text-3xl font-semibold text-[#7A008C]">
                Product Catalogue
              </h1>

              <p className="text-sm text-gray-500 mt-2">
                Product catalogue contains predefined list of products.
              </p>
            </div>

            <div className="flex gap-3">

              <button className="border border-[#7A008C] text-[#7A008C] px-5 py-2 rounded-xl hover:bg-purple-50 transition">
  Import Products
</button>

<Link
  href="/dashboard/products/create"
  className="bg-[#7A008C] hover:bg-purple-900 text-white px-5 py-2 rounded-xl transition"
>
  + Create New
</Link>

            </div>
          </div>

          <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6">

            <div className="flex justify-between items-center mb-5">

              <h2 className="font-semibold">
                Product Details ({products.length})
              </h2>

              <div className="relative">

                <Search
                  className="absolute left-3 top-3 text-gray-400"
                  size={18}
                />

                <input
                  placeholder="Search products..."
                  className="w-[260px] h-11 border border-gray-200 rounded-xl pl-10 pr-4 outline-none focus:border-[#7A008C]"
                />

              </div>

            </div>

            <div className="overflow-x-auto rounded-2xl border border-gray-100">

              <table className="w-full text-sm">

                <thead>
                  <tr className="bg-[#F9FAFB] border-b border-gray-200 text-gray-700">
                    <th className="p-3 text-left">S.No</th>
                    <th className="p-3 text-left">Product Name</th>
                    <th className="p-3 text-left">Code</th>
                    <th className="p-3 text-left">Specs Document</th>
                    <th className="p-3 text-left">Est.Price</th>
                    <th className="p-3 text-left">Linked Vendors</th>
                    <th className="p-3 text-left">Action</th>
                  </tr>
                </thead>

                <tbody>

                  {products.map((product, index) => (
                    <tr
                      key={product.id}
                      className="border-b border-gray-100 hover:bg-gray-50 transition"
                    >

                      <td className="p-3">
                        {index + 1}
                      </td>

                      <td className="p-3">
                      <Link
                        href={`/dashboard/products/${product.id}`}
                        className="font-medium text-[#7A008C] hover:underline"
                      >
                        {product.productName}
                      </Link>
                    </td>

                      <td className="p-3">
                        {product.productCode}
                      </td>

                      <td className="p-3 text-blue-600 font-medium">
                        {product.specification || "-"}
                      </td>

                      <td className="p-3">
                        ₹{product.estimatedPrice || 0}
                      </td>

                      <td className="p-3">
                        {product.productVendors
                          ?.map((pv) => pv.vendor.vendorName)
                          .join(", ")}
                      </td>

                      <td className="p-3">
                        <button className="w-9 h-9 rounded-full hover:bg-purple-50 text-[#7A008C] text-xl flex items-center justify-center">
                          ⋮
                        </button>
                      </td>

                    </tr>
                  ))}

                </tbody>

              </table>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
}