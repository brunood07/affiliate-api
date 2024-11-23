/*
  Warnings:

  - You are about to drop the `tb_affiliateds` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "tb_payments" DROP CONSTRAINT "tb_payments_affiliateId_fkey";

-- DropForeignKey
ALTER TABLE "tb_payments" DROP CONSTRAINT "tb_payments_paymentTypeId_fkey";

-- DropForeignKey
ALTER TABLE "tb_payments" DROP CONSTRAINT "tb_payments_registered_by_fkey";

-- DropTable
DROP TABLE "tb_affiliateds";

-- CreateTable
CREATE TABLE "tb_affiliates" (
    "id" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "email" TEXT,
    "phone_number" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tb_affiliates_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tb_affiliates_email_key" ON "tb_affiliates"("email");

-- AddForeignKey
ALTER TABLE "tb_payments" ADD CONSTRAINT "tb_payments_paymentTypeId_fkey" FOREIGN KEY ("paymentTypeId") REFERENCES "tb_payment_types"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_payments" ADD CONSTRAINT "tb_payments_affiliateId_fkey" FOREIGN KEY ("affiliateId") REFERENCES "tb_affiliates"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_payments" ADD CONSTRAINT "tb_payments_registered_by_fkey" FOREIGN KEY ("registered_by") REFERENCES "tb_users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
