-- CreateEnum
CREATE TYPE "ACTIONS" AS ENUM ('CREATE', 'UPDATE', 'DELETE');

-- CreateEnum
CREATE TYPE "ENTITY_TYPE" AS ENUM ('BOARD', 'LIST', 'CARD');

-- CreateTable
CREATE TABLE "auditlog" (
    "id" TEXT NOT NULL,
    "orgId" TEXT NOT NULL,
    "action" "ACTIONS" NOT NULL,
    "entityId" TEXT NOT NULL,
    "entityType" "ENTITY_TYPE" NOT NULL,
    "userId" TEXT NOT NULL,
    "userImage" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "auditlog_pkey" PRIMARY KEY ("id")
);
