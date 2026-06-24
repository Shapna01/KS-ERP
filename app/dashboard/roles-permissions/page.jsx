"use client";

import { useEffect, useState } from "react";

import {
  Search,
  MoreHorizontal,
  Filter,
  Upload,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import Sidebar from "../users/components/Sidebar";
import Topbar from "../users/components/Topbar";
import { useRouter } from "next/navigation";
export default function RolesPermissionsPage() {

  const [roles, setRoles] = useState([]);
  const [filteredRoles, setFilteredRoles] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const [itemsPerPage, setItemsPerPage] = useState(7);
  const router = useRouter();
  

  useEffect(() => {

    const fetchRoles = async () => {

      try {

        const response = await fetch("/api/roles");

        const data = await response.json();

        if (Array.isArray(data)) {

  setRoles(data);
  setFilteredRoles(data);

} else {

  setRoles([]);
  setFilteredRoles([]);

  console.log(data);
}

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);
      }
    };

    fetchRoles();

  }, []);

  useEffect(() => {

    const filtered = roles.filter((role) => {

      const search = searchTerm.toLowerCase();

      return (
        role.role_name?.toLowerCase().includes(search) ||
        role.description?.toLowerCase().includes(search) ||
        role.status?.toLowerCase().includes(search)
      );
    });

    setFilteredRoles(filtered);

    setCurrentPage(1);

  }, [searchTerm, roles]);

  const totalPages = Math.ceil(
    filteredRoles.length / itemsPerPage
  );

  const indexOfLastItem =
    currentPage * itemsPerPage;

  const indexOfFirstItem =
    indexOfLastItem - itemsPerPage;

  const currentRoles =
    filteredRoles.slice(
      indexOfFirstItem,
      indexOfLastItem
    );

  const nextPage = () => {

    if (currentPage < totalPages) {

      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {

    if (currentPage > 1) {

      setCurrentPage(currentPage - 1);
    }
  };

  return (

    <div className="flex min-h-screen bg-[#F7F7FA]">

      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden ml-[74px]">

        <Topbar />

        <div className="flex-1 overflow-y-auto pt-[72px]">

          <div className="px-8 py-7">

            <div className="flex items-start justify-between mb-8">

              <div>

                <h1 className="text-[30px] font-semibold text-[#7A008C]">
                  Roles & Permissions
                </h1>

                <p className="text-sm text-gray-500 mt-2 max-w-4xl leading-7">
                  Define the reporting structure and relationships between roles,
                  teams, and departments to ensure accountability and approval flows.
                </p>

              </div>

              <button
  onClick={() =>
    router.push("/dashboard/roles-permissions/create")
  }
  className="bg-[#7A008C] hover:bg-[#5f006d] text-white px-5 h-11 rounded-lg text-sm font-medium"
>
  + Add New
</button>

            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">

              <div className="flex items-center justify-between mb-6">

                <div>

                  <h2 className="font-semibold text-[24px] mb-4">
                    Roles Details ({filteredRoles.length})
                  </h2>

                  <div className="flex gap-6 text-sm">

                    <button className="text-[#7A008C] border-b-2 border-[#7A008C] pb-2 font-medium">
                      All ({filteredRoles.length})
                    </button>

                    <button className="text-gray-500">
                      Enabled
                    </button>

                    <button className="text-gray-500">
                      Disabled
                    </button>

                  </div>

                </div>

                <div className="flex items-center gap-3">

                  <div className="relative">

                    <Search
                      size={16}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                      type="text"
                      placeholder="Search roles..."
                      value={searchTerm}
                      onChange={(e) =>
                        setSearchTerm(e.target.value)
                      }
                      className="h-10 border rounded-lg pl-10 pr-4 text-sm outline-none w-[260px]"
                    />

                  </div>

                  <button className="w-10 h-10 border rounded-lg flex items-center justify-center bg-white">
                    <Filter size={16} />
                  </button>

                  <button className="w-10 h-10 border rounded-lg flex items-center justify-center bg-white">
                    <Upload size={16} />
                  </button>

                </div>

              </div>

              <div className="overflow-hidden rounded-xl border">

                <table className="w-full text-sm">

                  <thead className="bg-[#F8F8FC]">

                    <tr className="text-left text-gray-500">

                      <th className="p-4">
                        <input type="checkbox" />
                      </th>

                      <th className="p-4">Role Name</th>
                      <th className="p-4">Role Description</th>
                      <th className="p-4">Date</th>
                      <th className="p-4">Status</th>
                      <th className="p-4">Total Users</th>
                      <th className="p-4">Actions</th>

                    </tr>

                  </thead>

                  <tbody>

                    {loading ? (

                      <tr>

                        <td
                          colSpan={7}
                          className="text-center p-10 text-gray-500"
                        >
                          Loading roles...
                        </td>

                      </tr>

                    ) : currentRoles.length === 0 ? (

                      <tr>

                        <td
                          colSpan={7}
                          className="text-center p-10 text-gray-500"
                        >
                          No roles found
                        </td>

                      </tr>

                    ) : (

                      currentRoles.map((role) => (

                        <tr
  key={role.id} 
  onClick={() =>
    router.push(
      `/dashboard/roles-permissions/${role.id}`
    )
  }
  className="border-t hover:bg-gray-50 cursor-pointer"
>

                          <td className="p-4">
                            <input type="checkbox" />
                          </td>

                          <td className="p-4 text-gray-700 font-medium">
                            {role.role_name}
                          </td>

                          <td className="p-4 text-gray-500">
                            {role.description}
                          </td>

                          <td className="p-4 text-gray-500">
                            {new Date(
                              role.created_at
                            ).toLocaleDateString()}
                          </td>

                          <td className="p-4">

                            <span
                              className={`text-xs px-3 py-1 rounded-full ${
                                role.status === "Enabled"
                                  ? "bg-green-100 text-green-700"
                                  : "bg-red-100 text-red-700"
                              }`}
                            >
                              {role.status}
                            </span>

                          </td>

                          <td className="p-4 text-gray-500">
                            {role.total_users}
                          </td>

                          <td className="p-4">

                            <MoreHorizontal
                              size={18}
                              className="text-fuchsia-700 cursor-pointer"
                            />

                          </td>

                        </tr>

                      ))
                    )}

                  </tbody>

                </table>

              </div>

              <div className="flex items-center justify-between mt-6 text-sm text-gray-500">

                <div className="flex items-center gap-2">

                  Showing

                  <select
                    value={itemsPerPage}
                    onChange={(e) => {
                      setItemsPerPage(
                        Number(e.target.value)
                      );

                      setCurrentPage(1);
                    }}
                    className="border rounded-lg px-2 py-1 bg-white"
                  >
                    <option value={5}>05</option>
                    <option value={7}>07</option>
                    <option value={10}>10</option>
                  </select>

                  of {filteredRoles.length} item

                </div>

                {totalPages > 1 && (

                  <div className="flex items-center gap-2">

                    <button
                      onClick={prevPage}
                      disabled={currentPage === 1}
                      className="w-10 h-10 rounded-lg border bg-white flex items-center justify-center"
                    >
                      <ChevronLeft size={16} />
                    </button>

                    {Array.from(
                      { length: totalPages },
                      (_, i) => i + 1
                    ).map((page) => (

                      <button
                        key={page}
                        onClick={() =>
                          setCurrentPage(page)
                        }
                        className={`w-10 h-10 rounded-lg ${
                          currentPage === page
                            ? "bg-[#7A008C] text-white"
                            : "border bg-white"
                        }`}
                      >
                        {page}
                      </button>

                    ))}

                    <button
                      onClick={nextPage}
                      disabled={
                        currentPage === totalPages
                      }
                      className="w-10 h-10 rounded-lg border bg-white flex items-center justify-center"
                    >
                      <ChevronRight size={16} />
                    </button>

                  </div>

                )}

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}