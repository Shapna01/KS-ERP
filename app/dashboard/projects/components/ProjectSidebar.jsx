"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function ProjectSidebar() {
  const [projects, setProjects] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    fetch("/api/projects")
      .then((res) => res.json())
      .then((data) => setProjects(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="fixed top-[72px] left-[74px] w-[270px] h-[calc(100vh-72px)] bg-white border-r border-[#EAECF0]">

      <div className="px-6 py-6 border-b border-[#EAECF0]">
        <div className="flex items-center justify-between">
          <h2 className="text-[28px] font-bold text-[#101828]">
            Projects
          </h2>

          <div className="min-w-[32px] h-8 px-2 rounded-xl bg-[#F4EBFF] text-[#7A008C] text-sm font-semibold flex items-center justify-center">
            {projects.length}
          </div>
        </div>

       
      </div>

      <div className="py-4 overflow-y-auto h-[calc(100%-110px)]">
        {projects.map((project) => {
          const active = String(project.id) === String(id);

          return (
            <Link
              key={project.id}
              href={`/dashboard/projects/${project.id}/overview`}
            >
              <div
                className={`relative mx-3 mb-2 flex items-center h-[52px] rounded-xl px-5 transition-all duration-200 cursor-pointer ${
                  active
                    ? "bg-[#F8F4FF] text-[#7A008C] font-semibold shadow-sm"
                    : "text-[#475467] hover:bg-[#F9FAFB] hover:text-[#7A008C]"
                }`}
              >
                {active && (
                  <span className="absolute left-0 top-2 bottom-2 w-1 rounded-r-full bg-[#7A008C]" />
                )}

                <span className="truncate text-[15px]">
                  {project.projectName}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}