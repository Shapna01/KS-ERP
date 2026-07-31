"use client";

import { useState } from "react";

export default function ExistingVendorTable({
  vendors,
  addedVendors,
  setAddedVendors,
  closeModal,
}) {
  const [selected, setSelected] = useState([]);

  const handleAdd = () => {
    const selectedVendorObjects =
      vendors.filter((v) =>
        selected.includes(v.id)
      );

    setAddedVendors((prev) => [
      ...prev,
      ...selectedVendorObjects.filter(
        (v) =>
          !prev.some(
            (a) => a.id === v.id
          )
      ),
    ]);

    closeModal();
  };

  return (
    <>
      <table className="w-full text-sm">
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>GST</th>
          </tr>
        </thead>

        <tbody>
          {vendors.map((vendor) => (
            <tr key={vendor.id}>
              <td>
                <input
                  type="checkbox"
                  checked={selected.includes(
                    vendor.id
                  )}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelected([
                        ...selected,
                        vendor.id,
                      ]);
                    } else {
                      setSelected(
                        selected.filter(
                          (id) =>
                            id !== vendor.id
                        )
                      );
                    }
                  }}
                />
              </td>

              <td>{vendor.vendorName}</td>
              <td>{vendor.contactNumber}</td>
              <td>{vendor.contactEmail}</td>
              <td>{vendor.gstNumber}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-end mt-6">
        <button
          onClick={handleAdd}
          className="
          bg-[#7A008C]
          text-white
          px-6 py-2
          rounded-lg
        "
        >
          Add Vendor
        </button>
      </div>
    </>
  );
}