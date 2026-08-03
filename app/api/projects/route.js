import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(projects);
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const formData = await request.formData();

    const projectName = formData.get("projectName")?.toString().trim();
    const projectCode = formData.get("projectCode")?.toString().trim();
    const projectDescription = formData.get("projectDescription");
    const estimatedBudget = formData.get("estimatedBudget");
    const projectManager = formData.get("projectManager");
    const startDate = formData.get("startDate");
    const endDate = formData.get("endDate");

    const existingProject = await prisma.project.findFirst({
      where: {
        OR: [
          {
            projectName: {
              equals: projectName,
              mode: "insensitive", 
            },
          },
          {
            projectCode: {
              equals: projectCode,
              mode: "insensitive",
            },
          },
        ],
      },
    });

    if (existingProject) {
      return NextResponse.json(
        {
          error:
            existingProject.projectName.toLowerCase() ===
            projectName.toLowerCase()
              ? "Project name already exists."
              : "Project code already exists.",
        },
        { status: 409 }
      );
    }

    const project = await prisma.project.create({
      data: {
        projectName,
        projectCode,
        projectDescription,
        estimatedBudget: Number(estimatedBudget || 0),
        projectManager,
        startDate: startDate ? new Date(startDate) : null,
        endDate: endDate ? new Date(endDate) : null,
        approvalStatus: "Yet to Approve",
      },
    });

    return NextResponse.json(project);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to create project" },
      { status: 500 }
    );
  }
}