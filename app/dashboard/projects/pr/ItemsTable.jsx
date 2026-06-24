"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

export default function ItemsTable() {
  const [items, setItems] = useState([
    {
      itemName: "",
      itemCode: "",
      quantity: 1,
      estimatedRate: "",
      unit: "None",
      remarks: "",
    },
  ]);

  const addItem = () => {
    setItems([
      ...items,
      {
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
                  <input
                    value={item.itemName}
                    onChange={(e) =>
                      handleChange(index, "itemName", e.target.value)
                    }
                    placeholder="Item Name"
                    className="w-full h-10 px-3 border border-gray-200 rounded-xl text-sm
focus:outline-none focus:ring-2 focus:ring-[#7A008C]/20 focus:border-[#7A008C]"
                  />
                </td>

                <td className="border-b border-gray-100 p-3">
                  <input
                    value={item.itemCode}
                    onChange={(e) =>
                      handleChange(index, "itemCode", e.target.value)
                    }
                    placeholder="BA-ACT 250"
                    className="w-full h-10 px-3 border border-gray-200 rounded-xl text-sm
focus:outline-none focus:ring-2 focus:ring-[#7A008C]/20 focus:border-[#7A008C]"
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
                    value={item.estimatedRate}
                    onChange={(e) =>
                      handleChange(index, "estimatedRate", e.target.value)
                    }
                    placeholder="2700"
                    className="w-full h-10 px-3 border border-gray-200 rounded-xl text-sm
focus:outline-none focus:ring-2 focus:ring-[#7A008C]/20 focus:border-[#7A008C]"
                  />
                </td>

                <td className="border p-2">
                  <select
                    value={item.unit}
                    onChange={(e) =>
                      handleChange(index, "unit", e.target.value)
                    }
                    className="w-full h-10 px-3 border border-gray-200 rounded-xl text-sm
focus:outline-none focus:ring-2 focus:ring-[#7A008C]/20 focus:border-[#7A008C]"
                  >
                    <option>None</option>
                    <option>Nos</option>
                    <option>Kg</option>
                    <option>Box</option>
                  </select>
                </td>

                <td className="border p-2">
                  <input
                    value={item.remarks}
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