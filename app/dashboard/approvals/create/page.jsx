"use client";

import Sidebar from "../../users/components/Sidebar";
import Topbar from "../../users/components/Topbar";
import { useState } from "react";

export default function CreateApprovalPage() {
const [formData, setFormData] = useState({
  name: "",
  description: "",
  module: "",
  levels: 5,
  status: "Activated",
  approvalType: "User Based",
  amountBased: false,
  notifyApp: false,
  notifyMail: false,

  approvalLevels: [1, 2, 3, 4, 5].map((level) => ({
    level,
    approverId: "",
    canApprove: false,
    canReject: false,
    canHold: false,
  })),
});
const [attachment, setAttachment] = useState(null);
const handleSubmit = async () => {
  try {
    const res = await fetch("/api/approvals", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.error || "Failed");
    }

    alert("Approval Created Successfully");
    window.location.href = "/dashboard/approvals";
  } catch (error) {
    console.error(error);
    alert("Failed to create approval");
  }
};

  return (
    <div className="flex min-h-screen bg-[#F7F7FA]">
      <Sidebar />

      <div className="flex-1 flex flex-col ml-[74px]">
        <Topbar />

        <div className="flex-1 overflow-y-auto pt-[100px] px-8 py-7">
          <div className="max-w-6xl mx-auto">
            <div className="text-sm font-medium text-gray-500 mb-6">
              Roles &gt; Create New
            </div>

            <h1 className="text-4xl font-bold text-[#7A008C] mb-2">
              Create New Approval
            </h1>

<p className="text-[14px] leading-6 text-[#6B7280] mb-10 max-w-4xl">
                Create and configure approval workflows by defining approval
              levels and approvers.
            </p>

            <div className="bg-white rounded-3xl border border-[#E5E7EB] shadow-[0_8px_30px_rgba(0,0,0,0.06)] p-10">
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block mb-2 text-[13px] font-medium text-[#6B7280]">
                    Approval Name
                  </label>

                  <input
  type="text"
  value={formData.name}
  onChange={(e) =>
    setFormData({
      ...formData,
      name: e.target.value,
    })
  }
  placeholder="Purchase Order Approval"
className="w-full h-10 rounded-lg border border-[#D1D5DB] bg-white px-4 text-[14px] text-[#374151] placeholder:text-[#9CA3AF] focus:ring-2 focus:ring-[#F4D4FB] focus:border-[#A21CAF] outline-none"></input>                </div>

                <div className="flex gap-3">
  <label
      className={`flex items-center gap-2 px-5 h-10 rounded-lg border cursor-pointer transition
      ${
        formData.status === "Activated"
          ? "bg-[#FDF2FF] border-[#D946EF] text-[#A21CAF]"
          : "bg-white border-[#D1D5DB] text-[#6B7280] hover:border-[#A21CAF]"
      }`}
    >
      <input
        type="radio"
        name="status"
        checked={formData.status === "Activated"}
        onChange={() =>
          setFormData({
            ...formData,
            status: "Activated",
          })
        }
        className="accent-[#A21CAF]"
      />
      <span className="text-sm font-medium">Activate</span>
    </label>

    <label
      className={`flex items-center gap-2 px-5 h-10 rounded-lg border cursor-pointer transition
      ${
        formData.status === "Deactivated"
          ? "bg-[#FDF2FF] border-[#D946EF] text-[#A21CAF]"
          : "bg-white border-[#D1D5DB] text-[#6B7280] hover:border-[#A21CAF]"
      }`}
    >
      <input
        type="radio"
        name="status"
        checked={formData.status === "Deactivated"}
        onChange={() =>
          setFormData({
            ...formData,
            status: "Deactivated",
          })
        }
        className="accent-[#A21CAF]"
      />
      <span className="text-sm font-medium">De-Activate</span>
    </label>
</div>
              </div>

              <div className="mb-6">
                <label className="block mb-2 text-sm font-semibold text-gray-800">
                  Approval Description
                </label>

                <textarea
  rows={3}
  value={formData.description}
  onChange={(e) =>
    setFormData({
      ...formData,
      description: e.target.value,
    })
  }
className="w-full rounded-lg border border-[#D1D5DB] px-4 py-3 text-[14px] text-[#374151] focus:ring-2 focus:ring-[#F4D4FB] focus:border-[#A21CAF] outline-none resize-none"/>
              </div>

              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block mb-2 text-sm font-semibold text-gray-800">
                    Choose Module
                  </label>

                  <select
  value={formData.module}
  onChange={(e) =>
    setFormData({
      ...formData,
      module: e.target.value,
    })
  }
className="w-full rounded-lg border border-[#D1D5DB] px-4 py-3 text-[14px] text-[#374151] focus:ring-2 focus:ring-[#F4D4FB] focus:border-[#A21CAF] outline-none resize-none">
                    <option>Purchase Requisition</option>
                    <option>Purchase Order</option>
                    <option>Reimbursement</option>
                  </select>
                </div>

                <div>
                  <label className="block mb-2 text-sm font-semibold text-gray-800">
                    Select Approval Levels
                  </label>

                  <select
  value={formData.levels}
  onChange={(e) =>
    setFormData({
      ...formData,
      levels: Number(e.target.value),
    })
  }
className="w-full rounded-lg border border-[#D1D5DB] px-4 py-3 text-[14px] text-[#374151] focus:ring-2 focus:ring-[#F4D4FB] focus:border-[#A21CAF] outline-none resize-none">
  <option value={5}>5 Levels</option>
  <option value={4}>4 Levels</option>
  <option value={3}>3 Levels</option>
</select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-6 mb-8">
                <div>
                  <label className="block mb-2 text-sm font-semibold text-gray-800">
                    Approval Type
                  </label>

                  <div className="flex gap-4">
                    <label
      className={`flex items-center gap-2 px-5 h-10 rounded-lg border cursor-pointer transition
      ${
        formData.approvalType === "Role Based"
          ? "bg-[#FDF2FF] border-[#D946EF] text-[#A21CAF]"
          : "bg-white border-[#D1D5DB] text-[#6B7280] hover:border-[#A21CAF]"
      }`}
    >
      <input
        type="radio"
        name="type"
        checked={formData.approvalType === "Role Based"}
        onChange={() =>
          setFormData({
            ...formData,
            approvalType: "Role Based",
          })
        }
        className="accent-[#A21CAF]"
      />
      <span className="text-sm font-medium">Role Based</span>
    </label>

    <label
      className={`flex items-center gap-2 px-5 h-10 rounded-lg border cursor-pointer transition
      ${
        formData.approvalType === "User Based"
          ? "bg-[#FDF2FF] border-[#D946EF] text-[#A21CAF]"
          : "bg-white border-[#D1D5DB] text-[#6B7280] hover:border-[#A21CAF]"
      }`}
    >
      <input
        type="radio"
        name="type"
        checked={formData.approvalType === "User Based"}
        onChange={() =>
          setFormData({
            ...formData,
            approvalType: "User Based",
          })
        }
        className="accent-[#A21CAF]"
      />
      <span className="text-sm font-medium">User Based</span>
    </label>
                  </div>
                </div>

                <div>
                  <label className="block mb-2 text-sm font-semibold text-gray-800">
                    Include Amount Based Approval
                  </label>

                  <select
  value={formData.amountBased ? "Yes" : "No"}
  onChange={(e) =>
    setFormData({
      ...formData,
      amountBased: e.target.value === "Yes",
    })
  }
  className="w-full rounded-lg border border-[#D1D5DB] px-4 py-3 text-[14px] text-[#374151] focus:ring-2 focus:ring-[#F4D4FB] focus:border-[#A21CAF] outline-none"
>
  <option>No</option>
  <option>Yes</option>
</select>
                </div>

                <div>
                  <label className="block mb-2 text-sm font-semibold text-gray-800">
                    Notification Settings
                  </label>

                  <div className="flex gap-3">
                                        <label className="flex items-center gap-2 px-4 h-10 rounded-lg border border-[#F3D5F8] bg-[#FDF4FF] text-[#A21CAF] cursor-pointer">
  <input
    type="checkbox"
    checked={formData.notifyApp}
    onChange={(e)=>
      setFormData({
        ...formData,
        notifyApp:e.target.checked
      })
    }
    className="accent-[#A21CAF]"
  />
  In-App
</label>

<label className="flex items-center gap-2 px-4 h-10 rounded-lg border border-[#F3D5F8] bg-[#FDF4FF] text-[#A21CAF] cursor-pointer">
  <input
    type="checkbox"
    checked={formData.notifyMail}
    onChange={(e)=>
      setFormData({
        ...formData,
        notifyMail:e.target.checked
      })
    }
    className="accent-[#A21CAF]"
  />
  In-Mail
</label>
                  </div>
                </div>
              </div>

              <h2 className="text-[24px] font-semibold text-[#111827]">
Approval Levels
</h2>

<p className="text-[13px] text-[#6B7280] mb-5">
Specifies the ordered stages of approval a request must go through.
</p>

              <table className="w-full rounded-xl overflow-hidden border border-[#E5E7EB]">
                <thead className="bg-gradient-to-r from-[#FCFAFD] to-[#F8F3FF]">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-[#6B7280]
uppercase tracking-wide text-xs">Level</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-[#6B7280]
uppercase tracking-wide text-xs">Approver</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-[#6B7280]
uppercase tracking-wide text-xs">Actions</th>
                  </tr>
                </thead>

                <tbody>
  {formData.approvalLevels.map((item, index) => (
    <tr
  key={index}
className="border-t border-[#E5E7EB] hover:bg-[#FCF5FF] transition-colors duration-200">
      <td className="px-6 py-4 text-gray-700">L{item.level}</td>

      <td className="px-6 py-4 text-gray-700">
       <select
  className="w-full h-10 rounded-lg border border-[#D1D5DB] px-3 text-sm text-[#374151] focus:border-[#A21CAF] focus:ring-2 focus:ring-[#F4D4FB]"
  value={item.approverId}
  onChange={(e) => {
    const updated = [...formData.approvalLevels];
    updated[index].approverId = e.target.value;

    setFormData({
      ...formData,
      approvalLevels: updated,
    });
  }}
>
  <option value="">+ Assign User</option>


</select>
      </td>

      <td className="px-6 py-4">
  <div className="flex items-center gap-6">
        <label className="flex items-center gap-2 text-gray-700 font-medium">
          <input
            type="checkbox"
            
            checked={item.canApprove}
            onChange={(e) => {
              const updated = [...formData.approvalLevels];
              updated[index].canApprove = e.target.checked;

              setFormData({
                ...formData,
                approvalLevels: updated,
              });
            }}
            className="w-4 h-4 accent-[#A21CAF]"

          />
          Approve
        </label>

        <label>
          <input
            type="checkbox"
            checked={item.canReject}
            onChange={(e) => {
              const updated = [...formData.approvalLevels];
              updated[index].canReject = e.target.checked;

              setFormData({
                ...formData,
                approvalLevels: updated,
              });
            }}
            className="w-4 h-4 accent-[#A21CAF]"

          />
          Reject
        </label>

        <label className="flex items-center gap-2 text-gray-700 font-medium">
  <input
    type="checkbox"
    checked={item.canHold}
    onChange={(e) => {
      const updated = [...formData.approvalLevels];
      updated[index].canHold = e.target.checked;

      setFormData({
        ...formData,
        approvalLevels: updated,
      });
    }}
    className="w-4 h-4 accent-[#A21CAF]"
  />
  Hold
</label>
</div>
      </td>
    </tr>
  ))}
</tbody>
              </table>

              <div className="mb-6">
  <label className="block mb-2 text-sm font-semibold text-gray-800">
    Attachment
  </label>

  <input
    type="file"
    accept=".pdf,.doc,.docx"
    onChange={(e) => setAttachment(e.target.files[0])}
className="w-full rounded-lg border border-[#D1D5DB] px-4 py-3 text-[14px] text-[#374151] focus:ring-2 focus:ring-[#F4D4FB] focus:border-[#A21CAF] outline-none resize-none"  />

  {attachment && (
    <p className="text-sm text-green-600 mt-2">
      Selected file: {attachment.name}
    </p>
  )}
</div>

              <div className="flex justify-end gap-3 mt-8">
                <button className="px-6 py-3 rounded-xl border border-gray-300 bg-white text-gray-700 font-semibold hover:bg-gray-100">
                  Cancel
                </button>

                <button
  onClick={handleSubmit}
  className="px-8 py-3 rounded-xl bg-[#8B0EA9] hover:bg-[#6E0C86] text-white font-semibold shadow-md hover:bg-[#62006f] transition"
>
  Create Approval
</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}