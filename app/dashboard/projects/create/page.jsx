"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "../../users/components/Sidebar";
import Topbar from "../../users/components/Topbar";

export default function CreateProjectPage() {
const router = useRouter();

const [files, setFiles] = useState([]);

const [projectName, setProjectName] = useState("");
const [projectCode, setProjectCode] = useState("");
const [projectDescription, setProjectDescription] = useState("");
const [estimatedBudget, setEstimatedBudget] = useState("");
const [projectManager, setProjectManager] = useState("Rohan Ramaswamy");
const [startDate, setStartDate] = useState("");
const [endDate, setEndDate] = useState("");

  const handleSubmit = async () => {
  try {
    const formData = new FormData();

    formData.append("projectName", projectName);
    formData.append("projectCode", projectCode);
    formData.append(
      "projectDescription",
      projectDescription
    );
    formData.append(
      "estimatedBudget",
      estimatedBudget
    );
    formData.append(
      "projectManager",
      projectManager
    );
    formData.append("startDate", startDate);
    formData.append("endDate", endDate);

    files.forEach((file) => {
      formData.append("files", file);
    });

    const response = await fetch("/api/projects", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    console.log("Response:", data);

    if (response.ok) {
        router.push(`/dashboard/projects/${data.id}/approval`);
    } else {
      alert(data.error);
    }
  } catch (error) {
    console.log(error);
  }
};

  return (
    <div className="flex min-h-screen bg-[#F7F7FA]">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden ml-[74px]">
        <Topbar />

        <div className="flex-1 overflow-y-auto pt-[100px] px-10 pb-10 bg-[#F7F7FA]">

          <div className="text-sm mb-5">
            <span className="text-[#7A008C] font-medium">
              Projects
            </span>
            <span className="mx-2 text-gray-400">{">"}</span>
            <span className="text-gray-500">Create New</span>
          </div>

          <h1 className="text-3xl text-[#7A008C] font-semibold mb-2">
            Create New Project
          </h1>

          <p className="text-gray-500 text-sm mb-8 max-w-4xl">
            Create and configure a new project by defining its basic details,
            timeline, ownership and associated teams.
          </p>

          <div className="grid grid-cols-3 gap-4 mb-10">
            <div className="h-12 bg-[#7A008C] text-white rounded-xl flex items-center justify-center font-medium shadow">
              Submit
            </div>

            <div className="h-12 bg-[#7A008C] text-white rounded-xl flex items-center justify-center font-medium shadow">
              To Approve
            </div>

            <div className="h-12 bg-[#7A008C] text-white rounded-xl flex items-center justify-center font-medium shadow">
              Assign Team
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-md border border-gray-100 p-10 space-y-10">

            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <label className="text-sm text-gray-900">
                  Project Name

                </label>

                <input
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  className="
w-full h-12 px-4 mt-2
border border-gray-200
rounded-2xl
bg-gray-50
text-black
placeholder:text-gray-400
focus:bg-white
focus:ring-2
focus:ring-[#7A008C]
outline-none
transition
"
                />
              </div>

              <div>
                <label className="text-sm text-gray-900">
                  Project Number (Auto Generated)
                </label>

                <input
                  value={projectCode}
                  onChange={(e) => setProjectCode(e.target.value)}
                  placeholder="Enter Project Number"
className="
w-full h-12 px-4 mt-2
border border-gray-200
rounded-2xl
bg-gray-50
text-black
placeholder:text-gray-400
focus:bg-white
focus:ring-2
focus:ring-[#7A008C]
outline-none
transition
"                />
              </div>

              <div>
                <label className="text-sm text-gray-900">
                  Project Timeline
                </label>

                <div className="flex gap-2 mt-2">
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
className="
w-full h-12 px-4 mt-2
border border-gray-200
rounded-2xl
bg-gray-50
text-black
placeholder:text-gray-400
focus:bg-white
focus:ring-2
focus:ring-[#7A008C]
outline-none
transition
"                  />

                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
className="
w-full h-12 px-4 mt-2
border border-gray-200
rounded-2xl
bg-gray-50
text-black
placeholder:text-gray-400
focus:bg-white
focus:ring-2
focus:ring-[#7A008C]
outline-none
transition
"                  />
                </div>
              </div>
            </div>

            <div className="bg-gray-50 border border-gray-100 rounded-3xl p-8">
  <h2 className="text-xl font-semibold text-gray-800 mb-6">
    Project Description
  </h2>

 <textarea
rows={5}
className="
w-full
bg-white
border border-gray-200
rounded-2xl
p-5
text-black
placeholder:text-gray-400
focus:ring-2
focus:ring-[#7A008C]
outline-none
"
/>

            <div className="border border-gray-200 rounded-2xl p-8 mt-8">

              <h2 className="text-xl font-semibold text-gray-800 mb-6">
              Project Documents
              </h2>

              <div className="grid  md:grid-cols-2 gap-8">

<div className="
border-2 border-dashed
border-[#D8B4FE]
rounded-3xl
bg-purple-50
p-12
flex flex-col items-center
justify-center
">                <p className="font-medium text-black">
                  Upload Project Document
                </p>

                <input
                  type="file"
                  multiple
                  id="project-file"
                  className="hidden"
                  onChange={(e) => {
                    const selectedFiles = Array.from(
                      e.target.files || []
                    );

                    setFiles(selectedFiles);
                  }}
                />

               <label
htmlFor="project-file"
className="
mt-5
bg-[#7A008C]
text-white
px-6 py-3
rounded-xl
cursor-pointer
hover:bg-purple-900
transition
"
>
Browse Files
</label>

                {files.length > 0 && (
                  <p className="mt-3 text-sm text-green-600">
                    {files.length} file(s) selected
                  </p>
                )}
              </div>

              <div className="border rounded-xl p-6">

                <h3 className="font-medium mb-2 text-black">
                  File(s) uploaded
                </h3>

                <p className="text-sm text-gray-500 mb-4">
                  You can add multiple files at an instance.
                </p>
            </div>
            </div>
            <div className="space-y-2 mt-6">
  {files.length > 0 ? (
    files.map((file, index) => (
      <div
        key={index}
        className="border rounded-lg p-3 flex items-center justify-between"
      >
        <span>{file.name}</span>

        <span className="text-xs text-gray-500">
          {(file.size / 1024).toFixed(2)} KB
        </span>
      </div>
    ))
  ) : (
    <div className="border rounded-lg p-3 text-gray-400">
      No file selected
    </div>
  )}
</div>

</div>

            </div>

            <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100 text-gray-700">

            <h2 className="text-xl font-semibold text-gray-800 mb-6">
            Budget & Approval
            </h2>

            <div className="grid grid-cols-2 gap-6">

              <div>
                <label className="text-sm text-gray-500">
                  Estimated Budget (Rs)
                </label>

                <input
                  type="number"
                  value={estimatedBudget}
                  onChange={(e) =>
                    setEstimatedBudget(e.target.value)
                  }
                  className="w-full h-12 px-4 mt-2 border border-gray-300 rounded-xl outline-none focus:border-[#7A008C]"
                />
              </div>

              <div>
                <label className="text-sm text-gray-500">
                  Submit To CTO
                </label>

                <select
                  value={projectManager}
                  onChange={(e) =>
                    setProjectManager(e.target.value)
                  }
                  className="
w-full h-12 px-4 mt-2
border border-gray-300
rounded-xl
text-black
focus:ring-2
focus:ring-[#7A008C]
outline-none
"
                >
                  <option>Rohan Ramaswamy</option>
                  <option>John Smith</option>
                </select>
              </div>

            </div>

<div className="flex justify-end gap-5 mt-10 pt-8 border-t border-gray-100">
              <button
                onClick={() => router.push("/dashboard/projects")}
                className="
                  px-7 py-3
                  bg-white
                  border border-gray-300
                  rounded-2xl
                  hover:bg-gray-100
                  transition
                  "
              >
                Cancel
              </button>

              <button
                onClick={handleSubmit}
                className="
                    px-8 py-3
                    rounded-2xl
                    bg-[#7A008C]
                    text-white
                    font-medium
                    shadow-lg
                    hover:bg-purple-900
                    transition
                    "
              >Done
              </button>

            </div> 




</div>
          </div>

        </div>
      </div>
    </div>
  );
}