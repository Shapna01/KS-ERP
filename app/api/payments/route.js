import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();

    const payment = await prisma.payment.create({
      data: {
        purchaseOrderId: Number(body.purchaseOrderId),
        paymentDate: new Date(),
        paymentMode: body.paymentMode,
        referenceNo: body.referenceNo,
        amount: Number(body.amount),
        remarks: body.remarks,
      },
    });

    return NextResponse.json(payment);

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