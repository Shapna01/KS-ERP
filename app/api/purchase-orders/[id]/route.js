import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

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

        goodsReceipts: {
          include: {
            items: true,
          },
        },

        paymentSchedules: true,

        invoices: true,
      },
    });

    if (!purchaseOrder) {
      return NextResponse.json(
        {
          error: "Purchase order not found",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(purchaseOrder);

  } catch (error) {
    console.error("GET Purchase Order Error:", error);

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


export async function PATCH(request, { params }) {
  try {
    const { id } = await params;

    const body = await request.json();

    const { status } = body;

    if (!status) {
      return NextResponse.json(
        {
          error: "Status is required",
        },
        {
          status: 400,
        }
      );
    }

    const validStatuses = [
      "Purchase Order",
      "Approved",
      "Sent to Vendors",
      "Vendors PO",
      "To Approve",
      "Receive Goods",
      "Closed",
    ];

    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        {
          error: "Invalid purchase order status",
        },
        {
          status: 400,
        }
      );
    }

    const purchaseOrder = await prisma.purchaseOrder.update({
      where: {
        id: Number(id),
      },

      data: {
        status: status,
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

        goodsReceipts: {
          include: {
            items: true,
          },
        },

        invoices: true,
      },
    });

    return NextResponse.json(purchaseOrder);

  } catch (error) {
    console.error("PATCH Purchase Order Error:", error);

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