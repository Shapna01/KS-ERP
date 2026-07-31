import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const approvals = await prisma.approval.findMany({
      include: {
        approvalLevels: {
          include: {
            approver: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(approvals);
  } catch (error) {
  console.error("GET /api/approvals Error:", error);

  return NextResponse.json(
    {
      error: error.message,
      stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
    },
    { status: 500 }
  );
}
}

export async function POST(request) {
  try {
    const body = await request.json();

    const approval = await prisma.approval.create({
      data: {
        name: body.name,
        description: body.description,
        module: body.module,
        levels: Number(body.levels),

        approvalType: body.approvalType,
        amountBased: body.amountBased,

        notifyApp: body.notifyApp,
        notifyMail: body.notifyMail,

        status: body.status,

        approvalLevels: {
          create: body.approvalLevels.map((level) => ({
            level: level.level,
            approverId: level.approverId
              ? Number(level.approverId)
              : null,
            canApprove: level.canApprove,
            canReject: level.canReject,
            canHold: level.canHold,
          })),
        },
      },
      include: {
        approvalLevels: true,
      },
    });

    return NextResponse.json(approval, { status: 201 });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}