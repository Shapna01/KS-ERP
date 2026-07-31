"use client";

import Link from "next/link";

export default function ReimbursementTable({ reimbursements }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-gray-500">
        <thead className="bg-[#F9FAFB] border-y">
          <tr className="text-left text-sm text-gray-600">
            <th className="px-6 py-4">Claim ID</th>
            <th className="px-6 py-4">Type</th>
            <th className="px-6 py-4">Project Name</th>
            <th className="px-6 py-4">Submission Status</th>
            <th className="px-6 py-4">Date</th>
            <th className="px-6 py-4">Approval Status</th>
            <th className="px-6 py-4">Reason for reimbursement</th>
            <th className="px-6 py-4 text-center">Actions</th>
          </tr>
        </thead>

        <tbody className="text-gray-700">
          {reimbursements.length === 0 ? (
            <tr>
              <td
                colSpan={8}
                className="py-12 text-center text-gray-500"
              >
                No reimbursement claims found.
              </td>
            </tr>
          ) : (
            reimbursements.map((item) => (
              <tr
                key={item.id}
                  className="border-b border-gray-200 hover:bg-gray-50"
              >
                <td className="px-6 py-4 font-medium text-gray-500">
                  {item.claimId}
                </td>

                <td className="px-6 py-4">
                  {item.claimCategory}
                </td>

                <td className="px-6 py-4">
                  {item.project?.projectName || "-"}
                </td>

                <td className="px-6 py-4">
                  {item.status}
                </td>

                <td className="px-6 py-4">
                  {new Date(item.submissionDate).toLocaleDateString("en-GB")}
                </td>

                <td className="px-6 py-4">
                  {item.status}
                </td>

                <td className="px-6 py-4 max-w-xs truncate">
                  {item.reason || "-"}
                </td>

                <td className="px-6 py-4">
                  {(item.status === "Submitted" ||
                    item.status === "Pending") ? (
                    <div className="flex justify-center gap-2">
                      <Link
                        href={`/dashboard/finance/reimbursements/${item.id}/approval`}
                        className="rounded-md bg-green-600 px-3 py-1 text-xs font-medium text-white hover:bg-green-700"
                      >
                        Approve
                      </Link>

                      <Link
                        href={`/dashboard/finance/reimbursements/${item.id}/approval`}
                        className="rounded-md bg-red-600 px-3 py-1 text-xs font-medium text-white hover:bg-red-700"
                      >
                        Reject
                      </Link>
                    </div>
                  ) : (
                    <div className="text-center text-gray-400">
                      —
                    </div>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}