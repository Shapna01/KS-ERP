"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Filter, Upload } from "lucide-react";

import Sidebar from "../users/components/Sidebar";
import Topbar from "../users/components/Topbar";

export default function ProjectsPage() {
  const router = useRouter();

  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchProjects();
  }, []);
  async function fetchProjects() {
    try {
      const response = await fetch("/api/projects");
      const data = await response.json();

      setProjects(data);
      setFilteredProjects(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const filtered = projects.filter((project) => {
      const search = searchTerm.toLowerCase();

      return (
        project.projectName?.toLowerCase().includes(search) ||
        project.projectDescription?.toLowerCase().includes(search) ||
        project.projectCode?.toLowerCase().includes(search)
      );
    });

    setFilteredProjects(filtered);
  }, [searchTerm, projects]);

  return (
    <div className="flex min-h-screen bg-[#F7F7FA]">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden ml-[74px]">
        <Topbar />

        <div className="flex-1 overflow-y-auto pt-[72px] ">
          <div className="px-8 py-7">

            <div className="flex items-start justify-between mb-8 ">
              <div>
                <div className="text-sm text-gray-500 mb-6">
                  <span className="text-[#7A008C]">Projects</span>
                  <span className="mx-2">{">"}</span>
                  <span>Project List</span>
                </div>
                <h1 className="text-3xl font-bold text-[#7A008C] ">
                  Projects
                </h1>

                <p className="text-sm text-gray-500 mt-2">
                  Manage all projects.
                </p>
              </div>

              <button
                onClick={() => router.push("/dashboard/projects/create")}
                className="bg-[#7A008C] hover:bg-purple-900 text-white px-6 h-11 rounded-xl shadow-sm transition"
              >
                + Create New 
              </button>
            </div>

            <div className="bg-white border border-gray-200 rounded-3xl shadow-sm p-6 text-gray-500">

              <div className="flex justify-between mb-6">
                <h2 className="font-semibold text-2xl">
                  Project Details ({filteredProjects.length})
                </h2>

                <div className="flex gap-3">

                  <div className="relative">
                    <Search
                      size={16}
                      className="absolute left-3 top-3 text-gray-400"
                    />

                    <input
                      value={searchTerm}
                      onChange={(e) =>
                        setSearchTerm(e.target.value)
                      }
                      placeholder="Search"
                      className="h-11 w-64 border border-gray-300 rounded-xl pl-10 pr-4 outline-none focus:border-[#7A008C]"
                    />
                  </div>

                  <button className="w-11 h-11 border border-gray-300 rounded-xl flex items-center justify-center hover:bg-gray-100 transition">
                    <Filter size={16} />
                  </button>

                  <button className="w-11 h-11 border border-gray-300 rounded-xl flex items-center justify-center hover:bg-gray-100 transition">
                    <Upload size={16} />
                  </button>
                </div>
              </div>

              <div className="overflow-hidden rounded-2xl border border-gray-200">

                <table className="w-full">

                  <thead className="bg-gray-50 text-gray-700">
                    <tr>
                      <th className="p-4 text-left font-semibold">Project Name</th>
                      <th className="p-4 text-left font-semibold">Description</th>
                      <th className="p-4 text-left font-semibold">Code</th>
                      <th className="p-4 text-left font-semibold">Manager</th>
                      <th className="p-4 text-left font-semibold">Budget</th>
                      <th className="p-4 text-left font-semibold">Approval Status</th>
                      <th className="p-4 text-left font-semibold">Project Status</th>
                    </tr>
                  </thead>

                  <tbody>

                    {loading ? (
                      <tr>
                        <td colSpan="5" className="p-10 text-center">
                          Loading...
                        </td>
                      </tr>
                    ) : (
                      filteredProjects.map((project) => (
                        <tr
                          key={project.id}
                          className="border-t border-gray-100 cursor-pointer hover:bg-[#FAFAFA] transition"
                          onClick={() =>
                            router.push(`/dashboard/projects/${project.id}`)
                          }
                        >
                          <td className="p-4">{project.projectName}</td>
                          <td className="p-4">{project.projectDescription}</td>
                          <td className="p-4">{project.projectCode}</td>
                          <td className="p-4">{project.projectManager}</td>
                          <td className="p-4">
                            ₹{project.estimatedBudget}
                          </td>
                          <td className="p-4">
                          <span
                            className={`px-3 py-1 rounded-full text-xs
                              ${
                                project.approvalStatus === "Approved"
                                  ? ""
                                  : project.approvalStatus === "Rejected"
                                  ? "bg-red-100 text-red-700"
                                  : project.approvalStatus === "Hold"
                                  ? "bg-yellow-100 text-yellow-700"
                                  : "bg-gray-100 text-gray-700"
                              }
                            `}
                          >
                            {project.approvalStatus}
                          </span>
                        </td>
                        <td className="p-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs
                            ${
                              project.approvalStatus === "Approved"
                                ? "bg-yellow-100 text-yellow-700"
                                : project.approvalStatus === "Rejected"
                                ? "bg-red-100 text-red-700"
                                : project.approvalStatus === "Hold"
                                ? "bg-gray-200 text-gray-700"
                                : "bg-gray-100 text-gray-500"
                            }
                          `}
                        >
                          {project.approvalStatus === "Approved"
                            ? "In Progress"
                            : project.approvalStatus === "Rejected"
                            ? "Rejected"
                            : project.approvalStatus === "Hold"
                            ? "On Hold"
                            : "-----"}
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
    </div>
  );
}