/*
  Warnings:

  - You are about to drop the column `activeBotId` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `passiveBotId` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `whiteBotType` on the `Game` table. All the data in the column will be lost.
  - Added the required column `blackBotId` to the `Game` table without a default value. This is not possible if the table is not empty.
  - Added the required column `whiteBotId` to the `Game` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Game" DROP CONSTRAINT "Game_activeBotId_fkey";

-- DropForeignKey
ALTER TABLE "Game" DROP CONSTRAINT "Game_passiveBotId_fkey";

-- AlterTable
ALTER TABLE "Game" DROP COLUMN "activeBotId",
DROP COLUMN "passiveBotId",
DROP COLUMN "whiteBotType",
ADD COLUMN     "blackBotId" TEXT NOT NULL,
ADD COLUMN     "whiteBotId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_whiteBotId_fkey" FOREIGN KEY ("whiteBotId") REFERENCES "Bot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_blackBotId_fkey" FOREIGN KEY ("blackBotId") REFERENCES "Bot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
