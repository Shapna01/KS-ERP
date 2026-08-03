import { prisma } from "@/lib/prisma";
import Sidebar from "@/app/dashboard/users/components/Sidebar";
import Topbar from "@/app/dashboard/users/components/Topbar";
import ApprovalActions from "./ApprovalActions";

export default async function ApprovalPage({ params }) {
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
    return (
      <div className="flex items-center justify-center h-screen">
        Project not found
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#F7F7FA]">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden ml-[74px]">
        <Topbar />

        <div className="flex-1 overflow-y-auto pt-[100px] px-10 pb-10 bg-[#F7F7FA]">

          <div className="max-w-5xl mx-auto">

            <div className="text-sm mb-5">
              <span className="text-[#7A008C]">Projects</span>
              <span className="mx-2 text-gray-400">{">"}</span>
              <span className="text-[#7A008C]">Yet to Approve</span>
              <span className="mx-2 text-gray-400">{">"}</span>
              <span className="text-black">INA-Flight simulator</span>
              
            </div>

            <h1 className="text-4xl font-bold text-[#111827]">
              {project.projectName}
            </h1>

            <p className="text-gray-500 mt-3 max-w-3xl leading-7">
              {project.projectDescription}
            </p>

            <div className="grid grid-cols-3 w-full max-w-[730px] mb-8">

              <div className="bg-[#F4D8F8] text-[#7A008C] text-center py-3 rounded-l-md font-medium text-sm border">
                Submitted
              </div>

              <div className="bg-[#F3F4F6] text-center py-3 text-gray-600 text-sm border-t border-b">
                To Approve
              </div>

              <div className="bg-[#F3F4F6] text-center py-3 rounded-r-md text-gray-600 text-sm border">
                Assign Team
              </div>

            </div>

            <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">

              <div className="p-6 space-y-10">

                <div className="grid md:grid-cols-3 gap-8">

                  <div>
                    <label className="text-sm text-gray-500">
                      Project Name
                    </label>

                    <div className="
mt-2
h-14
px-5
rounded-2xl
border border-gray-200
bg-gray-50
flex items-center
text-black
shadow-sm
">
                      {project.projectName}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm text-gray-500">
                      Project Number (Auto Generated)
                    </label>

                    <div className="
mt-2
h-14
px-5
rounded-2xl
border border-gray-200
bg-gray-50
flex items-center
text-black
shadow-sm
">
                      {project.projectCode}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm text-gray-500">
                      Project Timeline
                    </label>

                    <div className="
mt-2
h-14
px-5
rounded-2xl
border border-gray-200
bg-gray-50
flex items-center
text-black
shadow-sm
">
                      {project.startDate
                        ? new Date(
                            project.startDate
                          ).toLocaleDateString()
                        : "-"}
                      {" - "}
                      {project.endDate
                        ? new Date(
                            project.endDate
                          ).toLocaleDateString()
                        : "-"}
                    </div>
                  </div>

                </div>

                <div className="mt-6">
                  <label className="text-sm text-gray-500">
                    Project Description
                  </label>

                  <div className="
mt-2
min-h-[120px]
rounded-2xl
border border-gray-200
bg-gray-50
p-5
text-black
shadow-sm
leading-7
">
                    {project.projectDescription}
                  </div>
                </div>

                <div className="mt-6">
                  <label className="text-sm font-medium text-gray-600">
                    Work Order
                  </label>

                  <div className="mt-2 inline-flex items-center px-3 py-2 rounded-md border border-[#E5E7EB] bg-[#FAFAFA]">
                    <span className="text-[#7A008C] text-sm">
                      Work-order-2023.pdf
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-5 mt-6">

                  <div>
                    <label className="text-sm text-gray-500">
                      Estimated Budget (Rs)
                    </label>

                    <div className="mt-2 h-11 px-3 rounded-md border border-[#E5E7EB] bg-[#FAFAFA] flex items-center text-sm">
                      ₹{" "}
                      {Number(
                        project.estimatedBudget || 0
                      ).toLocaleString()}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm text-gray-500">
                      Submit To CTO
                    </label>

                    <div className="mt-2 h-11 px-3 rounded-md border border-[#E5E7EB] bg-[#FAFAFA] flex items-center text-sm">
                      {project.projectManager}
                    </div>
                  </div>

                </div>

              </div>

              <div className="border-t border-gray-100 bg-gray-50 px-10 py-6">
                <ApprovalActions projectId={project.id} />
              </div>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
}