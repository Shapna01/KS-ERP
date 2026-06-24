import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(request, { params }) {
  try {
    const { id } = await params;

    const { status, reason } = await request.json();

    const project = await prisma.project.update({
      where: {
        id: Number(id),
      },
      data: {
        approvalStatus: status,
        holdReason: status === "Hold" ? reason : undefined,
        rejectionReason: status === "Rejected" ? reason : undefined,
      },
    });

    return NextResponse.json(project);
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { error: "Failed to update project" },
      { status: 500 }
    );
  }
}

