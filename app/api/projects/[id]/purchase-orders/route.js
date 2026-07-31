import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
export async function GET(request, { params }) {
  try {
    const { id } = await params;

    const purchaseOrder = await prisma.purchaseOrder.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        vendor: true,
        project: true,
        rfq: {
          include: {
            purchaseRequisition: true,
          },
        },
        items: {
          include: {
            product: true,
          },
        },
        paymentSchedules: true,
        invoices: true,
        goodsReceipts: {
          include: {
            items: true,
          },
        },
      },
    });

    if (!purchaseOrder) {
      return NextResponse.json(
        {
          error: "Purchase Order not found",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(purchaseOrder);
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