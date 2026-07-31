import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { productId, vendorId } = await req.json();

    const relation = await prisma.productVendor.create({
      data: {
        productId,
        vendorId,
      },
    });

    return NextResponse.json(relation);
  } catch (error) {
    return NextResponse.json(
      { error: "Vendor already linked" },
      { status: 400 }
    );
  }
}