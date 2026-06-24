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

    const projectName = formData.get("projectName");
    const projectCode = formData.get("projectCode");
    const projectDescription = formData.get("projectDescription");
    const estimatedBudget = formData.get("estimatedBudget");
    const projectManager = formData.get("projectManager");
    const startDate = formData.get("startDate");
    const endDate = formData.get("endDate");

    const files = formData.getAll("files");

    console.log("Uploaded Files:", files);

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
    console.log(error);

    return NextResponse.json(
      { error: "Failed to create project" },
      { status: 500 }
    );
  }
}