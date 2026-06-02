"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";

import { ChevronRight } from "lucide-react";

export default function OfficialDetailsPage() {
  const router = useRouter();
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    joining_date: "",
    designation: "",
    team: "",
    department: "",
    reporting_to: "",
    employment_type: "",
    role: "Team Members",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
  const newErrors = {};

  if (!formData.joining_date) {
    newErrors.joining_date = "* Please select joining date";
  }

  if (
    !formData.designation ||
    formData.designation === "Select designation"
  ) {
    newErrors.designation = "* Please select designation";
  }

  if (
    !formData.team ||
    formData.team === "Select team"
  ) {
    newErrors.team = "* Please select team";
  }

  if (
    !formData.department ||
    formData.department === "Select department"
  ) {
    newErrors.department = "* Please select department";
  }

  if (
    !formData.reporting_to ||
    formData.reporting_to === "Select manager"
  ) {
    newErrors.reporting_to = "* Please select reporting manager";
  }

  if (
    !formData.employment_type ||
    formData.employment_type === "Select type"
  ) {
    newErrors.employment_type = "* Please select employment type";
  }

  setErrors(newErrors);

  return Object.keys(newErrors).length === 0;
};

  const handleNext = () => {
  if (!validateForm()) return;

  localStorage.setItem(
    "officialDetails",
    JSON.stringify(formData)
  );

  router.push(
    "/dashboard/users/create/identifications"
  );
};

  return (
    <div className="flex min-h-screen bg-[#F6F7FB] overflow-hidden">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Topbar />

        <div className="flex-1 overflow-y-auto">
          <div className="max-w-[980px] mx-auto px-8 py-7">

            <div className="flex items-center gap-2 text-[12px] mb-7">
              <span className="text-[#C026D3] font-medium">
                Users
              </span>

              <ChevronRight
                size={13}
                className="text-gray-400"
              />

              <span className="text-[#C026D3] font-medium">
                Employees List
              </span>

              <ChevronRight
                size={13}
                className="text-gray-400"
              />

              <span className="text-[#6B7280]">
                Create New
              </span>
            </div>

            <div className="mb-6">
              <h1 className="text-[32px] leading-none font-semibold text-[#18181B]">
                Create New user
              </h1>

              <p className="text-[12px] text-[#6B7280] mt-3 leading-5 max-w-[700px]">
                Add a new user to the system by entering personal,
                official, and identification details, assigning roles
                and reporting structure, and uploading required documents
                to enable system access.
              </p>
            </div>

            <div className="bg-white border border-[#E5E7EB] rounded-[8px] p-[3px] flex mb-5">

              <button
  onClick={() =>
    router.push("/dashboard/users/create/general")
  }
  className="flex-1 h-[34px] flex items-center justify-center text-[11px] text-[#6B7280] hover:text-[#C026D3]"
>
  1. General Details
</button>

              <div className="flex-1 h-[34px] rounded-[6px] bg-[#FCE7F3] text-[#C026D3] font-medium flex items-center justify-center text-[11px]">
                2. Official Details
              </div>

              <button
  onClick={() => {
    const officialData =
      localStorage.getItem("officialDetails");

    if (officialData) {
      router.push(
        "/dashboard/users/create/identifications"
      );
    }
  }}
  className="flex-1 h-[34px] flex items-center justify-center text-[11px]"
>
  3. Identifications
</button>

              <div className="flex-1 h-[34px] flex items-center justify-center text-[11px] text-[#6B7280]">
                4. Supporting Documents
              </div>

            </div>

            <div className="bg-white border border-[#E5E5E5] rounded-[8px] overflow-hidden">

              <div className="px-5 py-4 border-b border-[#EEEEEE]">

                <h2 className="text-[13px] font-semibold text-[#18181B]">
                  Official details
                </h2>

                <p className="text-[11px] text-[#6B7280] mt-1">
                  Enter work related information required for system access.
                </p>

              </div>

              <div className="px-6 py-7">

                <div className="max-w-[560px] mx-auto space-y-4">

                  <FormField label="Date of Join" required>
  <div>
    <input
      type="date"
      name="joining_date"
      value={formData.joining_date}
      onChange={handleChange}
      className={inputClass}
    />

    {errors.joining_date && (
      <p className="text-red-500 text-[10px] mt-1">
        {errors.joining_date}
      </p>
    )}
  </div>
</FormField>

                  <FormField
                    label="Designation"
                    required
                  >
                    <select
                      name="designation"
                      value={formData.designation}
                      onChange={handleChange}
                      className={inputClass}
                    >
                      <option>Select designation</option>
                      <option>UX Designer</option>
                      <option>Frontend Developer</option>
                      <option>Backend Developer</option>
                      <option>Manager</option>
                    </select>
                    {errors.designation && (
  <p className="text-red-500 text-[10px] mt-1">
    {errors.designation}
  </p>
)}
                  </FormField>

                  <FormField
                    label="Team"
                    required
                  >
                    <select
                      name="team"
                      value={formData.team}
                      onChange={handleChange}
                      className={inputClass}
                    >
                      <option>Select team</option>
                      <option>UX Team</option>
                      <option>Frontend Team</option>
                      <option>Backend Team</option>
                    </select>
                    {errors.team && (
  <p className="text-red-500 text-[10px] mt-1">
    {errors.team}
  </p>
)}
                  </FormField>

                  <FormField
                    label="Department"
                    required
                  >
                    <select
                      name="department"
                      value={formData.department}
                      onChange={handleChange}
                      className={inputClass}
                    >
                      <option>Select department</option>
                      <option>Design Department</option>
                      <option>Development</option>
                      <option>Management</option>
                    </select>
                    {errors.department && (
  <p className="text-red-500 text-[10px] mt-1">
    {errors.department}
  </p>
)}
                  </FormField>

                  <FormField
                    label="Reporting To"
                    required
                  >
                    <select
                      name="reporting_to"
                      value={formData.reporting_to}
                      onChange={handleChange}
                      className={inputClass}
                    >
                      <option>Select manager</option>
                      <option>Rohan Ramaswamy</option>
                      <option>Saranya Kumar</option>
                    </select>
                    {errors.reporting_to && (
  <p className="text-red-500 text-[10px] mt-1">
    {errors.reporting_to}
  </p>
)}
                  </FormField>

                  <FormField
                    label="Employment Type"
                    required
                  >
                    <select
                      name="employment_type"
                      value={formData.employment_type}
                      onChange={handleChange}
                      className={inputClass}
                    >
                      <option>Select type</option>
                      <option>Full-time</option>
                      <option>Part-time</option>
                      <option>Contract</option>
                    </select>
                    {errors.employment_type && (
  <p className="text-red-500 text-[10px] mt-1">
    {errors.employment_type}
  </p>
)}
                  </FormField>

                  <div className="border-t border-[#F1F1F1] my-5"></div>

                  <FormField
                    label="Assign Role"
                    required
                  >
                    <select
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      className={inputClass}
                    >
                      <option>Team Members</option>
                      <option>Admin</option>
                      <option>Manager</option>
                    </select>
                  </FormField>

                </div>

              </div>

              <div className="border-t border-[#EEEEEE] px-5 py-4 flex items-center justify-between bg-white">

                <button
                  onClick={() => router.back()}
                  className="h-[30px] px-4 rounded-[6px] border border-[#F3D4F8] text-[11px] text-[#D946EF] bg-[#FFF7FD]"
                >
                  Previous
                </button>

                <div className="flex items-center gap-3">

                  <button className="text-[12px] text-[#6B7280]">
                    Cancel
                  </button>

                  <button className="h-[32px] px-4 rounded-[6px] border border-[#E9D5FF] text-[#A21CAF] text-[12px] font-medium">
                    Save as Draft
                  </button>

                  <button
                    onClick={handleNext}
                    className="h-[32px] px-5 rounded-[6px] bg-[#A21CAF] hover:bg-[#86198F] text-white text-[12px] font-medium transition"
                  >
                    Next
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

const inputClass =
  "w-full h-[32px] rounded-[4px] border border-[#E5E7EB] bg-white px-3 text-[11px] text-[#111827] outline-none focus:border-[#C026D3]";

function FormField({
  label,
  children,
  required,
}) {
  return (
    <div className="grid grid-cols-[140px_1fr] items-center gap-6">

      <label className="text-[11px] text-[#4B5563]">

        {label}

        {required && (
          <span className="text-red-500 ml-1">
            *
          </span>
        )}

      </label>

      <div>
        {children}
      </div>

    </div>
  );
}