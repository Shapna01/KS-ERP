import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const prs = await prisma.purchaseRequisition.findMany({
      include: {
        project: true,
        rfqs: true,
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
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(prs);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}