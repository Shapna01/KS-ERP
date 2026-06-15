"use client";

import Sidebar from "../../users/components/Sidebar";
import Topbar from "../../users/components/Topbar";
import { useRouter } from "next/navigation";
import { useState } from "react";
export default function CreateRolePage() {
  const [roleName, setRoleName] = useState("");
const [description, setDescription] = useState("");
const [status, setStatus] = useState("Enabled");
const router = useRouter();
const createRole = async () => {
  try {
    const response = await fetch("/api/roles/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        role_name: roleName,
        description,
        status,
      }),
    });

    if (response.ok) {
      router.push("/dashboard/roles-permissions");
    }
  } catch (error) {
    console.log(error);
  }
};
  return (

    <div className="flex min-h-screen bg-[#F7F7FA]">

      <Sidebar />

      <div className="flex-1 flex flex-col ml-[74px]">

        <Topbar />

        <div className="pt-[72px] px-8 py-7 overflow-y-auto text-black">

          <div className="mb-8">

            <h1 className="text-[30px] font-semibold text-[#111827]">
              Create New Role
            </h1>

            <p className="text-sm text-gray-500 mt-2">
              Add a new role to the system by entering role name,
              official, user identification details, assigning roles
              and reporting structure.
            </p>

          </div>

          <div className="bg-white rounded-2xl border border-[#ECECF2] p-8">

            <div className="space-y-6">

              <div>

                <label className="text-sm font-medium text-gray-700 block mb-2">
                  Role Name
                </label>

                <input
  type="text"
  value={roleName}
  onChange={(e) => setRoleName(e.target.value)}
  placeholder="CTO"
  className="w-full h-11 border border-[#E4E7EC] rounded-lg px-4"
/>

              </div>

              <div>

                <label className="text-sm font-medium text-gray-700 block mb-2">
                  Role Description
                </label>

                <textarea
  rows={4}
  value={description}
  onChange={(e) => setDescription(e.target.value)}
  className="w-full border border-[#E4E7EC] rounded-lg px-4 py-3"
/>

              </div>

              <div className="grid grid-cols-2 gap-6">

                <div>

                  <label className="text-sm font-medium text-gray-700 block mb-3">
                    Status
                  </label>

                  <div className="flex items-center gap-6">

                    <label className="flex items-center gap-2 text-sm">
                      <input
  type="radio"
  checked={status === "Enabled"}
  onChange={() => setStatus("Enabled")}
/>
                      Enable
                    </label>

                    <label className="flex items-center gap-2 text-sm">
                      <input
  type="radio"
  checked={status === "Disabled"}
  onChange={() => setStatus("Disabled")}
/>
                      Disable
                    </label>

                  </div>

                </div>

                <div>

                  <label className="text-sm font-medium text-gray-700 block mb-2">
                    Current Role Status
                  </label>

                  <div className="h-11 rounded-lg bg-[#F2F4F7] flex items-center px-4 text-sm font-medium text-[#344054]">
                    ENABLED
                  </div>

                </div>

              </div>

            </div>

            <div className="mt-10">

              <h2 className="text-lg font-semibold mb-2">
                Modules & Permissions
              </h2>

              <p className="text-sm text-gray-500 mb-5">
                Define what modules this role can access in the system.
              </p>

              <div className="overflow-hidden rounded-xl border border-[#ECECF2]">

                <table className="w-full text-sm">

                  <thead className="bg-[#FAFAFC]">

                    <tr className="text-left text-[#667085]">

                      <th className="p-4">Users</th>
                      <th className="p-4">Roles</th>
                      <th className="p-4">Projects</th>
                      <th className="p-4">Procurement</th>
                      <th className="p-4">Approvals</th>
                      <th className="p-4">Timesheet</th>
                      <th className="p-4">Reimbursement</th>
                      <th className="p-4">Account Payable</th>

                    </tr>

                  </thead>

                  <tbody>

                    <tr className="border-t">

                      <td className="p-4">
                        <input type="checkbox" />
                      </td>

                      <td className="p-4">
                        <input type="checkbox" />
                      </td>

                      <td className="p-4">
                        <input type="checkbox" />
                      </td>

                      <td className="p-4">
                        <input type="checkbox" />
                      </td>

                      <td className="p-4">
                        <input type="checkbox" />
                      </td>

                      <td className="p-4">
                        <input type="checkbox" />
                      </td>

                      <td className="p-4">
                        <input type="checkbox" />
                      </td>

                      <td className="p-4">
                        <input type="checkbox" />
                      </td>

                    </tr>

                  </tbody>

                </table>

              </div>

            </div>

            <div className="mt-10">

              <h2 className="text-lg font-semibold mb-2">
                Permissions
              </h2>

              <p className="text-sm text-gray-500 mb-5">
                Define what actions this role can perform.
              </p>

              <div className="overflow-x-auto rounded-xl border border-[#ECECF2]">

                <table className="w-full text-sm">

                  <thead className="bg-[#FAFAFC]">

                    <tr className="text-left text-[#667085]">

                      <th className="p-4">S.No</th>
                      <th className="p-4">Actions</th>
                      <th className="p-4">No Data</th>
                      <th className="p-4">My Data</th>
                      <th className="p-4">Reports Data</th>
                      <th className="p-4">All Data</th>

                    </tr>

                  </thead>

                  <tbody>

                    {[
                      "View Only",
                      "Create",
                      "Edit",
                      "Delete",
                      "Approve",
                      "Reject",
                    ].map((item, index) => (

                      <tr
                        key={index}
                        className="border-t"
                      >

                        <td className="p-4">
                          {index + 1}
                        </td>

                        <td className="p-4">
                          {item}
                        </td>

                        <td className="p-4">
                          <input type="checkbox" />
                        </td>

                        <td className="p-4">
                          <input type="checkbox" />
                        </td>

                        <td className="p-4">
                          <input type="checkbox" />
                        </td>

                        <td className="p-4">
                          <input type="checkbox" />
                        </td>

                      </tr>

                    ))}

                  </tbody>

                </table>

              </div>

            </div>

            <div className="mt-10 grid grid-cols-2 gap-6">

              <div>

                <h2 className="text-lg font-semibold mb-4">
                  Add Users
                </h2>

                <div className="border rounded-xl p-4 h-[300px] overflow-y-auto">

                  {[
                    "Design Department",
                    "Finance Department",
                    "HR Department",
                    "Software Department",
                  ].map((dept, index) => (

                    <div
                      key={index}
                      className="mb-4"
                    >

                      <h3 className="font-medium text-sm mb-2">
                        {dept}
                      </h3>

                      <div className="space-y-2 text-sm">

                        <label className="flex items-center gap-2">
                          <input type="checkbox" />
                          User {index + 1}
                        </label>

                        <label className="flex items-center gap-2">
                          <input type="checkbox" />
                          User {index + 2}
                        </label>

                      </div>

                    </div>

                  ))}

                </div>

              </div>

              <div>

                <h2 className="text-lg font-semibold mb-4">
                  Selected Users
                </h2>

                <div className="border rounded-xl p-4 h-[300px]">

                  <div className="flex items-center justify-between bg-[#F9FAFB] rounded-lg px-4 py-3 mb-3">

                    <div>

                      <p className="text-sm font-medium">
                        Rohan Kumar
                      </p>

                      <p className="text-xs text-gray-500">
                        CTO
                      </p>

                    </div>

                    <button className="text-red-500 text-sm">
                      Remove
                    </button>

                  </div>

                </div>

              </div>

            </div>

            <div className="flex justify-end gap-4 mt-10">

              <button className="h-11 px-6 border rounded-lg text-sm font-medium">
                Cancel
              </button>

              <button
  onClick={createRole}
  className="h-11 px-6 bg-[#7A008C] hover:bg-[#5f006d] text-white rounded-lg text-sm font-medium"
>
  Create Role
</button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}