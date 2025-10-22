-- AlterTable
ALTER TABLE "Media" ADD COLUMN     "category" TEXT;

-- CreateTable
CREATE TABLE "PlayerImage" (
    "id" TEXT NOT NULL,
    "playerId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "alt" TEXT,
    "sort" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PlayerImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductImage" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "alt" TEXT,
    "sort" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProductImage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "PlayerImage_playerId_sort_idx" ON "PlayerImage"("playerId", "sort");

-- CreateIndex
CREATE INDEX "ProductImage_productId_sort_idx" ON "ProductImage"("productId", "sort");

-- CreateIndex
CREATE INDEX "Article_category_createdAt_idx" ON "Article"("category", "createdAt");

-- CreateIndex
CREATE INDEX "Article_published_createdAt_idx" ON "Article"("published", "createdAt");

-- CreateIndex
CREATE INDEX "Match_date_idx" ON "Match"("date");

-- CreateIndex
CREATE INDEX "Match_competition_idx" ON "Match"("competition");

-- CreateIndex
CREATE INDEX "Media_type_createdAt_idx" ON "Media"("type", "createdAt");

-- CreateIndex
CREATE INDEX "Media_category_createdAt_idx" ON "Media"("category", "createdAt");

-- CreateIndex
CREATE INDEX "Standing_season_position_idx" ON "Standing"("season", "position");

-- AddForeignKey
ALTER TABLE "PlayerImage" ADD CONSTRAINT "PlayerImage_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductImage" ADD CONSTRAINT "ProductImage_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
