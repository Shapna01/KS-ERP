"use client";

import { useState, useEffect } from "react";
import { Plus, Minus } from "lucide-react";

export default function ItemsTable() {
  const [items, setItems] = useState([
  {
    productId: "",
    itemName: "",
    itemCode: "",
    quantity: 1,
    estimatedRate: "",
    unit: "None",
    remarks: "",
  },
]);
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

  const addItem = () => {
    setItems([
      ...items,
      {
  productId: "",
  itemName: "",
  itemCode: "",
  quantity: 1,
  estimatedRate: "",
  unit: "None",
  remarks: "",
},
    ]);
  };

  const handleChange = (index, field, value) => {
    const updated = [...items];
    updated[index][field] = value;
    setItems(updated);
  };

  const increaseQty = (index) => {
    const updated = [...items];
    updated[index].quantity++;
    setItems(updated);
  };

  const decreaseQty = (index) => {
    const updated = [...items];
    if (updated[index].quantity > 1) {
      updated[index].quantity--;
      setItems(updated);
    }
  };

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-bold text-[#7A008C] tracking-tight">Add Items</h2>

      <p className="text-sm text-gray-500 mt-2 mb-6">
        Enter item or service details for the purchase request.
      </p>

      <div className="bg-white border border-gray-100 rounded-3xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600 text-xs uppercase">
            <tr>
             <th className="border-b border-gray-100 px-4 py-4 font-semibold text-center">S.NO</th>
             <th className="border-b border-gray-100 px-4 py-4 font-semibold text-center">Items</th>
             <th className="border-b border-gray-100 px-4 py-4 font-semibold text-center">Item Code</th>
              <th className="border-b border-gray-100 px-4 py-4 font-semibold text-center">Quantity</th>
             <th className="border-b border-gray-100 px-4 py-4 font-semibold text-center">Est. Rate(Rs)</th>
             <th className="border-b border-gray-100 px-4 py-4 font-semibold text-center">Units</th>
             <th className="border-b border-gray-100 px-4 py-4 font-semibold text-center">Remarks</th>
            </tr>
          </thead>

          <tbody>
            {items.map((item, index) => (
              <tr
  key={index}
  className={`transition hover:bg-[#faf5fc] ${
    index % 2 === 0 ? "bg-white" : "bg-gray-50/40"
  }`}
>
               <td className="border-b border-gray-100 p-3 text-center">
                  <input
  type="checkbox"
  className="w-4 h-4 accent-[#7A008C] cursor-pointer"
/>
                </td>

                <td className="border-b border-gray-100 p-3">
  <select
    value={item.productId}
    onChange={(e) => {
      if (e.target.value === "__add_new__") {
        window.location.href = "/dashboard/procurement/products/create";
        return;
      }

      const selected = products.find(
        (p) => p.id === Number(e.target.value)
      );

      if (!selected) return;

      const updated = [...items];

      updated[index].productId = selected.id;
updated[index].itemName = selected.productName;
updated[index].itemCode = selected.productCode;
updated[index].estimatedRate = selected.estimatedPrice;
updated[index].unit = "Nos";

      setItems(updated);
    }}
    className="w-full h-10 px-3 border border-gray-200 rounded-xl"
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

    <option value="__add_new__">
      + Add New Product
    </option>
  </select>
</td>

                <td className="border-b border-gray-100 p-3">
                  <input
  value={item.itemCode || ""}
  readOnly
  className="w-full h-10 px-3 border border-gray-200 rounded-xl bg-gray-50"
/>
                </td>

                <td className="border-b border-gray-100 p-3">

                  <div className="flex items-center justify-center gap-2">
                    <button
                      type="button"
                      onClick={() => decreaseQty(index)}
                      className="w-8 h-8 rounded-lg border border-gray-200 hover:bg-gray-100 transition flex items-center justify-center"
                    >
                      <Minus size={14} />
                    </button>

                    <div className="w-10 h-8 rounded-lg bg-gray-100 flex items-center justify-center font-medium">
                      {item.quantity}
                    </div>

                    <button
                      type="button"
                      onClick={() => increaseQty(index)}
                      className="w-8 h-8 rounded-lg bg-[#7A008C] text-white hover:bg-[#66006f] transition flex items-center justify-center"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </td>

                <td className="border p-2">
                  <input
  value={item.estimatedRate || ""}
  readOnly
  className="w-full h-10 px-3 border border-gray-200 rounded-xl bg-gray-50"
/>
                </td>

                <td className="border p-2">
                  <input
                  value={item.unit || "None"}
                  readOnly
                  className="w-full h-10 px-3 border border-gray-200 rounded-xl bg-gray-50"
                />
                </td>

                <td className="border p-2">
                  <input
                    value={item.remarks || ""}
                    onChange={(e) =>
                      handleChange(index, "remarks", e.target.value)
                    }
                    placeholder="Remarks"
                    className="w-full h-10 px-3 border border-gray-200 rounded-xl text-sm
focus:outline-none focus:ring-2 focus:ring-[#7A008C]/20 focus:border-[#7A008C]"
                  />
                </td>
              </tr>
            ))}

            <tr>
              <td className="border-b border-gray-100 p-3 text-center">
                <input
  type="checkbox"
  className="w-4 h-4 accent-[#7A008C] cursor-pointer"
/>
              </td>

              <td className="border-b border-gray-100 p-4">
              <button
  onClick={addItem}
  className="bg-[#7A008C] text-white px-7 py-3 rounded-2xl shadow-md hover:bg-[#66006f] hover:scale-[1.02] transition-all duration-200 font-medium"
>
  + Add Item
</button>
              </td>

              <td className="border-b border-gray-100"></td>
              <td className="border-b border-gray-100"></td>
              <td className="border-b border-gray-100"></td>
              <td className="border-b border-gray-100"></td>
              <td className="border-b border-gray-100"></td>
            </tr>
          </tbody>
        </table>

        <div className="flex justify-center py-6 bg-gray-50">
          <button
            onClick={addItem}
           className="bg-[#7A008C] text-white px-6 py-3 rounded-xl shadow-sm hover:bg-[#66006f] transition font-medium"
          >
            + Add New
          </button>
        </div>
      </div>
    </div>
  );
}