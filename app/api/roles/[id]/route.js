import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req, { params }) {
  try {
    const role = await prisma.roles.findUnique({
      where: {
        id: Number(params.id),
      },
    });

    if (!role) {
      return NextResponse.json(
        { error: "Role not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(role);
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { error: "Failed to fetch role" },
      { status: 500 }
    );
  }
}