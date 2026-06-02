"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

import {
  Search,
  ChevronRight,
  ChevronLeft,
  Filter,
  ArrowUpDown,
  MoreHorizontal,
} from "lucide-react";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import UserSidebar from "../components/UserSidebar";
export default function DesignationsPage() {
  const [designations, setDesignations] = useState([]);
  const [filteredDesignations, setFilteredDesignations] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
const [itemsPerPage, setItemsPerPage] = useState(7);
  useEffect(() => {
    const fetchDesignations = async () => {
      try {
        const response = await fetch("/api/designations");

        const data = await response.json();

        setDesignations(data);
        setFilteredDesignations(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDesignations();
  }, []);

  useEffect(() => {
    const filtered = designations.filter((item) => {
      const search = searchTerm.toLowerCase();

      return (
        item.name?.toLowerCase().includes(search) ||
        item.description?.toLowerCase().includes(search) ||
        item.team_associated?.toLowerCase().includes(search) ||
        item.department?.toLowerCase().includes(search)
      );
    });

    setFilteredDesignations(filtered);
setCurrentPage(1);
  }, [searchTerm, designations]);
  const totalPages = Math.ceil(
  filteredDesignations.length / itemsPerPage
);

const indexOfLastItem = currentPage * itemsPerPage;
const indexOfFirstItem = indexOfLastItem - itemsPerPage;

const currentDesignations =
  filteredDesignations.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

const paginate = (pageNumber) => {
  setCurrentPage(pageNumber);
};

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
    <div className="flex h-screen overflow-hidden bg-[#F8F8FA]">
      <Sidebar />

      <div className="flex flex-1 flex-col overflow-hidden">
        <Topbar />

        <div className="flex flex-1 overflow-hidden">

<UserSidebar />

          <div className="flex-1 overflow-auto bg-white px-8 py-7">
            <div className="flex items-center gap-2 mb-7 text-[13px]">
              <span className="text-[#C11574] font-medium">Users</span>

              <ChevronRight size={14} className="text-[#98A2B3]" />

              <span className="text-[#667085]">Designations</span>
            </div>

            <div className="flex items-start justify-between mb-8">
              <div>
                <h1 className="text-[30px] font-semibold text-[#101828] mb-3">
                  Designations
                </h1>

                <p className="max-w-[820px] text-[14px] leading-6 text-[#667085]">
                  Define and manage job titles to structure roles,
                  responsibilities, and approval authority.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button className="h-[40px] px-5 rounded-[8px] border border-[#7F56D9] text-[#7F56D9] text-[13px] font-medium">
                  Bulk Upload
                </button>

                <Link href="/dashboard/users/designations/create">
                  <button className="h-[40px] px-5 rounded-[8px] bg-[#7F1DFF] text-white text-[13px] font-medium">
                    + Add New
                  </button>
                </Link>
              </div>
            </div>

            <div className="flex items-center justify-between mb-5">
              <h2 className="text-[18px] font-semibold text-[#101828]">
                Designation Details ({filteredDesignations.length})
              </h2>

              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#98A2B3]"
                  />

                  <input
                    type="text"
                    placeholder="Search departments..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-[250px] h-[38px] rounded-[8px] border border-[#EAECF0] bg-white pl-10 pr-4 text-[13px] outline-none"
                  />
                </div>

                <Filter
                  size={16}
                  className="text-[#667085] cursor-pointer"
                />

                <ArrowUpDown
                  size={16}
                  className="text-[#667085] cursor-pointer"
                />
              </div>
            </div>

            <div className="border border-[#EAECF0] rounded-[12px] overflow-hidden bg-white">
              <div className="grid grid-cols-[40px_1.2fr_2.2fr_1fr_1.3fr_50px] items-center px-5 py-4 bg-[#F9FAFB] border-b border-[#EAECF0] text-[12px] font-semibold text-[#667085]">
                <div>
                  <input type="checkbox" />
                </div>

                <div>Designation Name</div>

                <div>Designation Description</div>

                <div>Team Associated</div>

                <div>Department</div>

                <div>Actions</div>
              </div>
              {loading ? (
                <div className="p-10 text-center text-[#667085]">
                  Loading designations...
                </div>
              ) : filteredDesignations.length === 0 ? (
                <div className="p-10 text-center text-[#667085]">
                  No designations found
                </div>
              ) : (
                currentDesignations.map((item, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-[40px_1.2fr_2.2fr_1fr_1.3fr_50px] items-center px-5 py-4 border-b border-[#F2F4F7] hover:bg-[#FCFCFD]"
                  >
                    <div>
                      <input type="checkbox" />
                    </div>

                    <div className="text-[13px] text-[#344054]">
                      {item.name}
                    </div>

                    <div className="text-[13px] leading-5 text-[#667085] pr-4">
                      {item.description}
                    </div>

                    <div className="text-[13px] text-[#667085]">
                      {item.team_associated}
                    </div>

                    <div className="text-[13px] text-[#667085]">
                      {item.department}
                    </div>

                    <div className="flex justify-center">
                      <MoreHorizontal
                        size={18}
                        className="text-[#C11574] cursor-pointer"
                      />
                    </div>
                  </div>
                ))
              )}
            <div className="flex items-center justify-between px-5 py-4 bg-white border-t border-[#EAECF0]">
  <div className="flex items-center gap-3 text-[13px] text-[#667085]">
    <span>Showing:</span>

    <select
      value={itemsPerPage}
      onChange={(e) => {
        setItemsPerPage(Number(e.target.value));
        setCurrentPage(1);
      }}
      className="h-[32px] px-3 border border-[#EAECF0] rounded-md outline-none"
    >
      <option value={5}>05</option>
      <option value={7}>07</option>
      <option value={10}>10</option>
      <option value={20}>20</option>
    </select>

    <span>of {filteredDesignations.length} item</span>
  </div>

  {totalPages > 1 && (
    <div className="flex items-center text-[13px]">

      <button
        onClick={prevPage}
        disabled={currentPage === 1}
        className="h-[32px] px-4 border border-[#EAECF0] bg-[#F9FAFB] text-[#667085]"
      >
        Prev
      </button>

      <button
        onClick={() => paginate(1)}
        className={`h-[32px] w-[40px] border-t border-b border-r ${
          currentPage === 1
            ? "bg-[#F9FAFB] text-[#344054] font-medium"
            : "bg-white text-[#667085]"
        }`}
      >
        1
      </button>

      {totalPages >= 2 && (
        <button
          onClick={() => paginate(2)}
          className={`h-[32px] w-[40px] border-t border-b border-r ${
            currentPage === 2
              ? "bg-[#F9FAFB] text-[#344054] font-medium"
              : "bg-white text-[#667085]"
          }`}
        >
          2
        </button>
      )}

      {totalPages > 4 && (
        <div className="h-[32px] w-[40px] flex items-center justify-center border-t border-b border-r text-[#667085]">
          ...
        </div>
      )}

      {totalPages > 2 && (
        <button
          onClick={() => paginate(totalPages)}
          className={`h-[32px] w-[40px] border-t border-b border-r ${
            currentPage === totalPages
              ? "bg-[#F9FAFB] text-[#344054] font-medium"
              : "bg-white text-[#667085]"
          }`}
        >
          {totalPages}
        </button>
      )}

      <button
        onClick={nextPage}
        disabled={currentPage === totalPages}
        className="h-[32px] px-4 border border-[#EAECF0] bg-[#F9FAFB] text-[#667085]"
      >
        Next
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