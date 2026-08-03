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
  const [remarks, setRemarks] = useState({});
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
    console.log(data);

    setPo(data);
   setRemarks(
  (data.goodsReceipts || []).reduce((acc, grn) => {
    acc[grn.id] = grn.remarks || "";
    return acc;
  }, {})
);
setSelectedPaymentMethod(
  data.paymentMethod || "invoice"
);
    setReceivedItems(
  (data.items || []).map((item) => {
    const alreadyReceived = (data.goodsReceipts || []).reduce(
      (total, grn) => {
        const row = (grn.items || []).find(
          (x) => x.purchaseOrderItemId === item.id
        );

        return total + Number(row?.receivedQuantity || 0);
      },
      0
    );

    const remaining = Math.max(
      item.quantity - alreadyReceived,
      0
    );

    return {
      itemId: item.id,
      productName: item.product?.productName || "",
      ordered: item.quantity,
      alreadyReceived,
      remaining,
      received: remaining,
      accepted: remaining,
      rejected: 0,
    };
  })
)
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
    const updatedItems = receivedItems
  .filter((item) => item.remaining > 0)
  .map((item) => ({
    purchaseOrderItemId: item.itemId,
    receivedQuantity: item.remaining,
    acceptedQuantity: item.remaining,
    rejectedQuantity: 0,
  }));

    console.log("GRN ITEMS:", updatedItems);
    if (updatedItems.length === 0) {
  alert("All items have already been received. GRN cannot be generated.");
  return;
}
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

<div className="flex-1 overflow-y-auto pt-[100px] ml-[2px] px-8 py-7">
    <div className="flex items-center text-sm mb-8 font-medium">
  <span className="text-[#7A008C]">
    Procurement
  </span>

  <span className="mx-2 text-black">›</span>

  <span className="text-[#7A008C]">
    Purchase Orders
  </span>

  <span className="mx-2 text-black">›</span>

  <span className="text-[#667085]">
    {po?.poNumber}
  </span>
</div>


<div className="flex items-center justify-between mb-8 rounded-xl bg-white border border-[#EAECF0] shadow-sm p-6">
  <div>
    <h1 className="text-[30px] font-semibold text-[#101828]">
      {po.poNumber}
    </h1>

    <p className="mt-1 text-sm text-[#667085]">
      Review Purchase Order details and submit for approval before issuing it to the vendor.
    </p>
  </div>

  <button
    className="h-10 rounded-md border border-[#D0D5DD] bg-white px-5 text-sm font-medium text-[#7A008C] hover:bg-[#FCFAFF]"
  >
    Audit Log
  </button>

</div>

<div className="flex overflow-hidden rounded-lg border border-[#EAECF0]">
  {steps.map((step, index) => {
    const active = index <= currentIndex;

    return (
      <div
        key={step}
        className={`flex-1 py-4 text-center text-xs font-semibold transition-all duration-200 ${
          active
            ? "bg-[#7A008C] text-white"   
            : "bg-[#F2F4F7] text-[#667085]" 
        }`}
      >
        {step}
      </div>
    );
  })}
</div>

<br /><br />
<div className="mb-8 rounded-xl border border-[#E4E7EC] bg-white shadow-sm px-6 py-5">
  <span className="text-xs text-[#667085]">

    <span className="font-semibold">Note:</span>{" "}
    Track all invoices and GRNs linked to this Purchase Order here.
    Financial posting and payments are managed in

    <span className="ml-1 cursor-pointer text-[#C11574] underline">
      Account Payable
    </span>

  </span>

</div>


