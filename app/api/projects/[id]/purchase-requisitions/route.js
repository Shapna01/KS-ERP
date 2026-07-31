import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req, context) {
  try {
    const { id } = await context.params;

    const pr = await prisma.purchaseRequisition.findUnique({
      where: {
        id: Number(id),
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

    if (!pr) {
      return NextResponse.json(
        {
          success: false,
          message: "Purchase Requisition not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(pr);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}