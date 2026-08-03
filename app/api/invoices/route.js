import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();

    console.log(" CREATE INVOICE ");
    console.log("Invoice Data:", body);

    if (!body.purchaseOrderId) {
      return NextResponse.json(
        {
          error: "purchaseOrderId is required",
        },
        {
          status: 400,
        }
      );
    }

    if (!body.invoiceNumber) {
      return NextResponse.json(
        {
          error: "invoiceNumber is required",
        },
        {
          status: 400,
        }
      );
    }

    const invoice =
      await prisma.invoice.create({
        data: {
          purchaseOrderId:
            Number(body.purchaseOrderId),

          goodsReceiptId:
            body.goodsReceiptId
              ? Number(body.goodsReceiptId)
              : null,

          invoiceNumber:
            body.invoiceNumber,

          invoiceType:
            body.invoiceType ||
            "Vendor Invoice",

          invoiceDate:
            body.invoiceDate
              ? new Date(body.invoiceDate)
              : new Date(),

          dueDate:
            body.dueDate
              ? new Date(body.dueDate)
              : null,

          quantity:
            Number(body.quantity || 0),

          amount:
            Number(body.amount || 0),

          cgst:
            Number(body.cgst || 0),

          sgst:
            Number(body.sgst || 0),

          igst:
            Number(body.igst || 0),

          grandTotal:
            Number(body.grandTotal || 0),

          paymentTerms:
          typeof body.paymentTerms === "string"
            ? body.paymentTerms
            : null,

          paymentMethod:
            body.paymentMethod || null,

          invoiceFile:
            body.invoiceFile || null,

          financeRemarks:
            body.financeRemarks || null,

          invoiceStatus:
            "Received",

          matchingStatus:
            body.matchingStatus ||
            "Matched",
        },

        include: {
          purchaseOrder: {
            include: {
              vendor: true,
              project: true,
            },
          },

          goodsReceipt: true,
        },
      });

    console.log(
      "Invoice Created:",
      invoice
    );

    return NextResponse.json(
      invoice,
      {
        status: 201,
      }
    );

  } catch (error) {

    console.error(
      "CREATE INVOICE ERROR:",
      error
    );

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unknown error",
      },
      {
        status: 500,
      }
    );
  }
}