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

    console.log(body);

    const project = await prisma.project.create({
  data: {
    projectName: body.projectName,
    projectCode: body.projectCode,
    projectDescription: body.projectDescription,
    estimatedBudget: Number(body.estimatedBudget),
    projectManager: body.projectManager,
    startDate: body.startDate
      ? new Date(body.startDate)
      : null,
    endDate: body.endDate
      ? new Date(body.endDate)
      : null,

    approvalStatus: "Yet to Approve",
  },
});

    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}