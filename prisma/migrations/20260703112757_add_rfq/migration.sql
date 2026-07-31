-- CreateTable
CREATE TABLE "RFQ" (
    "id" SERIAL NOT NULL,
    "rfqNumber" TEXT NOT NULL,
    "purchaseRequisitionId" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Draft',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RFQ_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RFQ_rfqNumber_key" ON "RFQ"("rfqNumber");

-- AddForeignKey
ALTER TABLE "RFQ" ADD CONSTRAINT "RFQ_purchaseRequisitionId_fkey" FOREIGN KEY ("purchaseRequisitionId") REFERENCES "PurchaseRequisition"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