<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">

  <div>
    <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[#667085]">
      Delivery Address <span className="text-[#D92D20]">*</span>
    </label>

    <div className="min-h-[90px] rounded-xl border border-[#EAECF0] bg-[#FCFCFD] px-4 py-4 shadow-sm">
      <p className="text-sm leading-6 text-[#344054] whitespace-pre-wrap">
        {po.deliveryAddress ||
          "5,29-KS Smart Solutions Pvt Ltd,\nAnna Salai, Teynampet"}
      </p>
    </div>
  </div>

  <div>
    <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[#667085]">
      Billing Address <span className="text-[#D92D20]">*</span>
    </label>

    <div className="min-h-[90px] rounded-xl border border-[#EAECF0] bg-[#FCFCFD] px-4 py-4 shadow-sm">
      <p className="text-sm leading-6 text-[#344054] whitespace-pre-wrap">
        {po.billingAddress ||
          "5,29-KS Smart Solutions Pvt Ltd,\nAnna Salai, Teynampet"}
      </p>
    </div>
  </div>

</div>
<br />

<div className="rounded-xl border border-[#EAECF0] bg-white shadow-sm overflow-hidden">
 <div className="border-b border-[#EAECF0] bg-[#FCFCFD] px-6 py-5">

    <h2 className="text-[15px] font-semibold text-[#344054]">
      Ordered Items
    </h2>

    <p className="mt-1 text-xs text-[#98A2B3]">
      Items or service details of the Purchase Order.
    </p>

  </div>

  <table className="w-full text-sm border border-[#EAECF0] border-collapse">

    <thead className="bg-[#F9FAFB]">

      <tr>

        <th className="px-6 py-4 text-xs font-semibold text-[#667085] text-left">
          S.NO
        </th>

        <th className="px-6 py-4 text-xs font-semibold text-[#667085] text-left">
          Items
        </th>

        <th className="px-6 py-4 text-xs font-semibold text-[#667085] text-left">
          Ordered
        </th>

        <th className="px-6 py-4 text-xs font-semibold text-[#667085] text-left">
          Accepted
        </th>

        <th className="px-6 py-4 text-xs font-semibold text-[#667085] text-left">
          Rejected
        </th>

        <th className="px-6 py-4 text-xs font-semibold text-[#667085] text-left">
          Billed
        </th>

        <th className="px-6 py-4 text-xs font-semibold text-[#667085] text-left">
          Balance
        </th>

      </tr>

    </thead>

    <tbody>

      {po.items.map((item, index) => {

        const accepted = (po.goodsReceipts || []).reduce((sum, grn) => {

          const row = grn.items.find(
            (i) => i.purchaseOrderItemId === item.id
          );

          return sum + Number(row?.acceptedQuantity || 0);

        }, 0);

        const rejected = (po.goodsReceipts || []).reduce((sum, grn) => {

          const row = grn.items.find(
            (i) => i.purchaseOrderItemId === item.id
          );

          return sum + Number(row?.rejectedQuantity || 0);

        }, 0);

        const billed = accepted;

        const balance = item.quantity - accepted;

        return (

          <tr
            key={item.id}
            className="border-b border-[#F2F4F7] hover:bg-[#FAFAFA] transition"
          >

            <td className="px-6 py-4 text-black">
              {index + 1}
            </td>

            <td className="px-6 py-4 text-black">
              {item.product?.productName}
            </td>

            <td className="px-6 py-4  text-black">
              {item.quantity}
            </td>

            <td className="px-6 py-4  text-black">
              {accepted}
            </td>

            <td className="px-6 py-4  text-black">
              {rejected}
            </td>

            <td className="px-6 py-4  text-black">
              {billed}
            </td>

            <td className="px-6 py-4 font-medium text-black">
              {balance}
            </td>

          </tr>

        );

      })}

    </tbody>

    <tfoot>
  <tr className="bg-[#FCFCFD] font-semibold border-t border-[#EAECF0]">
    <td></td>

    <td className="px-6 py-4 text-[#101828]">
      Total
    </td>

    <td className="px-6 py-4  text-[#101828]">
      {po.items.reduce(
        (sum, item) => sum + Number(item.quantity || 0),
        0
      )}
    </td>

    <td className="px-6 py-4 text-[#101828]">
      {po.items.reduce((sum, item) => {
        const accepted = (po.goodsReceipts || []).reduce((total, grn) => {
          const row = grn.items.find(
            (i) => i.purchaseOrderItemId === item.id
          );
          return total + Number(row?.acceptedQuantity || 0);
        }, 0);

        return sum + accepted;
      }, 0)}
    </td>

    <td className="px-6 py-4 text-[#101828]">
      {po.items.reduce((sum, item) => {
        const rejected = (po.goodsReceipts || []).reduce((total, grn) => {
          const row = grn.items.find(
            (i) => i.purchaseOrderItemId === item.id
          );
          return total + Number(row?.rejectedQuantity || 0);
        }, 0);

        return sum + rejected;
      }, 0)}
    </td>

    <td className="px-6 py-4 text-[#101828]">
      {po.items.reduce((sum, item) => {
        const billed = (po.goodsReceipts || []).reduce((total, grn) => {
          const row = grn.items.find(
            (i) => i.purchaseOrderItemId === item.id
          );
          return total + Number(row?.acceptedQuantity || 0);
        }, 0);

        return sum + billed;
      }, 0)}
    </td>

    <td className="px-6 py-4 text-[#101828]">
      {po.items.reduce((sum, item) => {
        const accepted = (po.goodsReceipts || []).reduce((total, grn) => {
          const row = grn.items.find(
            (i) => i.purchaseOrderItemId === item.id
          );
          return total + Number(row?.acceptedQuantity || 0);
        }, 0);

        return sum + (item.quantity - accepted);
      }, 0)}
    </td>
  </tr>
</tfoot>

  </table>

</div>

<div className="mt-8 rounded-2xl border border-[#EAECF0] bg-white shadow-sm">

  <div className="flex items-center gap-2 p-4 border-b border-[#EAECF0] bg-[#FCFCFD]">

    <button
      onClick={() => setActiveTab("grn")}
      className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
        activeTab === "grn"
          ? "bg-[#FCE7F6] text-[#C11574] shadow-sm"
          : "text-[#667085] hover:bg-[#F9FAFB] hover:text-[#344054]"
      }`}
    >
      GRN
    </button>

    <button
      onClick={() => setActiveTab("invoice")}
      className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
        activeTab === "invoice"
          ? "bg-[#FCE7F6] text-[#C11574] shadow-sm"
          : "text-[#667085] hover:bg-[#F9FAFB] hover:text-[#344054]"
      }`}
    >
      Invoices
    </button>

  </div>


