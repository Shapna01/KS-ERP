"use client";

import { useEffect, useState } from "react";


import {
  Search,
  ChevronRight,
  Filter,
  ArrowUpDown,
  MoreHorizontal,
  ChevronLeft,
} from "lucide-react";

import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import Link from "next/link";
import UserSidebar from "./components/UserSidebar";
export default function UsersPage() {

  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(7);
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    workemail: "",
    password: "",
    designation: "",
    team: "",
    reporting_to: "",
    role: "",
    phone: "",
    joining_date: "",
  });


  useEffect(() => {

    const fetchEmployees = async () => {

      try {

        const response = await fetch("/api/employees");

        const data = await response.json();

if (Array.isArray(data)) {
  setUsers(data);
  setFilteredUsers(data);
} else {
  console.error("API Error:", data);
  setUsers([]);
  setFilteredUsers([]);
}

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);
      }
    };

    fetchEmployees();

  }, []);


  useEffect(() => {

    const filtered = Array.isArray(users)
  ? users.filter((user) => {
      const search = searchTerm.toLowerCase();

      return (
  user.name?.toLowerCase().includes(search) ||
  user.designation?.name?.toLowerCase().includes(search) ||
  user.team?.toLowerCase().includes(search) ||
  user.workemail?.toLowerCase().includes(search) ||
  user.role?.toLowerCase().includes(search) ||
  user.reporting_to?.toLowerCase().includes(search)
);
    })
  : [];

    setFilteredUsers(filtered);
    setCurrentPage(1);

  }, [searchTerm, users]);


  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  const handleSave = async () => {

    try {

      const response = await fetch(
        "/api/employees/add",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(formData),
        }
      );

      const newUser = await response.json();

      setUsers([...users, newUser]);

      setShowModal(false);

      setFormData({
        name: "",
        workemail: "",
        password: "",
        designation: "",
        team: "",
        reporting_to: "",
        role: "",
        phone: "",
        joining_date: "",
      });

    } catch (error) {

      console.log(error);
    }
  };
  const totalPages = Math.ceil(
  filteredUsers.length / itemsPerPage
);

const indexOfLastItem =
  currentPage * itemsPerPage;

const indexOfFirstItem =
  indexOfLastItem - itemsPerPage;

