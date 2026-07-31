/*
  Warnings:

  - You are about to drop the column `projectNumber` on the `PurchaseRequisition` table. All the data in the column will be lost.
  - You are about to drop the column `accountDetail` on the `Vendor` table. All the data in the column will be lost.
  - You are about to drop the column `contactNo` on the `Vendor` table. All the data in the column will be lost.
  - Made the column `description` on table `Approval` required. This step will fail if there are existing NULL values in that column.
  - Made the column `specification` on table `Product` required. This step will fail if there are existing NULL values in that column.
  - Made the column `estimatedPrice` on table `Product` required. This step will fail if there are existing NULL values in that column.
  - Made the column `projectDescription` on table `Project` required. This step will fail if there are existing NULL values in that column.
  - Made the column `estimatedBudget` on table `Project` required. This step will fail if there are existing NULL values in that column.
  - Made the column `endDate` on table `Project` required. This step will fail if there are existing NULL values in that column.
  - Made the column `startDate` on table `Project` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `projectId` to the `PurchaseRequisition` table without a default value. This is not possible if the table is not empty.
  - Added the required column `accountNumber` to the `Vendor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `annualSales` to the `Vendor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bankName` to the `Vendor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `beneficiaryName` to the `Vendor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `branchName` to the `Vendor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contactName` to the `Vendor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contactNumber` to the `Vendor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `establishedDate` to the `Vendor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fax` to the `Vendor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ifscCode` to the `Vendor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `legalStructure` to the `Vendor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `msmeRegistered` to the `Vendor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `panNumber` to the `Vendor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `serviceCategory` to the `Vendor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `upiId` to the `Vendor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `website` to the `Vendor` table without a default value. This is not possible if the table is not empty.
  - Made the column `address` on table `Vendor` required. This step will fail if there are existing NULL values in that column.
  - Made the column `contactEmail` on table `Vendor` required. This step will fail if there are existing NULL values in that column.
  - Made the column `gstNumber` on table `Vendor` required. This step will fail if there are existing NULL values in that column.
  - Made the column `description` on table `designations` required. This step will fail if there are existing NULL values in that column.
  - Made the column `team_associated` on table `designations` required. This step will fail if there are existing NULL values in that column.
  - Made the column `department` on table `designations` required. This step will fail if there are existing NULL values in that column.
  - Made the column `department_head` on table `designations` required. This step will fail if there are existing NULL values in that column.
  - Made the column `designationId` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `joining_date` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_designationId_fkey";

-- AlterTable
ALTER TABLE "Approval" ALTER COLUMN "description" SET NOT NULL;

-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "specification" SET NOT NULL,
ALTER COLUMN "estimatedPrice" SET NOT NULL;

-- AlterTable
ALTER TABLE "Project" ALTER COLUMN "projectDescription" SET NOT NULL,
ALTER COLUMN "estimatedBudget" SET NOT NULL,
ALTER COLUMN "endDate" SET NOT NULL,
ALTER COLUMN "startDate" SET NOT NULL;

-- AlterTable
ALTER TABLE "PurchaseRequisition" DROP COLUMN "projectNumber",
ADD COLUMN     "projectId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Vendor" DROP COLUMN "accountDetail",
DROP COLUMN "contactNo",
ADD COLUMN     "accountNumber" TEXT NOT NULL,
ADD COLUMN     "annualSales" TEXT NOT NULL,
ADD COLUMN     "bankName" TEXT NOT NULL,
ADD COLUMN     "beneficiaryName" TEXT NOT NULL,
ADD COLUMN     "branchName" TEXT NOT NULL,
ADD COLUMN     "contactName" TEXT NOT NULL,
ADD COLUMN     "contactNumber" TEXT NOT NULL,
ADD COLUMN     "establishedDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "fax" TEXT NOT NULL,
ADD COLUMN     "ifscCode" TEXT NOT NULL,
ADD COLUMN     "legalStructure" TEXT NOT NULL,
ADD COLUMN     "msmeRegistered" TEXT NOT NULL,
ADD COLUMN     "panNumber" TEXT NOT NULL,
ADD COLUMN     "serviceCategory" TEXT NOT NULL,
ADD COLUMN     "upiId" TEXT NOT NULL,
ADD COLUMN     "website" TEXT NOT NULL,
ALTER COLUMN "address" SET NOT NULL,
ALTER COLUMN "contactEmail" SET NOT NULL,
ALTER COLUMN "gstNumber" SET NOT NULL;

-- AlterTable
ALTER TABLE "designations" ALTER COLUMN "description" SET NOT NULL,
ALTER COLUMN "team_associated" SET NOT NULL,
ALTER COLUMN "department" SET NOT NULL,
ALTER COLUMN "department_head" SET NOT NULL;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "designationId" SET NOT NULL,
ALTER COLUMN "joining_date" SET NOT NULL;

-- CreateTable
CREATE TABLE "PurchaseRequisitionItem" (
    "id" SERIAL NOT NULL,
    "purchaseRequisitionId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "estimatedRate" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "PurchaseRequisitionItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PurchaseOrder" (
    "id" SERIAL NOT NULL,
    "poNumber" TEXT NOT NULL,
    "vendorId" INTEGER NOT NULL,
    "projectId" INTEGER NOT NULL,
    "orderDate" TIMESTAMP(3) NOT NULL,
    "expectedDeliveryDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PurchaseOrder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PurchaseOrderItem" (
    "id" SERIAL NOT NULL,
    "purchaseOrderId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "unitPrice" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "PurchaseOrderItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PurchaseOrder_poNumber_key" ON "PurchaseOrder"("poNumber");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_designationId_fkey" FOREIGN KEY ("designationId") REFERENCES "designations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchaseRequisition" ADD CONSTRAINT "PurchaseRequisition_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchaseRequisitionItem" ADD CONSTRAINT "PurchaseRequisitionItem_purchaseRequisitionId_fkey" FOREIGN KEY ("purchaseRequisitionId") REFERENCES "PurchaseRequisition"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchaseRequisitionItem" ADD CONSTRAINT "PurchaseRequisitionItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchaseOrder" ADD CONSTRAINT "PurchaseOrder_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "Vendor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchaseOrder" ADD CONSTRAINT "PurchaseOrder_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchaseOrderItem" ADD CONSTRAINT "PurchaseOrderItem_purchaseOrderId_fkey" FOREIGN KEY ("purchaseOrderId") REFERENCES "PurchaseOrder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchaseOrderItem" ADD CONSTRAINT "PurchaseOrderItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
