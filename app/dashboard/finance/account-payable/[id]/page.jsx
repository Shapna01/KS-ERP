"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";

import Sidebar from "@/app/dashboard/users/components/Sidebar";
import Topbar from "@/app/dashboard/users/components/Topbar";
import FinanceSidebar from "../components/FinanceSidebar";
import SummaryCard from "../components/SummaryCard";
import InvoiceTable from "../components/InvoiceTable";
import PaymentRecordTable from "../components/PaymentRecordTable";
import AddInvoiceModal from "../components/AddInvoiceModal";
import RegisterPaymentModal from "../components/RegisterPaymentModal";
export default function AccountPayableDetailsPage() {
  const { id } = useParams();

  const [po, setPo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAddInvoice, setShowAddInvoice] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [activeMainTab, setActiveMainTab] =
    useState("Invoices");

  const [activeStatus, setActiveStatus] =
    useState("All");

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const res = await fetch(
        `/api/account-payable/${id}`
      );

      const data = await res.json();
      console.log(data);
      console.log(data.payments);
      setPo(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  const invoices = useMemo(() => {
    if (!po) return [];

    if (activeStatus === "All")
      return po.invoices;

    return po.invoices.filter(
      (invoice) =>
        invoice.paymentStatus === activeStatus
    );
  }, [po, activeStatus]);

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

  if (!po) return null;

  return (
    <div className="flex min-h-screen bg-[#F7F7FA]">

      <Sidebar />
      <FinanceSidebar />

      <div className="flex-1 flex flex-col ml-[74px]">

        <Topbar />

        <div className="flex-1 overflow-y-auto pt-[95px] px-8 pb-8">


          <div className="text-sm text-gray-500 mb-6">

            <span className="text-[#7A008C]">
              Account Payable
            </span>

            <span className="mx-2">{">"}</span>

            <span className="text-[#7A008C]">
              Purchase Orders
            </span>

            <span className="mx-2">{">"}</span>

            <span>{po.poNumber}</span>

          </div>

          <div className="flex justify-between items-start mb-8">

            <div>

              <h1 className="text-4xl font-semibold text-[#7A008C]">

                {po.poNumber}

              </h1>

              <p className="text-gray-500 mt-2">

                Tracks and settles vendor liabilities
                through invoices, advances and payments.

              </p>

            </div>

            <button className="border border-[#7A008C] text-[#7A008C] rounded-xl px-6 py-2 hover:bg-purple-50">

              Audit Log

            </button>

          </div>

          <div className="grid grid-cols-4 gap-5 mb-8">

            <SummaryCard
              title="Total Value"
              value={po.totalValue}
              emoji="💰"
            />

            <SummaryCard
              title="Invoice Amount"
              value={po.invoiceAmount}
              emoji="💵"
            />

            <SummaryCard
              title="Paid Amount"
              value={po.paidAmount}
              emoji="💸"
            />

            <SummaryCard
              title="Balance Amount"
              value={po.balanceAmount}
              emoji="🧾"
            />

          </div>
          <div className="border-b flex gap-8 mb-6">

            <button
              onClick={() =>
                setActiveMainTab("Invoices")
              }
              className={`pb-3 ${
                activeMainTab === "Invoices"
                  ? "border-b-2 border-[#7A008C] text-[#7A008C] font-semibold"
                  : "text-gray-500"
              }`}
            >
              Invoices
            </button>

            <button
              onClick={() =>
                setActiveMainTab(
                  "Payment Records"
                )
              }
              className={`pb-3 ${
                activeMainTab ===
                "Payment Records"
                  ? "border-b-2 border-[#7A008C] text-[#7A008C] font-semibold"
                  : "text-gray-500"
              }`}
            >
              Payment Records
            </button>

          </div>

{activeMainTab === "Invoices" && (
  <>
    <div className="flex items-center justify-between mb-6">
      <div className="flex gap-3">
        {["All", "Paid", "Unpaid"].map((status) => (
          <button
            key={status}
            onClick={() => setActiveStatus(status)}
            className={`px-5 py-2 rounded-lg ${
              activeStatus === status
                ? "bg-[#F6E5FA] text-[#7A008C]"
                : "bg-gray-500"
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      <button
        onClick={() => setShowAddInvoice(true)}
        className="border border-[#7A008C] text-[#7A008C] px-5 py-2 rounded-xl"
      >
        Add Invoice
      </button>
    </div>

    <InvoiceTable
    invoices={invoices}
    onRegisterPayment={(invoice)=>{
        setSelectedInvoice(invoice);
        setShowPaymentModal(true);
    }}
   />
  </>
)}

{activeMainTab === "Payment Records" && (
  <PaymentRecordTable
    payments={po.payments || []}
  />
)}
      </div>

    </div>
<AddInvoiceModal
  open={showAddInvoice}
  onClose={() => setShowAddInvoice(false)}
  purchaseOrderId={po.id}
  onSuccess={fetchData}
/>
<RegisterPaymentModal
  open={showPaymentModal}
  onClose={() => {
    setShowPaymentModal(false);
    setSelectedInvoice(null);
  }}
  purchaseOrderId={po.id}
  invoice={selectedInvoice}
  onSuccess={fetchData}
/>
  </div>

);
}
            