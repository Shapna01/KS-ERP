import { prisma } from "@/lib/prisma";
import Sidebar from "../../users/components/Sidebar";
import Topbar from "../../users/components/Topbar";
import Link from "next/link";
import { Search, Filter, Upload } from "lucide-react";

export default async function ProductsPage() {
  const products = await prisma.product.findMany({
    include: {
      vendors: {
        include: {
          vendor: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="flex min-h-screen bg-[#F8F8FA]">
      <Sidebar />

      <div className="flex-1 ml-[74px]">
        <Topbar />

        <div className="pt-[85px] px-8">

          <div className="text-xs text-gray-400 mb-5">
            Procurement
            <span className="mx-2">{">"}</span>
            <span className="text-gray-600">
              Product Catalogue
            </span>
          </div>

          <div className="flex justify-between items-start mb-6">

            <div>
              <h1 className="text-[26px] font-semibold text-[#7A008C]">
                Product Catalogue
              </h1>

              <p className="text-sm text-gray-500 mt-2 max-w-3xl">
                The Items Catalogue contains a predefined list
                of commonly used items with standard categories
                and details to ensure consistency while creating
                requests or claims.
              </p>
            </div>

            <div className="flex gap-3">

              <button className="h-10 px-4 border border-[#7A008C] text-[#7A008C] rounded-md text-sm flex items-center gap-2">
                <Upload size={15} />
                Import Products
              </button>

              <Link
                href="/dashboard/procurement/products/create"
                className="h-10 px-4 bg-[#7A008C] text-white rounded-md text-sm flex items-center"
              >
                + Create New
              </Link>

            </div>

          </div>

          <div className="bg-white border rounded-xl p-5">

            <div className="flex justify-between items-center mb-5">

              <h3 className="font-semibold text-gray-700">
                Product Details (24)
              </h3>

              <div className="flex items-center gap-3">

                <div className="relative">
                  <Search
                    size={16}
                    className="absolute left-3 top-3 text-gray-400"
                  />

                  <input
                    placeholder="Search"
                    className="w-[220px] h-10 border rounded-md pl-10 text-sm"
                  />
                </div>

                <Filter
                  size={18}
                  className="text-gray-500 cursor-pointer"
                />

                <Upload
                  size={18}
                  className="text-gray-500 cursor-pointer"
                />

              </div>

            </div>

            <div className="border rounded-lg overflow-hidden">

              <table className="w-full text-sm">

                <thead className="bg-[#F8F8FA]">

                  <tr className="text-left text-gray-600">

                    <th className="p-3 w-10">
                      <input type="checkbox" />
                    </th>

                    <th className="p-3">S.NO</th>
                    <th className="p-3">Product Name</th>
                    <th className="p-3">Code</th>
                    <th className="p-3">Specs Document</th>
                    <th className="p-3">Est.Price (Rs)</th>
                    <th className="p-3">Linked Vendors</th>
                    <th className="p-3">Actions</th>

                  </tr>

                </thead>

                <tbody>
                {products.length > 0 ? (
                    products.map((product, index) => (
                    <tr key={product.id} className="border-t hover:bg-gray-50">
                        <td className="p-3">
                        <input type="checkbox" />
                        </td>

                        <td className="p-3">
                        {String(index + 1).padStart(2, "0")}
                        </td>

                        <td className="p-3 font-medium">
                        {product.productName}
                        </td>

                        <td className="p-3">
                        {product.productCode}
                        </td>

                        <td className="p-3">
                        {product.specification || "-"}
                        </td>

                        <td className="p-3">
                        ₹ {Number(product.estimatedPrice || 0).toLocaleString()}
                        </td>

                        <td className="p-3">
                        {product.vendors.length > 0
                            ? product.vendors
                                .map((pv) => pv.vendor.vendorName)
                                .join(", ")
                            : "-"}
                        </td>

                        <td className="p-3">
                        <button className="text-[#7A008C]">
                            View
                        </button>
                                </td>
                            </tr>
                            ))
                        ) : (
                            <tr>
                            <td
                        colSpan="8"
                        className="text-center py-6 text-gray-500"
                    >
                        No products found
                    </td>
                    </tr>
                )}
                </tbody>

              </table>

            </div>

            <div className="flex justify-between items-center mt-5 text-sm text-gray-500">

              <div className="flex items-center gap-2">
                Showing

                <select className="border rounded px-2 py-1">
                  <option>07</option>
                </select>

                of 20 item
              </div>

              <div className="flex gap-1">

                <button className="px-3 py-1 border rounded">
                  Prev
                </button>

                <button className="px-3 py-1 border rounded bg-[#F8F8FA]">
                  1
                </button>

                <button className="px-3 py-1 border rounded">
                  2
                </button>

                <button className="px-3 py-1 border rounded">
                  ...
                </button>

                <button className="px-3 py-1 border rounded">
                  5
                </button>

                <button className="px-3 py-1 border rounded">
                  Next
                </button>

              </div>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
}