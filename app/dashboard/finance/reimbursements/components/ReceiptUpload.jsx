"use client";

import { Upload, X } from "lucide-react";

export default function ReceiptUpload({
  fileInputRef,
  form,
  setForm,
}) {
  return (
    <div className="border-t border-gray-200">

      <div className="px-8 py-8">

        <h2 className="text-lg font-semibold text-[#111827]">
          Receipts Attachment
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          Upload supporting documents for this reimbursement claim.
        </p>

        <div className="flex items-end gap-8 mt-8">

          <div>

            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Receipt
              <span className="text-red-500">*</span>
            </label>

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="h-11 rounded-lg border border-[#A000A9] px-5 text-[#A000A9] font-medium hover:bg-[#FAF3FB]"
            >
              Browse Files
            </button>

            <input
              ref={fileInputRef}
              hidden
              multiple
              type="file"
              accept=".pdf,.png,.jpg,.jpeg"
              onChange={(e) => {

                const files = Array.from(
                  e.target.files || []
                );

                setForm((prev) => ({
                  ...prev,
                  receipts: [
                    ...prev.receipts,
                    ...files,
                  ],
                }));

                e.target.value = "";

              }}
            />

          </div>

          <p className="text-xs text-gray-400 mb-2">
            Maximum File Size : 50 MB
          </p>

        </div>

      </div>

      <div className="px-8 pb-8">

        {form.receipts.length === 0 ? (

          <div className="border border-dashed rounded-xl p-12 text-center text-gray-400">
            No files uploaded
          </div>

        ) : (

          <div className="space-y-3">

            {form.receipts.map((file, index) => (

              <div
                key={index}
                className="flex justify-between items-center rounded-xl border border-gray-200 bg-[#FAFAFA] px-5 py-4"
              >

                <div className="flex items-center gap-4">

                  <div className="w-10 h-10 rounded-lg bg-[#F5E7F7] flex items-center justify-center">

                    <Upload
                      size={18}
                      className="text-[#A000A9]"
                    />

                  </div>

                  <div>

                    <p className="font-medium text-[#2563EB]">
                      {file.name}
                    </p>

                    <p className="text-xs text-gray-400">

                      {(file.size / 1024).toFixed(1)} KB

                    </p>

                  </div>

                </div>

                <button
                  onClick={() => {

                    setForm((prev) => ({
                      ...prev,
                      receipts:
                        prev.receipts.filter(
                          (_, i) => i !== index
                        ),
                    }));

                  }}
                  className="text-red-500 hover:bg-red-50 rounded-lg p-2"
                >
                  <X size={18} />
                </button>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
}