import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET PRODUCTS
export async function GET() {
  try {
    const products = await prisma.product.findMany({
      include: {
        productVendors: {
          include: {
            vendor: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

// CREATE PRODUCT
export async function POST(req) {
  try {
    const formData = await req.formData();

    const productName = formData.get("productName");
    const productCode = formData.get("productCode");
    const estimatedPrice = formData.get("estimatedPrice");
    const vendorId = formData.get("vendorId");
    const specificationFile = formData.get("specification");

    const specification =
      specificationFile && specificationFile.name
        ? specificationFile.name
        : "";

    // duplicate code check
    const existingProduct = await prisma.product.findUnique({
      where: {
        productCode,
      },
    });

    if (existingProduct) {
      return NextResponse.json(
        {
          error: "Product code already exists",
        },
        { status: 400 }
      );
    }

    let product;

    if (vendorId) {
      product = await prisma.product.create({
        data: {
          productName,
          productCode,
          specification,
          estimatedPrice: Number(estimatedPrice),

          productVendors: {
            create: {
              vendor: {
                connect: {
                  id: Number(vendorId),
                },
              },
            },
          },
        },
      });
    } else {
      product = await prisma.product.create({
        data: {
          productName,
          productCode,
          specification,
          estimatedPrice: Number(estimatedPrice),
        },
      });
    }

    return NextResponse.json(product);
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