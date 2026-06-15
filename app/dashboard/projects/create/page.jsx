"use client";

import { useState } from "react";
import Sidebar from "../../users/components/Sidebar";
import Topbar from "../../users/components/Topbar";

export default function CreateProjectPage() {
 const [projectStatus, setProjectStatus] = useState("submitted");
const [showModal, setShowModal] = useState(false);

const [formData, setFormData] = useState({
  projectName: "",
  projectNumber: "",
  timeline: "",
  description: "",
  budget: "",
  cto: "",
});

const [error, setError] = useState("");

const validateForm = () => {
  if (
    !formData.projectName.trim() ||
    !formData.projectNumber.trim() ||
    !formData.timeline.trim() ||
    !formData.description.trim() ||
    !formData.budget.trim() ||
    !formData.cto.trim()
  ) {
    setError("Please fill the form");
    return false;
  }

  setError("");
  return true;
};



const handleSave = async () => {
  if (!validateForm()) return;

  try {
    const response = await fetch("/api/projects", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error("Failed to save project");
    }

    alert("Project saved successfully");

    setFormData({
      projectName: "",
      projectNumber: "",
      timeline: "",
      description: "",
      budget: "",
      cto: "",    
    });
    console.log(formData);
  } catch (error) {
    console.error(error);
    alert("Something went wrong");
  }
};

const handleApprove = () => {
  if (!validateForm()) return;

  setProjectStatus("approved");
  setShowModal(true);
};

const handleReject = () => {
  if (!validateForm()) return;

  setProjectStatus("rejected");
  setShowModal(true);
};

const handleHold = () => {
  if (!validateForm()) return;

  setProjectStatus("onhold");
  setShowModal(true);
};
const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });
};
const statusBadge = () => {
  switch (projectStatus) {
    case "approved":
      return (
        <span className="px-3 py-1 rounded bg-[#D1FADF] text-[#027A48] text-xs font-medium">
          ● Approved
        </span>
      );

    case "onhold":
      return (
        <span className="px-3 py-1 rounded bg-[#E5E7EB] text-[#344054] text-xs font-medium">
          ● On Hold
        </span>
      );

    case "rejected":
      return (
        <span className="px-3 py-1 rounded bg-[#FEE4E2] text-[#D92D20] text-xs font-medium">
          ● Rejected
        </span>
      );

    default:
      return (
        <span className="px-3 py-1 rounded bg-[#FCE7F6] text-[#C11574] text-xs font-medium">
          ● Submitted
        </span>
      );
  }
};

  return (
    <div className="flex min-h-screen bg-[#F7F7FA]">
      <Sidebar />

      <div className="flex-1 flex flex-col ml-[74px]">
        <Topbar />

        <div className="pt-[72px] px-8 py-8 overflow-y-auto">
          <div className="max-w-[980px] mx-auto">

            <div className="flex gap-2 text-sm mb-6">
              <span className="text-[#C11574] font-medium">
                Projects
              </span>

              <span className="text-[#98A2B3]">{">"}</span>

              <span className="text-[#667085]">
                Yet To Approve
              </span>

              <span className="text-[#98A2B3]">{">"}</span>

              <span className="text-[#667085]">
                INA - Flight Simulator
              </span>
            </div>

            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-[32px] font-semibold text-[#101828]">
                INA - Flight Simulator
              </h1>

              {statusBadge()}
            </div>

            <p className="text-sm text-[#667085] mb-8">
              The INA Flight Simulator project boosts pilot training with a
              realistic experience that enhances task organization and resource
              management.
            </p>

            <div className="grid grid-cols-3 mb-6 overflow-hidden rounded-md">
              <div className="bg-[#FCE7F6] text-[#C11574] text-center py-3 text-sm font-semibold border">
                Submitted
              </div>

              <div
                className={`text-center py-3 text-sm font-semibold border-y
                ${
                  projectStatus === "approved"
                    ? "bg-[#FCE7F6] text-[#C11574]"
                    : projectStatus === "rejected"
                    ? "bg-[#FEE4E2] text-[#D92D20]"
                    : projectStatus === "onhold"
                    ? "bg-[#E5E7EB]"
                    : "bg-[#F9FAFB]"
                }`}
              >
                To Approve
              </div>

              <div className="bg-[#F9FAFB] text-[#98A2B3] text-center py-3 text-sm font-semibold border">
                Assign Team
              </div>
            </div>

            {projectStatus === "onhold" && (
              <div className="bg-[#FFF8EB] border border-[#F5D7A1] rounded-lg p-4 mb-6">
                <p className="font-medium text-sm mb-2">
                  Reason For Hold
                </p>

                <div className="bg-[#FBE5B7] p-3 rounded text-sm text-[#694100]">
                  Project scope is not aligned with strategic goals and
                  objectives.
                </div>
              </div>
            )}

            {projectStatus === "rejected" && (
              <div className="bg-[#FFF8EB] border border-[#F5D7A1] rounded-lg p-4 mb-6">
                <p className="font-medium text-sm mb-2">
                  Reason For Rejection
                </p>

                <div className="bg-[#FBE5B7] p-3 rounded text-sm text-[#694100]">
                  Project scope is not aligned with strategic goals and
                  objectives.
                </div>
              </div>
            )}

            <div className="bg-white border border-[#EAECF0] rounded-xl p-6">

              <div className="grid grid-cols-3 gap-5 mb-5">

               <div>
  <label className="block text-xs text-[#667085] mb-1">
    Project Name
  </label>

  <input
  type="text"
  name="projectName"
  value={formData.projectName}
  onChange={handleChange}
/>
</div>

                <div>
  <label className="block text-xs text-[#667085] mb-1">
    Project Number
  </label>

  <input
  type="text"
  name="projectNumber"
  value={formData.projectNumber}
  onChange={handleChange}
/>
</div>

                <div>
  <label className="block text-xs text-[#667085] mb-1">
    Project Timeline
  </label>

  <input
  type="text"
  name="timeline"
  value={formData.timeline}
  onChange={handleChange}
/>
</div>

              </div>


              <div className="mb-5">
                <label className="block text-xs text-[#667085] mb-1">
                  Project Description
                </label>

                <textarea
  name="description"
  value={formData.description}
  onChange={handleChange}
/>
              </div>
               <div className="mb-5">
                <label className="block text-xs text-[#667085] mb-1">
                  Project Budget
                </label>

                <input
  type="text"
  name="budget"
  value={formData.budget}
  onChange={handleChange}
  className="w-full border border-[#D0D5DD] rounded-lg px-3 py-2"
/>
              </div>

              <div className="mb-5">
                <label className="block text-xs text-[#667085] mb-1">
                  Work Order
                </label>

                <div className="inline-flex border rounded-lg overflow-hidden border-[#D0D5DD]">

                  <span className="px-4 py-2 text-[#1570EF] text-sm">
                    Work-order 2023
                  </span>

                  <button className="border-l px-3">
                    👁
                  </button>

                  <button className="border-l px-3">
                    ⬇
                  </button>

                </div>
              </div>


              <div className="grid grid-cols-2 gap-5">

                <div>
                  <label className="block text-xs text-[#667085] mb-1">
                    Estimated Budget (Rs)
                  </label>

                  <input
  type="text"
  name="budget"
  value={formData.budget}
  onChange={handleChange}
  className="w-full border border-[#D0D5DD] rounded-lg px-3 py-2"
/>
                </div>

                <div>
                  <label className="block text-xs text-[#667085] mb-1">
                    Submits To CTO
                  </label>

                  <input
  type="text"
  name="cto"
  value={formData.cto}
  onChange={handleChange}
  className="w-full border border-[#D0D5DD] rounded-lg px-3 py-2"
/>
                </div>

              </div>


              <div className="flex justify-end gap-3 mt-8">

  <button
    onClick={handleSave}
    className="bg-blue-600 text-white px-5 py-2 rounded-md text-sm"
  >
    Save
  </button>

  <button
    onClick={handleHold}
    className="border border-[#C11574] text-[#C11574] px-5 py-2 rounded-md text-sm"
  >
    Hold
  </button>

  <button
    onClick={handleReject}
    className="bg-[#FEE4E2] text-[#D92D20] px-5 py-2 rounded-md text-sm"
  >
    Reject
  </button>

  <button
    onClick={handleApprove}
    className="bg-[#9E008F] text-white px-5 py-2 rounded-md text-sm"
  >
    Approve ✓
  </button>

</div>
            </div>
          </div>
        </div>
      </div>


      {showModal && (
        <div className="fixed inset-0 bg-black/20 flex justify-center items-center">

          <div className="bg-white rounded-xl w-[350px] p-8 relative">

            <button
              onClick={() => setShowModal(false)}
              className="absolute right-4 top-4 text-gray-400"
            >
              ✕
            </button>

            <div className="flex justify-center">

              <div
                className={`h-16 w-16 rounded-full flex items-center justify-center text-2xl
                ${
                  projectStatus === "approved"
                    ? "bg-[#D1FADF]"
                    : projectStatus === "rejected"
                    ? "bg-[#FEE4E2]"
                    : "bg-[#E5E7EB]"
                }`}
              >
                {projectStatus === "approved"
                  ? "✓"
                  : projectStatus === "rejected"
                  ? "✕"
                  : "⌛"}
              </div>

            </div>

            <p className="text-center mt-6 text-[#344054]">

              {projectStatus === "approved" &&
                "The Project has been approved successfully."}

              {projectStatus === "rejected" &&
                "The Project has been rejected."}

              {projectStatus === "onhold" &&
                "The Project has been put on hold."}

            </p>

          </div>
        </div>
      )}
    </div>
  );
}