/*
  Warnings:

  - You are about to drop the column `amountBased` on the `Approval` table. All the data in the column will be lost.
  - You are about to drop the column `approvalType` on the `Approval` table. All the data in the column will be lost.
  - You are about to drop the column `notificationApp` on the `Approval` table. All the data in the column will be lost.
  - You are about to drop the column `notificationMail` on the `Approval` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Approval` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Approval" DROP COLUMN "amountBased",
DROP COLUMN "approvalType",
DROP COLUMN "notificationApp",
DROP COLUMN "notificationMail",
DROP COLUMN "updatedAt";
