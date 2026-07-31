import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
export async function POST(req) {
  try {
    const body = await req.json();

    const {
    projectId,
    category,
    priority,
    deliveryAddress,
    requestorDept,
    expectedDeliveryDate,
    reason,
  } = body;

    const projectExists = await prisma.project.findUnique({
  where: { id: Number(projectId) },
});

if (!projectExists) {
  return NextResponse.json(
    { error: "Invalid projectId: Project not found" },
    { status: 400 }
  );
}
const lastPR = await prisma.purchaseRequisition.findFirst({
  orderBy: {
    id: "desc",
  },
});

let prNumber = "PR-0001";

if (lastPR) {
  const lastNumber = parseInt(lastPR.prNumber.replace("PR-", ""), 10);
  prNumber = `PR-${String(lastNumber + 1).padStart(4, "0")}`;
}
    const pr = await prisma.purchaseRequisition.create({
  data: {
    prNumber,
    projectId: Number(projectId),
    category,
    priority,
    deliveryAddress,
    requestorDept,
    expectedDeliveryDate: new Date(expectedDeliveryDate),
    reason,
   status: "Draft",
  },
});

    return NextResponse.json(pr);
  } catch (error) {
    console.error("POST ERROR:", error);

    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}