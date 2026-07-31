import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const purchaseOrders = await prisma.purchaseOrder.findMany({
      include: {
        vendor: true,
        project: true,
        invoices: true,
        payments: {
    orderBy:{
        paymentDate:"desc"
    }
}
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const data = purchaseOrders.map((po) => {
     const paidAmount = po.payments.reduce(
  (sum, payment) => sum + payment.amount,
  0
);

      let paymentStatus = "Unpaid";

      if (paidAmount === 0) {
        paymentStatus = "Unpaid";
      } else if (paidAmount >= po.totalAmount) {
        paymentStatus = "Fully Paid";
      } else {
        paymentStatus = "Partially Paid";
      }

      const invoicedAmount = po.invoices.reduce(
  (sum, invoice) => sum + invoice.grandTotal,
  0
);

return {
  id: po.id,
  poNumber: po.poNumber,
  vendor: po.vendor.vendorName,
  project: po.project.projectName,

  totalAmount: po.totalAmount,

  invoicedAmount,

  dueDate: po.invoices[0]?.dueDate || null,

  paymentStatus,
};
    });

    return NextResponse.json(data);
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