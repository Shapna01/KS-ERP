"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import Sidebar from "../../../users/components/Sidebar";
import Topbar from "../../../users/components/Topbar";

export default function PurchaseOrderDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const [po, setPo] = useState(null);  
  const [activeTab, setActiveTab] = useState("grn");
  const [receivedItems, setReceivedItems] = useState([]);
  const [showClosePopup, setShowClosePopup] = useState(false);
  const [closeType, setCloseType] = useState("completed");
  const [selectedGRN, setSelectedGRN] = useState(null);  
  const currentStage =
  po?.status?.trim() || "Purchase Order";


  const [advancePercent, setAdvancePercent] =
    useState(0);

  const installmentPercent =
    po?.installmentPercent || 0;

  const [modeOfPayment, setModeOfPayment] =
    useState("Online Transfer");
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
  useState("invoice");

  const installments =
    po?.numberOfInstallments || 0;

  const frequency =
    po?.paymentFrequency || "";
    useEffect(() => {
      if (id) {
        fetchPO();
        
      }
      
    }, [id]);
    

  const fetchPO = async () => {
  try {
    const res = await fetch(`/api/purchase-orders/${id}`);

    if (!res.ok) {
      throw new Error("Failed to fetch  purchase order");
    }

    const data = await res.json();

    setPo(data);
   
setSelectedPaymentMethod(
  data.paymentMethod || "invoice"
);
    setReceivedItems(
      (data.items  || []).map((item) => ({
        itemId: item.id,
        productName: item.product?.productName || "",
        ordered: item.quantity || 0,
        received: 0,
        accepted: 0,
        rejected: 0,
      }))
    );

    setAdvancePercent(data.advancePercent || 0);
    setModeOfPayment(
      data.modeOfPayment || "Online Transfer"
    );
  } catch (error) {
    console.error(error);
  }
};



  const savePaymentInfo = async () => {
    const res = await fetch(
      `/api/purchase-orders/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          paymentMethod: selectedPaymentMethod,
          advancePercent,
          modeOfPayment,
        }),
      }
    );

    if (res.ok) {
      alert(
        "Payment information updated successfully"
      );
    } else {
      alert("Failed to update payment info");
    }
  };

  if (!po) {
    return (
      <div className="flex min-h-screen bg-[#F8F7FC]">
        <Sidebar />
        <div className="flex-1 ml-[74px]">
          <Topbar />
          <div className="pt-[120px] flex justify-center">
            Loading Purchase Order...
          </div>
        </div>
      </div>
    );
  }
const updateStatus = async (status) => {
  try {
    const res = await fetch(
      `/api/purchase-orders/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status,
        }),
      }
    );

    const data = await res.json();

    if (res.ok) {
      setPo(data);
      return true;
    }

    alert(data.error || "Failed to update status");
    return false;

  } catch (error) {
    console.error(error);
    alert("Something went wrong");
    return false;
  }
};

const workflow = {
  "Purchase Order": {
    next: "Approved",
    buttonText: "Send to Approval",
  },

  "Approved": {
    next: "Sent to Vendors",
    buttonText: "Send to Vendor",
  },

  "Sent to Vendors": {
    next: "Vendors PO",
    buttonText: "Vendor",
  },

  "Vendors PO": {
    next: "To Approve",
    buttonText: "Send to Approval",
  },

  "To Approve": {
    next: "Receive Goods",
    buttonText: "Receive Goods",
  },

  "Receive Goods": {
    next: "Closed",
    buttonText: "Close PO",
  },

  "Closed": {
    next: null,
    buttonText: null,
  },
};

const steps = [
  "Purchase Order",
  "Approved",
  "Sent to Vendors",
  "Vendors PO",
  "To Approve",
  "Receive Goods",
  "Closed",
];

const currentIndex = steps.indexOf(currentStage);

const buttonText = workflow[currentStage]?.buttonText;
const generateGRN = async () => {
  try {
    const updatedItems = receivedItems.map((item) => ({
      purchaseOrderItemId: Number(item.itemId),

      receivedQuantity: Number(item.ordered),

      acceptedQuantity: Number(item.ordered),

      rejectedQuantity: 0,
    }));

    console.log("GRN ITEMS:", updatedItems);

    const res = await fetch("/api/grn", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        purchaseOrderId: Number(po.id),
        receivedDate: new Date().toISOString(),
        items: updatedItems,
      }),
    });

    const data = await res.json();

    console.log("GRN RESPONSE:", data);

    if (!res.ok) {
      alert(data.error || "Failed to generate GRN");
      return;
    }

    const statusUpdated = await updateStatus("Receive Goods");

    if (statusUpdated) {
      await fetchPO();
    }

  } catch (error) {
    console.error("Generate GRN Error:", error);
    alert("Something went wrong while generating GRN");
  }
};

