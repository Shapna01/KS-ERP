"use client";

export default function GeneralDetails({ formData, updateField }) {
  return (
    <div className="border border-gray-100 rounded-2xl p-8 bg-white shadow-sm space-y-6">
      <div className="grid grid-cols-2 gap-6">

        <div>
          <label className="text-xs text-gray-500 mb-1 block">
            PR Number (Auto Generated)
          </label>

          <input
            type="text"
            value={formData.prNumber}
            readOnly
            className="w-full h-11 border rounded-md px-3 bg-gray-100 text-gray-500 cursor-not-allowed text-sm"
          />
        </div>

        <div>
          <label className="text-xs text-gray-500 mb-1 block">
            Project Number (Auto Fetched)
          </label>

          <input
            type="text"
            value={formData.projectId}
            readOnly
            className="w-full h-11 border rounded-md px-3 bg-gray-100 text-gray-500 cursor-not-allowed text-sm"
          />
        </div>

        <div>
          <label className="text-xs font-medium text-gray-600 mb-1 block">
            Category <span className="text-red-500">*</span>
          </label>

          <select
            value={formData.category}
            onChange={(e) => updateField("category", e.target.value)}
            className="w-full h-11 border border-gray-200 rounded-xl px-3 text-sm 
focus:outline-none focus:ring-2 focus:ring-[#7A008C]/30 focus:border-[#7A008C] transition"
          >
            <option>Goods</option>
            <option>Service</option>
            <option>Asset</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-6">

          <div>
            <label className="text-xs mb-1 block">
              Priority <span className="text-red-500">*</span>
            </label>

            <select
              value={formData.priority}
              onChange={(e) => updateField("priority", e.target.value)}
              className="w-full h-11 border rounded-md px-3 text-sm"
            >
              <option>Low</option>
              <option>Normal</option>
              <option>High</option>
              <option>Urgent</option>
            </select>
          </div>

          <div>
            <label className="text-xs mb-1 block">
              Expected Delivery Date <span className="text-red-500">*</span>
            </label>

            <input
              type="date"
              value={formData.expectedDeliveryDate}
              onChange={(e) =>
                updateField("expectedDeliveryDate", e.target.value)
              }
              className="w-full h-11 border rounded-md px-3 text-sm"
            />
          </div>

        </div>

        <div>
          <label className="text-xs mb-1 block">
            Delivery Address <span className="text-red-500">*</span>
          </label>

          <input
            type="text"
            value={formData.deliveryAddress}
            onChange={(e) =>
              updateField("deliveryAddress", e.target.value)
            }
            className="w-full h-11 border rounded-md px-3 text-sm"
          />
        </div>
        <div>
          <label className="text-xs text-gray-500 mb-1 block">
            Requestor Dept. (Auto Fetched)
          </label>

          <input
            type="text"
            value={formData.requestorDept}
            readOnly
            className="w-full h-11 border rounded-md px-3 bg-gray-100 text-gray-500 cursor-not-allowed text-sm"
          />
        </div>

        <div className="col-span-2">
          <label className="text-xs mb-1 block">
            Reason for Request <span className="text-red-500">*</span>
          </label>

          <textarea
            rows={3}
            value={formData.reason}
            onChange={(e) => updateField("reason", e.target.value)}
            className="w-full border border-gray-200 rounded-xl px-3 py-3 text-sm 
focus:outline-none focus:ring-2 focus:ring-[#7A008C]/30 focus:border-[#7A008C] transition"
          />
        </div>

      </div>
    </div>
  );
}