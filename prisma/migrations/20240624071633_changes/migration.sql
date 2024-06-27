/*
  Warnings:

  - Added the required column `imageFullUrl` to the `board` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageId` to the `board` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageLinkHTML` to the `board` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageThumbUrl` to the `board` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageUsername` to the `board` table without a default value. This is not possible if the table is not empty.
  - Added the required column `orgId` to the `board` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `board` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "board" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "imageFullUrl" TEXT NOT NULL,
ADD COLUMN     "imageId" TEXT NOT NULL,
ADD COLUMN     "imageLinkHTML" TEXT NOT NULL,
ADD COLUMN     "imageThumbUrl" TEXT NOT NULL,
ADD COLUMN     "imageUsername" TEXT NOT NULL,
ADD COLUMN     "orgId" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
