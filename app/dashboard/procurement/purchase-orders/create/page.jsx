"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "../../../users/components/Sidebar";
import Topbar from "../../../users/components/Topbar";

export default function CreatePurchaseOrderPage() {
  const router = useRouter();

  const [vendors, setVendors] = useState([]);
  const [products, setProducts] = useState([]);
  const [projects, setProjects] = useState([]);

  const [formData, setFormData] = useState({
    orderDate: "",
    expectedDeliveryDate: "",
    vendorId: "",
    projectId: "",
  });

  const [items, setItems] = useState([
    {
      productId: "",
      quantity: 1,
      unitPrice: "",
    },
  ]);

  useEffect(() => {
    fetchVendors();
    fetchProducts();
    fetchProjects();
  }, []);

  const fetchVendors = async () => {
    const res = await fetch("/api/vendor");
    const data = await res.json();
    setVendors(data.vendors || data);
  };

  const fetchProducts = async () => {
    const res = await fetch("/api/products");
    const data = await res.json();
    setProducts(data);
  };

  const fetchProjects = async () => {
  const res = await fetch("/api/projects");
  const data = await res.json();

  console.log("Projects API:", data);

  setProjects(Array.isArray(data) ? data : data.projects || []);
};

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleItemChange = (index, field, value) => {
    const updated = [...items];
    updated[index][field] = value;
    setItems(updated);
  };

  const addRow = () => {
    setItems([
      ...items,
      {
        productId: "",
        quantity: 1,
        unitPrice: "",
      },
    ]);
  };

  const removeRow = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/purchase-orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...formData,
        items,
      }),
    });

    const result = await res.json();

    if (!res.ok) {
      alert(result.error);
      return;
    }

    alert("Purchase Order Created");
    router.push("/dashboard/procurement/purchase-orders");
  };

  return (
    <div className="flex min-h-screen bg-[#F7F7FA]">
      <Sidebar />

      <div className="flex-1 flex flex-col ml-[74px]">
        <Topbar />

        <div className="pt-[95px] px-8 pb-8">

          <div className="text-sm mb-8 text-gray-500">
            <span className="text-[#7A008C]">Procurement</span>
            <span className="mx-2">{">"}</span>
            <span className="text-[#7A008C]">Purchase Orders</span>
            <span className="mx-2">{">"}</span>
            <span>Create New</span>
          </div>

          <div className="bg-white border border-gray-200 rounded-3xl shadow-sm p-8">
 
            <h1 className="text-3xl font-semibold text-[#7A008C]">
              Create Purchase Order
            </h1>

            <p className="text-sm text-gray-500 mt-2 mb-10">
              Create a purchase order by selecting vendor, project and products.
            </p>

            <form onSubmit={handleSubmit}>

              <div className="bg-[#FCFCFD] border border-gray-200 rounded-2xl p-8">

                <h2 className="text-xl font-semibold text-gray-800 mb-6">
                Order Information
                </h2>

                <div className="grid grid-cols-2 gap-6">

                <div>
                  <label>Order Date</label>

                  <input
                    type="date"
                    name="orderDate"
                    value={formData.orderDate}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-700 outline-none transition focus:border-[#7A008C] focus:ring-2 focus:ring-purple-100"
                  />
                </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Expected Delivery</label>

                  <input
                    type="date"
                    name="expectedDeliveryDate"
                    value={formData.expectedDeliveryDate}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-700 outline-none transition focus:border-[#7A008C] focus:ring-2 focus:ring-purple-100"
                  />
                </div>

                <div>
                  <label>Vendor</label>

                  <select
                    name="vendorId"
                    value={formData.vendorId}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-700 outline-none transition focus:border-[#7A008C] focus:ring-2 focus:ring-purple-100"
                  >
                    <option value="">Select Vendor</option>

                    {vendors.map((vendor) => (
                      <option key={vendor.id} value={vendor.id}>
                        {vendor.vendorName}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label>Project</label>

                 <select
  name="projectId"
  value={formData.projectId}
  onChange={handleChange}
  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-700 outline-none transition focus:border-[#7A008C] focus:ring-2 focus:ring-purple-100"
>
  <option value="">Select Project</option>

  {projects.map((project) => (
    <option key={project.id} value={project.id}>
      {project.projectName}
    </option>
  ))}
</select>
                </div>

              </div>

              <div className="mt-10 bg-[#FCFCFD] border border-gray-200 rounded-2xl p-8">

                <div className="flex justify-between items-center mb-5">

                  <h2 className="text-xl font-semibold text-gray-800">
                    Products
                    </h2>

                  <button
                    type="button"
                    onClick={addRow}
                    className="bg-[#7A008C] hover:bg-purple-900 text-white px-5 py-2 rounded-xl transition"
                  >
                    + Add Product
                  </button>

                </div>

                <table className="w-full overflow-hidden rounded-2xl border border-gray-200">

                  <thead className="bg-[#F9FAFB] text-gray-700">
                    <tr>
                      <th className="p-3">Product</th>
                      <th>Qty</th>
                      <th>Unit Price</th>
                      <th></th>
                    </tr>
                  </thead>

                  <tbody>

                    {items.map((item, index) => (
                      <tr
key={index}
className="border-t border-gray-200 hover:bg-gray-50 transition"
>

                        <td className="p-3">

                          <select
                            value={item.productId}
                            onChange={(e) =>
                              handleItemChange(index, "productId", e.target.value)
                            }
                            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-700 outline-none focus:border-[#7A008C]"
                          >
                            <option value="">Select Product</option>

                            {products.map((product) => (
                              <option
                                key={product.id}
                                value={product.id}
                              >
                                {product.productName}
                              </option>
                            ))}

                          </select>

                        </td>

                        <td>
                          <input
                            type="number"
                            value={item.quantity}
                            onChange={(e) =>
                              handleItemChange(index, "quantity", e.target.value)
                            }
                            className="w-24 rounded-lg border border-gray-300 px-3 py-2 text-gray-700 outline-none focus:border-[#7A008C]"
                          />
                        </td>

                        <td>
                          <input
                            type="number"
                            value={item.unitPrice}
                            onChange={(e) =>
                              handleItemChange(index, "unitPrice", e.target.value)
                            }
                            className="w-36 rounded-lg border border-gray-300 px-3 py-2 text-gray-700 outline-none focus:border-[#7A008C]"
                          />
                        </td>

                        <td>
                          <button
                            type="button"
                            onClick={() => removeRow(index)}
                            className="rounded-lg bg-red-50 px-3 py-2 text-red-600 hover:bg-red-100 transition"
                          >
                            Remove
                          </button>
                        </td>

                      </tr>
                    ))}

                  </tbody>

                </table>

              </div>

              <div className="flex justify-end gap-4 mt-10 border-t border-gray-200 pt-6">

                <button
                  type="button"
                  onClick={() =>
  router.push(
    "/dashboard/procurement/purchase-orders"
  )
}
                  className="rounded-xl border border-gray-300 px-6 py-3 font-medium text-gray-700 hover:bg-gray-100 transition"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="rounded-xl bg-[#7A008C] px-8 py-3 font-medium text-white hover:bg-purple-900 transition"
                >
                  Save Purchase Order
                </button>

              </div>

            </form>

          </div>

        </div>
      </div>
    </div>
  );
}