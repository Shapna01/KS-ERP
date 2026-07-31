import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    const { id } = await params;

    const po = await prisma.purchaseOrder.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        vendor: true,
        project: true,

        invoices: {
          orderBy: {
            createdAt: "desc",
          },
        },

        payments: {
  orderBy: {
    paymentDate: "desc",
  },
},
      },
    });

    if (!po) {
      return NextResponse.json(
        {
          error: "Purchase Order not found",
        },
        {
          status: 404,
        }
      );
    }

const invoiceAmount = po.invoices.reduce(
  (sum, invoice) => sum + Number(invoice.grandTotal),
  0
);

const paidAmount = po.payments.reduce(
  (sum, payment) => sum + Number(payment.amount),
  0
);

const balanceAmount = invoiceAmount - paidAmount;

const invoices = po.invoices.map((invoice) => ({
  id: invoice.id,
  invoiceNumber: invoice.invoiceNumber,
  type: invoice.invoiceType,
  amount: invoice.grandTotal,
  invoiceDate: invoice.invoiceDate,
  dueDate: invoice.dueDate,
  matchingStatus: invoice.matchingStatus || "Pending",
  paymentStatus: invoice.invoiceStatus,
  dueStatus:
    invoice.invoiceStatus === "Paid"
      ? "Paid"
      : invoice.dueDate && new Date(invoice.dueDate) < new Date()
      ? "Overdue"
      : "Upcoming",
  toBePaid: invoice.invoiceStatus !== "Paid",
}));

const payments = po.payments.map((payment) => ({
  id: payment.id,
  date: payment.paymentDate,
  amount: payment.amount,
  mode: payment.paymentMode,
  reference: payment.referenceNo,
  remarks: payment.remarks,
}));

return NextResponse.json({
  id: po.id,

  poNumber: po.poNumber,

  vendor: po.vendor.vendorName,

  project: po.project.projectName,

  totalValue: po.totalAmount,

  invoiceAmount,

  paidAmount,

  balanceAmount,

  invoices,

  payments,
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