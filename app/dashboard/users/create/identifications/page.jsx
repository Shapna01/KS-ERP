"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import { ChevronRight } from "lucide-react";

export default function IdentificationsPage() {
  const router = useRouter();
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    aadhaar: "",
    pan: "",
    passport: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
  const newErrors = {};

  if (!formData.aadhaar.trim()) {
    newErrors.aadhaar = "* Please enter Aadhaar Number";
  }

  if (!formData.pan.trim()) {
    newErrors.pan = "* Please enter PAN Number";
  }

  setErrors(newErrors);

  return Object.keys(newErrors).length === 0;
};

  const handleNext = () => {
  if (!validateForm()) return;

  localStorage.setItem(
    "identifications",
    JSON.stringify(formData)
  );

  router.push("/dashboard/users/create/documents");
};
  return (
    <div className="flex min-h-screen bg-[#F7F7FA]">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Topbar />

        <div className="flex justify-center px-6 py-7">
          <div className="w-full max-w-[950px]">

            <div className="flex items-center gap-2 text-sm mb-6">
              <span className="text-[#C026D3] font-medium">Users</span>
              <ChevronRight size={14} className="text-gray-400" />
              <span className="text-[#C026D3] font-medium">Employees List</span>
              <ChevronRight size={14} className="text-gray-400" />
              <span className="text-gray-500">Create New</span>
            </div>

            <div className="mb-6">
              <h1 className="text-[32px] leading-none font-semibold text-[#18181B]">
                Create New User
              </h1>
              <p className="text-sm text-gray-500 mt-2">
                Add a new user to the system by entering identification details.
              </p>
            </div>

            <div className="bg-white border rounded-xl p-1 flex mb-5">

  <button
    onClick={() =>
      router.push("/dashboard/users/create/general")
    }
    className="flex-1 h-[40px] text-xs text-gray-500"
  >
    1. General
  </button>

  <button
    onClick={() =>
      router.push("/dashboard/users/create/official")
    }
    className="flex-1 h-[40px] text-xs text-gray-500"
  >
    2. Official
  </button>

  <div className="flex-1 h-[40px] bg-[#FCE7F3] text-[#C026D3] font-medium flex items-center justify-center text-xs rounded-lg">
    3. Identity
  </div>

  <button
    onClick={() => {
      const data =
        localStorage.getItem("identifications");

      if (data) {
        router.push(
          "/dashboard/users/create/documents"
        );
      }
    }}
    className="flex-1 h-[40px] text-xs text-gray-500"
  >
    4. Docs
  </button>

</div>

            <div className="bg-white border rounded-xl shadow-sm">

              <div className="px-5 py-4 border-b">
                <h2 className="font-semibold text-sm">Identifications</h2>
                <p className="text-xs text-gray-500">
                  Enter government-issued ID details
                </p>
              </div>

              <div className="p-6 space-y-5">

                <div className="grid grid-cols-[120px_1fr] items-start gap-4">
  <label className="text-xs text-gray-600">
    Aadhaar *
  </label>

  <div>
    <input
      type="text"
      name="aadhaar"
      value={formData.aadhaar}
      onChange={handleChange}
      className="h-[36px] w-full border rounded-md px-3 text-xs outline-none"
    />

    {errors.aadhaar && (
      <p className="text-red-500 text-[10px] mt-1">
        {errors.aadhaar}
      </p>
    )}
  </div>
</div>

                <div className="grid grid-cols-[120px_1fr] items-start gap-4">
  <label className="text-xs text-gray-600">
    PAN *
  </label>

  <div>
    <input
      type="text"
      name="pan"
      value={formData.pan}
      onChange={handleChange}
      className="h-[36px] w-full border rounded-md px-3 text-xs outline-none"
    />

    {errors.pan && (
      <p className="text-red-500 text-[10px] mt-1">
        {errors.pan}
      </p>
    )}
  </div>
</div>

                <div className="grid grid-cols-[120px_1fr] items-center gap-4">
                  <label className="text-xs text-gray-600">
                    Passport
                  </label>
                  <input
                    type="text"
                    name="passport"
                    value={formData.passport}
                    onChange={handleChange}
                    className="h-[36px] border rounded-md px-3 text-xs outline-none"
                  />
                </div>

              </div>

              <div className="border-t px-5 py-4 flex justify-between">
                <button
                  onClick={() => router.back()}
                  className="text-xs border px-4 h-[32px] rounded-md text-[#C026D3]"
                >
                  Previous
                </button>

                <div className="flex gap-3">
                  <button className="text-xs text-gray-500">
                    Cancel
                  </button>

                  <button className="text-xs border px-4 h-[32px] rounded-md text-[#A21CAF]">
                    Save Draft
                  </button>

                  <button
                    onClick={handleNext}
                    className="text-xs bg-[#A21CAF] text-white px-5 h-[32px] rounded-md"
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