import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req, { params }) {
  try {
    const { id } = await params;

    const rfqId = Number(id);

    const rfq = await prisma.rFQ.findUnique({
      where: {
        id: rfqId,
      },
      include: {
        vendors: true,
        items: true,
      },
    });

    if (!rfq) {
      return NextResponse.json(
        { error: "RFQ not found" },
        { status: 404 }
      );
    }

    const quotations = [];

    for (const vendor of rfq.vendors) {
      for (const item of rfq.items) {
        quotations.push({
          rfqId,
          vendorId: vendor.vendorId,
          productId: item.productId,

          quantity: item.quantity,

          costPerUnit: 0,
          totalCost: 0,

          expectedDeliveryDate: new Date(),

          includeDeliveryCharge: true,
          returnAvailable: true,  
          replacementAvailable: true,
        });
      }
    }

    await prisma.vendorQuotation.createMany({
      data: quotations,
      skipDuplicates: true,
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}