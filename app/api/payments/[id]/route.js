import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    const { id } = await params;

    const payment = await prisma.paymentSchedule.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        purchaseOrder: {
          include: {
            vendor: true,
            project: true,
            invoices: true,
          },
        },
      },
    });

    if (!payment) {
      return NextResponse.json(
        { error: "Payment not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      id: payment.id,
      paymentName: payment.paymentName,
      dueDate: payment.dueDate,
      amount: payment.amount,

      purchaseOrder: {
        id: payment.purchaseOrder.id,
        poNumber: payment.purchaseOrder.poNumber,
        vendor: payment.purchaseOrder.vendor.vendorName,
        project: payment.purchaseOrder.project.projectName,
        totalAmount: payment.purchaseOrder.totalAmount,
        paymentMethod: payment.purchaseOrder.modeOfPayment,
      },

      invoices: payment.purchaseOrder.invoices,
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