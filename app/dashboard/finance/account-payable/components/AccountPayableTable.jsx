"use client";

import StatusBadge from "./StatusBadge";
import { useRouter } from "next/navigation";
export default function AccountPayableTable({
  purchaseOrders,
}) {
    const router = useRouter();
    return (
    <div className="overflow-x-auto">

      <table className="w-full">

        <thead>

          <tr className="bg-[#F9FAFB] border-y border-gray-200 text-sm text-gray-600">

            <th className="px-6 py-4 text-left w-12">
              <input
  type="checkbox"
  onClick={(e) => e.stopPropagation()}
  className="w-4 h-4 accent-[#7A008C]"
/>
            </th>

            <th className="px-6 py-4 text-left font-medium">
              Purchase Order Number
            </th>

            <th className="px-6 py-4 text-left font-medium">
              Vendor Name
            </th>

            <th className="px-6 py-4 text-left font-medium">
              Project Name
            </th>

            <th className="px-6 py-4 text-left font-medium">
              Total Amount
            </th>

            <th className="px-6 py-4 text-left font-medium">
              Invoiced Amount
            </th>

            <th className="px-6 py-4 text-left font-medium">
              Due Date
            </th>

            <th className="px-6 py-4 text-left font-medium">
              Payment Status
            </th>
            <th className="px-5 py-4 text-center">
              Action
            </th>

          </tr>

        </thead>


        <tbody>

          {purchaseOrders.length > 0 ? (

            purchaseOrders.map((po) => (

              <tr
                key={po.id}
                className="border-b border-gray-100 hover:bg-[#FAFAFC] transition"
              >

                <td className="px-6 py-5">

                  <input
                    type="checkbox"
                    className="w-4 h-4 accent-[#7A008C]"
                  />

                </td>

               <td className="px-5 py-4">
               <button
  onClick={(e) => {
    e.stopPropagation();
    router.push(`/dashboard/finance/account-payable/${po.id}`);
  }}
  className="text-[#7A008C] font-semibold hover:underline"
>
                    {po.poNumber}
                </button>
                </td>

                <td className="px-6 py-5">

                  <div className="text-gray-700">
                    {po.vendor}
                  </div>

                </td>

                <td className="px-6 py-5">

                  <div className="text-gray-700">
                    {po.project}
                  </div>

                </td>

                <td className="px-6 py-5 text-black">

                  ₹
                  {Number(po.totalAmount).toLocaleString(
                    "en-IN"
                  )}

                </td>

                <td className="px-6 py-5 text-black">

                  ₹
                  {Number(
                    po.invoicedAmount
                  ).toLocaleString("en-IN")}

                </td>

                <td className="px-6 py-5 text-black">

                  {po.dueDate
                    ? new Date(
                        po.dueDate
                      ).toLocaleDateString("en-IN")
                    : "-"}

                </td>

                <td className="px-6 py-5">

                  <StatusBadge
                    status={po.paymentStatus}
                  />

                </td>
                <td className="px-5 py-4 text-center">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    router.push(`/dashboard/finance/account-payable/${po.id}`);
                  }}
                  className="bg-[#7A008C] text-white px-4 py-2 rounded-lg hover:bg-[#650074]"
                >
                    View
                </button>
                </td>
                
              </tr>

            ))

          ) : (

            <tr>

              <td
                colSpan={8}
                className="text-center py-20 text-gray-500"
              >

                No Purchase Orders Found

              </td>

            </tr>

          )}

        </tbody>

      </table>

    </div>
  );
}