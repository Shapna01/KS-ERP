"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Search, Filter, Download, Plus } from "lucide-react";
import FinanceSidebar from "../components/FinanceSidebar";
import Sidebar from "../../users/components/Sidebar";
import Topbar from "../../users/components/Topbar";

import ReimbursementTable from "./components/ReimbursementTable";
import Pagination from "./components/Pagination";
import ApprovalStepper from "./components/ApprovalStepper";
import ClaimHeader from "./components/ClaimHeader";
import Breadcrumb from "./components/Breadcrumb";
import ClaimForm from "./components/ClaimForm";
import ReceiptUpload from "./components/ReceiptUpload";
import ActionButtons from "./components/ActionButtons";

export default function ReimbursementsPage() {
  const [reimbursements, setReimbursements] = useState([]);
  const [loading, setLoading] = useState(true);

  const [activeTab, setActiveTab] = useState("All");
  const [search, setSearch] = useState("");

  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  useEffect(() => {
    fetchReimbursements();
  }, []);

  const fetchReimbursements = async () => {
    try {
      const res = await fetch("/api/reimbursements");
      const data = await res.json();

      setReimbursements(Array.isArray(data) ? data : []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const filteredData = useMemo(() => {
    return reimbursements.filter((item) => {
      const status = item.status || "";

      const matchesTab =
        activeTab === "All"
          ? true
          : status === activeTab;

      const keyword = search.toLowerCase();

      const matchesSearch =
        (item.claimId || "")
          .toLowerCase()
          .includes(keyword) ||
        (item.claimCategory || "")
          .toLowerCase()
          .includes(keyword) ||
        (item.project?.projectName || "")
          .toLowerCase()
          .includes(keyword) ||
        (item.reason || "")
          .toLowerCase()
          .includes(keyword) ||
        (item.userName || "")
          .toLowerCase()
          .includes(keyword);

      return matchesTab && matchesSearch;
    });
  }, [reimbursements, activeTab, search]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredData.length / perPage)
  );

  const paginatedData = filteredData.slice(
    (page - 1) * perPage,
    page * perPage
  );

  const tabs = [
    "All",
    "Approved",
    "Rejected",
    "Pending",
    "Draft",
  ];

  if (loading) {
    return (
      <div className="flex min-h-screen bg-[#F7F7FA]">
        <Sidebar />

        <div className="flex-1 ml-[74px]">
          <Topbar />

          <div className="pt-[120px] px-8">
            Loading...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#F7F7FA]">

      <Sidebar />
      <FinanceSidebar />

      <div className="flex-1 flex flex-col ml-[74px]">

        <Topbar />

        <div className="flex-1 overflow-y-auto pt-[95px] px-8 pb-8">
    
          <div className="text-sm text-gray-500 mb-8">
            <span className="text-[#7A008C]">
              Finance
            </span>

            <span className="mx-2">{">"}</span>

            <span>
              Reimbursements
            </span>
          </div>

          <div className="flex justify-between items-start mb-8">

            <div>

              <h1 className="text-3xl font-semibold text-[#7A008C]">
                Reimbursements
              </h1>

              <p className="text-gray-500 mt-2 max-w-3xl">
                Submit and track work-related expenses.
                Approved reimbursements are credited
                along with salary after finance approval.
              </p>

            </div>

            <Link
              href="/dashboard/finance/reimbursements/new"
              className="flex items-center gap-2 rounded-xl bg-[#7A008C] px-5 py-3 text-white hover:bg-[#67007A]"
            >
              <Plus size={18} />
              New Claim
            </Link>

          </div>


          <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">

            <div className="px-6 py-5 border-b">

              <h2 className="text-lg font-semibold">
                Claim Details ({filteredData.length})
              </h2>

            </div>

            <div className="flex gap-8 px-6 border-b">

              {tabs.map((tab) => (

                <button
                  key={tab}
                  onClick={() => {
                    setActiveTab(tab);
                    setPage(1);
                  }}
                  className={`py-4 text-sm transition ${
                    activeTab === tab
                      ? "border-b-2 border-[#7A008C] text-[#7A008C] font-semibold"
                      : "text-gray-500 hover:text-[#7A008C]"
                  }`}
                >
                  {tab}
                </button>

              ))}

            </div>

            <div className="flex justify-between items-center px-6 py-5">

              <div className="relative w-[300px]">

                <Search
                  size={18}
                  className="absolute left-3 top-3 text-gray-400"
                />

                <input
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(1);
                  }}
                  placeholder="Search reimbursement..."
                  className="w-full h-11 rounded-xl border border-gray-300 pl-10 pr-4 outline-none focus:border-[#7A008C]"
                />

              </div>

              <div className="flex gap-3">

                <button className="w-11 h-11 rounded-xl border border-gray-300 flex items-center justify-center hover:bg-gray-100">

                  <Filter size={18} />

                </button>

                <button className="w-11 h-11 rounded-xl border border-gray-300 flex items-center justify-center hover:bg-gray-100">

                  <Download size={18} />

                </button>

              </div>

            </div>

            <ReimbursementTable
              reimbursements={paginatedData}
            />


            <Pagination
              page={page}
              totalPages={totalPages}
              total={filteredData.length}
              perPage={perPage}
              onPageChange={setPage}
              onPerPageChange={(value) => {
                setPerPage(value);
                setPage(1);
              }}
            />

          </div>

        </div>

      </div>

    </div>
  );
}