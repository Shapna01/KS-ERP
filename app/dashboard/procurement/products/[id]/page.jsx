"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Sidebar from "../../../users/components/Sidebar";
import Topbar from "../../../users/components/Topbar";
import ProductSidebar from "../components/ProductSidebar";
export default function ProductDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
const [products, setProducts] = useState([]);
  const [product, setProduct] = useState(null);
  const [activeTab, setActiveTab] = useState("general");
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
  const res = await fetch("/api/products");
  const data = await res.json();

  setProducts(Array.isArray(data) ? data : []);
};
useEffect(() => {
  fetchProduct();
  fetchProducts();
}, []);
  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const res = await fetch(`/api/products/${id}`);
      const data = await res.json();

      if (!res.ok) {
        alert(data.error);
        return;
      }

      setProduct(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

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

  if (!product) return null;

  return (
<div className="flex h-screen bg-[#F7F7FA]">

  <Sidebar />

  <div className="flex flex-1 ml-[74px]">

    <ProductSidebar
      products={products}
      selectedId={id}
    />

    <div className="flex flex-col flex-1">

      <Topbar />

      <div className="flex-1 overflow-y-auto px-8 pt-[95px] pb-8">

          <div className="text-sm text-gray-500 mb-8">
            <span className="text-[#7A008C]">Procurement</span>
            <span className="mx-2">{">"}</span>

            <span className="text-[#7A008C]">
              Product Catalogue
            </span>

            <span className="mx-2">{">"}</span>

            <span>{product.productCode}</span>
          </div>

          <div className="flex justify-between items-start mb-8">

            <div>

              <h1 className="text-sm font-medium text-gray-800 truncate">
                {product.productName}
              </h1>

              <p className="text-sm text-gray-500 mt-2">
                Product information and purchase history.
              </p>

            </div>

            <button
              onClick={() =>
                router.push(
                  `/dashboard/procurement/products/${id}/edit`
                )
              }
              className="border border-[#7A008C] text-[#7A008C] px-5 py-2 rounded-xl hover:bg-purple-50"
            >
              Edit Product
            </button>

          </div>

          <div className="flex gap-8 border-b mb-8">

            <button
              onClick={() => setActiveTab("general")}
              className={`pb-3 ${
                activeTab === "general"
                  ? "text-[#7A008C] border-b-2 border-[#7A008C] font-semibold"
                  : "text-gray-500"
              }`}
            >
              General Details
            </button>

            <button
              onClick={() => setActiveTab("orders")}
              className={`pb-3 ${
                activeTab === "orders"
                  ? "text-[#7A008C] border-b-2 border-[#7A008C] font-semibold"
                  : "text-gray-500"
              }`}
            >
              Purchase Orders
            </button>

          </div>

          {activeTab === "general" && (

            <div className="bg-white rounded-3xl border border-gray-200 p-8">

              <div className="grid grid-cols-2 gap-6">

                <div>

                  <label className="text-sm text-gray-500">
                    Product Name
                  </label>

                  <input
                    readOnly
                    value={product.productName}
                    className="w-full mt-2 border rounded-xl p-3 bg-gray-50"
                  />

                </div>

                <div>

                  <label className="text-sm text-gray-500">
                    Product Code
                  </label>

                  <input
                    readOnly
                    value={product.productCode}
                    className="w-full mt-2 border rounded-xl p-3 bg-gray-50"
                  />

                </div>

                <div>

                  <label className="text-sm text-gray-500">
                    Estimated Price
                  </label>

                  <input
                    readOnly
                    value={`₹ ${product.estimatedPrice}`}
                    className="w-full mt-2 border rounded-xl p-3 bg-gray-50"
                  />

                </div>

                <div>

                  <label className="text-sm text-gray-500">
                    Associated Vendors
                  </label>

                  <input
                    readOnly
                    value={
                      product.productVendors
                        ?.map((v) => v.vendor.vendorName)
                        .join(", ") || "-"
                    }
                    className="w-full mt-2 border rounded-xl p-3 bg-gray-50"
                  />

                </div>

                <div>

                  <label className="text-sm text-gray-500">
                    Specification
                  </label>

                  <input
                    readOnly
                    value={product.specification || "-"}
                    className="w-full mt-2 border rounded-xl p-3 bg-gray-50"
                  />

                </div>

                <div>

                  <label className="text-sm text-gray-500">
                    Created Date
                  </label>

                  <input
                    readOnly
                    value={new Date(product.createdAt).toLocaleDateString()}
                    className="w-full mt-2 border rounded-xl p-3 bg-gray-50"
                  />

                </div>

              </div>

            </div>

          )}

          {activeTab === "orders" && (
  <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6">

    <div className="flex justify-between items-center mb-6">
      <h2 className="text-lg font-semibold">
        Purchase Orders ({product.purchaseOrders?.length || 0})
      </h2>

      <input
        type="text"
        placeholder="Search..."
        className="border border-gray-300 rounded-xl px-4 py-2 w-64 outline-none focus:border-[#7A008C]"
      />
    </div>

    <div className="overflow-x-auto rounded-2xl border border-gray-200">

      <table className="w-full text-sm">

        <thead className="bg-[#F9FAFB]">

          <tr>

            <th className="p-3 text-left">S.No</th>

            <th className="p-3 text-left">
              PO Number
            </th>

            <th className="p-3 text-left">
              Order Date
            </th>

            <th className="p-3 text-left">
              Project
            </th>

            <th className="p-3 text-left">
              Vendor
            </th>

            <th className="p-3 text-left">
              Quantity
            </th>

            <th className="p-3 text-left">
              Est. Rate
            </th>

            <th className="p-3 text-left">
              Status
            </th>

          </tr>

        </thead>

        <tbody>

          {product.purchaseOrders?.length > 0 ? (

            product.purchaseOrders.map((po, index) => (

              <tr
                key={po.id}
                className="border-t hover:bg-gray-50"
              >

                <td className="p-3">
                  {index + 1}
                </td>

                <td className="p-3 font-medium text-[#7A008C]">
                  {po.poNumber}
                </td>

                <td className="p-3">
                  {new Date(po.orderDate).toLocaleDateString()}
                </td>

                <td className="p-3">
                  {po.project?.projectName || "-"}
                </td>

                <td className="p-3">
                  {po.vendor?.vendorName || "-"}
                </td>

                <td className="p-3">
                  {po.quantity}
                </td>

                <td className="p-3">
                  ₹{po.estimatedPrice}
                </td>

                <td className="p-3">

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      po.status === "Approved"
                        ? "bg-green-100 text-green-700"
                        : po.status === "Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {po.status}
                  </span>

                </td>

              </tr>

            ))

          ) : (

            <tr>

              <td
                colSpan={8}
                className="text-center py-10 text-gray-500"
              >
                No Purchase Orders Found
              </td>

            </tr>

          )}

        </tbody>

      </table>

    </div>

  </div>
)}
</div>
        </div>

      </div>

    </div>
  );
}