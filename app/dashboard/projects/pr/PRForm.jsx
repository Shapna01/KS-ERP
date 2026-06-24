"use client";

import { useState } from "react";
import GeneralDetails from "./GeneralDetails";
import ScheduleSection from "./ScheduleSection";
import ItemsTable from "./ItemsTable";
import Attachments from "./Attachments";
import ActionButtons from "./ActionButtons";

export default function PRForm({ projectId }) {
  const [formData, setFormData] = useState({
  prNumber: `PR-${Date.now()}`,
  projectNumber: projectId || "ID 234",

  category: "Goods",
  priority: "Normal",

  deliveryAddress:
    "5-29, KS Smart Solutions Pvt Ltd, Anna Salai, Teynampet",

  requestorDept: "Design Department",

  expectedDeliveryDate: "",

  reason:
    "Allows reviewers to approve, hold, or reject purchase requisitions based on configured approval rules.",

  requestType: "One Time",
});

  const updateField = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 text-gray-600">

      

      <div className="space-y-10">
  <GeneralDetails formData={formData} updateField={updateField} />

  <ScheduleSection />

  <ItemsTable />

  <Attachments />
</div>

     <div className="mt-10 pt-6 border-t border-gray-100">
  <ActionButtons formData={formData} />
</div>

    </div>
  );
}