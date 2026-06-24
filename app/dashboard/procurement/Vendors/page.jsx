import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function VendorsPage() {
  const vendors = await prisma.vendor.findMany({
    orderBy: {
      vendorName: "asc",
    },
  });

  return (
    <div className="p-8 bg-[#F7F7FA] min-h-screen">

      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-semibold text-[#7A008C]">
            Vendors Master
          </h1>

          <p className="text-sm text-gray-500 mt-2">
            Manage all vendors and their details.
          </p>
        </div>

        <Link
          href="/dashboard/procurement/vendors/create"
          className="bg-[#7A008C] hover:bg-purple-500 text-white px-5 py-2 rounded-lg"
        >
          + Create New   
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 p-6">

        <div className="flex justify-between items-center mb-6">
          <h2 className="font-semibold text-lg">
            Vendor Details ({vendors.length})
          </h2>

          <input
            type="text"
            placeholder="Search"
            className="border border-gray-200 rounded-lg px-4 py-2 w-[250px] focus:outline-none"
          />
        </div>

        <table className="w-full text-gray-500">

          <thead className="bg-gray-50 text-gray-700">
            <tr>
              <th className="p-3 text-left">S.NO</th>
              <th className="p-3 text-left">Vendor Name</th>
              <th className="p-3 text-left">Address</th>
              <th className="p-3 text-left">Contact Mail</th>
              <th className="p-3 text-left">Contact No</th>
              <th className="p-3 text-left">GST Number</th>
              <th className="p-3 text-left">Account Details</th>
              <th className="p-3 text-left">Action</th>

            </tr>
          </thead>

          <tbody>
            {vendors.map((vendor, index) => (
              <tr
                key={vendor.id}
                className="border-b border-[#E5E7EB] text-sm hover:bg-[#FAFAFA]"
              >
                <td className="p-4">{index + 1}</td>

                <td className="p-4 font-medium">
                  {vendor.vendorName}
                </td>

                <td className="p-4">
                  {vendor.address}
                </td>

                <td className="p-4">
                  {vendor.primaryContactMail}
                </td>

                <td className="p-4">
                  {vendor.primaryContactNumber}
                </td>

                <td className="p-4">
                  {vendor.gstNumber}
                </td>

                <td className="p-4">
                  <div>{vendor.bankName}</div>
                  <div className="text-gray-500 text-xs">
                    {vendor.accountNumber}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>

        </table>

      </div>

    </div>
  );
}