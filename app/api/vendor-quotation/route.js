import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);

    const rfqId = Number(searchParams.get("rfqId"));

    const quotations = await prisma.vendorQuotation.findMany({
  where: {
    rfqId,
  },
  include: {
    vendor: true,
    product: true,
    rfq: {
      include: {
        project: true,
      },
    },
  },
});

    return NextResponse.json(quotations);
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}