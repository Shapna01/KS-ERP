import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  req,
  { params }
) {
  try {
    const { id } = await params;

    const grn =
      await prisma.goodsReceipt.findUnique({
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
        },
      });

    return NextResponse.json(grn);
  } catch (error) {
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