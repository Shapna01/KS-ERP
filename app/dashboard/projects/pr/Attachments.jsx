"use client";

import { useState } from "react";
import { Eye, X } from "lucide-react";

export default function Attachments() {
  const [files, setFiles] = useState({
    techSpec: [],
    quotation: [],
    communication: [],
    supporting: [],
  });

  const rows = [
    {
      key: "techSpec",
      label: "Upload Tech Specification",
    },
    {
      key: "quotation",
      label: "Upload Budgetary Quotation",
    },
    {
      key: "communication",
      label: "Upload Communication Trail",
    },
    {
      key: "supporting",
      label: "Upload Other Supporting Docs",
    },
  ];

  const handleFileChange = (e, section) => {
    const selectedFiles = Array.from(e.target.files);

    setFiles((prev) => ({
      ...prev,
      [section]: [...prev[section], ...selectedFiles],
    }));
  };

  const handleRemove = (section, index) => {
    setFiles((prev) => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="mt-10 border border-gray-100 rounded-3xl bg-white shadow-sm">

      <div className="px-8 pt-8">
        <h2 className="text-2xl font-bold text-[#7A008C] tracking-tight">
  Attachments
</h2>

        <p className="text-sm text-gray-500 mt-2">
          Enter item or service details for the purchase request.
        </p>
      </div>

      <div className="p-8 space-y-10">

        {rows.map((row) => (
          <div key={row.key} className="grid grid-cols-12 gap-8 items-start p-5 border border-gray-100 rounded-2xl hover:shadow-sm transition bg-gray-50">

            <div className="col-span-3">
              <label className="font-semibold text-sm text-gray-700">
                {row.label}
                <span className="text-red-500">*</span>
              </label>
            </div>

            <div className="col-span-4">

              <div className="border-2 border-dashed border-gray-200 rounded-xl h-[70px] flex items-center justify-between px-5 bg-white hover:border-[#7A008C]/40 transition">

                <label className="cursor-pointer">
                  <input
                    type="file"
                    multiple
                    className="hidden"
                    onChange={(e) => handleFileChange(e, row.key)}
                  />

                  <span className="bg-[#7A008C] text-white px-4 py-2 rounded-lg text-sm hover:bg-[#66006f] transition">
                    Browse Files
                  </span>
                </label>

                <span className="text-xs text-gray-500">
                  Maximum File Size : 50 Mb
                </span>

              </div>

            </div>

            <div className="col-span-5 space-y-2">

              {files[row.key].map((file, index) => (
                <div
                  key={index}
                  className="h-10 border border-gray-100 rounded-xl flex items-center justify-between px-4 bg-white hover:shadow-sm transition"
                >
                  <span className="text-[#7A008C] font-medium text-sm truncate hover:underline">
                    {file.name}
                  </span>

                  <div className="flex items-center gap-3">

                    <a
                      href={URL.createObjectURL(file)}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Eye
                        size={16}
                        className="text-gray-500 hover:text-[#7A008C] transition cursor-pointer"
                      />
                    </a>

                    <button
                      onClick={() => handleRemove(row.key, index)}
                    >
                      <X
                        size={16}
                        className="text-red-500 hover:text-red-600 transition cursor-pointer"
                      />
                    </button>

                  </div>
                </div>
              ))}

            </div>

          </div>
        ))}

      </div>
    </div>
  );
}