import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const body = await req.json();

    const { email, password } = body;

    const hashedPassword = await bcrypt.hash(
      password,
      10
    );

    await prisma.users.updateMany({
      where: {
        workemail: email,
      },
      data: {
        password: hashedPassword,
      },  
    });

    return Response.json({
      success: true,
      message: "Password created successfully",
    });

  } catch (error) {
    console.log(error);

    return Response.json({
      success: false,
      message: error.message,
    });
  }
}