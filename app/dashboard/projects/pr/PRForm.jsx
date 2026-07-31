"use client";

import { useEffect, useState } from "react";
import GeneralDetails from "./GeneralDetails";
import ScheduleSection from "./ScheduleSection";
import ItemsTable from "./ItemsTable";
import Attachments from "./Attachments";
import ActionButtons from "./ActionButtons";

export default function PRForm({ projectId }) {
  const [formData, setFormData] = useState({
  prNumber: "",
  projectId: projectId || "",
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
const [projects, setProjects] = useState([]);


  const updateField = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  useEffect(() => {
  fetchProjects();
}, []);

const fetchProjects = async () => {
  const res = await fetch("/api/projects");
  const data = await res.json();

  setProjects(Array.isArray(data) ? data : data.projects || []);
};

  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 text-gray-600">

      

      <div className="space-y-10">
  <GeneralDetails formData={formData} updateField={updateField} />
<div>
  <label className="block text-sm font-medium mb-2">
    Project
  </label>

  <select
    value={formData.projectId}
    onChange={(e) => updateField("projectId", e.target.value)}
    className="w-full rounded-xl border border-gray-300 px-4 py-3"
  >
    <option value="">Select Project</option>

    {projects.map((project) => (
      <option key={project.id} value={project.id}>
        {project.projectName || project.name}
      </option>
    ))}
  </select>
</div>
  <ScheduleSection
  formData={formData}
  updateField={updateField}
/>

  <ItemsTable />

  <Attachments />
</div>

     <div className="mt-10 pt-6 border-t border-gray-100">
  <ActionButtons formData={formData} />
</div>

    </div>
  );
}