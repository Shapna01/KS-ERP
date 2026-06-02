import { prisma } from "@/lib/prisma";

export async function POST(req) {
  try {
    const body = await req.json();

    const { email } = body;

    const user = await prisma.users.findFirst({
      where: {
        workemail: email,
      },
    });

    if (!user) {
      return Response.json({
        success: false,
        message: "No account found",
      });
    }

    return Response.json({
      success: true,
      message: "User found",
      user,
    });

  } catch (error) {
    console.log(error);

    return Response.json({
      success: false,
      message: error.message,
    });
  }
}
