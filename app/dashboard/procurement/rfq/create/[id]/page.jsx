"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import Sidebar from "../../../../users/components/Sidebar";
import Topbar from "../../../../users/components/Topbar";
import Link from "next/link";
import ExistingVendorTable from "../../components/ExistingVendorTable";
import CreateVendorForm from "../../components/CreateVendorForm";

export default function CreateRFQPage() {
  const { id } = useParams();
  const router = useRouter();
  const [pr, setPr] = useState(null);
  const [selectedVendor, setSelectedVendor] = useState("");
  
  const [addedVendors, setAddedVendors] = useState([]);  
  const [selectedItems, setSelectedItems] = useState([]);
  const [deliveryCharge, setDeliveryCharge] = useState("");
const [deliveryType, setDeliveryType] = useState("");
const [returnResponsibility, setReturnResponsibility] = useState("");
const [replacementResponsibility, setReplacementResponsibility] = useState("");
const [showVendorModal, setShowVendorModal] = useState(false);
const [vendorTab, setVendorTab] = useState("existing");
const [rfqSubmitted, setRfQSubmitted] = useState(false);
const [rfqId, setRfqId] = useState(null);
const isReadOnly = rfqSubmitted;
const [vendorList, setVendorList] = useState([]);
const [products, setProducts] = useState([]);
const [selectedProduct, setSelectedProduct] = useState("");
const [addedProducts, setAddedProducts] = useState([]);

const fetchVendors = async () => {
  const res = await fetch("/api/vendor");
  const data = await res.json();

  setVendorList(data);
};
const fetchProducts = async () => {
  const res = await fetch("/api/products");
  const data = await res.json();

  setProducts(data);
};
useEffect(() => {
  fetchVendors();
  fetchProducts();
}, []);

useEffect(() => {
  localStorage.setItem(
    "rfqProducts",
    JSON.stringify(addedProducts)
  );
}, [addedProducts]);

useEffect(() => {
  const savedProducts = localStorage.getItem("rfqProducts");

  if (savedProducts) {
    setAddedProducts(JSON.parse(savedProducts));
  }
}, []);

useEffect(() => {
  localStorage.setItem(
    "rfqVendors",
    JSON.stringify(addedVendors)
  );
}, [addedVendors]);



  useEffect(() => {
    if (!id) return;

    const fetchPR = async () => {
      const res = await fetch(`/api/purchase-requisitions/${id}`);
      const data = await res.json();
      setPr(data);
    };

    fetchPR();
  }, [id]);
  
    if (!pr) {
    return <div className="p-10">Loading...</div>;
    }

const vendors = vendorList;

const handleAddVendor = () => {
  console.log("Selected Vendor:", selectedVendor);
  console.log("Vendors:", vendors);

  if (!selectedVendor) {
    alert("Please select a vendor");
    return;
  }

  const selectedVendorObj = vendors.find(
    (v) => Number(v.id) === Number(selectedVendor)
  );

  console.log("Selected Vendor Object:", selectedVendorObj);

  if (!selectedVendorObj) {
    alert("Vendor not found");
    return;
  }

  setAddedVendors((prev) => {
    if (prev.some((vendor) => Number(vendor.id) === Number(selectedVendorObj.id))) {
      return prev;
    }

    return [
      ...prev,
      {
        ...selectedVendorObj,
        items: [],
      },
    ];
  });

  setSelectedVendor("");
};

const handleAddProduct = () => {
  if (!selectedProduct) return;

  const productObj = products.find(
    (p) => p.id === Number(selectedProduct)
  );

  if (!productObj) return;

  const alreadyExists = addedProducts.some(
    (p) => p.id === productObj.id
  );

  if (alreadyExists) {
    alert("Product already added");
    return;
  }

  setAddedProducts((prev) => [
    ...prev,
    {
      ...productObj,
      quantity: 1,
      estimatedRate: productObj.estimatedPrice,
      unit: "Nos",
      remarks: "",
    },
  ]);

  setSelectedProduct("");
};

const handleSubmit = async () => {
  try {
    if (
  !deliveryCharge ||
  !deliveryType ||
  !returnResponsibility ||
  !replacementResponsibility
) {
  alert("Please select all Additional Information fields");
  return;
}
    if (addedVendors.length === 0) {
      alert("Please add at least one vendor.");
      return;
    }

const vendorIds = addedVendors.map(
  (vendor) => vendor.id
);

const res = await fetch("/api/rfq", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
  purchaseRequisitionId: pr.id,
  projectId: pr.projectId,
  vendorIds,

  deliveryCharge,
  deliveryType,
  returnResponsibility,
  replacementResponsibility,
  items: addedProducts.map((item) => ({
  productId: item.id,
  quantity: item.quantity,
  estimatedRate: item.estimatedRate,
})),
}),
});

