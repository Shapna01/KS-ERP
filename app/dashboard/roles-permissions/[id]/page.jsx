"use client";

import Sidebar from "../../users/components/Sidebar";
import Topbar from "../../users/components/Topbar";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function RoleOverviewPage() {
  const params = useParams();
  const roleId = params.id;

  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRole = async () => {
      try {
        const response = await fetch(`/api/roles/${roleId}`);

        if (!response.ok) {
          throw new Error("Failed to fetch role");
        }

        const data = await response.json();
        setRole(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    if (roleId) {
      fetchRole();
    }
  }, [roleId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }

  if (!role) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Role Not Found
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#F7F7FA]">
      <Sidebar />

      <div className="flex-1 flex flex-col ml-[74px]">
        <Topbar />

        <div className="pt-[72px] px-8 py-7 overflow-y-auto">
          <div className="flex">
            {/* LEFT SIDEBAR */}
            <div className="w-[250px] bg-white border rounded-l-2xl">
              <div className="p-5 border-b">
                <h2 className="font-semibold text-lg">
                  Roles
                </h2>
              </div>

              <div className="space-y-1 p-3">
                <button className="w-full text-left px-4 py-3 rounded-lg text-sm bg-[#F9F5FF] text-[#7A008C] font-medium">
                  {role.role_name}
                </button>
              </div>
            </div>

            {/* RIGHT CONTENT */}
            <div className="flex-1 bg-white border border-l-0 rounded-r-2xl p-8">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <h1 className="text-3xl font-semibold">
                      {role.role_name}
                    </h1>

                    <span
                      className={`text-xs px-3 py-1 rounded-full ${
                        role.status === "Enabled"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {role.status}
                    </span>
                  </div>

                  <p className="text-sm text-gray-500 max-w-4xl">
                    {role.description}
                  </p>
                </div>

                <button className="border border-[#7A008C] text-[#7A008C] px-5 h-11 rounded-lg text-sm font-medium">
                  Edit Role
                </button>
              </div>

              {/* MODULES */}
              <div className="mt-10">
                <h2 className="font-semibold mb-5">
                  Modules
                </h2>

                <div className="overflow-hidden rounded-xl border">
                  <table className="w-full text-sm">
                    <thead className="bg-[#FAFAFC]">
                      <tr>
                        {[
                          "Users",
                          "Roles",
                          "Projects",
                          "Procurement",
                          "Approvals",
                          "Timesheet",
                          "Reimbursement",
                          "Account payable",
                        ].map((item) => (
                          <th
                            key={item}
                            className="p-4 text-left"
                          >
                            {item}
                          </th>
                        ))}
                      </tr>
                    </thead>

                    <tbody>
                      <tr className="border-t">
                        {Array.from({ length: 8 }).map((_, i) => (
                          <td
                            key={i}
                            className="p-4"
                          >
                            <input
                              type="checkbox"
                              checked
                              readOnly
                            />
                          </td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* PERMISSIONS */}
              <div className="mt-10">
                <h2 className="font-semibold mb-5">
                  Permissions
                </h2>

                <div className="flex gap-3 mb-6 flex-wrap">
                  {[
                    "Users",
                    "Roles",
                    "Projects",
                    "Procurement",
                    "Workflows",
                    "Reimbursements",
                  ].map((tab, index) => (
                    <button
                      key={index}
                      className={`px-4 py-2 rounded-lg text-sm ${
                        tab === "Procurement"
                          ? "bg-[#F9F5FF] text-[#7A008C]"
                          : "bg-[#F8F8FC] text-gray-500"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                <div className="overflow-hidden rounded-xl border">
                  <table className="w-full text-sm">
                    <thead className="bg-[#FAFAFC]">
                      <tr>
                        <th className="p-4 text-left">
                          S.No
                        </th>

                        <th className="p-4 text-left">
                          Actions
                        </th>

                        <th className="p-4 text-left">
                          No Data
                        </th>

                        <th className="p-4 text-left">
                          My Data
                        </th>

                        <th className="p-4 text-left">
                          Reports Data
                        </th>

                        <th className="p-4 text-left">
                          All Data
                        </th>
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
                      ].map((action, index) => (
                        <tr
                          key={index}
                          className="border-t"
                        >
                          <td className="p-4">
                            {index + 1}
                          </td>

                          <td className="p-4">
                            {action}
                          </td>

                          <td className="p-4">
                            <input type="checkbox" />
                          </td>

                          <td className="p-4">
                            <input
                              type="checkbox"
                              checked
                              readOnly
                            />
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

              {/* USERS SECTION */}
              <div className="mt-10">
                <h2 className="font-semibold mb-5">
                  Users
                </h2>

                <div className="overflow-hidden rounded-xl border">
                  <table className="w-full text-sm">
                    <thead className="bg-[#FAFAFC]">
                      <tr>
                        <th className="p-4 text-left">
                          S.No
                        </th>

                        <th className="p-4 text-left">
                          Users
                        </th>

                        <th className="p-4 text-left">
                          Added On
                        </th>

                        <th className="p-4 text-left">
                          Added By
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      <tr className="border-t">
                        <td className="p-4">1</td>
                        <td className="p-4">
                          Sample User
                        </td>
                        <td className="p-4">
                          {new Date().toLocaleDateString()}
                        </td>
                        <td className="p-4">
                          Admin
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}