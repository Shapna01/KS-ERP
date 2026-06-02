import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req) {
  try {
    const body = await req.json();

    const user = await prisma.users.create({
      data: {
        name: body.name || null,
        userid: body.userid || null,
        workemail: body.workemail || null,
        personalemail: body.personalemail || null,
        phone: body.phone || null,

        dob: body.dob
          ? new Date(body.dob)
          : null,

        gender: body.gender || null,

        present_address:
          body.presentAddress || null,

        permanent_address:
          body.permanentAddress || null,

        joining_date: body.joining_date
          ? new Date(body.joining_date)
          : null,

        designation:
          body.designation || null,

        team: body.team || null,

        department:
          body.department || null,

        reporting_to:
          body.reporting_to || null,

        employment_type:
          body.employment_type || null,

        role: body.role || null,

        aadhaar:
          body.aadhaar || null,

        pan: body.pan || null,

        passport:
          body.passport || null,

        offer_letter:
          body.offer_letter || null,

        increment_document:
          body.increment_document || null,
      },
    });

    return NextResponse.json(user);

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