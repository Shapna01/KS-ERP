/*
  Warnings:

  - Added the required column `approvalType` to the `Approval` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Approval" ADD COLUMN     "amountBased" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "approvalType" TEXT NOT NULL,
ADD COLUMN     "notifyApp" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "notifyMail" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "ApprovalLevel" (
    "id" SERIAL NOT NULL,
    "approvalId" INTEGER NOT NULL,
    "level" INTEGER NOT NULL,
    "approverId" INTEGER,
    "canApprove" BOOLEAN NOT NULL DEFAULT false,
    "canReject" BOOLEAN NOT NULL DEFAULT false,
    "canHold" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "ApprovalLevel_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ApprovalLevel" ADD CONSTRAINT "ApprovalLevel_approvalId_fkey" FOREIGN KEY ("approvalId") REFERENCES "Approval"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApprovalLevel" ADD CONSTRAINT "ApprovalLevel_approverId_fkey" FOREIGN KEY ("approverId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
