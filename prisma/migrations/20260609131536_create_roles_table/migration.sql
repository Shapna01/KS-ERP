-- CreateTable
CREATE TABLE "designations" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "team_associated" TEXT,
    "department" TEXT,
    "department_head" TEXT,

    CONSTRAINT "designations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "designationId" INTEGER,
    "team" VARCHAR(255) NOT NULL,
    "manager" VARCHAR(255) NOT NULL,
    "role" VARCHAR(255) NOT NULL,
    "phone" VARCHAR(20) NOT NULL,
    "joining_date" DATE,
    "offer_letter" TEXT NOT NULL,
    "increment_document" TEXT NOT NULL,
    "userid" VARCHAR(255) NOT NULL,
    "workemail" VARCHAR(255) NOT NULL,
    "personalemail" VARCHAR(255) NOT NULL,
    "dob" DATE NOT NULL,
    "gender" VARCHAR(50) NOT NULL,
    "present_address" TEXT NOT NULL,
    "permanent_address" TEXT NOT NULL,
    "department" VARCHAR(255) NOT NULL,
    "reporting_to" VARCHAR(255) NOT NULL,
    "employment_type" VARCHAR(255) NOT NULL,
    "aadhaar" VARCHAR(50) NOT NULL,
    "pan" VARCHAR(50) NOT NULL,
    "passport" VARCHAR(50) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "roles" (
    "id" SERIAL NOT NULL,
    "role_name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "total_users" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "roles_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_designationId_fkey" FOREIGN KEY ("designationId") REFERENCES "designations"("id") ON DELETE SET NULL ON UPDATE CASCADE;