</div>

{activeTab === "grn" && (
  <div className="mt-6">
    <div className="flex items-center justify-between mb-5">
      <div>
  <h2 className="text-lg font-semibold text-[#101828]">
    Goods Received
  </h2>

  <p className="text-sm text-[#667085] mt-1">
    Items received against this Purchase Order.
  </p>
</div>

      <button
        onClick={generateGRN}
        className="h-10 px-5 rounded-lg border border-[#C11574] text-[#C11574] text-sm font-medium hover:bg-[#FFF4FA]"
      >
        Generate New GRN
      </button>
    </div>


    {po.goodsReceipts?.length > 0 ? (
      po.goodsReceipts.map((grn) => (
        <div
  key={grn.id}
  className="mb-8 overflow-hidden rounded-2xl border border-[#BFDBFE] bg-[#EFF6FF] shadow-sm"
>

          <div className="flex items-start justify-between px-6 pt-6 pb-4">

            <div>

              <h3 className="text-lg font-semibold text-[#101828]">
  {grn.grnNumber}
</h3>

             <p className="text-sm text-[#667085] mt-1">
  Received on {new Date(grn.receivedDate).toLocaleDateString()}
</p>

            </div>

            <button
              onClick={() =>
                router.push(
                  `/dashboard/procurement/purchase-orders/${id}/invoice`
                )
              }
              className="h-10 px-4 rounded-lg border border-[#C11574] text-sm font-medium text-[#C11574] hover:bg-[#FFF4FA]"
            >
              Request for Invoice
            </button>

          </div>

          <table className="w-full text-sm">

           <thead className="bg-[#F9FAFB]">

              <tr>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-[#667085] border-b border-[#EAECF0]">
                  S.NO
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-[#667085] border-b border-[#EAECF0]">
                  Items
                </th>

                <th className="border-b border-[#EAECF0] px-4 py-3 text-center text-xs font-semibold text-[#667085]">
                  Received
                </th>

                <th className="border-b border-[#EAECF0] px-4 py-3 text-center text-xs font-semibold text-[#667085]">
                  Accepted
                </th>

                <th className="border-b border-[#EAECF0] px-4 py-3 text-center text-xs font-semibold text-[#667085]">
                  Rejected
                </th>

                <th className="border-b border-[#EAECF0] px-4 py-3 text-center text-xs font-semibold text-[#667085]">
                  Invoice Eligible
                </th>

                <th className="border-b border-[#EAECF0] px-4 py-3 text-right text-xs font-semibold text-[#667085]">
                  Billing Amount
                </th>

              </tr>

            </thead>

            <tbody>

              {grn.items.map((item, index) => {

                const poItem = po.items.find(
                  (x) => x.id === item.purchaseOrderItemId
                );

                const amount =
                  Number(poItem?.quantity || 0) *
                  Number(poItem?.unitPrice || 0);

                return (

                  <tr
                    key={item.id}
                    className="border-b border-[#F2F4F7] hover:bg-[#FCFCFD]"
                  >

                   <td className="border border-[#EAECF0] px-6 py-5 text-sm text-black">
                      {index + 1}
                    </td>

                   <td className="border border-[#EAECF0] px-6 py-5 text-sm text-black">
                      {poItem?.product?.productName}
                    </td>

                    <td className="border border-[#EAECF0] px-6 py-5 text-sm text-black">
                      {item.receivedQuantity}
                    </td>

                   <td className="border border-[#EAECF0] px-6 py-5 text-sm text-black">
  <span className="inline-flex items-center rounded-full bg-[#ECFDF3] px-3 py-1 text-xs font-medium text-[#027A48]">
    {item.acceptedQuantity}
  </span>
</td>
                    <td className="border border-[#EAECF0] px-6 py-5 text-sm text-black">
                      {item.rejectedQuantity}
                    </td>

                    <td className="border border-[#EAECF0] px-6 py-5 text-sm text-black">
                      {item.acceptedQuantity}
                    </td>

                    <td className="border border-[#EAECF0] px-6 py-5 text-sm text-black">
                     ₹{amount.toLocaleString("en-IN")}
                    </td>

                  </tr>

                );
              })}

            </tbody>

            <tfoot>

              <tr className="bg-[#FCFCFD] font-semibold">

                <td></td>

                <td className="border border-[#EAECF0] px-6 py-5 text-sm text-black">
                  Total
                </td>

               <td className="border border-[#EAECF0] px-6 py-5 text-sm text-black">

                  {grn.items.reduce(
                    (t, i) => t + i.receivedQuantity,
                    0
                  )}

                </td>

                <td className="border border-[#EAECF0] px-6 py-5 text-sm text-black">

                  {grn.items.reduce(
                    (t, i) => t + i.acceptedQuantity,
                    0
                  )}

                </td>

                <td className="border border-[#EAECF0] px-6 py-5 text-sm text-black">

                  {grn.items.reduce(
                    (t, i) => t + i.rejectedQuantity,
                    0
                  )}

                </td>

                <td className="border border-[#EAECF0] px-6 py-5 text-sm text-black">

                  {grn.items.reduce(
                    (t, i) => t + i.acceptedQuantity,
                    0
                  )}

                </td>

                <td className="border border-[#EAECF0] px-6 py-5 text-sm text-black">

                  ₹{" "}
                  {grn.items
                    .reduce((sum, item) => {
                      const poItem = po.items.find(
                        (x) =>
                          x.id === item.purchaseOrderItemId
                      );

                      return (
                        sum +
                        Number(item.acceptedQuantity) *
                          Number(poItem?.unitPrice || 0)
                      );
                    }, 0)
                    .toLocaleString()}

                </td>

              </tr>

            </tfoot>

          </table>

         <div className="border-t border-[#EAECF0] p-6">
  <label className="block text-sm font-medium text-[#344054] mb-2">
    Remarks
  </label>

  <textarea
    rows={4}
    value={remarks[grn.id] || ""}
    onChange={(e) =>
      setRemarks((prev) => ({
        ...prev,
        [grn.id]: e.target.value,
      }))
    }
    placeholder="Enter your remarks here for this GRN..."
    className="w-full rounded-lg border border-[#D0D5DD] bg-white px-4 py-3 text-sm text-[#101828] placeholder:text-[#98A2B3] focus:border-[#C11574] focus:ring-2 focus:ring-[#FCE7F6] outline-none resize-none"
  />
</div>

        </div>
      ))
    ) : (
      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-[#D0D5DD] bg-[#FCFCFD] py-20">

  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#F4F4F5]">
    📦
  </div>

  <h3 className="text-lg font-semibold text-[#101828]">
    No Goods Receipt Notes
  </h3>

  <p className="mt-2 text-sm text-[#667085] text-center max-w-md">
    No GRN has been generated for this Purchase Order yet.
    Generate a GRN once the vendor delivers the goods.
  </p>

  <button
    onClick={generateGRN}
    className="mt-6 rounded-lg bg-[#7A008C] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#650073]"
  >
    Generate GRN
  </button>

</div>
    )}


   </div>
  )}


   {activeTab === "invoice" && (
  <div className="mt-6 rounded-xl border border-[#EAECF0] bg-white shadow-sm overflow-hidden">
<div className="flex items-center justify-between px-6 py-6 bg-white border-b border-[#EAECF0]">    
  <div>
        <h2 className="text-lg font-semibold text-[#101828]">
    Invoices
</h2>

        <p className="text-sm text-[#667085] mt-1">
    View and manage invoices linked to this Purchase Order.
</p>
    </div>
  <div>
   
  </div>
  <button
  className="h-10 px-5 rounded-lg bg-[#7A008C] text-white text-sm font-medium hover:bg-[#650073] transition"
>
  Import Invoice
</button>
</div>


    <div className="mb-5 rounded-md border border-[#EAECF0] bg-[#FCFCFD] px-4 py-3">

      <span className="text-xs text-[#667085]">

        <span className="font-semibold">Note:</span>{" "}
        Track all invoices linked to this Purchase Order here.
        Financial Posting and payments are managed in
        <span className="ml-1 text-[#C11574] underline cursor-pointer">
          Account Payable
        </span>

      </span>

    </div>

<h3 className="text-sm font-semibold text-[#344054] mb-4">
    Invoice Summary
</h3>
<div className="overflow-hidden rounded-xl border border-[#EAECF0] bg-white shadow-sm">
  <table className="w-full">
    <thead className="bg-[#F9FAFB]">
      <tr>
        <th className="px-6 py-4 text-left text-xs font-semibold text-[#667085] border border-[#EAECF0]">
          S.NO
        </th>

       <th className="px-6 py-4 text-left text-xs font-semibold text-[#667085] border border-[#EAECF0]">
          GRN No
        </th>

       <th className="px-6 py-4 text-left text-xs font-semibold text-[#667085] border border-[#EAECF0]">
          Type
        </th>

        <th className="px-6 py-4 text-left text-xs font-semibold text-[#667085] border border-[#EAECF0]">
          Quantity
        </th>

       <th className="px-6 py-4 text-left text-xs font-semibold text-[#667085] border border-[#EAECF0]">
          Amount (₹)
        </th>

        <th className="px-6 py-4 text-left text-xs font-semibold text-[#667085] border border-[#EAECF0]">
          Invoice Status
        </th>

        <th className="px-6 py-4 text-left text-xs font-semibold text-[#667085] border border-[#EAECF0]">
          3-Way Matching
        </th>

        <th className="px-6 py-4 text-left text-xs font-semibold text-[#667085] border border-[#EAECF0]">
          Invoice Number
        </th>

        <th className="px-6 py-4 text-left text-xs font-semibold text-[#667085] border border-[#EAECF0]">
          Actions
        </th>
      </tr>
    </thead>

    <tbody>
      {(po.goodsReceipts || []).map((grn, index) => {
        const qty = grn.items.reduce(
          (sum, item) => sum + Number(item.acceptedQuantity || 0),
          0
        );

        const amount = grn.items.reduce((sum, item) => {
          const poItem = po.items.find(
            (x) => x.id === item.purchaseOrderItemId
          );

          return (
            sum +
            Number(item.acceptedQuantity || 0) *
              Number(poItem?.unitPrice || 0)
          );
        }, 0);

        return (
          <tr
            key={grn.id}
            className="border-t border-[#F2F4F7] hover:bg-[#FCFCFD]"
          >
            <td className="border border-[#EAECF0] px-6 py-5 text-sm text-black">{index + 1}</td>

            <td className="border border-[#EAECF0] px-6 py-5 text-sm text-black">
              {grn.grnNumber}
            </td>

            <td className="border border-[#EAECF0] px-6 py-5 text-sm text-black">
              Tax Invoice
            </td>

            <td className="border border-[#EAECF0] px-6 py-5 text-sm text-black">
              {qty}
            </td>

            <td className="border border-[#EAECF0] px-6 py-5 text-sm text-black">
              ₹{amount.toLocaleString("en-IN")}
            </td>

            <td className="border border-[#EAECF0] px-6 py-5 text-sm text-black">
              <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                Received
              </span>
            </td>

            <td className="border border-[#EAECF0] px-6 py-5 text-sm text-black">
              <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
                Matched
              </span>
            </td>

            <td className="border border-[#EAECF0] px-6 py-5 text-sm text-black">
              {`INV-${po.poNumber}`}
            </td>

            <td className="border border-[#EAECF0] px-6 py-5 text-sm text-black">
              <button
                onClick={() =>
                  router.push(
                    `/dashboard/procurement/purchase-orders/${id}/invoice`
                  )
                }
                className="rounded-lg border border-[#D0D5DD] px-4 py-2 text-sm font-medium text-[#344054] hover:bg-[#F9FAFB]"
              >
                View
              </button>
            </td>
          </tr>
        );
      })}
    </tbody>
  </table>
</div>

    <div className="flex justify-between items-center px-6 py-4 bg-[#FCFCFD] border-t border-[#EAECF0]">
    

    <div className="border-t border-[#EAECF0] py-3 text-center">
    <button className="text-[#C11574] text-sm font-medium">
        + Add New
    </button>
</div>
</div>

  </div>
)}

  
<div className="flex justify-end gap-4 mt-10">
  <button
    onClick={() => router.back()}
className="px-6 h-11 rounded-xl border border-[#D0D5DD] bg-white text-[#344054] font-medium shadow-sm hover:bg-[#F9FAFB] hover:shadow transition"
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
    className="px-6 h-11 rounded-xl bg-[#7A008C] text-white font-medium shadow-md hover:bg-[#650073] hover:shadow-lg transition"
  >
    {buttonText}
  </button>
)}
  
</div>
{showClosePopup && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

    <div className="bg-white rounded-2xl w-[450px] shadow-2xl border border-[#EAECF0]">

      <div className="p-8">

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
      {selectedGRN && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
    <div className="w-[700px] rounded-xl bg-white shadow-xl border border-[#EAECF0]">

      <div className="flex items-center justify-between border-b px-6 py-4">
        <div>
          <h2 className="text-lg font-semibold">
            {selectedGRN.grnNumber}
          </h2>
          <p className="text-sm text-gray-500">
            {new Date(selectedGRN.receivedDate).toLocaleDateString()}
          </p>
        </div>

        <button
          onClick={() => setSelectedGRN(null)}
          className="text-gray-500 text-xl"
        >
          ×
        </button>
      </div>

      <table className="w-full text-sm">
        <thead className="bg-[#F9FAFB]">
          <tr>
            <th className="px-6 py-3 text-left">Item</th>
            <th className="px-6 py-3 text-center">Received</th>
            <th className="px-6 py-3 text-center">Accepted</th>
            <th className="px-6 py-3 text-center">Rejected</th>
          </tr>
        </thead>

        <tbody>
          {selectedGRN.items.map((item) => {
            const poItem = po.items.find(
              (x) => x.id === item.purchaseOrderItemId
            );

            return (
              <tr key={item.id} className="border-b">
                <td className="border border-[#EAECF0] px-6 py-5 text-sm text-black">
                  {poItem?.product?.productName}
                </td>

                <td className="border border-[#EAECF0] px-6 py-5 text-sm text-black">
                  {item.receivedQuantity}
                </td>

                <td className="border border-[#EAECF0] px-6 py-5 text-sm text-black">
                  {item.acceptedQuantity}
                </td>

                <td className="border border-[#EAECF0] px-6 py-5 text-sm text-black">
                  {item.rejectedQuantity}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="border-t p-5 flex justify-end">
        <button
          onClick={() => setSelectedGRN(null)}
          className="px-5 py-2 rounded-lg bg-[#7A008C] text-white"
        >
          Close
        </button>
      </div>
    </div>
  </div>
)}
    </div>
  );
}