import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req, context) {
  try {

    const { id } = await context.params;

    const invoice = await prisma.invoice.findUnique({
      where: {
        id: Number(id),
      },
      include: {
  purchaseOrder: {
    include: {
      vendor: true,
      project: true,
      items: {
        include: {
          product: true,
        },
      },
    },
  },

  items: {
    include: {
      purchaseOrderItem: {
        include: {
          product: true,
        },
      },
    },
  },

        goodsReceipt: {
          include: {
            items: true,
          },
        },
      },
    });

    if (!invoice) {
      return NextResponse.json(
        { error: "Invoice not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(invoice);

  } catch (error) {

    console.log(error);

    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}