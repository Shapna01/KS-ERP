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
    console.error("GET RFQ Error:", error);

    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const body = await req.json();

    console.log("RFQ BODY:", body);

    const {
      purchaseRequisitionId,
      projectId,
      vendorIds,
      deliveryCharge,
      deliveryType,
      returnResponsibility,
      replacementResponsibility,
      items,
    } = body;

    if (!purchaseRequisitionId) {
      return NextResponse.json(
        {
          success: false,
          message: "Purchase Requisition ID is missing",
        },
        { status: 400 }
      );
    }

    if (!projectId) {
      return NextResponse.json(
        {
          success: false,
          message: "Project ID is missing",
        },
        { status: 400 }
      );
    }

    if (!vendorIds || vendorIds.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Please select at least one vendor.",
        },
        { status: 400 }
      );
    }

    const pr = await prisma.purchaseRequisition.findUnique({
      where: {
        id: Number(purchaseRequisitionId),
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

    const count = await prisma.rFQ.count();

    const rfqNumber = `RFQ-${String(count + 1).padStart(4, "0")}`;

    const rfq = await prisma.rFQ.create({
      data: {
        rfqNumber,

        purchaseRequisitionId: Number(purchaseRequisitionId),

        projectId: Number(projectId),

        status: "RFQ Sent to Vendors",

        deliveryCharge,
        deliveryType,
        returnResponsibility,
        replacementResponsibility,

        submittedAt: new Date(),

        vendors: {
          create: vendorIds.map((vendorId) => ({
            vendorId: Number(vendorId),
          })),
        },
      },

      include: {
        purchaseRequisition: true,
        project: true,
        vendors: {
          include: {
            vendor: true,
          },
        },
      },
    });

    if (items && items.length > 0) {
      await prisma.rFQItem.createMany({
        data: items.map((item) => ({
          rfqId: rfq.id,
          productId: Number(item.productId),
          quantity: Number(item.quantity),
          estimatedRate: Number(item.estimatedRate),
        })),
      });
    }

    await prisma.purchaseRequisition.update({
      where: {
        id: Number(purchaseRequisitionId),
      },
      data: {
        status: "RFQ Created",
      },
    });

    return NextResponse.json({
      success: true,
      message: "RFQ Created Successfully",
      data: rfq,
    });
  } catch (error) {
    console.error("POST RFQ Error:", error);

    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}