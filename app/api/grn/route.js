import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const grns = await prisma.goodsReceipt.findMany({
      include: {
        purchaseOrder: {
          include: {
            vendor: true,
            project: true,
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
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(grns);
  } catch (error) {
    console.error("GET GRN error:", error);

    return NextResponse.json(
      {
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(req) {
  try {
    const body = await req.json();

    console.log(
      "GRN Request Body:",
      JSON.stringify(body, null, 2)
    );

    const {
      purchaseOrderId,
      items,
    } = body;


    const poId = Number(purchaseOrderId);

    if (!Number.isInteger(poId) || poId <= 0) {
      return NextResponse.json(
        {
          message: "Valid Purchase Order ID is required",
        },
        {
          status: 400,
        }
      );
    }

    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        {
          message: "GRN items are required",
        },
        {
          status: 400,
        }
      );
    }

    const purchaseOrder =
      await prisma.purchaseOrder.findUnique({
        where: {
          id: poId,
        },

        include: {
          items: true,
          goodsReceipts: {
            include: {
              items: true,
            },
          },
        },
      });

    if (!purchaseOrder) {
     console.log("Purchase Order not found");
return NextResponse.json(
  { message: "Purchase Order not found" },
  { status: 404 }
);
    }

    const grnItems = [];

    for (const item of items) {
      const purchaseOrderItemId = Number(
        item.purchaseOrderItemId
      );

      const receivedQuantity = Number(
        item.receivedQuantity
      );

      const acceptedQuantity = Number(
        item.acceptedQuantity
      );

      const rejectedQuantity = Number(
        item.rejectedQuantity
      );


      if (
        !Number.isInteger(purchaseOrderItemId) ||
        purchaseOrderItemId <= 0
      ) {
        return NextResponse.json(
          {
            message:
              "Valid Purchase Order Item ID is required",
          },
          {
            status: 400,
          }
        );
      }


      const poItem =
        purchaseOrder.items.find(
          (x) => x.id === purchaseOrderItemId
        );

      if (!poItem) {
        return NextResponse.json(
          {
            message: `Purchase Order Item ${purchaseOrderItemId} does not belong to Purchase Order ${poId}`,
          },
          {
            status: 400,
          }
        );
      }

      if (
        !Number.isFinite(receivedQuantity) ||
        receivedQuantity <= 0
      ) {
        return NextResponse.json(
          {
            message: `Invalid received quantity for item ${purchaseOrderItemId}`,
          },
          {
            status: 400,
          }
        );
      }

      if (
        !Number.isFinite(acceptedQuantity) ||
        acceptedQuantity < 0
      ) {
        return NextResponse.json(
          {
            message: `Invalid accepted quantity for item ${purchaseOrderItemId}`,
          },
          {
            status: 400,
          }
        );
      }

      if (
        !Number.isFinite(rejectedQuantity) ||
        rejectedQuantity < 0
      ) {
        return NextResponse.json(
          {
            message: `Invalid rejected quantity for item ${purchaseOrderItemId}`,
          },
          {
            status: 400,
          }
        );
      }

      if (
        acceptedQuantity + rejectedQuantity !==
        receivedQuantity
      ) {
        return NextResponse.json(
          {
            message: `Item ${purchaseOrderItemId}: Accepted + Rejected must equal Received`,
          },
          {
            status: 400,
          }
        );
      }

      let alreadyReceived = 0;

      for (const grn of purchaseOrder.goodsReceipts) {
        for (const grnItem of grn.items) {
          if (
            grnItem.purchaseOrderItemId ===
            purchaseOrderItemId
          ) {
            alreadyReceived +=
              Number(grnItem.receivedQuantity) || 0;
          }
        }
      }

      const remaining =
        Number(poItem.quantity) -
        alreadyReceived;

      if (receivedQuantity > remaining) {
        return NextResponse.json(
          {
            message:
              `Item ${purchaseOrderItemId}: Only ${remaining} quantity remaining`,
          },
          {
            status: 400,
          }
        );
      }

      grnItems.push({
        purchaseOrderItem: {
          connect: {
            id: purchaseOrderItemId,
          },
        },
        orderedQuantity: Number(
          poItem.quantity
        ),

        receivedQuantity,
        acceptedQuantity,
        rejectedQuantity,
      });
    }


    const count =
      await prisma.goodsReceipt.count();

    const grnNumber =
      `GRN-${String(count + 1).padStart(4, "0")}`;

    const grn =
      await prisma.goodsReceipt.create({
        data: {
          grnNumber,

          purchaseOrder: {
            connect: {
              id: poId,
            },
          },

          receivedDate: body.receivedDate
            ? new Date(body.receivedDate)
            : new Date(),

          items: {
            create: grnItems,
          },
        },

        include: {
          purchaseOrder: {
            include: {
              vendor: true,
              project: true,
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
        },
      });

    console.log(
      "GRN Created:",
      JSON.stringify(grn, null, 2)
    );

    return NextResponse.json(grn, {
      status: 201,
    });
  } catch (error) {
    console.error(
      "POST /api/grn error:",
      error
    );

    return NextResponse.json(
      {
        message:
          error.message ||
          "Failed to create GRN",
      },
      {
        status: 500,
      }
    );
  }
}