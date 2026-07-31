import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const designations = await prisma.designations.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        team_associated: true,
        department: true,
        department_head: true,
      },
      orderBy: {
        id: "desc",
      },
    });

    return NextResponse.json(designations);
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        error: "Failed to fetch designations",
      },
      {
        status: 500,
      }
    );
  }
}