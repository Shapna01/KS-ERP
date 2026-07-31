"use client";

import Link from "next/link";
import { Search } from "lucide-react";

export default function ProductSidebar({
  products = [],
  selectedId,
}) {
  return (
    <div className="w-[270px] bg-white border-r border-gray-200 flex flex-col h-screen">


      <div className="p-4 border-b">

        <div className="relative">

          <Search
            size={16}
            className="absolute left-3 top-3 text-gray-400"
          />

          <input
            placeholder="Search"
            className="w-full h-10 border rounded-lg pl-10 pr-3 text-sm outline-none focus:border-[#7A008C]"
          />

        </div>

      </div>

      <div className="px-5 py-3 border-b bg-gray-50">

        <h2 className="font-semibold text-gray-800">
          Products ({products.length})
        </h2>

      </div>

      <div className="flex-1 overflow-y-auto">

        {products.map((product) => (

          <Link
            key={product.id}
            href={`/dashboard/procurement/products/${product.id}`}
            className={`block px-4 py-4 border-b transition-all ${
              Number(selectedId) === product.id
                ? "bg-[#F8EAFB] border-l-4 border-[#7A008C]"
                : "hover:bg-gray-50"
            }`}
          >

            <p className="text-sm font-medium text-gray-800 leading-5">
              {product.productName}
            </p>

            

          </Link>

        ))}

      </div>

    </div>
  );
}