const data = await res.json();

console.log("RFQ Response:", data);

if (!res.ok) {
  console.log(data);
  alert(JSON.stringify(data));
  return;
}

    alert("RFQ Created Successfully");

   setRfQSubmitted(true);
setRfqId(data.data.id);
  } catch (error) {
    console.error(error);
    alert("Something went wrong.");
  }
};

const handleVendorCreated = (newVendor) => {
  setAddedVendors((prev) => [
    ...prev,
    {
      ...newVendor,
      items: [],
    },
  ]);

  fetchVendors();

  setShowVendorModal(false);
};

const handleSendMail = async () => {
  await fetch(`/api/rfq/${rfqId}/send-mail`, {
    method: "POST",
  });

  alert("Mail sent successfully");

  router.push(
    `/dashboard/procurement/rfq/${rfqId}/quotation`
  );
};
  return (
   <div className="flex min-h-screen bg-[#FCFAFE]">
      <Sidebar />

      <div className="flex-1 flex flex-col ml-[74px]">
        <Topbar />

       <div className="
bg-white
rounded-3xl
border
border-gray-300
shadow-lg
p-8
space-y-10
">
          <div className="mb-5 flex items-center gap-2 text-xs text-gray-500">
            <span>Procurement</span>
            <span>›</span>
            <span>{pr.prNumber}</span>
            <span>›</span>
            <span className="font-semibold">Create RFQ</span>
            </div>

          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-[32px] font-semibold text-[#1F1F1F]">
                Create Request For Quotation
              </h1>

              <p className="mt-2 text-[14px] text-[#7B7B8B] leading-6">
                Create quotation requests by selecting approved purchase
                requisitions and sending it for approval as per the configured
                workflow.
              </p>
            </div>

            <button className="rounded-md border border-[#8A2BE2] bg-white px-5 py-2 text-sm font-medium text-[#8A2BE2] transition hover:bg-[#8A2BE2] hover:text-white">
                Audit Log
            </button>
          </div>

         <div className="
bg-white
rounded-3xl
border border-gray-300

shadow-lg
p-8
space-y-10
">
            <div className="mb-8">
              <div className="flex overflow-hidden rounded-lg border border-gray-300 mb-8">
  <div className="flex-1 bg-[#F7DDFB] py-4 text-center text-sm font-semibold text-[#B014A6]">
    RFQ Sent to Vendors
  </div>

  <div className="flex-1 bg-[#E8E8E8] py-4 text-center text-sm font-medium text-[#555]">
    Vendors Quotation
  </div>

  <div className="flex-1 bg-[#E8E8E8] py-4 text-center text-sm font-medium text-[#999]">
    Purchase Order
  </div>
</div>

               <div className="
                flex
                overflow-hidden
                rounded-xl
                border
                border-gray-300
                shadow-sm
                mb-8
                ">
                <div className="h-2 bg-[#7A008C] rounded-full"></div>
                <div className="h-2 bg-gray-200 rounded-full"></div>
                <div className="h-2 bg-gray-200 rounded-full"></div>
              </div>
            </div>

            <div className="
grid
grid-cols-1
md:grid-cols-2
xl:grid-cols-3
gap-6
mb-10
">
              <div>
                <label className="text-xs font-medium uppercase tracking-wide text-[#7C7C8A]">
                  PR Number
                </label>
                <input
                  className="
mt-2
h-11
w-full
rounded-xl
border
border-gray-300 
bg-white
px-4
text-sm
focus:border-purple-600
focus:ring-2
focus:ring-purple-100
outline-none
transition
"
                  value={pr.prNumber}
                  readOnly
                />
              </div>

              <div>
                <label className="text-xs font-medium uppercase tracking-wide text-[#7C7C8A]">
                  Project Number
                </label>
                <input
                  className="
mt-2
h-11
w-full
rounded-xl
border
border-gray-300
bg-white
px-4
text-sm
focus:border-purple-600
focus:ring-2
focus:ring-purple-100
outline-none
transition
"
                  value={pr.project?.projectCode || ""}
                  readOnly
                />
              </div>

              <div>
                <label className="text-xs font-medium uppercase tracking-wide text-[#7C7C8A]">
                  Requester Department
                </label>
                <input
                  className="
                  mt-2
                  h-11
                  w-full
                  rounded-xl
                  border
                  border-gray-300
                  bg-white
                  px-4
                  text-sm
                  focus:border-purple-600
                  focus:ring-2
                  focus:ring-purple-100
                  outline-none
                  transition
                  "
                  value={pr.requestorDept || ""}
                  readOnly
                />
              </div>

              <div>
                <label className="text-xs font-medium uppercase tracking-wide text-[#7C7C8A]">
                  Category
                </label>
                <select
                value={pr.category || ""}
                disabled
                className="
mt-2
h-11
w-full
rounded-xl
border
border-gray-300 
bg-white
px-4
text-sm
focus:ring-2
focus:ring-purple-200
focus:border-purple-600
outline-none
transition
"                >
                <option value="Goods">Goods</option>
                <option value="Services">Services</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-medium uppercase tracking-wide text-[#7C7C8A]">
                  Priority
                </label>
                <select
                value={pr.priority || ""}
                    disabled

                className="
mt-2
h-11
w-full
rounded-xl
border
border-gray-300
bg-white
px-4
text-sm
focus:ring-2
focus:ring-purple-200
focus:border-purple-600
outline-none
transition
"              >
                <option value="Normal">Normal</option>
                <option value="Urgent">Urgent</option>
                <option value="Critical">Critical</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-medium uppercase tracking-wide text-[#7C7C8A]">
                  Expected Date
                </label>
                <input
                type="date"
                value={pr.expectedDeliveryDate?.split("T")[0] || ""}
                readOnly
                className="mt-1 h-12 w-full rounded-lg border border-gray-300 px-3"
                />
              </div>

              <div>
                <label className="text-xs font-medium uppercase tracking-wide text-[#7C7C8A]">
                  Request Type
                </label>
                <select className="mt-1 h-12 w-full rounded-lg border border-gray-300 bg-white px-3 text-[14px] text-[#374151] outline-none focus:border-[#8B2BBF] focus:ring-2 focus:ring-[#EED9FA]">
                  <option>Recurring</option>
                  <option>One Time</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-medium uppercase tracking-wide text-[#7C7C8A]">
                  Due Date
                </label>
                <input
                  type="date"
                  className="mt-1 h-12 w-full rounded-xl border border-gray-300 bg-white px-3 text-[14px] text-[#374151] outline-none focus:border-[#8B2BBF] focus:ring-2 focus:ring-[#EED9FA]"
                />
              </div>

              <div>
                <label className="text-xs font-medium uppercase tracking-wide text-[#7C7C8A]">
                  Lead Confirmation Before
                </label>
                <select className="
h-11
rounded-xl
border
border-gray-300
bg-white
px-4
focus:border-[#8A2BE2]
focus:ring-2
focus:ring-[#EFE3FB]
outline-none
">
                  <option>1 Day</option>
                  <option>3 Days</option>
                  <option>5 Days</option>
                </select>
              </div>
            </div>

            <div className="mb-5">
              <label className="text-xs font-medium uppercase tracking-wide text-[#7C7C8A]">
                Delivery Address
              </label>

              <textarea
                value={pr.deliveryAddress || ""}
                 readOnly

                className="
mt-2
w-full
rounded-xl
border
border-gray-300
bg-white
p-4
text-sm
focus:ring-2
focus:ring-purple-200
focus:border-purple-600
outline-none
resize-none
"
                />
            </div>

            <div className="mb-6">
              <label className="text-xs font-medium uppercase tracking-wide text-[#7C7C8A]">
                Notes For Vendors
              </label>

              <textarea
                value={pr.notesForVendor || ""}
                readOnly
                className="
mt-2
w-full
rounded-xl
border
border-gray-300
bg-white
p-4
text-sm
focus:ring-2
focus:ring-purple-200
focus:border-purple-600
outline-none
resize-none
"
                />
            </div>

            <h2 className="mb-5 text-lg font-semibold text-[#1F2937]">
              Select Vendors
            </h2>

           <div className="
overflow-hidden
rounded-2xl
border
border-gray-300
bg-white
shadow-sm
mb-10
">
              <table className="w-full border-collapse bg-white">
                <thead className="bg-[#FAFAFB] border-b border-[#E5E7EB]">
                  <tr>
                    <th className="px-4 py-3 border-b border-[#E5E7EB] text-left text-xs font-semibold uppercase tracking-wide text-[#6B7280]">S.No</th>
                    <th className="px-4 py-3 border-b border-[#E5E7EB] text-left text-xs font-semibold uppercase tracking-wide text-[#6B7280]">Vendor Name</th>
                    <th className="px-4 py-3 border-b border-[#E5E7EB] text-left text-xs font-semibold uppercase tracking-wide text-[#6B7280]">Contact No</th>
                    <th className="px-4 py-3 border-b border-[#E5E7EB] text-left text-xs font-semibold uppercase tracking-wide text-[#6B7280]">Mail</th>
                    <th className="px-4 py-3 border-b border-[#E5E7EB] text-left text-xs font-semibold uppercase tracking-wide text-[#6B7280]">GST No</th>
                    <th className="px-4 py-3 border-b border-[#E5E7EB] text-left text-xs font-semibold uppercase tracking-wide text-[#6B7280]">Address</th>
                  </tr>
                </thead>

                <tbody>

                {addedVendors.map((vendor,index)=>(
                <tr
                    key={vendor.id}
                    className="
border-b
border-[#F3F4F6]
hover:bg-[#FCFAFE]
transition-colors
"
                  >
                    <td className="px-4 py-4">
                      {index + 1}
                    </td>

                    <td className="px-4 py-4 font-medium text-[#4B5563]">
                      {vendor.vendorName}
                    </td>

                    <td className="px-4 py-4 text-gray-600">
                      {vendor.contactNumber}
                    </td>

                    <td className="px-4 py-4 text-gray-600">
                      {vendor.contactEmail}
                    </td>

                    <td className="px-4 py-4 text-gray-600">
                      {vendor.gstNumber}
                    </td>

                    <td className="px-4 py-4 text-gray-600">
                      {vendor.address}
                    </td>
                  </tr>

                ))}
                                </tbody>
                              </table>

                              {!isReadOnly && (
<div className="p-3 border-t">
                               <div className="flex gap-3 items-center">
  <select
    value={selectedVendor}
    disabled={isReadOnly}
    onChange={(e) => {
      if (e.target.value === "add-new") {
        router.push("/dashboard/procurement/vendors/create");
        return;
      }

      setSelectedVendor(e.target.value);
    }}
    className="
      h-11 w-[320px]
      rounded-xl
      border border-gray-300

      bg-white
      px-4
      text-sm
      shadow-sm
      focus:border-[#8A2BE2]
      focus:ring-2
      focus:ring-[#EED9FA]
      outline-none
    "
  >
    <option value="">Select Vendor</option>

    {vendors.map((vendor) => (
      <option key={vendor.id} value={vendor.id}>
        {vendor.vendorName}
      </option>
    ))}

    <option value="add-new">
      + Add Vendor
    </option>
  </select>

  <button
    onClick={handleAddVendor}
      disabled={isReadOnly}

    className="
      h-11
      rounded-xl
      bg-[#7A008C]
      px-6
      text-white
      font-medium
      hover:bg-[#62006f]
    "
  >
    Add
  </button>
</div>
                <div className="flex justify-end gap-3 mb-4">

<button
  onClick={() => setShowVendorModal(true)}
  className="
  rounded-lg border border-[#8A2BE2]
  bg-white px-4 py-2 text-sm
  font-medium text-[#8A2BE2]
  hover:bg-[#FAF5FF]
"
>
  + Add Vendor
</button>

              </div>
                </div>
              )}
            </div>

            <h2 className="mb-5 text-lg font-semibold text-[#1F2937]">
              Added Items
            </h2>

              <div className="
                border
                border-gray-300 
                rounded-2xl
                overflow-hidden 
                bg-white
                shadow-sm
                mb-8
                ">
              <table className="w-full border-collapse bg-white">
                <thead className="bg-[#FAFAFB] border-b border-[#E5E7EB]">
                  <tr className="border-b border-gray-300 hover:bg-[#FCFAFE]">
                    <th className=" px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-700 border-b ">S.No</th>
                    <th className=" px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-700 border-b ">Item Name</th>
                    <th className=" px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-700 border-b ">Item Code</th>
                    <th className=" px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-700 border-b ">Qty</th>
                    <th className=" px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-700 border-b ">Est Rate</th>
                    <th className=" px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-700 border-b ">Unit</th>
                    <th className=" px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-700 border-b ">Remarks</th>
                  </tr>
                </thead>

               <tbody>
  {addedProducts.map((item, index) => (
    <tr
      key={item.id}
     className="
border-b
border-[#F3F4F6]
hover:bg-[#FCFAFE]
transition-colors
"
    >
      <td className="px-5 py-4 text-sm text-gray-600">
        {index + 1}
      </td>

      <td className="px-4 py-4 font-medium text-[#4B5563]">
        {item.productName}
      </td>

     <td className="px-5 py-4 text-sm text-gray-600">
        {item.productCode}
      </td>

      <td className="px-5 py-4 text-sm text-gray-600">
        {item.quantity}
      </td>

      <td className="px-5 py-4 text-sm text-gray-600">
        ₹ {item.estimatedRate}
      </td>

      <td className="px-5 py-4 text-sm text-gray-600">
        {item.unit}
      </td>

      <td className="px-5 py-4 text-sm text-gray-600">
        {item.remarks || "-"}
      </td>

      {!isReadOnly && (
<td className="px-5 py-4 text-sm text-gray-600">
  <button
    onClick={() =>
      router.push("/dashboard/procurement/products/create")
    }
    className="
h-11
rounded-xl
bg-[#8A2BE2]
px-6
font-medium
text-white
shadow-md
hover:bg-purple-700
transition
"
  >
    ✏️
  </button>
</td>
)}
    </tr>
  ))}
</tbody>
              </table>

              <div className="flex gap-3 p-3 border-t">
  <select
    value={selectedProduct}
    onChange={(e) =>
      setSelectedProduct(e.target.value)
    }
   className="
h-11
rounded-xl
border
border-gray-300 
bg-white
px-4
focus:border-[#8A2BE2]
focus:ring-2
focus:ring-[#EFE3FB]
outline-none
"

  >
    <option value="">
      Select Product
    </option>

    {products.map((product) => (
      <option
        key={product.id}
        value={product.id}
      >
        {product.productName}
      </option>
    ))}

    <option value="add-item">
      + Add Item
    </option>
  </select>

  <button
    onClick={handleAddProduct}
    className="
      bg-[#8A2BE2]
      text-white
      px-5
      rounded-xl
    "
  >
    Add
  </button>
</div>
            </div>

             <h2 className="mb-4 text-lg font-semibold text-gray-500 border-b border-gray-300 pb-2">
                Additional Info
              </h2>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-8">

  <div>
    <label className="text-sm font-medium text-[#4B5563]">
      Items Price Inclusive of Delivery Charges * *
    </label>

    <select
      value={deliveryCharge}
      onChange={(e) => setDeliveryCharge(e.target.value)}
       disabled={isReadOnly}
      className="mt-2 h-12 w-full rounded-xl border border-gray-300 px-4 bg-white"
    >
      <option value="">Select</option>
      <option value="yes">Yes</option>
      <option value="no">No</option>
    </select>
  </div>

  <div>
    <label className="text-sm font-medium text-[#4B5563]">
      Delivery Responsibility *
    </label>

    <select
      value={deliveryType}
      onChange={(e) => setDeliveryType(e.target.value)}
      className="mt-2 h-12 w-full rounded-xl border border-gray-300 px-4 bg-white"
    >
      <option value="">Select</option>
      <option value="Door Delivery">Partial Delivery Allowed</option>
      <option value="Pickup">Not allowed</option>
    </select>
  </div>

  <div>
    <label className="text-sm font-medium text-[#4B5563]">
      Return Responsibility *
    </label>

    <select
      value={returnResponsibility}
      onChange={(e) =>
        setReturnResponsibility(e.target.value)
      }
      className="mt-2 h-12 w-full rounded-xl border border-gray-300 px-4 bg-white"
    >
      <option value="">Select</option>
      <option value="yes">Yes</option>
      <option value="No">No</option>
    </select>
  </div>

  <div>
    <label className="text-sm font-medium text-[#4B5563]">
      Replacement Responsibility *
    </label>

    <select
      value={replacementResponsibility}
      onChange={(e) =>
        setReplacementResponsibility(e.target.value)
      }
      className="mt-2 h-12 w-full rounded-xl border border-gray-300 px-4 bg-white"
    >
      <option value="">Select</option>
      <option value="yes">Yes</option>
      <option value="no">No</option>
    </select>
  </div>

</div>

           <h2 className="mb-5 text-lg font-semibold text-[#1F2937]">
              Attachments
            </h2>

            <div className="
border
border-gray-300 
rounded-2xl
overflow-hidden
bg-white
shadow-sm
mb-8
">
              <table className="w-full text-sm">
                <thead className="bg-[#FAFAFB] text-[#4B5563] uppercase text-xs tracking-wide">
                  <tr className="border-b border-gray-300 hover:bg-[#FCFAFE]">
                    <th className="p-3">S.No</th>
                    <th className="p-3 text-left">
                      Attachment Name
                    </th>
                    <th className="p-3 text-left">
                      Uploaded Files
                    </th>
                  </tr>
                </thead>

                <tbody>
  {pr.attachments?.map((file, index) => (
    <tr
  key={index}
  className="border-b border-[#F3F4F6] hover:bg-[#FCFAFE] transition-colors"
>

      <td className="p-4 text-center">
        {index + 1}
      </td>

      <td className="p-4">
        {file.name}
      </td>

      <td className="p-4">
        <a
          href={file.url}
          target="_blank"
          className="text-[#8A2BE2] underline"
        >
          View File
        </a>
      </td>

    </tr>
  ))}
</tbody>
              </table>
            </div>

                       <div className="flex justify-end gap-3">
              <Link href="/dashboard/procurement/rfq">
                <button className="
                  h-11
                  rounded-xl
                  border
                  border-gray-300
                  bg-white
                  px-6
                  text-[#4B5563]
                  hover:bg-gray-50
                  transition
                  ">
                  Cancel
                </button>
              </Link>

              <button className="
                h-11
                rounded-xl
                border
                border-purple-600
                bg-white
                px-6
                font-medium
                text-purple-700
                hover:bg-purple-50
                transition
                ">
                Save as Draft
              </button>

             {!rfqSubmitted ? (
              <button
                onClick={handleSubmit}
                className="
                  h-11
                  rounded-xl
                  bg-[#8A2BE2]
                  px-6
                  font-medium
                  text-white
                  shadow-md
                  hover:bg-purple-700
                  transition
                  "
              >    
                Submit
              </button>
            ) : (
              <button
                onClick={handleSendMail}
                className="rounded-lg bg-[#8A2BE2] text-white px-6 py-2.5"
              >
                Send Mail To Vendors
              </button>
            )}
            </div>

            {showVendorModal && (
              <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                <div className="bg-white rounded-2xl w-[1100px] max-h-[90vh] overflow-y-auto p-8">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold">
                      Add New Vendor
                    </h2>

                    <button
                      onClick={() => setShowVendorModal(false)}
                      className="text-xl"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <button
                      onClick={() => setVendorTab("existing")}
                      className={`h-12 rounded-lg border ${
                        vendorTab === "existing"
                          ? "bg-[#F7DDFB] text-[#B014A6] border-[#B014A6]"
                          : "border-gray-300"
                      }`}
                    >
                      Existing Vendor
                    </button>

                    <button
                      onClick={() => setVendorTab("create")}
                      className={`h-12 rounded-lg border ${
                        vendorTab === "create"
                          ? "bg-[#F7DDFB] text-[#B014A6] border-[#B014A6]"
                          : "border-gray-300"
                      }`}
                    >
                      Create New Vendor
                    </button>
                  </div>

                  {vendorTab === "existing" ? (
  <ExistingVendorTable
    vendors={vendors}
    addedVendors={addedVendors}
    setAddedVendors={setAddedVendors}
    closeModal={() => setShowVendorModal(false)}
  />
) : (
  <CreateVendorForm
  closeModal={() => setShowVendorModal(false)}

  onVendorCreated={handleVendorCreated}
/>
)}
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
      
    </div>
  );
}  