const currentUsers = Array.isArray(filteredUsers)
  ? filteredUsers.slice(indexOfFirstItem, indexOfLastItem)
  : [];

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

        <div className="flex-1 overflow-y-auto pt-[72px] h-screen">

          <div className="flex ml-[250px]">


            <UserSidebar />


            <div className="flex-1 px-8 py-7 text-black">


              <div className="flex items-center gap-2 text-sm mb-7">

                <span className="text-purple-600 font-medium">
                  Users
                </span>

                <ChevronRight
                  size={15} 
                  className="text-[#98A2B3]"
                />

                <span>
                  Employees List
                </span>

              </div>


              <div className="flex items-start justify-between mb-10">

                <div>

                  <h1 className="text-purple-800 text-[30px] font-semibold tracking-[-0.5px] text-[#18181B] mb-2">
                    Employee List
                  </h1>

                  <p className="text-gray-500 max-w-4xl leading-7">
                    An overview of all employees in the organization,
                    detailing their names, positions, and departments.
                  </p>

                </div>

                <div className="flex gap-3">

                  <button className="h-[42px] px-5 border border-purple-700 rounded-lg text-purple-700 text-sm font-medium">
                    Bulk Upload
                  </button>

                  <Link href="/dashboard/users/create/general">

                    <button className="h-[42px] px-5 bg-purple-700 rounded-lg text-white text-sm font-medium hover:bg-purple-800 transition">
                      + Add New
                    </button>

                  </Link> 

                </div>

              </div>

              <div className="flex items-center justify-between mb-5">

                <h2 className="text-[25px] font-semibold">
                  Employee Details ({filteredUsers.length})
                </h2>

                <div className="flex items-center gap-4">

                  <div className="relative">

                    <Search
                      size={20}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-[#98A2B3]"
                    />

                    <input
                      type="text"
                      placeholder="Search employee..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-[320px] h-[42px] rounded-lg border border-gray-200 bg-white pl-10 pr-4 text-sm outline-none focus:border-purple-500"
                    />

                  </div>

                  <Filter
                    size={18}
                    className="text-gray-500 cursor-pointer"
                  />

                  <ArrowUpDown
                    size={18}
                    className="text-gray-500 cursor-pointer"
                  />

                </div>

              </div>


              <div className="bg-white rounded-2xl border border-[#ECEEF2] overflow-hidden">


                <div className="grid grid-cols-[1.5fr_1.4fr_1.2fr_1fr_1.5fr_1.1fr_1fr_60px] px-6 py-4 bg-[#FCFCFD] border-b border-[#F1F1F4] text-[12px] font-medium text-[#6B7280] uppercase tracking-wide">

                  <div>Name</div>
                  <div>Designation & Team</div>
                  <div>Reporting Manager</div>
                  <div>Role</div>
                  <div>Work mail</div>
                  <div>Contact Number</div>
                  <div>Joining Date</div>
                  <div>Actions</div>

                </div>


                {loading ? (

                  <div className="p-10 text-center text-gray-500">
                    Loading employees...
                  </div>

                ) : filteredUsers.length === 0 ? (

                  <div className="p-10 text-center text-gray-500">
                    No employees found
                  </div>

                ) : (

                  currentUsers.map((user, index) => (

                    <div
                      key={index}
                      className="grid grid-cols-[1.5fr_1.4fr_1.2fr_1fr_1.5fr_1.1fr_1fr_60px] items-center px-6 py-5 border-b border-[#F1F1F4] text-[13px] text-[#4B5563] hover:bg-[#FCFCFD] transition"                    >

                      <div className="flex items-center gap-3">

                        <div className="w-11 h-11 rounded-full bg-[#E9D5FF] flex items-center justify-center text-[#7E22CE] font-semibold text-sm">
                          {user.name?.charAt(0)}
                        </div>

                        <div>

                          <p className="font-semibold text-[14px] text-[#1F2937]">
                            {user.name}
                          </p>

                          <p className="text-[12px] text-[#9CA3AF] mt-0.5">
                          {user.id}
                          </p>

                        </div>

                      </div>


                      <div>

                        <p className="font-medium text-[14px]">
                            {user.designation?.name || "-"}

                        </p>

                        <p className="text-sm text-[#98A2B3]">
                          {user.team || "-"}
                        </p>

                      </div>


                      <div className="text-[14px] text-[#667085]">
                        {user.reporting_to || "-"}
                      </div>

                      <div className="text-[14px] text-[#667085]">
                        {user.role || "-"}
                      </div>

                      <div className="text-[14px] text-[#667085] truncate">
                        {user.workemail || "-"}
                      </div>

                      <div className="text-[14px] text-[#667085]">
                        {user.phone || "-"}
                      </div>

                      <div className="text-[14px] text-[#667085]">
                        {user.joining_date || "-"}
                      </div>

                      <div>
                        <MoreHorizontal
                          className="text-purple-700 cursor-pointer"
                          size={18}
                        />
                      </div>

                    </div>
                  ))
                )}

              </div>

              <div className="flex items-center justify-between mt-6">
                <div className="flex items-center gap-3 text-sm text-gray-500">
                  <span>Showing:</span>
                  <select
                  value={itemsPerPage}
                  onChange={(e) => {
                    setItemsPerPage(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                  className="border rounded-lg px-3 py-2 bg-white"
                  >
                    <option value={5}>05</option>
                    <option value={7}>07</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    </select>
                    <span>
                      of {filteredUsers.length} item
                      </span>
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
                          onClick={() => setCurrentPage(page)}
                          className={`w-10 h-10 rounded-lg ${
                             currentPage === page
                               ? "bg-purple-700 text-white"
                               : "border bg-white"}`}
                          >
                            {page}
                          </button>
                          ))}

                          <button
                          onClick={nextPage}
                          disabled={currentPage === totalPages}
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