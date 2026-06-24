import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const vendors = await prisma.vendor.findMany({
      orderBy: {
        vendorName: "asc",
      },
    });

    return NextResponse.json(vendors);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Failed to fetch vendors",
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

    const vendor = await prisma.vendor.create({
      data: {
        vendorName: body.vendorName,
        establishedDate: body.establishedDate
          ? new Date(body.establishedDate)
          : null,
        panNumber: body.panNumber,
        gstNumber: body.gstNumber,
        serviceCategory: body.serviceCategory,
        legalStructure: body.legalStructure,
        annualSales: body.annualSales,
        msmeRegistered: body.msmeRegistered,
        address: body.address,

        contactName: body.contactName,
        contactNumber: body.contactNumber,
        contactEmail: body.contactEmail,
        fax: body.fax,
        website: body.website,
        upiId: body.upiId,

        beneficiaryName: body.beneficiaryName,
        accountNumber: body.accountNumber,
        bankName: body.bankName,
        branchName: body.branchName,
        ifscCode: body.ifscCode,
      },
    });

    return NextResponse.json(vendor);
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        error: "Failed to create vendor",
      },
      {
        status: 500,
      }
    );
  }
}