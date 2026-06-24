/*
  Warnings:

  - You are about to drop the column `expectedDate` on the `PurchaseRequisition` table. All the data in the column will be lost.
  - You are about to drop the column `prNo` on the `PurchaseRequisition` table. All the data in the column will be lost.
  - You are about to drop the column `requestReason` on the `PurchaseRequisition` table. All the data in the column will be lost.
  - You are about to drop the column `requestType` on the `PurchaseRequisition` table. All the data in the column will be lost.
  - You are about to drop the column `submissionStatus` on the `PurchaseRequisition` table. All the data in the column will be lost.
  - You are about to drop the column `totalItems` on the `PurchaseRequisition` table. All the data in the column will be lost.
  - You are about to drop the column `trackStatus` on the `PurchaseRequisition` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[prNumber]` on the table `PurchaseRequisition` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `expectedDeliveryDate` to the `PurchaseRequisition` table without a default value. This is not possible if the table is not empty.
  - Added the required column `prNumber` to the `PurchaseRequisition` table without a default value. This is not possible if the table is not empty.
  - Added the required column `projectNumber` to the `PurchaseRequisition` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reason` to the `PurchaseRequisition` table without a default value. This is not possible if the table is not empty.
  - Added the required column `requestorDept` to the `PurchaseRequisition` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PurchaseRequisition" DROP COLUMN "expectedDate",
DROP COLUMN "prNo",
DROP COLUMN "requestReason",
DROP COLUMN "requestType",
DROP COLUMN "submissionStatus",
DROP COLUMN "totalItems",
DROP COLUMN "trackStatus",
ADD COLUMN     "expectedDeliveryDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "prNumber" TEXT NOT NULL,
ADD COLUMN     "projectNumber" TEXT NOT NULL,
ADD COLUMN     "reason" TEXT NOT NULL,
ADD COLUMN     "requestorDept" TEXT NOT NULL,
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'Pending';

-- CreateIndex
CREATE UNIQUE INDEX "PurchaseRequisition_prNumber_key" ON "PurchaseRequisition"("prNumber");
