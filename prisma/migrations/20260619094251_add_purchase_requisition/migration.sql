/*
  Warnings:

  - You are about to drop the column `teamSize` on the `Project` table. All the data in the column will be lost.
  - Made the column `projectManager` on table `Project` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Project" DROP COLUMN "teamSize",
ADD COLUMN     "endDate" TIMESTAMP(3),
ADD COLUMN     "startDate" TIMESTAMP(3),
ALTER COLUMN "projectDescription" DROP NOT NULL,
ALTER COLUMN "projectManager" SET NOT NULL,
ALTER COLUMN "estimatedBudget" DROP NOT NULL,
ALTER COLUMN "approvalStatus" SET DEFAULT 'Yet to Approve',
ALTER COLUMN "projectStatus" SET DEFAULT 'Pending';

-- CreateTable
CREATE TABLE "Vendor" (
    "id" SERIAL NOT NULL,
    "vendorName" TEXT NOT NULL,
    "address" TEXT,
    "contactEmail" TEXT,
    "contactNo" TEXT,
    "gstNumber" TEXT,
    "accountDetail" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Vendor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "productName" TEXT NOT NULL,
    "productCode" TEXT NOT NULL,
    "specification" TEXT,
    "estimatedPrice" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductVendor" (
    "id" SERIAL NOT NULL,
    "productId" INTEGER NOT NULL,
    "vendorId" INTEGER NOT NULL,

    CONSTRAINT "ProductVendor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PurchaseRequisition" (
    "id" SERIAL NOT NULL,
    "prNo" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "priority" TEXT NOT NULL,
    "deliveryAddress" TEXT NOT NULL,
    "requestReason" TEXT NOT NULL,
    "requestType" TEXT NOT NULL,
    "expectedDate" TIMESTAMP(3) NOT NULL,
    "totalItems" INTEGER NOT NULL,
    "submissionStatus" TEXT NOT NULL DEFAULT 'Submitted',
    "trackStatus" TEXT NOT NULL DEFAULT 'Pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PurchaseRequisition_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Product_productCode_key" ON "Product"("productCode");

-- CreateIndex
CREATE UNIQUE INDEX "ProductVendor_productId_vendorId_key" ON "ProductVendor"("productId", "vendorId");

-- AddForeignKey
ALTER TABLE "ProductVendor" ADD CONSTRAINT "ProductVendor_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductVendor" ADD CONSTRAINT "ProductVendor_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "Vendor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
