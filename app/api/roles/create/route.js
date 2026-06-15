import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req) {
  try {
    const body = await req.json();

    const role = await prisma.roles.create({
      data: {
        role_name: body.role_name,
        description: body.description,
        status: body.status,
        total_users: 0,
      },
    });

    return NextResponse.json(role, { status: 201 });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to create role" },
      { status: 500 }
    );
  }
}