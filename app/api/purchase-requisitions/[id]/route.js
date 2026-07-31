import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    const { id } = await params;

    const prId = Number(id);

    console.log("Requested PR ID:", prId);

    if (Number.isNaN(prId)) {
      return NextResponse.json(
        { error: "Invalid Purchase Requisition ID" },
        { status: 400 }
      );
    }

    const pr = await prisma.purchaseRequisition.findUnique({
      where: {
        id: prId,
      },
      include: {
        project: true,
        items: {
          include: {
            product: {
              include: {
                productVendors: {
                  include: {
                    vendor: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    console.log("Found PR:", pr);

    if (!pr) {
      return NextResponse.json(
        { error: "Purchase Requisition not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(pr);
  } catch (error) {
    console.error("Purchase Requisition API Error:", error);

    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}