const handleClosePO = () => {

  console.log("GOODS RECEIPTS:", po.goodsReceipts);

  const hasPending = po.items.some((poItem) => {

    const acceptedQty = po.goodsReceipts.reduce(
      (total, grn) => {

        const grnAccepted = grn.items
          .filter(
            (grnItem) =>
              Number(grnItem.purchaseOrderItemId) === Number(poItem.id)
          )
          .reduce(
            (sum, grnItem) =>
              sum + Number(grnItem.acceptedQuantity || 0),
            0
          );

        return total + grnAccepted;

      },
      0
    );


    console.log({
      product: poItem.product?.productName,
      poItemId: poItem.id,
      ordered: poItem.quantity,
      accepted: acceptedQty
    });


    return acceptedQty < poItem.quantity;

  });


  console.log("Pending Status:", hasPending);


  setCloseType(
    hasPending ? "pending" : "completed"
  );
  
  setShowClosePopup(true);
};

  return (
    <div className="flex min-h-screen bg-[#FCFAFE]">
      <Sidebar />

      <div className="flex-1 flex flex-col ml-[74px]">
        <Topbar />

        <div className="flex-1 overflow-y-auto pt-[95px] px-10 pb-10 bg-gradient-to-br from-[#FCFAFE] via-[#F9FAFF] to-[#F4F5FF]">
          <div className="flex items-center text-sm mb-8 font-medium">
  <span className="text-[#7A008C]">
    Procurement
  </span>

  <span className="mx-2">›</span>

  <span className="text-[#7A008C]">
    Purchase Orders
  </span>

  <span className="mx-2">›</span>

  <span className="text-[#667085]">
    {po?.poNumber}
  </span>
</div>

<div className="flex items-center bg-white rounded-2xl border border-[#ECECEC] shadow-sm overflow-hidden mb-8">
  {steps.map((step, index) => (
    <div
      key={index}
     className={`flex-1 relative py-5 text-sm font-semibold transition-allduration-300
${
index <= currentIndex
? "bg-gradient-to-r from-[#F8D8FF] to-[#FCEEFF] text-[#7A008C]"
: "bg-white text-gray-400"
}
`}
    >
      {step}
    </div>
  ))}
</div>

<div className="bg-white rounded-[28px] border border-[#EFE7F7] shadow-lg shadow-[#7A008C]/5 hover:shadow-xl transition-all duration-300 p-8">

  <div className="grid grid-cols-3 gap-5">

    <div>
      <label className="text-[12px] font-medium uppercase tracking-wide text-[#7C7C8A] mb-2 block">
        Vendor *
      </label>

      <input
        value={po.vendor?.vendorName || ""}
        readOnly
        className="w-full h-12 rounded-xl border border-[#E8D8F5] bg-[#FAFBFC] px-4 text-[14px] text-[#344054] font-medium outline-none"/>
    </div>

    <div className="col-span-2">
      <label className="text-[12px] font-medium uppercase tracking-wide text-[#7C7C8A] mb-2 block">
        Vendor Address *
      </label>

      <input
        value={po.vendor?.address || ""}
        readOnly
        className="w-full h-12 rounded-xl border border-[#E8D8F5] bg-[#FAFBFC] px-4 text-[14px] text-[#344054] font-medium outline-none"
      />
    </div>

    <div>
      <label className="text-[12px] font-medium uppercase tracking-wide text-[#7C7C8A] mb-2 block">
        Purchase Order Number
      </label>

      <input
          value={po.poNumber || ""}

        readOnly
        className="w-full h-12 rounded-xl border border-[#E8D8F5] bg-[#FAFBFC] px-4 text-[14px] text-[#344054] font-medium outline-none"/>
    </div>

    <div>
      <label className="text-[12px] font-medium uppercase tracking-wide text-[#7C7C8A] mb-2 block">
        PR Number
      </label>

      <input
        value={po.rfq?.purchaseRequisition?.prNumber || ""}
        readOnly
       className="w-full h-12 rounded-xl border border-[#E8D8F5] bg-[#FAFBFC] px-4 text-[14px] text-[#344054] font-medium outline-none"/>
    </div>

    <div>
      <label className="text-[12px]font-medium uppercase tracking-wide text-[#7C7C8A] mb-2 block">
        Project Number
      </label>

      <input
        value={po.project?.projectCode || ""}
        readOnly
        className="w-full h-12 rounded-xl border border-[#E8D8F5] bg-[#FAFBFC] px-4 text-[14px] text-[#344054] font-medium outline-none" />
    </div>

   
    <div>
      <label className="text-[12px] font-medium uppercase tracking-wide text-[#7C7C8A] mb-2 block">
        Category
      </label>

      <input
        value={po.rfq?.purchaseRequisition?.category || ""}
        readOnly
        className="w-full h-12 rounded-xl border border-[#E8D8F5] bg-[#FAFBFC] px-4 text-[14px] text-[#344054] font-medium outline-none" />
    </div>

   
    <div>
      <label className="text-[12px] font-medium uppercase tracking-wide text-[#7C7C8A] mb-2 block">
        Priority
      </label>

      <input
        value={po.rfq?.purchaseRequisition?.priority || ""}
        readOnly
        className="w-full h-12 rounded-xl border border-[#E8D8F5] bg-[#FAFBFC] px-4 text-[14px] text-[#344054] font-medium outline-none
"
      />
    </div>

    <div>
      <label className="text-[12px] font-medium uppercase tracking-wide text-[#7C7C8A] mb-2 block">
        Expected Delivery Date
      </label>

      <input
        value={
          po.expectedDeliveryDate
            ? new Date(
                po.expectedDeliveryDate
              ).toLocaleDateString()
            : ""
        }
        readOnly
        className="w-full h-12 rounded-xl border border-[#E8D8F5] bg-[#FAFBFC] px-4 text-[14px]text-[#344054] font-medium outline-none
"
      />
    </div>

  </div>
</div>
<div className="mt-6">
  <label className="text-[12px] font-medium uppercase tracking-wide text-[#7C7C8A] mb-2 block ">
    Note for Vendors
  </label>

  <textarea
    value={
      po.rfq?.purchaseRequisition?.notesForVendor || ""
    }
    readOnly
    rows={3}
    className="w-full rounded-xl border border-[#E8D8F5] bg-[#FAFBFC] px-4 py-3 text-[14px] text-[#344054] resize-none"/>
</div>

<div className="grid grid-cols-2 gap-5 mt-6">

  <div>
    <label className="text-[12px] font-medium uppercase tracking-wide text-[#7C7C8A] mb-2 block">
      Request Type
    </label>

    <input
      value={po.requestType || ""}

      readOnly
      className="w-full h-11 border rounded-lg px-3 bg-gray-50"/>
  </div>

  <div>
    <label className="text-[12px] font-medium uppercase tracking-wide text-[#7C7C8A] mb-2 block">
      Request Date
    </label>

    <input
      value={
        po.createdAt
          ? new Date(
              po.createdAt
            ).toLocaleDateString()
          : ""
      }
      readOnly
      className="w-full h-11 border rounded-lg px-3 bg-gray-50
      "
    />
  </div>

</div>

<div className="grid grid-cols-3 gap-5 mt-5">

  <div>
    <label className="text-[12px] font-medium uppercase tracking-wide text-[#7C7C8A] mb-2 block">
      Frequency
    </label>

    <input
      value={po.frequency || ""}

      readOnly
      className=" w-full h-11 border rounded-lg px-3 bg-gray-50"/>
  </div>

  <div>
    <label className="text-[12px] font-medium uppercase tracking-wide text-[#7C7C8A] mb-2 block">
      Schedule On
    </label>

    <input
      value={po.scheduleOn || ""}

      readOnly
      className="w-full h-11 border rounded-lg px-3 bg-gray-50 "/>
  </div>

  <div>
    <label className="text-[12px] font-medium uppercase tracking-wide text-[#7C7C8A] mb-2 block">
      Date Range
    </label>

    <input
      value={
        po.startDate && po.endDate
        ? `${new Date(po.startDate).toLocaleDateString()} - ${new Date(po.endDate).toLocaleDateString()}`
        : ""
        }
      readOnly
      className=" w-full h-11 border rounded-lg px-3 bg-gray-50"
    />
  </div>

</div>
<div className="grid grid-cols-2 gap-5 mt-6">

  <div>
    <label className="text-[12px] font-medium uppercase tracking-wide text-[#7C7C8A] mb-2 block">
      Delivery Address
    </label>

    <textarea
      value={
        po.deliveryAddress || ""
      }
      readOnly
      rows={2}
      className="w-full rounded-xl border border-[#E8D8F5] bg-[#FAFBFC] px-4 py-3 text-[14px] text-[#344054] resize-none" />
  </div>

  <div>
    <label className="text-[12px] font-medium uppercase tracking-wide text-[#7C7C8A] mb-2 block">
      Billing Address
    </label>

    <textarea
      value={
        po.billingAddress || ""
      }
      readOnly
      rows={2}
      className="w-full rounded-xl border border-[#E8D8F5] bg-[#FAFBFC] px-4 py-3 text-[14px] text-[#344054]resize-none" />
  </div>

</div>
<div className="mt-10">
 <h2 className="text-[20px] font-semibold text-[#1F2937]">
    Added Items
  </h2>

  <p className="text-sm text-[#667085] mb-4">
    Items or service details for the purchase request.
  </p>

  <div className="overflow-hidden rounded-2xl border border-[#EEE6F7] shadow-sm bg-white">

    <table className="w-full text-sm">

      <thead className="bg-gradient-to-r from-[#7A008C] to-[#B014A6] text-white text-[#B014A6] uppercase text-[11px] tracking-wide">
        <tr>
          <th className="px-4 py-3 text-left">S.NO</th>
          <th className="px-4 py-3 text-left">Items</th>
          <th className="px-4 py-3 text-center">
            Order Count
          </th>
          <th className="px-4 py-3 text-center">
            Quantity (Per Order)
          </th>
          <th className="px-4 py-3 text-center">
            Total Quantities
          </th>
          <th className="px-4 py-3 text-center">
            Cost Per Unit (Rs)
          </th>
          <th className="px-4 py-3 text-center">
            Units
          </th>
          <th className="px-4 py-3 text-right">
            Total Cost (Rs)
          </th>
        </tr>
      </thead>

      <tbody>

        {po.items?.map((item, index) => (
          <tr
            key={item.id}
            className="border-t border-[#F2F4F7] hover:bg-[#FAFAFC]"
          >
            <td className="px-5 py-4 text-sm text-[#344054]">
              {index + 1}
            </td>

            <td className="px-5 py-4 text-sm text-[#344054]">
              {item.product?.productName}
            </td>

            <td className="px-5 py-4 text-sm text-[#344054]">
              {item.orderCount || 0}
            </td>

            <td className="px-5 py-4 text-sm text-[#344054]">
              {item.quantity}
            </td>

            <td className="px-5 py-4 text-sm text-[#344054]">
              {(item.orderCount || 1) * item.quantity}
            </td>
            <td className="px-5 py-4 text-sm text-[#344054]">
              ₹
              {item.unitPrice?.toLocaleString()}
            </td>

            <td className="px-5 py-4 text-sm text-[#344054]">
              {item.unit || "Nos"}
            </td>

            <td className="px-5 py-4 text-sm text-[#344054]">
              ₹
              {(
                item.quantity *
                item.unitPrice
              ).toLocaleString()}
            </td>
          </tr>
        ))}


          <tr className="border-t border-[#EAD7F7] bg-gradient-to-r from-[#FFF7FD] to-[#F7EAFF]font-bold">
          <td
            colSpan={7}
            className="px-4 py-4 text-right font-semibold">
            Total Amount
          </td>

         <td className="px-4 py-4 text-right font-bold text-[#B014A6]">
            ₹{" "}
            {(po.items || [])
              .reduce(
                (sum, item) => sum + item.quantity * item.unitPrice,
                0
              )
              .toLocaleString()}
          </td>
                  </tr>

                </tbody>

              </table>

            </div>
          </div>
          <br />
 
<div className="bg-white rounded-3xl border border-[#E5E7EB] p-8 mt-8">

  <h2 className="text-[20px] font-semibold text-[#111827] mb-2">
    Payment Info
  </h2>

  <p className="text-sm text-[#667085] mb-6">
    Items or service details for the purchase request.
  </p>

  <div className="bg-[#F8FAFC] border border-[#EAECF0] rounded-xl p-4 mb-6">
    <p className="text-sm font-medium text-[#344054]">
      Payments start only after the contract is activated.
    </p>

    <p className="text-xs text-[#667085] mt-1">
      The contract becomes active once the Purchase Order is approved by the
      vendor and finance team, and payments follow the terms set in the Purchase Order.
    </p>
  </div>

  <div className="grid grid-cols-2 gap-4 mb-8">

    <div
      className={`
      border rounded-2xl p-5
      ${
        selectedPaymentMethod === "invoice"
          ? "border-[#D946EF] bg-[#FDF4FF]"
          : "border-[#E4E7EC] bg-white"
      }
      `}
    >
      <div className="flex gap-3">

        <div
          onClick={() => setSelectedPaymentMethod("invoice")}

          className={`
          w-5 h-5 rounded-full border-2 mt-1
          flex items-center justify-center
          ${
            selectedPaymentMethod === "invoice"
              ? "border-[#B014A6]"
              : "border-[#D0D5DD]"
          }
          `}
        >
          {selectedPaymentMethod === "invoice" && (
            <div className="w-2 h-2 rounded-full bg-[#B014A6]" />
          )}
        </div>

        <div>
          <h3
            className={`font-semibold ${
                selectedPaymentMethod === "invoice"

                ? "text-[#B014A6]"
                : "text-[#344054]"
            }`}
          >
            Invoice-Driven Payment
          </h3>

          <p className="text-sm text-[#667085]">
            Pay only after vendor invoice is approved.
          </p>
        </div>
      </div>
    </div>

    <div
      className={`
      border rounded-2xl p-5
      ${
        selectedPaymentMethod === "schedule"
          ? "border-[#D946EF] bg-[#FDF4FF]"
          : "border-[#E4E7EC] bg-white"
      }
      `}
    >
      <div className="flex gap-3">

        <div
        onClick={() => setSelectedPaymentMethod("schedule")}
          className={`
          w-5 h-5 rounded-full border-2 mt-1
          flex items-center justify-center
          ${
            selectedPaymentMethod === "schedule"
              ? "border-[#B014A6]"
              : "border-[#D0D5DD]"
          }
          `}
        >
          {selectedPaymentMethod === "schedule" && (
            <div className="w-2 h-2 rounded-full bg-[#B014A6]" />
          )}
        </div>

        <div>
          <h3
          onClick={() => setSelectedPaymentMethod("schedule")}
            className={`font-semibold ${
              selectedPaymentMethod === "schedule"
                ? "text-[#B014A6]"
                : "text-[#344054]"
            }`}
          >
            Schedule-Driven Payment
          </h3>

          <p className="text-sm text-[#667085]">
            Pay as per contract activation.
          </p>
        </div>
      </div>
    </div>
  </div>

 

  {selectedPaymentMethod === "invoice" && (
  <>
    <div className="grid grid-cols-2 gap-5 mb-6">

      <div>
        <label className="text-[12px] text-[#667085] mb-2 block">
          Payment Terms
        </label>

        <input
          value={po.paymentTerms || ""}
          readOnly
          className="w-full h-[44px] border border-[#E4E7EC] rounded-lg px-4 bg-[#F9FAFB]"
        />
      </div>

      <div>
        <label className="text-[12px] text-[#667085] mb-2 block">
          Mode of Payment
        </label>

        <input
          value={po.modeOfPayment || ""}
          readOnly
          className="w-full h-[44px] border border-[#E4E7EC] rounded-lg px-4 bg-[#F9FAFB]"
        />
      </div>

    </div>

    <h3 className="text-sm font-semibold mb-4">
      Preview of Payment Terms
    </h3>

      <table className="w-full border border-[#EAECF0] rounded-xl overflow-hidden">

        <thead className="bg-[#F9FAFB]">
          <tr>
            <th className="p-3 text-left">
              Invoice Date
            </th>

            <th className="p-3 text-left">
              Due Date
            </th>

            <th className="p-3 text-right">
              Amount to be Paid (Rs)
            </th>
          </tr>
        </thead>

        <tbody>
          <tr className="border-t">

            <td className="p-3">
              {po.invoiceDate
                ? new Date(po.invoiceDate).toLocaleDateString()
                : "-"}
            </td>

            <td className="p-3">
              {po.dueDate
                ? new Date(po.dueDate).toLocaleDateString()
                : "-"}
            </td>

            <td className="p-3 text-right">
              ₹ {(po.items || [])
  .reduce(
    (sum, item) => sum + item.quantity * item.unitPrice,
    0
  )
  .toLocaleString()}
            </td>

          </tr>
        </tbody>

      </table>
    </>
  )}

  

  {selectedPaymentMethod === "schedule" && (
    <>
      <h3 className="text-[14px] font-semibold text-[#344054] mb-4">
        Payment Breakdown
      </h3>

      <div className="grid grid-cols-3 gap-5 mb-6">

       <div>
  <label className="text-[12px] text-[#667085] mb-2 block">
    Advance %
  </label>

  <select
  value={advancePercent}
  onChange={(e) =>
    setAdvancePercent(
      Number(e.target.value)
    )
  }
className="
w-full
h-12
rounded-xl
border
border-[#E4E7EC]
bg-gradient-to-b
from-white
to-[#FAFAFB]
px-4
text-gray-800
font-medium
shadow-sm
focus:ring-2
focus:ring-[#D946EF]
focus:border-[#D946EF]
transition-all
"
>
  <option value={0}>0%</option>
  <option value={10}>10%</option>
  <option value={20}>20%</option>
  <option value={25}>25%</option>
  <option value={30}>30%</option>
  <option value={40}>40%</option>
  <option value={50}>50%</option>
</select>
</div>

        <div>
          <label className="text-[12px] text-[#667085] mb-2 block">
            Installment % (Auto Calculated)
          </label>

          <input
            value={installmentPercent}
            readOnly
            className="w-full h-[44px] border border-[#E4E7EC] rounded-lg px-4 bg-[#F9FAFB]"/>
        </div>

        <div>
  <label className="text-[12px] text-[#667085] mb-2 block">
    Mode of Payment
  </label>

  <select
    value={modeOfPayment}
    onChange={(e) =>
      setModeOfPayment(e.target.value)
    }
    className="w-full h-[44px] border border-[#E4E7EC] rounded-lg px-4 bg-white ">
    <option value="Online Transfer ">
      Online Transfer
    </option>

    <option value="NEFT">
      NEFT
    </option>

    <option value="RTGS">
      RTGS
    </option>

    <option value="IMPS">
      IMPS
    </option>

    <option value="Cheque">
      Cheque
    </option>

    <option value="UPI">
      UPI
    </option>

    <option value="Cash">
      Cash
    </option>
  </select>
</div>

        <div>
          <label className="text-[12px] text-[#667085] mb-2 block">
            No. of Installments
          </label>

          <input
            value={installments}
            readOnly
            className="w-full h-[44px] border border-[#E4E7EC] rounded-lg px-4 bg-[#F9FAFB]"/>
        </div>

        <div>
          <label className="text-[12px] text-[#667085] mb-2 block">
            Frequency
          </label>

          <input
            value={frequency}
            readOnly
            className="w-full h-[44px] border border-[#E4E7EC] rounded-lg px-4 bg-[#F9FAFB]"/>         
        </div>
      </div>
                                                     
      <h3 className="text-sm font-semibold mb-4 text-gray-700">
        Preview of Payment Terms
      </h3>

      <table className="w-full border border-[#EAECF0] rounded-xl overflow-hidden">

        <thead className="bg-[#F9FAFB] text-gray-600">

          <tr>
            <th className="p-3 text-left">S.NO</th>
            <th className="p-3 text-left">Payments</th>
            <th className="p-3 text-left">Due Date</th>
            <th className="p-3 text-right">Amount (Rs)</th>
          </tr>
        </thead>

        <tbody>
          {po.paymentSchedules?.map((payment, index) => (
            <tr key={payment.id} className="border-t">

              <td className="p-3">
                {index + 1}
              </td>

              <td className="p-3">
                {payment.paymentName}
              </td>

              <td className="p-3">
                {new Date(
                  payment.dueDate
                ).toLocaleDateString()}
              </td>

              <td className="p-3 text-right">
                ₹ {payment.amount.toLocaleString()}
              </td>

            </tr>
          ))}

          <tr className="
border-t
border-[#EAECF0]
bg-[#FCFAFF]
">

            <td
              colSpan={3}
             className="
px-5
py-4
text-right
font-semibold
text-[#7A008C]
"
            >
              Total Amount
            </td>

            <td className="p-3 text-right font-bold text-[#B014A6]">
             ₹ {(po.paymentSchedules || [])
              .reduce(
                (sum, item) => sum + Number(item.amount || 0),
                0
              )
              .toLocaleString()}
            </td>

          </tr>

        </tbody>

      </table>
    </>
  )}

</div>
{currentStage === "Receive Goods" && (
  <div className="mt-8 bg-white rounded-2xl border border-[#E5E7EB]">
    <div className="flex border-b px-6">
      <button
        onClick={() => setActiveTab("grn")}
        className={`py-4 px-2 mr-8 text-sm font-medium border-b-2 ${
          activeTab === "grn"
            ? "border-[#B014A6] text-[#B014A6]"
            : "border-transparent text-gray-500"
        }`}
      >
        GRN
      </button>

      <button
        onClick={() => setActiveTab("invoice")}
        className={`py-4 px-2 text-sm font-medium border-b-2 ${
          activeTab === "invoice"
            ? "border-[#B014A6] text-[#B014A6]"
            : "border-transparent text-gray-500"
        }`}
      >
        Invoices
      </button>
    </div>

    {activeTab === "grn" && (
      <div className="bg-white rounded-3xl border border-[#ECECEC] p-8">

    <div className="flex justify-between items-center mb-8">

    <div>
        <div className="flex items-center gap-3">

            <h2 className="text-[22px] font-semibold text-[#111827]">
                Goods Receipt Notes
            </h2>

            <span className="px-3 py-1 rounded-full bg-[#F3E8FF] text-[#7A008C] text-xs font-medium">
                  {po.goodsReceipts?.length || 0} GRNs

            </span>

        </div>

        <p className="text-[#667085] mt-2">
            Manage all Goods Receipt Notes generated for this Purchase Order.
        </p>

    </div>

<button
  onClick={generateGRN}
  className="h-11 px-5 rounded-xl bg-[#7A008C] hover:bg-[#650073] text-white font-medium flex items-center gap-2"
>
  +
  Generate GRN
</button>

</div>
        <table className="w-full">

        <thead className="bg-gradient-to-r from-[#7A008C] to-[#B014A6] text-white uppercase text-[11px] tracking-wide">

        <tr>

        <th className="px-5 py-4 text-left">GRN No</th>

        <th className="px-5 py-4 text-left">Receipt Date</th>

        <th className="px-5 py-4 text-center">Items</th>

        <th className="px-5 py-4 text-center">Accepted Qty</th>

        <th className="px-5 py-4 text-center">Status</th>

        <th className="px-5 py-4 text-right">Action</th>

        </tr>

    </thead>
    <tbody>

{po.goodsReceipts?.map(grn => (

<tr
key={grn.id}
className="border-t hover:bg-[#FCFCFD]"
>

<td>{grn.grnNumber}</td>

<td>
{new Date(grn.receivedDate).toLocaleDateString()}
</td>

<td>{grn.items.length}</td>

<td>

{
grn.items.reduce(
(sum,i)=>sum+i.acceptedQuantity,
0
)

}

</td>

<td>

<span className="
inline-flex
items-center
px-3
py-1
rounded-full
bg-[#ECFDF3]
text-[#027A48]
text-xs
font-semibold
">
Completed
</span>

</td>

<td>

<button
  onClick={() => setSelectedGRN(grn)}
  className="text-[#7A008C] hover:underline"
>
  View Details
</button>

</td>

</tr>

))}

</tbody>

</table>


      </div>
    )}
    

    {activeTab === "invoice" && (
      <div className="p-6">

        <div className="flex justify-between items-center mb-5">

          <div>
            <p className="text-sm text-gray-500">
              Track invoice status and payments.
            </p><br />
            <div className="mb-5 rounded-lg border border-[#EAECF0] bg-[#F9FAFB] p-4">

<p className="text-sm text-[#475467]">

<b>Note:</b> Track all invoices linked to this Purchase Order here.
Financial Posting and payments are managed in

<span className="text-[#7A008C] font-medium">
{" "}Account Payable.
</span>

</p>

</div>
            <h3 className="text-lg font-semibold text-gray-700">
              Invoice Summary
            </h3>



          </div>

          <div className="flex justify-end mb-5">

<button
onClick={() => router.push(`/dashboard/procurement/purchase-orders/${po.id}/invoice`)}
className="
h-10
px-5
rounded-lg
border
border-[#B014A6]
text-[#B014A6]
hover:bg-[#FCF4FF]
"
>
Import Invoice
</button>

</div>


        </div>

        <div className="rounded-xl border border-[#EAECF0] overflow-hidden">

<table className="w-full text-sm">

<thead className="bg-[#F9FAFB] text-[#475467]">

<tr>

<th className="w-12 px-4 py-3">S.NO</th>

<th className="px-4 py-3 text-left">
GRN No
</th>

<th className="px-4 py-3 text-left">
Type
</th>

<th className="px-4 py-3 text-center">
Quantity
</th>

<th className="px-4 py-3 text-right">
Amount (Rs)
</th>

<th className="px-4 py-3 text-center">
Invoice Status
</th>

<th className="px-4 py-3 text-center">
3-Way Matching
</th>

<th className="px-4 py-3 text-center">
Invoice Number
</th>

<th className="px-4 py-3 text-center">
Actions
</th>

</tr>

</thead>

<tbody>

{po.invoices?.map((invoice,index)=>(

<tr
key={invoice.id}
className="border-t hover:bg-[#FCFCFD]"
>

<td className="px-4 py-4">
{index+1}
</td>

<td className="px-4 py-4">
{invoice.goodsReceipt?.grnNumber}
</td>

<td className="px-4 py-4">
{invoice.invoiceType}
</td>

<td className="px-4 py-4 text-center">
{invoice.quantity}
</td>

<td className="px-4 py-4 text-right">

₹ {invoice.amount.toLocaleString()}

</td>

<td className="px-4 py-4 text-center">

<span
className={`px-3 py-1 rounded-full text-xs font-medium
${
invoice.invoiceStatus==="Received"
?"bg-green-100 text-green-700"
:"bg-yellow-100 text-yellow-700"
}
`}
>

{invoice.invoiceStatus}

</span>

</td>

<td className="px-4 py-4 text-center">

<span
className={`px-3 py-1 rounded-full text-xs font-medium
${
invoice.matchingStatus==="Matched"
?"bg-green-100 text-green-700"
:"bg-gray-100 text-gray-600"
}
`}
>

{invoice.matchingStatus}

</span>

</td>

<td className="px-4 py-4 text-center">

{invoice.invoiceNumber}

</td>

<td className="px-4 py-4">

<div className="flex justify-center gap-2">

<button
onClick={()=>
router.push(`/dashboard/invoices/${invoice.id}`)
}
className="text-gray-500 hover:text-[#7A008C]"
>

👁

</button>

<a
href={invoice.invoiceFile}
target="_blank"
className="text-gray-500 hover:text-[#7A008C]"
>

⬇

</a>

</div>

</td>

</tr>

))}

{po.invoices?.length===0 &&(

<tr>

<td
colSpan={9}
className="py-10 text-center text-gray-500"
>

No invoices available

</td>

</tr>

)}

</tbody>

</table>

</div>
      </div>
    )}

  </div>
)}
<div className="flex justify-end gap-4 mt-10">
  <button
    onClick={() => router.back()}
className="
px-6
h-11
rounded-xl
border
border-[#D0D5DD]
bg-white
text-[#344054]
font-medium
hover:bg-[#F9FAFB]
transition
"
  >
    Cancel
  </button>
{buttonText && (
  <button
    onClick={() => {
      if (currentStage === "Receive Goods") {
    handleClosePO();
}else {
        updateStatus(workflow[currentStage].next);
      }
    }}
    className="px-6 h-11 rounded-lg bg-[#7A008C] text-white"
  >
    {buttonText}
  </button>
)}
  
</div>
{showClosePopup && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

    <div className="bg-white rounded-xl w-[420px] shadow-xl">

      <div className="p-6">

        <h2 className="text-lg font-semibold mb-3">
          {closeType === "pending"
            ? "Close Purchase Order with Pending Items"
            : "Close Purchase Order"}
        </h2>

        {closeType === "pending" ? (
          <p className="text-sm text-gray-600 leading-6">
            This Purchase Order still has pending quantities that
            haven't been received.
            <br />
            <br />
            Closing the PO will mark the remaining balance as
            <b> Not Received</b> and further deliveries will not be
            allowed.
          </p>
        ) : (
          <p className="text-sm text-gray-600 leading-6">
            All ordered items have been successfully received.
            <br />
            <br />
            Closing this Purchase Order will mark it as completed.
          </p>
        )}

      </div>

      <div className="flex justify-end gap-3 border-t p-4">

        <button
          onClick={() => setShowClosePopup(false)}
          className="px-4 py-2 border rounded-lg"
        >
          Cancel
        </button>

<button
  onClick={async () => {
    const success = await updateStatus("Closed");

    if (success) {
      setShowClosePopup(false);
      await fetchPO();
    }
  }}
  className="px-4 py-2 bg-[#7A008C] text-white rounded-lg"
>
  {closeType === "pending" ? "Close PO" : "Done"}
</button>

      </div>

    </div>

  </div>
)}
        </div>
      </div>
    </div>
  );
}