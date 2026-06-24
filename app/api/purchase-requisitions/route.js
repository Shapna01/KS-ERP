import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const prs = await prisma.purchaseRequisition.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(prs);
  } catch (error) {
    console.error("GET ERROR:", error);

    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const body = await req.json();

    const pr = await prisma.purchaseRequisition.create({
      data: {
        prNumber: body.prNumber,
        projectNumber: body.projectNumber,
        category: body.category,
        priority: body.priority,
        deliveryAddress: body.deliveryAddress,
        requestorDept: body.requestorDept,
        expectedDeliveryDate: new Date(body.expectedDeliveryDate),
        reason: body.reason,
      },
    });

    return NextResponse.json(pr);
  } catch (error) {
    console.error("POST ERROR:", error);

    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}