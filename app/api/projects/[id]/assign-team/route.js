import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req, context) {
  try {
    const { id } = await context.params;

    const body = await req.json();

    const project = await prisma.project.update({
      where: {
        id: Number(id),
      },
      data: {
        projectManager: body.projectManager,
      },
    });

    return NextResponse.json(project);
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { error: "Failed to assign team" },
      { status: 500 }
    );
  }
}