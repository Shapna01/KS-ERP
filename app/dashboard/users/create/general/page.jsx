"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";

import { ChevronRight } from "lucide-react";

export default function GeneralDetailsPage() {
  const router = useRouter();
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    userid: "",
    workemail: "",
    personalemail: "",
    phone: "",
    dob: "",
    gender: "Male",
    presentAddress: "",
    permanentAddress: "",
    role: "Master Admin",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
  const newErrors = {};

  if (!formData.name.trim()) {
    newErrors.name = "* Please enter Name";
  }

  if (!formData.userid.trim()) {
    newErrors.userid = "* Please enter User ID";
  }

  if (!formData.workemail.trim()) {
    newErrors.workemail = "* Please enter Work Email";
  }

  if (!formData.personalemail.trim()) {
    newErrors.personalemail = "* Please enter Personal Email";
  }

  if (!formData.phone.trim()) {
    newErrors.phone = "* Please enter Phone Number";
  }

  if (!formData.dob) {
    newErrors.dob = "* Please select Date of Birth";
  }

  if (!formData.presentAddress.trim()) {
    newErrors.presentAddress = "* Please enter Present Address";
  }

  if (!formData.permanentAddress.trim()) {
    newErrors.permanentAddress = "* Please enter Permanent Address";
  }

  setErrors(newErrors);

  return Object.keys(newErrors).length === 0;
};

  const handleNext = () => {
  if (!validateForm()) return;

  localStorage.setItem(
    "generalDetails",
    JSON.stringify(formData)
  );

  router.push("/dashboard/users/create/official");
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

  <button className="flex-1">
    <div className="h-[34px] rounded-[6px] bg-[#FCE7F3] text-[#C026D3] font-medium flex items-center justify-center text-[11px]">
      1. General Details
    </div>
  </button>

  <button
    className="flex-1"
    onClick={() =>
      router.push("/dashboard/users/create/official")
    }
  >
    <div className="h-[34px] flex items-center justify-center text-[11px] text-[#6B7280] hover:text-[#C026D3]">
      2. Official Details
    </div>
  </button>

  <button
    className="flex-1"
    onClick={() =>
      router.push("/dashboard/users/create/identifications")
    }
  >
    <div className="h-[34px] flex items-center justify-center text-[11px] text-[#6B7280] hover:text-[#C026D3]">
      3. Identifications
    </div>
  </button>

  <button
    className="flex-1"
    onClick={() =>
      router.push("/dashboard/users/create/documents")
    }
  >
    <div className="h-[34px] flex items-center justify-center text-[11px] text-[#6B7280] hover:text-[#C026D3]">
      4. Supporting Documents
    </div>
  </button>

</div>

            <div className="bg-white border border-[#E5E5E5] rounded-[8px] overflow-hidden">

              <div className="px-5 py-4 border-b border-[#EEEEEE]">
                <h2 className="text-[13px] font-semibold text-[#18181B]">
                  General details
                </h2>

                <p className="text-[11px] text-[#6B7280] mt-1">
                  Enter the basic information required to create a new user profile in the system.
                </p>
              </div>

              <div className="px-6 py-7">

                <div className="flex flex-col items-center mb-8">
                  <p className="text-[11px] text-[#6B7280] mb-3">
                    Profile Image/ Avatar
                  </p>

                  <div className="w-[64px] h-[64px] rounded-[8px] bg-[#E5E7EB]" />
                </div>

                <div className="border-t border-[#F1F1F1] mb-6"></div>

                <div className="max-w-[560px] mx-auto space-y-4">

                  <FormField label="Name">
  <div>
    <input
      type="text"
      name="name"
      value={formData.name}
      onChange={handleChange}
      className={inputClass}
    />

    {errors.name && (
      <p className="text-red-500 text-[10px] mt-1">
        {errors.name}
      </p>
    )}
  </div>
</FormField>

                  <FormField label="User ID">
  <div>
    <input
      type="text"
      name="userid"
      value={formData.userid}
      onChange={handleChange}
      className={inputClass}
    />

    {errors.userid && (
      <p className="text-red-500 text-[10px] mt-1">
        {errors.userid}
      </p>
    )}
  </div>
</FormField>

                  <FormField label="Work Email">
  <div>
    <input
      type="email"
      name="workemail"
      value={formData.workemail}
      onChange={handleChange}
      className={inputClass}
    />

    {errors.workemail && (
      <p className="text-red-500 text-[10px] mt-1">
        {errors.workemail}
      </p>
    )}
  </div>
</FormField>

                  <FormField label="Personal Email">
                    <input
                      type="email"
                      name="personalemail"
                      value={formData.personalemail}
                      onChange={handleChange}
                      className={inputClass}
                    />
                    {errors.personalemail && (
  <p className="text-red-500 text-[10px] mt-1">
    {errors.personalemail}
  </p>
)}
                  </FormField>

                  <FormField label="Phone">
                    <div className="flex gap-2">
                      <div className="w-[56px] h-[32px] border border-[#E5E7EB] rounded-[4px] flex items-center justify-center text-[11px] text-[#4B5563]">
                        +91
                      </div>

                      <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className={inputClass}
                      />
                      {errors.phone && (
  <p className="text-red-500 text-[10px] mt-1">
    {errors.phone}
  </p>
)}
                    </div>
                  </FormField>

                  <div className="border-t border-[#F1F1F1] my-5"></div>

                  <FormField label="Date of Birth">
                    <input
                      type="date"
                      name="dob"
                      value={formData.dob}
                      onChange={handleChange}
                      className={inputClass}
                    />
                    {errors.dob && (
  <p className="text-red-500 text-[10px] mt-1">
    {errors.dob}
  </p>
)}
                  </FormField>

                  <FormField label="Gender">
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      className={inputClass}
                    >
                      <option>Male</option>
                      <option>Female</option>
                    </select>
                  </FormField>

                  <div className="border-t border-[#F1F1F1] my-5"></div>

                  <FormField label="Present Address">
                    <textarea
                      rows={3}
                      name="presentAddress"
                      value={formData.presentAddress}
                      onChange={handleChange}
                      className={`${inputClass} h-auto py-2 resize-none`}
                    />
                    {errors.presentAddress && (
  <p className="text-red-500 text-[10px] mt-1">
    {errors.presentAddress}
  </p>
)}  
                  </FormField>

                  <FormField label="Permanent Address">
                    <textarea
                      rows={3}
                      name="permanentAddress"
                      value={formData.permanentAddress}
                      onChange={handleChange}
                      className={`${inputClass} h-auto py-2 resize-none`}
                    />
                    {errors.permanentAddress && (
  <p className="text-red-500 text-[10px] mt-1">
    {errors.permanentAddress}
  </p>
)}
                  </FormField>

                  <FormField label="Role">
                    <select
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      className={inputClass}
                    >
                      <option>Master Admin</option>
                      <option>Employee</option>
                    </select>
                  </FormField>

                </div>
              </div>

              <div className="border-t border-[#EEEEEE] px-5 py-4 flex items-center justify-between bg-white">

                <button className="h-[30px] px-4 rounded-[6px] border border-[#F3D4F8] text-[11px] text-[#D946EF] bg-[#FFF7FD]">
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

function FormField({ label, children }) {
  return (
    <div className="grid grid-cols-[140px_1fr] items-start gap-6">
      <label className="text-[11px] text-[#4B5563] pt-2">
        {label}
        <span className="text-red-500 ml-1">*</span>
      </label>

      <div>{children}</div>
    </div>
  );
}
