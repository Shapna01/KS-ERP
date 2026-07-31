import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    const { id } = await params;

    const product = await prisma.product.findUnique({
      where: {
        id: Number(id),
      },

      include: {
        productVendors: {
          include: {
            vendor: true,
          },
        },

        purchaseOrderItems: {
          include: {
            purchaseOrder: {
              include: {
                vendor: true,
                project: true,
              },
            },
          },
        },

        purchaseRequisitionItems: {
          include: {
            purchaseRequisition: {
              include: {
                project: true,
              },
            },
          },
        },
      },
    });

    if (!product) {
      return NextResponse.json(
        {
          error: "Product not found",
        },
        {
          status: 404,
        }
      );
    }

    const purchaseOrders = product.purchaseOrderItems.map((item) => ({
      id: item.purchaseOrder.id,
      poNumber: item.purchaseOrder.poNumber,
      orderDate: item.purchaseOrder.orderDate,
      status: item.purchaseOrder.status,
      quantity: item.quantity,
      estimatedPrice: item.unitPrice,

      vendor: item.purchaseOrder.vendor,

      project: item.purchaseOrder.project,
    }));

    return NextResponse.json({
      ...product,
      purchaseOrders,
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