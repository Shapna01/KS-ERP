import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();

    const rfq = await prisma.rFQ.create({
      data: {
        rfqNumber: "RFQ-0001",
        purchaseRequisitionId: body.purchaseRequisitionId,
        projectId: body.projectId,
      },
    });


   if (body.items?.length > 0) {
  await prisma.rFQItem.createMany({
    data: body.items.map((item) => ({
      rfqId: rfq.id,
      productId: item.productId,
      quantity: item.quantity,
      estimatedRate: item.estimatedRate,

    })),
  });
}

    return NextResponse.json(rfq);
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}