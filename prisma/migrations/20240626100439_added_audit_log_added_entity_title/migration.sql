/*
  Warnings:

  - Added the required column `entityTitle` to the `auditlog` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "auditlog" ADD COLUMN     "entityTitle" TEXT NOT NULL;
