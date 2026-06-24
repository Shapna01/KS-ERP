"use client";

import { useEffect, useState } from "react";
import Sidebar from "../users/components/Sidebar";
import Topbar from "../users/components/Topbar";
import Link from "next/link";
import { Search } from "lucide-react";

export default function VendorsPage() {
  const [vendors, setVendors] = useState([]);

  useEffect(() => {
    fetchVendors();
  }, []);

  const fetchVendors = async () => {
    try {
      const res = await fetch("/api/vendors");
      const data = await res.json();
      setVendors(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#F7F7FA]">
      <Sidebar />

      <div className="flex-1 flex flex-col ml-[74px]">
        <Topbar />

        <div className="flex-1 overflow-y-auto pt-[72px] px-8 py-7">

          <div className="text-sm mb-6 text-gray-500">
            <span className="text-[#7A008C] font-medium">
              Procurement
            </span>
            <span className="mx-2">{">"}</span>
            <span>Vendors Master</span>
          </div>

          <div className="flex justify-between items-center mb-8">

            <div>
              <h1 className="text-3xl font-bold text-[#7A008C]">
                Vendors Master
              </h1>

              <p className="text-sm text-gray-500 mt-2">
                Centralized list of vendors and their details.
              </p>
            </div>

            <Link
              href="/dashboard/vendors/create"
              className="bg-[#7A008C] hover:bg-purple-900 text-white px-5 py-3 rounded-xl shadow-md transition"
            >
              + Create New
            </Link>

          </div>

          <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-6">

            <div className="flex justify-between items-center mb-6">

              <div>
                <h2 className="text-xl font-semibold text-gray-800">
                  Vendor Details
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  Total Vendors : {vendors.length}
                </p>
              </div>

              <div className="relative">

                <Search
                  size={18}
                  className="absolute left-3 top-3 text-gray-400"
                />

                <input
                  type="text"
                  placeholder="Search vendor..."
                  className="w-[280px] h-11 pl-10 pr-4 border border-gray-300 rounded-xl outline-none focus:border-[#7A008C]"
                />

              </div>

            </div>

            <div className="overflow-x-auto border border-gray-200 rounded-2xl">

              <table className="w-full text-sm">

                <thead className="bg-gray-100 text-gray-700">
                  <tr>
                    <th className="p-4 text-left">S.NO</th>
                    <th className="p-4 text-left">Vendor Name</th>
                    <th className="p-4 text-left">Address</th>
                    <th className="p-4 text-left">Contact Mail</th>
                    <th className="p-4 text-left">Contact No</th>
                    <th className="p-4 text-left">GST Number</th>
                    <th className="p-4 text-left">Account Details</th>
                  </tr>
                </thead>

                <tbody>

                  {vendors.map((vendor, index) => (
                    <tr
                      key={vendor.id}
                      className="border-b border-gray-200 hover:bg-purple-50 transition"
                    >
                      <td className="p-4 text-gray-600">
                        {index + 1}
                      </td>

                      <td className="p-4 font-medium text-gray-800">
                        {vendor.vendorName}
                      </td>

                      <td className="p-4 text-gray-600">
                        {vendor.address || "-"}
                      </td>

                      <td className="p-4 text-gray-600">
                        {vendor.contactEmail || "-"}
                      </td>

                      <td className="p-4 text-gray-600">
                        {vendor.contactNo || "-"}
                      </td>

                      <td className="p-4 text-gray-600">
                        {vendor.gstNumber || "-"}
                      </td>

                      <td className="p-4">
                        <div className="bg-purple-50 text-[#7A008C] px-3 py-2 rounded-lg inline-block font-medium">
                          {vendor.accountDetail || "-"}
                        </div>
                      </td>
                    </tr>
                  ))}

                  {vendors.length === 0 && (
                    <tr>
                      <td
                        colSpan="7"
                        className="text-center p-8 text-gray-400"
                      >
                        No vendors found
                      </td>
                    </tr>
                  )}

                </tbody>

              </table>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
}