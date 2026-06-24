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
});
const [attachment, setAttachment] = useState(null);
const handleSubmit = async () => {
  try {
    const data = new FormData();

    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("module", formData.module);
    data.append("levels", formData.levels);
    data.append("status", formData.status);

    if (attachment) {
      data.append("attachment", attachment);
    }

    const res = await fetch("/api/approvals", {
      method: "POST",
      body: data,
    });

    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.message);
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

        <div className="flex-1 overflow-y-auto pt-[72px] px-8 py-7">
          <div className="max-w-5xl mx-auto">
            <div className="text-sm text-gray-400 mb-6">
              Roles &gt; Create New
            </div>

            <h1 className="text-3xl font-semibold mb-2">
              Create New Approval
            </h1>

            <p className="text-sm text-gray-500 mb-8">
              Create and configure approval workflows by defining approval
              levels and approvers.
            </p>

            <div className="bg-white border rounded-2xl p-6">
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="text-sm text-gray-600 block mb-2">
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
  className="w-full border rounded-lg px-3 py-2"
/>
                </div>

                <div className="flex gap-3">
  <label className="flex items-center gap-2">
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
    />
    Activate
  </label>
  <div className="mb-6">
  <label className="text-sm text-gray-600 block mb-2">
    Attachment
  </label>

  <input
    type="file"
    onChange={(e) => setAttachment(e.target.files[0])}
    className="w-full border rounded-lg px-3 py-2"
  />
</div>

  <label className="flex items-center gap-2">
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
    />
    De-Activate
  </label>
</div>
              </div>

              <div className="mb-6">
                <label className="text-sm text-gray-600 block mb-2">
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
  className="w-full border rounded-lg px-3 py-2"
/>
              </div>

              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="text-sm text-gray-600 block mb-2">
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
  className="w-full border rounded-lg px-3 py-2"
>
                    <option>Purchase Requisition</option>
                    <option>Purchase Order</option>
                    <option>Reimbursement</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm text-gray-600 block mb-2">
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
  className="w-full border rounded-lg px-3 py-2"
>
  <option value={5}>5 Levels</option>
  <option value={4}>4 Levels</option>
  <option value={3}>3 Levels</option>
</select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-6 mb-8">
                <div>
                  <label className="text-sm text-gray-600 block mb-2">
                    Approval Type
                  </label>

                  <div className="flex gap-4">
                    <label>
                      <input type="radio" name="type" />
                      Role Based
                    </label>

                    <label>
                      <input
                        type="radio"
                        name="type"
                        defaultChecked
                      />
                      User Based
                    </label>
                  </div>
                </div>

                <div>
                  <label className="text-sm text-gray-600 block mb-2">
                    Include Amount Based Approval
                  </label>

                  <select className="w-full border rounded-lg px-3 py-2">
                    <option>No</option>
                    <option>Yes</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm text-gray-600 block mb-2">
                    Notification Settings
                  </label>

                  <div className="flex gap-3">
                    <label>
                      <input type="checkbox" />
                      In-App
                    </label>

                    <label>
                      <input type="checkbox" />
                      In-Mail
                    </label>
                  </div>
                </div>
              </div>

              <h2 className="font-semibold text-lg mb-4">
                Approval Levels
              </h2>

              <table className="w-full border rounded-lg overflow-hidden text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="p-3 text-left">Level</th>
                    <th className="p-3 text-left">Approver</th>
                    <th className="p-3 text-left">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {[1, 2, 3, 4, 5].map((level) => (
                    <tr key={level} className="border-t">
                      <td className="p-3">L{level}</td>

                      <td className="p-3">
                        <select className="border rounded px-2 py-1 w-full">
                          <option>Select User</option>
                        </select>
                      </td>

                      <td className="p-3 flex gap-4">
                        <label>
                          <input type="checkbox" />
                          Approve
                        </label>

                        <label>
                          <input type="checkbox" />
                          Reject
                        </label>

                        <label>
                          <input type="checkbox" />
                          Hold
                        </label>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="mb-6">
  <label className="text-sm text-gray-600 block mb-2">
    Attachment
  </label>

  <input
    type="file"
    accept=".pdf,.doc,.docx"
    onChange={(e) => setAttachment(e.target.files[0])}
    className="w-full border rounded-lg px-3 py-2"
  />

  {attachment && (
    <p className="text-sm text-green-600 mt-2">
      Selected file: {attachment.name}
    </p>
  )}
</div>

              <div className="flex justify-end gap-3 mt-8">
                <button className="border px-5 py-2 rounded-lg">
                  Cancel
                </button>

                <button
  onClick={handleSubmit}
  className="bg-[#7A008C] text-white px-5 py-2 rounded-lg"
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