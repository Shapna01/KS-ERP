import { prisma } from "@/lib/prisma";
import Sidebar from "../../users/components/Sidebar";
import Topbar from "../../users/components/Topbar";
import ProjectSidebar from "../components/ProjectSidebar";
export default async function ProjectOverview({ params }) {
  const { id } = await params;

  const project = await prisma.project.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      purchaseRequisitions: true,
    },
  });

    if (!project) {
      return <div>Project not found</div>;
    }

  const totalMonths =
    project.startDate && project.endDate
      ? Math.ceil(
          (new Date(project.endDate) -
            new Date(project.startDate)) /
            (1000 * 60 * 60 * 24 * 30)
        )
      : 0;

  return (
    <div className="flex min-h-screen bg-[#F8F8FA]">
      <Sidebar />

      <ProjectSidebar />

       <div className="flex-1 ml-[324px]">
        <Topbar />

        <div className="pt-[100px] px-10 pb-10 bg-[#F7F7FA]">

          <div className="max-w-7xl mx-auto grid grid-cols-[280px_1fr] gap-8  ">

            <div className="
              bg-white
              rounded-[28px]
              border border-slate-100
              shadow-sm
              p-7
              h-fit
              ">

              <div className="bg-purple-100 text-[#7A008C] px-4 py-3 rounded-2xl font-medium">
                {project.projectName}
              </div>

              <div className="space-y-2">

                <div className="bg-[#F3E8FF] text-[#7A008C] px-3 py-2 rounded">
                  {project.projectName}
                </div>

              </div>

            </div>

            <div>

              <div className="
                bg-white
                rounded-[32px]
                border border-slate-100
                shadow-sm
                p-10
                ">

                <div className="flex justify-between items-start">

                  <div>
                    <h1 className="text-2xl font-semibold text-[#7A008C]">
                      {project.projectName}
                    </h1>

                    <p className="text-gray-500 text-sm mt-1">
                      {project.projectDescription}
                    </p>
                  </div>

                  <div className="flex gap-3">

                    <button className="
                      px-6 py-3
                      rounded-2xl
                      border border-green-200
                      bg-green-50
                      text-green-600
                      font-medium
                      hover:bg-green-100
                      transition
                      ">
                      Mark as Complete
                      </button>

                   <button className="
                      px-6 py-3
                      rounded-2xl
                      bg-[#7A008C]
                      text-white
                      font-medium
                      shadow-md
                      hover:bg-purple-900
                      transition
                      ">
                      Edit Project
                      </button>

                  </div>

                </div>

                <div className="grid md:grid-cols-4 gap-5 mt-10">

                  <div className="bg-gray-50 rounded-3xl p-5 border border-gray-100 shadow-sm">
                    <p className="text-xs text-gray-500 mb-2">Project Manager</p>
                    <p className="font-semibold text-black">{project.projectManager}</p>
                  </div>

                  <div className="bg-gray-50 rounded-3xl p-5 border border-gray-100 shadow-sm">
                    <p className="text-xs text-gray-500 mb-2">Team Members</p>
                    <p className="font-semibold text-black">20</p>
                  </div>

                  <div className="bg-gray-50 rounded-3xl p-5 border border-gray-100 shadow-sm">
                    <p className="text-xs text-gray-500 mb-2">Start Date</p>
                    <p className="font-semibold text-black">
                      {project.startDate
                        ? new Date(project.startDate).toLocaleDateString()
                        : "-"}
                    </p>
                  </div>

                  <div className="bg-gray-50 rounded-3xl p-5 border border-gray-100 shadow-sm">
                    <p className="text-xs text-gray-500 mb-2">Project Duration</p>
                    <p className="font-semibold text-black">{totalMonths} Months</p>
                  </div>

                </div>

                <div className="mt-10 bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-100 rounded-3xl p-8 shadow-sm">

                  <h3 className="font-semibold text-[#7A008C] mb-4">
                    Project Wallet
                  </h3>

                  <div className="mb-4">

                    <p className="font-bold text-3xl text-[#7A008C]">
                      ₹ {Number(project.estimatedBudget).toLocaleString()}
                      </p>

                    <p className="font-bold text-lg">
                      ₹{" "}
                      {Number(
                        project.estimatedBudget
                      ).toLocaleString()}
                    </p>

                  </div>

                  <div className="w-full bg-gray-200 rounded-full h-4 mt-5">
                    <div className="bg-[#7A008C] h-4 rounded-full w-[45%]" />
                  </div>
                  <div className="grid md:grid-cols-3 gap-5 mt-8">

                    <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm">
                      <p className="text-xs text-gray-500">
                        Spent
                      </p>

                      <p className="font-semibold">
                        ₹ 0
                      </p>
                    </div>

                    <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm">
                      <p className="text-xs text-gray-500 mb-2">
                        Available
                      </p>

                      <p className="text-xl font-bold text-black">
                        ₹ {Number(project.estimatedBudget).toLocaleString()}
                      </p>
                    </div>

                    <div className="
                        bg-white
                        rounded-3xl
                        p-5
                        border
                        border-gray-100
                        shadow-sm
                        ">
                      <p className="text-xs text-gray-500">
                        Cost Overrun
                      </p>

                      <p className="font-semibold">
                        ₹ 0
                      </p>
                    </div>

                  </div>

                </div>

                <div className="mt-10 flex gap-8 border-b border-gray-100">

                  <button className="
                    pb-4
                    font-semibold
                    text-[#7A008C]
                    border-b-2
                    border-[#7A008C]
                    ">
                    Purchase Requisitions ({project.purchaseRequisitions.length})
                    </button>

                  <button>
                    Work Order Docs (2)
                  </button>

                  <button>
                    Purchase (21)
                  </button>

                </div>

                <div className="
                  mt-8
                  bg-white
                  rounded-[28px]
                  border border-slate-100
                  shadow-sm
                  overflow-hidden
                  ">

                  <table className="w-full">

                    <thead className="bg-gray-50 text-gray-600">

                      <tr className="text-left text-sm">

                        <th className="p-3 ">PR No</th>
                        <th className="p-3">Type</th>
                        <th className="p-3">Priority</th>
                        <th className="p-3">Status</th>

                      </tr>

                    </thead>

                    <tbody>
                      {project.purchaseRequisitions.length === 0 ? (
                        <tr>
                          <td colSpan={4} className="p-8 text-center text-gray-400">
                            No requisitions yet
                          </td>
                        </tr>
                      ) : (
                        project.purchaseRequisitions.map((pr) => (
                          <tr key={pr.id} className="border-t">
                            <td className="p-3">{pr.prNumber}</td>
                            <td className="p-3">{pr.category}</td>
                            <td className="p-3">{pr.priority}</td>
                            <td className="p-3">{pr.status}</td>
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
    </div>
  );
}