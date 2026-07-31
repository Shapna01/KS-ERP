"use client";

import StatusBadge from "./StatusBadge";

export default function InvoiceTable({
  invoices = [],
  onRegisterPayment,
}) {  return (
    <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white">

      <table className="w-full text-sm">

        <thead className="bg-[#F9FAFB]">

          <tr>

            <th className="px-5 py-4 text-left">S.No</th>

            <th className="px-5 py-4 text-left">
              Invoice Number
            </th>

            <th className="px-5 py-4 text-left">
              Type
            </th>

            <th className="px-5 py-4 text-left">
              Amount
            </th>

            <th className="px-5 py-4 text-left">
              3-Way Matching
            </th>

            <th className="px-5 py-4 text-left">
              Due Date
            </th>

            <th className="px-5 py-4 text-left">
              Due Status
            </th>

            <th className="px-5 py-4 text-left">
              To Be Paid
            </th>

            <th className="px-5 py-4 text-left">
              Payment Status
            </th>

            <th className="px-5 py-4 text-center">
              Actions
            </th>

          </tr>

        </thead>

        <tbody>

          {invoices.length > 0 ? (

            invoices.map((invoice, index) => (

              <tr
                key={invoice.id}
                className="border-t hover:bg-gray-50"
              >

                <td className="px-5 py-4">
                  {index + 1}
                </td>

                <td className="px-5 py-4 font-medium text-[#7A008C]">
                  {invoice.invoiceNumber}
                </td>

                <td className="px-5 py-4">
                  {invoice.type}
                </td>

                <td className="px-5 py-4">
                  ₹
                  {Number(invoice.amount).toLocaleString(
                    "en-IN"
                  )}
                </td>

                <td className="px-5 py-4">

                  <StatusBadge
                    status={invoice.matchingStatus}
                  />

                </td>

                <td className="px-5 py-4">

                  {invoice.dueDate
                    ? new Date(
                        invoice.dueDate
                      ).toLocaleDateString("en-IN")
                    : "-"}

                </td>

                <td className="px-5 py-4">

                  {invoice.dueStatus}

                </td>

                <td className="px-5 py-4">

                  {invoice.toBePaid
                    ? "Yes"
                    : "No"}

                </td>

                <td className="px-5 py-4">

                  <StatusBadge
                    status={invoice.paymentStatus}
                  />

                </td>

                <td className="px-5 py-4 text-center">

                {invoice.paymentStatus !== "Paid" ? (
    <button
        onClick={() => onRegisterPayment(invoice)}
        className="px-4 py-2 rounded-lg bg-[#7A008C] text-white"
    >
        Register Payment
    </button>
) : (
    <span className="text-gray-400">
        NA
    </span>
)}
  
                </td>

              </tr>

            ))

          ) : (

            <tr>

              <td
                colSpan={10}
                className="py-10 text-center text-gray-500"
              >

                No invoices available

              </td>

            </tr>

          )}

        </tbody>

      </table>

    </div>
  );
}