/*
  Warnings:

  - You are about to drop the column `ordId` on the `orglimit` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[orgId]` on the table `orglimit` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `orgId` to the `orglimit` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "orglimit_ordId_key";

-- AlterTable
ALTER TABLE "orglimit" DROP COLUMN "ordId",
ADD COLUMN     "orgId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "orglimit_orgId_key" ON "orglimit"("orgId");
