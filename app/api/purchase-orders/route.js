import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const purchaseOrders = await prisma.purchaseOrder.findMany({
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
  },

  orderBy: {
    createdAt: "desc",
  },
});

    return NextResponse.json(purchaseOrders);
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        error: "Failed to fetch Purchase Orders",
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

    const {
  rfqId,
  vendorId,
  projectId,
  orderDate,
  expectedDeliveryDate,
  items,

  paymentMethod,
  advancePercent,
  installmentPercent,
  modeOfPayment,
  numberOfInstallments,
  paymentFrequency,
} = body;

if (!items || items.length === 0) {
  return NextResponse.json(
    {
      error: "At least one item is required",
    },
    {
      status: 400,
    }
  );
}
const advance = Number(advancePercent || 40);

if (advance < 0 || advance > 100) {
  return NextResponse.json(
    {
      error: "Advance percentage must be between 0 and 100",
    },
    {
      status: 400,
    }
  );
}

const totalAmount = items.reduce(
  (sum, item) =>
    sum +
    Number(item.quantity) *
    Number(item.unitPrice),
  0
);
const count = await prisma.purchaseOrder.count();

const poNumber = `PO-${String(count + 1).padStart(4, "0")}`;
   

    const purchaseOrder =
      await prisma.purchaseOrder.create({
        data: {

        poNumber,
          totalAmount,

        status: "Purchase Order",
        paymentMethod: paymentMethod || "schedule",

        
          advancePercent: advance,

        installmentPercent:
          Number(installmentPercent || 60),

        modeOfPayment:
          modeOfPayment ||
          "Online Transfer",

        numberOfInstallments:
          Number(
            numberOfInstallments || 3
          ),

        paymentFrequency:
          paymentFrequency ||
          "Monthly",

        vendor: {
            connect: {
              id: Number(vendorId),
            },
          },

          project: {
            connect: {
              id: Number(projectId),
            },
          },

          rfq: {
            connect: {
              id: Number(rfqId),
            },
          },

          orderDate: new Date(orderDate),

          expectedDeliveryDate:
            new Date(
              expectedDeliveryDate
            ),

          items: {
            create: items.map(
              (item) => ({
                product: {
                  connect: {
                    id: Number(
                      item.productId
                    ),
                  },
                },

                quantity: Number(
                  item.quantity
                ),

                unitPrice: Number(
                  item.unitPrice
                ),
              })
            ),
          },
        },

        include: {
          vendor: true,
          project: true,
          rfq: true,

          items: {
            include: {
              product: true,
            },
          },
        },
      });
    if ((paymentMethod || "schedule") === "schedule") {
const advanceAmount =
  totalAmount *
  advance /
  100;

  const remainingAmount =
    totalAmount - advanceAmount;

  const installmentAmount =
    remainingAmount /
    Number(
      numberOfInstallments || 3
    );

  await prisma.paymentSchedule.create({
    data: {
      purchaseOrderId:
        purchaseOrder.id,

      paymentName:
        "Advance Payment",

      dueDate: new Date(),

      amount: advanceAmount,
    },
  });

  for (
    let i = 1;
    i <=
    Number(
      numberOfInstallments || 3
    );
    i++
  ) {
    const dueDate =
      new Date();

    dueDate.setMonth(
      dueDate.getMonth() + i
    );

    await prisma.paymentSchedule.create({
      data: {
        purchaseOrderId:
          purchaseOrder.id,

        paymentName:
          `Installment ${i}`,

        dueDate,
 
        amount:
          installmentAmount,
      },
    });
  }
}

    return NextResponse.json(
      purchaseOrder
    );
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