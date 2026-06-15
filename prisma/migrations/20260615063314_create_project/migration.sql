-- CreateTable
CREATE TABLE "Project" (
    "id" SERIAL NOT NULL,
    "projectName" TEXT NOT NULL,
    "projectDescription" TEXT NOT NULL,
    "projectCode" TEXT NOT NULL,
    "projectManager" TEXT,
    "estimatedBudget" DOUBLE PRECISION NOT NULL,
    "approvalStatus" TEXT NOT NULL,
    "teamSize" INTEGER,
    "projectStatus" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);
