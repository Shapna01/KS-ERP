"use client";

import { useState } from "react";

import Link from "next/link";

import {
  ChevronRight,
  ChevronDown,
  X,
} from "lucide-react";

import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";

export default function CreateDesignationPage() {

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    department: "",
    team: "",
    department_head: "",
    users: [],
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

 const handleSubmit = async () => {

  if (
    !formData.name ||
    !formData.department ||
    !formData.description ||
    !formData.team ||
    !formData.department_head
  ) {
    alert("Please fill all required fields");
    return;
  }

  try {
    setLoading(true);

    const response = await fetch(
      "/api/designations/add",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );

    const data = await response.json();

    if (data.success) {
      alert("Designation Created Successfully");
      window.location.href =
        "/dashboard/users/designations";
    } else {
      alert(data.error);
    }

  } catch (error) {
    console.log(error);
  } finally {
    setLoading(false);
  }
};

  return (

    <div className="flex h-screen overflow-hidden bg-[#F8F8FA]">

      <Sidebar />

      <div className="flex flex-1 flex-col overflow-hidden">

        <Topbar />

        <div className="flex-1 overflow-auto bg-white px-10 py-8 ">
            <div className="max-w-[1000px] mx-auto">

          <div className="flex items-center gap-2 text-[13px] mb-8">

            <span className="text-[#C11574] font-medium">
              Users
            </span>

            <ChevronRight size={14} className="text-[#98A2B3]" />

            <span className="text-[#C11574] font-medium">
              Designations
            </span>

            <ChevronRight size={14} className="text-[#98A2B3]" />

            <span className="text-[#667085]">
              Create New
            </span>

          </div>


          <div className="mb-8">

            <h1 className="text-[36px] font-semibold text-[#101828] mb-3">
              Create New Designation
            </h1>

            <p className="text-[14px] text-[#667085]">
              Set up a department by defining its name,
              description, and associated teams to organize
              organizational structure.
            </p>

          </div>


          <div className="max-w-[1000px] mx-auto">
                  <div className="border border-[#EAECF0] rounded-[12px] overflow-hidden bg-white shadow-sm">

            <div className="p-6">


              <div className="grid grid-cols-2 gap-5 mb-5">

                <div>

                  <label className="block text-[13px] text-[#344054] mb-2">
                     Designation Name
                           <span className="text-red-500"> *</span>
                          </label>

                  <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Procurement Team"
                  className="w-full h-[44px] border border-[#D0D5DD] rounded-[8px] px-4 text-[14px] outline-none focus:border-[#7F56D9]"
                   />

                </div>


                <div>

                  <label className="block text-[13px] text-[#344054] mb-2">
                    Department Associated
                    <span className="text-red-500"> *</span>
                  </label>

                  <div className="relative">

                    <select
                    name="department"
                    required
                    value={formData.department}
                    onChange={handleChange}
                    className="w-full h-[44px] border border-[#D0D5DD] rounded-[8px] px-4 text-[14px] appearance-none outline-none focus:border-[#7F56D9]"
                     >

                      <option value="">
                        Select Department
                      </option>

                      <option value="Finance Department">
                        Finance Department
                      </option>

                      <option value="IT Department">
                        IT Department
                      </option>

                      <option value="HR Department">
                        HR Department
                      </option>

                    </select>

                    <ChevronDown
                      size={18}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-[#667085]"
                    />

                  </div>

                </div>

              </div>

              <div className="mb-5">

                <label className="block text-[13px] text-[#344054] mb-2">
                Designation Description
                <span className="text-red-500"> *</span>
                </label>

                <textarea
                name="description"
                required
                value={formData.description}
                onChange={handleChange}
                placeholder="Handle purchasing and vendor management activities."
                className="w-full h-[90px] border border-[#D0D5DD] rounded-[8px] px-4 py-3 text-[14px] resize-none outline-none focus:border-[#7F56D9]"
                 />

              </div>

              <div className="grid grid-cols-2 gap-5 mb-5">

                <div>

                  <label className="block text-[13px] text-[#344054] mb-2">
                    Team Associated
                    <span className="text-red-500"> *</span>
                  </label>

                  <input
                  type="text"
                  name="team"
                  required
                  value={formData.team}
                  onChange={handleChange}
                  placeholder="Procurement Team"
                  className="w-full h-[44px] border border-[#D0D5DD] rounded-[8px] px-4 text-[14px] outline-none focus:border-[#7F56D9]"
                   />

                </div>


                <div>

                  <label className="block text-[13px] text-[#344054] mb-2">
                    Department Head
                    <span className="text-red-500"> *</span>
                  </label>

                  <input
                  type="text"
                  name="department_head"
                  required
                  value={formData.department_head}
                  onChange={handleChange}
                  placeholder="014-Niranjan"
                  className="w-full h-[44px] border border-[#D0D5DD] rounded-[8px] px-4 text-[14px] outline-none focus:border-[#7F56D9]"
                   />

                </div>

              </div>


              <div>

                <label className="block text-[13px] text-[#344054] mb-2">
                  Users Associated
                  <span className="text-red-500"> *</span>
                </label>

                <div className="min-h-[44px] border border-[#D0D5DD] rounded-[8px] px-3 py-2 flex flex-wrap gap-2">

                  {["Ram", "Sathya", "Vijay", "Raj", "Kavya", "Vishnu"].map((user, index) => (

                    <div
                      key={index}
                      className="h-[28px] px-3 bg-[#F2F4F7] rounded-[6px] flex items-center gap-2 text-[12px] text-[#344054]"
                    >

                      {user}

                      <X size={12} className="cursor-pointer" />

                    </div>
                  ))}

                </div>

              </div>

            </div>

            <div className="h-[72px] border-t border-[#EAECF0] flex items-center justify-end gap-4 px-6">

              <Link href="/dashboard/users/designations">

                <button className="text-[14px] text-[#344054]">
                  Cancel
                </button>

              </Link>

              <button
                onClick={handleSubmit}
                disabled={loading}
                className="h-[40px] px-5 bg-[#A100FF] rounded-[8px] text-white text-[13px] font-medium hover:bg-[#8B00E0] transition"
              >

                {loading
                  ? "Creating..."
                  : "Create Designation"}

              </button>
            </div>
            </div>

          </div>
          </div>
        </div>

      </div>

    </div>
  );
}