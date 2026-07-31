  "use client";
  import { useEffect, useState } from "react";

  import Sidebar from "../../users/components/Sidebar";
  import Topbar from "../../users/components/Topbar";
  import Link from "next/link";
  import ProcurementSidebar from "../components/ProcurementSidebar";
  import { useRouter } from "next/navigation";
  import ExistingVendorTable from "./components/ExistingVendorTable";
  import CreateVendorForm from "./components/CreateVendorForm";
  export default function RFQPage() {
    const [rfqs, setRfqs] = useState([]);
    const router = useRouter();

  useEffect(() => {
    fetchRFQs();
  }, []);

  const fetchRFQs = async () => {
    try {
      const res = await fetch("/api/rfq");

      const data = await res.json();

      console.log("API Response:", data);

      if (Array.isArray(data)) {
        setRfqs(data);
      } else {
        console.error("Expected array but got:", data);
        setRfqs([]);
      }
    } catch (err) {
      console.error(err);
      setRfqs([]);
    }
  };


    return (
      <div className="flex min-h-screen bg-[#F7F7FA]">
        <Sidebar />

        <div className="flex-1 flex flex-col ml-[74px]">
          <Topbar />

          <div className="flex-1 overflow-y-auto pt-[72px]">
            <div className="flex h-full">
              <ProcurementSidebar />

              <div className="flex-1 p-8 ml-[250px]">
                <div className="text-sm text-gray-500 mb-4">
                  Procurement &gt; Approved PRs
                </div>

                <div className="flex justify-between items-start mb-8">

  <div>
    <h1 className="text-4xl font-semibold text-[#7A008C]">
      Request for Quotation
    </h1>

    <p className="text-sm text-gray-500 mt-2 max-w-4xl leading-6">
      These requisitions are authorized for further processing,
      including RFQ creation, purchase order generation, and
      procurement execution. Use this list to track approved
      requests, review details, and proceed with next-step actions.
    </p>
  </div>

<button
  onClick={() => {
    if (rfqs.length === 0) {
      alert("No Approved Purchase Requisition found");
      return;
    }

    window.location.href = `/dashboard/procurement/rfq/create/${rfqs[0].id}`;
  }}
  className="h-10 bg-[#7A008C] hover:bg-[#62006f] text-white px-5 rounded-md flex items-center gap-2 text-sm font-medium shadow-sm"
>
  <span className="text-base">+</span>
  Create RFQ
</button>

</div>

                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="font-semibold text-[24px] text-black mb-4">
                        Purchase Requisition Details ({rfqs.length})
                      </h2>

                      <div className="flex gap-6 text-sm">
                        <button className="text-[#7A008C] border-b-2 border-[#7A008C] pb-2 font-medium">
                          All
                        </button>

                        <button className="text-gray-500">
                          Awaiting RFQ
                        </button>

                        <button className="text-gray-500">
                          Submitted RFQ
                        </button>

                        <button className="text-gray-500">
                          RFQ Drafts
                        </button>
                      </div>
                    </div>

                    <input
                      type="text"
                      placeholder="Search"
                      className="h-10 border rounded-lg px-4 text-sm outline-none w-[260px]"
                    />
                  </div>

                  <div className="overflow-hidden rounded-xl border">
                    <table className="w-full text-sm">
                      <thead className="bg-[#F8F8FC]">
                        <tr className="text-left text-gray-500 ">
                          <th className="p-4 ">PR No</th>
                          <th className="p-4">Project</th>
                          <th className="p-4">RFQ No</th>
                          <th className="p-4">Department</th>
                          <th className="p-4">Priority</th>
                          <th className="p-4">Category</th>
                          <th className="p-4">Type</th>
                          <th className="p-4">Status</th>
                          <th className="p-4">Action</th>
                        </tr>
                      </thead>

                    
                        <tbody>
                        {rfqs.map((item, index) => {
                          const latestRFQ =
                            item.rfqs?.length > 0
                              ? item.rfqs[item.rfqs.length - 1]
                              : null;

                          return (
                          <tr
                            key={index}
                            className="border-t hover:bg-gray-50"
                          >
                            <td className="p-4 text-black">{item.prNumber}</td>
                            <td className="p-4 text-black">{item.project?.projectCode}</td>
                            <td className="p-4 text-black">  {latestRFQ ? latestRFQ.rfqNumber : "-"}</td>
                            <td className="p-4 text-black">{item.requestorDept}  </td>
                            <td className="p-4 text-black">{item.priority}</td>
                            <td className="p-4 text-black">{item.category}</td>
                            <td className="p-4 text-black"> One Time</td>
                            <td className="p-4 ">
                              <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full">
                                  {latestRFQ ? latestRFQ.status : "Awaiting RFQ"}

                              </span>
                            </td>

                            <td className="p-4">
                              {latestRFQ ? (
                        <Link
                          href={`/dashboard/procurement/rfq/${latestRFQ.id}/quotation`}
                        >
                        <button className="text-[#7A008C] font-medium">
                          View Quotations
                        </button>
                      </Link>
                      ) : (
                        <Link
                          href={`/dashboard/procurement/rfq/create/${item.id}`}
                        >
                          <button
                            onClick={() => {
                              if (rfqs.length === 0) {
                                alert("No Approved Purchase Requisition found");
                                return;
                              }

                              router.push(`/dashboard/procurement/rfq/create/${rfqs[0].id}`);
                            }}
                            className="h-10 bg-[#7A008C] hover:bg-[#62006f] text-white px-5 rounded-md flex items-center gap-2 text-sm font-medium shadow-sm"
                          >
                            <span className="text-base">+</span>
                            Create RFQ
                          </button>
                        </Link>
                      )}
                              </td>
                            </tr>
                        );
                      })}
                      </tbody>
                    </table>
                  </div>

                  <div className="flex items-center justify-between mt-6 text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                      Showing
                      <select className="border rounded-lg px-2 py-1 bg-white">
                        <option>07</option>
                      </select>
                      of 20 items
                    </div>

                    <div className="flex gap-2">
                      <button className="border px-3 py-2 rounded-lg bg-white">
                        Prev
                      </button>

                      <button className="bg-[#7A008C] text-white px-3 py-2 rounded-lg">
                        1
                      </button>

                      <button className="border px-3 py-2 rounded-lg bg-white">
                        2
                      </button>

                      <button className="border px-3 py-2 rounded-lg bg-white">
                        5
                      </button>

                      <button className="border px-3 py-2 rounded-lg bg-white">
                        Next
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }