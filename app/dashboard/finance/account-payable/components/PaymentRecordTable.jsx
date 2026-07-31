"use client";

export default function PaymentRecordTable({
  payments = [],
}) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white">

      <table className="w-full text-sm">

        <thead className="bg-[#F9FAFB]">

          <tr>

            <th className="px-5 py-4 text-left">
              S.No
            </th>

            <th className="px-5 py-4 text-left">
              Payment Date
            </th>

            <th className="px-5 py-4 text-left">
              Amount
            </th>

            <th className="px-5 py-4 text-left">
              Payment Mode
            </th>

            <th className="px-5 py-4 text-left">
              Reference No
            </th>

            <th className="px-5 py-4 text-left">
              Remarks
            </th>

          </tr>

        </thead>

        <tbody>

          {payments.length > 0 ? (

            payments.map((payment, index) => (

              <tr
                key={payment.id}
                className="border-t hover:bg-gray-50"
              >

                <td className="px-5 py-4">
                  {index + 1}
                </td>

                <td className="px-5 py-4">
                  {new Date(
                    payment.date
                  ).toLocaleDateString("en-IN")}
                </td>

                <td className="px-5 py-4 font-medium">
                  ₹
                  {Number(
                    payment.amount
                  ).toLocaleString("en-IN")}
                </td>

                <td className="px-5 py-4">
                  {payment.mode}
                </td>

                <td className="px-5 py-4">
                  {payment.reference}
                </td>

                <td className="px-5 py-4">
                  {payment.remarks || "-"}
                </td>

              </tr>

            ))

          ) : (

            <tr>

              <td
                colSpan={6}
                className="text-center py-10 text-gray-500"
              >
                No Payment Records Found
              </td>

            </tr>

          )}

        </tbody>

      </table>

    </div>
  );
}