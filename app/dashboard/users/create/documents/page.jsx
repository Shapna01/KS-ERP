"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";

import {
  ChevronRight,
  Eye,
  X,
  CheckCircle,
  ChevronDown,
} from "lucide-react";

export default function SupportingDocumentsPage() {
  const router = useRouter();
  const [errors, setErrors] = useState({});
  const [files, setFiles] = useState({
    offerLetter: null,
    incrementDocument: null,
  });


 useEffect(() => {
  const general =
    localStorage.getItem("generalDetails");

  const official =
    localStorage.getItem("officialDetails");

  const identification =
    localStorage.getItem("identifications");

  if (!general || !official || !identification) {
    router.push(
      "/dashboard/users/create/general"
    );
  }
}, [router]);


  const handleFile = (e, key) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFiles((prev) => ({
      ...prev,
      [key]: file,
    }));
  };

  const validateForm = () => {
  const newErrors = {};

  if (!files.offerLetter) {
    newErrors.offerLetter =
      "* Please upload Offer Letter";
  }

  setErrors(newErrors);

  return Object.keys(newErrors).length === 0;
};

  const handleSubmit = async () => {
     if (!validateForm()) return;
    const generalDetails = JSON.parse(
      localStorage.getItem("generalDetails")
    );

    const officialDetails = JSON.parse(
      localStorage.getItem("officialDetails")
    );

    const identificationDetails = JSON.parse(
      localStorage.getItem("identifications")
    );

    const finalData = {
      ...generalDetails,
      ...officialDetails,
      ...identificationDetails,
      offerLetter: files.offerLetter?.name || "",
      incrementDocument: files.incrementDocument?.name || "",
    };

    try {
      const response = await fetch("/api/employees/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(finalData),
      });

      if (response.ok) {
  localStorage.removeItem("generalDetails");
  localStorage.removeItem("officialDetails");
  localStorage.removeItem("identifications");

  router.push("/dashboard/users?success=true");
}
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#F7F7FA]">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Topbar />

        <div className="flex justify-center px-6 py-7">
          <div className="w-full max-w-[950px]">

            <div className="flex items-center gap-2 text-xs mb-5">
              <span className="text-[#C026D3] font-medium">Users</span>
              <ChevronRight size={13} className="text-gray-400" />
              <span className="text-[#C026D3] font-medium">Employees</span>
              <ChevronRight size={13} className="text-gray-400" />
              <span className="text-gray-500">Create</span>
            </div>

            <div className="mb-6">
              <h1 className="text-[32px] leading-none font-semibold text-[#18181B]">
                Create New User
              </h1>
              <p className="text-sm text-gray-500 mt-2">
                Upload supporting documents for verification and compliance.
              </p>
            </div>

            <div className="bg-white border rounded-xl p-1 flex mb-5">
              <button
  onClick={() =>
    router.push("/dashboard/users/create/general")
  }
  className="flex-1"
>
  <Step label="General Details" />
</button>

<button
  onClick={() =>
    router.push("/dashboard/users/create/official")
  }
  className="flex-1"
>
  <Step label="Official Details" />
</button>

<button
  onClick={() =>
    router.push("/dashboard/users/create/identifications")
  }
  className="flex-1"
>
  <Step label="Identifications" />
</button>

<div className="flex-1">
  <Step label="Documents" active />
</div>
            </div>

            <div className="bg-white border rounded-xl shadow-sm overflow-hidden">

              <div className="px-5 py-4 border-b">
                <h2 className="font-semibold text-sm">
                  Supporting Documents
                </h2>
                <p className="text-xs text-gray-500 mt-1">
                  Upload official HR documents for employee record
                </p>
              </div>

              <div className="p-6 space-y-6">

                <DocumentUpload
  title="Offer Letter"
  description="Upload employee offer letter"
  file={files.offerLetter}
  error={errors.offerLetter}
  onChange={(e) => handleFile(e, "offerLetter")}
  onRemove={() =>
    setFiles((prev) => ({
      ...prev,
      offerLetter: null,
    }))
  }
/>

                <DocumentUpload
  title="Increment Document"
  description="Upload salary revision document"
  file={files.incrementDocument}
  onChange={(e) =>
    handleFile(e, "incrementDocument")
  }
  onRemove={() =>
    setFiles((prev) => ({
      ...prev,
      incrementDocument: null,
    }))
  }
/>
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
                    onClick={handleSubmit}
                    className="text-xs bg-[#A21CAF] text-white px-5 h-[32px] rounded-md flex items-center gap-1"
                  >
                    Submit <ChevronDown size={14} />
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

function Step({ label, active }) {
  return (
    <div
      className={`flex-1 h-[38px] flex items-center justify-center text-xs rounded-lg ${
        active
          ? "bg-[#FCE7F3] text-[#C026D3] font-medium"
          : "text-gray-500"
      }`}
    >
      {label}
    </div>
  );
}

function DocumentUpload({
  title,
  description,
  file,
  onChange,
  error,
  onRemove,
}) {
  return (
    <div className="flex justify-between gap-6">
      <div className="w-[40%]">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-medium">
            {title}
          </h3>

          {file && (
            <CheckCircle
              size={14}
              className="text-green-500"
            />
          )}
        </div>

        <p className="text-xs text-gray-500 mt-1">
          {description}
        </p>
      </div>

      <div className="w-[60%]">
        <div className="border border-dashed rounded-lg p-4 flex items-center justify-between">
          <label className="cursor-pointer text-xs text-[#2563EB] border px-3 py-1.5 rounded">
            Browse Files

            <input
              type="file"
              className="hidden"
              onChange={onChange}
            />
          </label>

          <span className="text-[11px] text-gray-400">
            Max 50MB
          </span>
        </div>

        {file && (
          <div className="mt-3 border rounded-md px-3 h-[38px] flex justify-between items-center">
            <span className="text-xs truncate">
              {file.name}
            </span>

            <div className="flex gap-3">
              <Eye
                size={14}
                className="text-gray-500 cursor-pointer"
              />

              <X
                size={14}
                className="text-red-500 cursor-pointer"
                onClick={onRemove}
              />
            </div>
          </div>
        )}

        {error && (
          <p className="text-red-500 text-[10px] mt-2">
            {error}
          </p>
        )}
      </div>
    </div>
  );
}