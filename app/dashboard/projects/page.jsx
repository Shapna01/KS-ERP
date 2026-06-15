"use client";

import { useEffect, useState } from "react";
import Sidebar from "../users/components/Sidebar";
import Topbar from "../users/components/Topbar";
import {
  Search,
  Filter,
  Upload,
} from "lucide-react";
import Link from "next/link";

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("/api/projects");

        if (!res.ok) {
          throw new Error("Failed to fetch projects");
        }

        const data = await res.json();
        setProjects(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const getApprovalBadge = (status) => {
    switch (status) {
      case "Approved":
        return "bg-green-100 text-green-700";
      case "Rejected":
        return "bg-red-100 text-red-700";
      case "On Hold":
        return "bg-gray-100 text-gray-700";
      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  const getProjectBadge = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-700";
      case "In Progress":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="flex min-h-screen bg-[#F7F7FA]">
      <Sidebar />

      <div className="flex-1 flex flex-col ml-[74px]">
        <Topbar />

        <div className="flex-1 overflow-y-auto pt-[72px] px-8 py-7">
          <div className="flex items-start justify-between mb-8">
  <div>
    <h1 className="text-[30px] font-semibold text-[#7A008C]">
      Projects
    </h1>

    <p className="text-sm text-gray-500 mt-2 max-w-4xl leading-5">
      Allows administrators to design and manage approval workflows by
      specifying approval levels, approvers, escalation rules, and
      conditions such as amount, project, or department.
    </p>
  </div>

  <Link href="/dashboard/projects/create">
    <button className="bg-[#7A008C] hover:bg-[#650075] text-white px-5 h-11 rounded-lg text-sm font-medium">
      + Create New
    </button>
  </Link>
</div>

          <div className="bg-white rounded-2xl p-6 border ">
            <div className="flex items-center justify-between mb-6 ">
              <div className="text-[#7A008C]">
                <h2 className="font-semibold text-xl text-black">
                  Project Details ({projects.length})
                </h2>

                <div className="flex gap-5 mt-4 text-sm ">
                  <button className="text-[#7A008C] border-b-2 border-[#7A008C]">
                    All Projects
                  </button>

                  <button>Approved</button>
                  <button>Yet To Approve</button>
                  <button>Rejected</button>
                  <button>On Hold</button>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="relative">
                  <Search
                    size={16}
                    className="absolute left-3 top-3 text-gray-400"
                  />

                  <input
                    type="text"
                    placeholder="Search"
                    className="border rounded-lg pl-10 pr-4 h-10"
                  />
                </div>

                <button className="border rounded-lg p-2">
                  <Filter size={16} />
                </button>

                <button className="border rounded-lg p-2">
                  <Upload size={16} />
                </button>
              </div>
            </div>

            <div className="overflow-hidden rounded-xl border ">
              <table className="w-full text-sm text-black">
                <thead className="bg-[#F8F8FC]">
                  <tr>
                    <th className="p-4"></th>
                    <th className="p-4 text-left">Project Name</th>
                    <th className="p-4 text-left">
                      Project Description
                    </th>
                    <th className="p-4 text-left">Project ID</th>
                    <th className="p-4 text-left">
                      Project Manager
                    </th>
                    <th className="p-4 text-left">
                      Estimated Budget
                    </th>
                    <th className="p-4 text-left">
                      Approval Status
                    </th>
                    <th className="p-4 text-left">Team Size</th>
                    <th className="p-4 text-left">
                      Project Status
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {loading ? (
                    <tr>
                      <td
                        colSpan="9"
                        className="text-center p-6"
                      >
                        Loading...
                      </td>
                    </tr>
                  ) : (
                    projects.map((project) => (
                      <tr
                        key={project.id}
                        className="border-t"
                      >
                        <td className="p-4">
                          <input type="checkbox" />
                        </td>

                        <td className="p-4">
                          {project.projectName}
                        </td>

                        <td className="p-4">
                          {project.projectDescription}
                        </td>

                        <td className="p-4">
                          {project.projectCode}
                        </td>

                        <td className="p-4">
                          {project.projectManager}
                        </td>

                        <td className="p-4">
                          ₹{project.estimatedBudget}
                        </td>

                        <td className="p-4">
                          <span
                            className={`px-3 py-1 rounded-full text-xs ${getApprovalBadge(
                              project.approvalStatus
                            )}`}
                          >
                            {project.approvalStatus}
                          </span>
                        </td>

                        <td className="p-4">
                          {project.teamSize}
                        </td>

                        <td className="p-4">
                          <span
                            className={`px-3 py-1 rounded-full text-xs ${getProjectBadge(
                              project.projectStatus
                            )}`}
                          >
                            {project.projectStatus}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

