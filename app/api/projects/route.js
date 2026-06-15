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
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();

    const project = await prisma.project.create({
      data: {
        projectName: body.projectName,
        projectDescription: body.description,
        projectCode: body.projectNumber,
        estimatedBudget: Number(body.budget),
        projectManager: body.cto,
        approvalStatus: "Pending",
        projectStatus: "In Progress",
        teamSize: 0,
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