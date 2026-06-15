/*
  Warnings:

  - Added the required column `approvalType` to the `Approval` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Approval` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Approval" ADD COLUMN     "amountBased" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "approvalType" TEXT NOT NULL,
ADD COLUMN     "notificationApp" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "notificationMail" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "description" DROP NOT NULL;
