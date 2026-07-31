import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req) {
  try {
    const body = await req.json();

    if (!body.designationId) {
      return NextResponse.json(
        { error: "designationId is required" },
        { status: 400 }
      );
    }

    const user = await prisma.users.create({
      data: {
        name: body.name,
        password: body.password || "123456",

        designation: {
          connect: {
            id: Number(body.designationId),
          },
        },

        userid: body.userid,
        workemail: body.workemail,
        personalemail: body.personalemail,
        phone: body.phone,

        dob: new Date(body.dob),

        gender: body.gender,

        present_address: body.presentAddress,
        permanent_address: body.permanentAddress,

        joining_date: new Date(body.joining_date),

        team: body.team,
        manager: body.reporting_to,
        department: body.department,
        reporting_to: body.reporting_to,
        employment_type: body.employment_type,
        role: body.role,

        aadhaar: body.aadhaar,
        pan: body.pan,
        passport: body.passport,

        offer_letter: body.offer_letter || "",
        increment_document: body.increment_document || "",
      },
      include: {
        designation: true,
      },
    });

    return NextResponse.json(user, { status: 201 });

  } catch (error) {
    console.error(error);

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