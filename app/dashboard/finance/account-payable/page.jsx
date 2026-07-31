"use client";

import { useEffect, useMemo, useState } from "react";
import Sidebar from "../../users/components/Sidebar";
import Topbar from "../../users/components/Topbar";
import { Search } from "lucide-react";

import AccountPayableTable from "./components/AccountPayableTable";
import Pagination from "./components/Pagination";

export default function AccountPayablePage() {

  const [purchaseOrders, setPurchaseOrders] = useState([]);

  const [loading, setLoading] = useState(true);

  const [activeTab, setActiveTab] = useState("All");

  const [search, setSearch] = useState("");

  const [vendorFilter, setVendorFilter] = useState("");

  const [projectFilter, setProjectFilter] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const rowsPerPage = 10;

  useEffect(() => {
    fetchPurchaseOrders();
  }, []);

  const fetchPurchaseOrders = async () => {

    try {

      const res = await fetch("/api/account-payable");

      const data = await res.json();

      setPurchaseOrders(Array.isArray(data) ? data : []);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };

  const vendors = [
    ...new Set(
      purchaseOrders.map((po) => po.vendor)
    ),
  ];

  const projects = [
    ...new Set(
      purchaseOrders.map((po) => po.project)
    ),
  ];

  const filteredPOs = useMemo(() => {

    return purchaseOrders.filter((po) => {

      const tabMatch =
        activeTab === "All"
          ? true
          : po.paymentStatus === activeTab;

      const vendorMatch =
        vendorFilter === ""
          ? true
          : po.vendor === vendorFilter;

      const projectMatch =
        projectFilter === ""
          ? true
          : po.project === projectFilter;

      const searchMatch =
        po.poNumber
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        po.vendor
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        po.project
          .toLowerCase()
          .includes(search.toLowerCase());

      return (
        tabMatch &&
        vendorMatch &&
        projectMatch &&
        searchMatch
      );

    });

  }, [
    purchaseOrders,
    activeTab,
    vendorFilter,
    projectFilter,
    search,
  ]);

  const totalPages = Math.ceil(
    filteredPOs.length / rowsPerPage
  );

  const paginatedRows = filteredPOs.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

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

      <div className="flex-1 flex flex-col ml-[74px]">

        <Topbar />

        <div className="flex-1 overflow-y-auto pt-[95px] px-8 pb-8">

          <div className="text-sm text-gray-500 mb-8">

            <span className="text-[#7A008C]">
              Finance
            </span>

            <span className="mx-2">{">"}</span>

            <span>
              Account Payable
            </span>

          </div>


          <div className="mb-8">

            <h1 className="text-3xl font-semibold text-[#7A008C]">

              Account Payable

            </h1>

            <p className="text-gray-500 mt-2">

              Manage invoices, payment schedules and outstanding balances.

            </p>

          </div>

\
          <div className="bg-white rounded-3xl border border-gray-200 shadow-sm">

            <div className="flex justify-between items-center px-6 py-5 border-b">

              <h2 className="font-semibold text-lg">

                Purchase Orders
                ({filteredPOs.length})

              </h2>

            </div>

            <div className="flex gap-8 px-6 border-b">

              {[
                "All",
                "Partially Paid",
                "Fully Paid",
                "Unpaid",
              ].map((tab) => (

                <button
                  key={tab}
                  onClick={()=>{
                    setActiveTab(tab);
                    setCurrentPage(1);
                  }}
                  className={`py-4 text-sm ${
                    activeTab===tab
                      ? "border-b-2 border-[#7A008C] text-[#7A008C] font-semibold"
                      : "text-gray-500"
                  }`}
                >

                  {tab}

                </button>

              ))}

            </div>

            <div className="flex items-center justify-between px-6 py-5">

              <div className="relative w-[280px]">

                <Search
                  size={18}
                  className="absolute left-3 top-3 text-gray-400"
                />

                <input
                  value={search}
                  onChange={(e)=>{
                    setSearch(e.target.value);
                    setCurrentPage(1);
                  }}
                  placeholder="Search Purchase Order"
                  className="w-full h-11 rounded-xl border border-gray-300 pl-10 pr-4 outline-none focus:border-[#7A008C]"
                />

              </div>

              <div className="flex gap-4">

                <select
                  value={projectFilter}
                  onChange={(e)=>{
                    setProjectFilter(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="h-11 rounded-xl border border-gray-300 px-4"
                >

                  <option value="">
                    Project
                  </option>

                  {projects.map(project=>(
                    <option
                      key={project}
                      value={project}
                    >
                      {project}
                    </option>
                  ))}

                </select>

                <select
                  value={vendorFilter}
                  onChange={(e)=>{
                    setVendorFilter(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="h-11 rounded-xl border border-gray-300 px-4"
                >

                  <option value="">
                    Vendor
                  </option>

                  {vendors.map(vendor=>(
                    <option
                      key={vendor}
                      value={vendor}
                    >
                      {vendor}
                    </option>
                  ))}

                </select>

              </div>

            </div>

            <AccountPayableTable
              purchaseOrders={paginatedRows}
            />

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />

          </div>

        </div>

      </div>

    </div>

  );

}