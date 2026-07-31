import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import fs from "fs";
import path from "path";

export async function GET() {
  try {
    const reimbursements = await prisma.reimbursement.findMany({
      orderBy: {
        createdAt: "desc",
      },

      include: {
        project: true,
        receipts: true,
      },
    });

    return NextResponse.json(reimbursements);
  } catch (error) {
    console.error("GET REIMBURSEMENTS ERROR:", error);

    return NextResponse.json(
      {
        error: "Failed to fetch reimbursements",
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(req) {
  try {
    const formData = await req.formData();

    const claimId = formData.get("claimId");
    const userId = Number(formData.get("userId"));
    const userName = formData.get("userName");
    const department = formData.get("department");
    const team = formData.get("team");
    const submissionDate = formData.get("submissionDate");
    const claimCategory = formData.get("claimCategory");
    const projectId = Number(formData.get("projectId"));
    const amount = Number(formData.get("amount"));
    const reason = formData.get("reason");
    const status = formData.get("status") || "Draft";

    console.log("========== REIMBURSEMENT ==========");
    console.log("claimId:", claimId);
    console.log("userId:", userId);
    console.log("projectId:", projectId);
    console.log("amount:", amount);
    console.log("status:", status);

    if (!claimId) {
      return NextResponse.json(
        { error: "Claim ID is required" },
        { status: 400 }
      );
    }

    if (!userId || Number.isNaN(userId)) {
      return NextResponse.json(
        { error: "Valid user ID is required" },
        { status: 400 }
      );
    }

    if (!projectId || Number.isNaN(projectId)) {
      return NextResponse.json(
        { error: "Valid project ID is required" },
        { status: 400 }
      );
    }

    if (!amount || amount <= 0) {
      return NextResponse.json(
        { error: "Valid amount is required" },
        { status: 400 }
      );
    }

    const user = await prisma.users.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          error: `User with ID ${userId} does not exist`,
        },
        { status: 400 }
      );
    }

    const project = await prisma.project.findUnique({
      where: {
        id: projectId,
      },
    });

    if (!project) {
      return NextResponse.json(
        {
          error: `Project with ID ${projectId} does not exist`,
        },
        { status: 400 }
      );
    }

    const files = formData.getAll("receipts");

    const uploadDir = path.join(
      process.cwd(),
      "public/uploads/reimbursements"
    );

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, {
        recursive: true,
      });
    }

    const receiptUrls = [];

    for (const file of files) {
      if (!file || !file.name) {
        continue;
      }

      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const fileName =
        Date.now() +
        "-" +
        file.name.replace(/\s+/g, "_");

      const filePath = path.join(
        uploadDir,
        fileName
      );

      fs.writeFileSync(filePath, buffer);

      receiptUrls.push(
        `/uploads/reimbursements/${fileName}`
      );
    }

    const reimbursement =
      await prisma.reimbursement.create({
        data: {
          claimId,

          user: {
            connect: {
              id: userId,
            },
          },

          userName,
          department,
          team,

          submissionDate: submissionDate
            ? new Date(submissionDate)
            : new Date(),

          claimCategory,
          amount,
          reason,
          status,

          project: {
            connect: {
              id: projectId,
            },
          },

          receipts: {
            create: receiptUrls.map((url) => ({
              fileUrl: url,
            })),
          },
        },

        include: {
          project: true,
          receipts: true,
        },
      });

    console.log(
      "REIMBURSEMENT CREATED:",
      reimbursement
    );

    return NextResponse.json(
      reimbursement,
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error(
      "CREATE REIMBURSEMENT ERROR:",
      error
    );

    return NextResponse.json(
      {
        error:
          error?.message ||
          "Failed to create reimbursement",
      },
      {
        status: 500,
      }
    );
  }
}