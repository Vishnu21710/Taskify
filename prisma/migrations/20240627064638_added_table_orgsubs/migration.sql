-- CreateTable
CREATE TABLE "orgsubs" (
    "id" TEXT NOT NULL,
    "orgId" TEXT NOT NULL,
    "stripe_customer_id" TEXT,
    "stripe_subscription_id" TEXT,
    "stripe_price_id" TEXT,
    "stripe_current_period_end" TIMESTAMP(3),

    CONSTRAINT "orgsubs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "orgsubs_orgId_key" ON "orgsubs"("orgId");

-- CreateIndex
CREATE UNIQUE INDEX "orgsubs_stripe_customer_id_key" ON "orgsubs"("stripe_customer_id");

-- CreateIndex
CREATE UNIQUE INDEX "orgsubs_stripe_subscription_id_key" ON "orgsubs"("stripe_subscription_id");
