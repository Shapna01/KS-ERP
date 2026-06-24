"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateProductForm({
  vendors,
}) {
  const router = useRouter();

  const [productName, setProductName] =
    useState("");

  const [productCode, setProductCode] =
    useState("");

  const [price, setPrice] =
    useState("");

  const [selectedVendors, setSelectedVendors] =
    useState([]);

  const saveProduct = async () => {
    await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productName,
        productCode,
        price,
        vendors: selectedVendors,
      }),
    });

    router.push(
      "/dashboard/procurement/products"
    );
  };

  return (
    <div className="p-8 space-y-4">

      <h1 className="text-2xl font-semibold">
        Create Product
      </h1>

      <input
        placeholder="Product Name"
        className="border p-3 w-full"
        onChange={(e) =>
          setProductName(e.target.value)
        }
      />

      <input
        placeholder="Product Code"
        className="border p-3 w-full"
        onChange={(e) =>
          setProductCode(e.target.value)
        }
      />

      <input
        placeholder="Price"
        className="border p-3 w-full"
        onChange={(e) =>
          setPrice(e.target.value)
        }
      />

      <select
        multiple
        className="border p-3 w-full h-48"
        onChange={(e) =>
          setSelectedVendors(
            [...e.target.selectedOptions].map(
              (option) =>
                Number(option.value)
            )
          )
        }
      >
        {vendors.map((vendor) => (
          <option
            key={vendor.id}
            value={vendor.id}
          >
            {vendor.vendorName}
          </option>
        ))}
      </select>

      <button
        onClick={saveProduct}
        className="bg-[#7A008C] text-white px-6 py-2 rounded"
      >
        Save Product
      </button>

    </div>
  );
}