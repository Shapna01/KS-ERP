import { prisma } from "@/lib/prisma";
import Sidebar from "@/app/dashboard/users/components/Sidebar";
import Topbar from "@/app/dashboard/users/components/Topbar";
import AssignTeamForm from "./AssignTeamForm";

export default async function AssignTeamPage({ params }) {
  const { id } = await params;

  const project = await prisma.project.findUnique({
    where: {
      id: Number(id),
    },
  });

  if (!project) {
    return <div>Project not found</div>;
  }

  return (
    <div className="flex min-h-screen bg-[#F7F7FA]">
      <Sidebar />

      <div className="flex-1 ml-[74px]">
        <Topbar />

        <AssignTeamForm project={project} />
      </div>
    </div>
  );
}