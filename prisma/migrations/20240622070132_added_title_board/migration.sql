/*
  Warnings:

  - Added the required column `title` to the `board` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "board" ADD COLUMN     "title" TEXT NOT NULL;
