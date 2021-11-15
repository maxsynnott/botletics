/*
  Warnings:

  - You are about to drop the column `blackBotId` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `setId` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `whiteBotId` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the `Set` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_BotToSet` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Game" DROP CONSTRAINT "Game_blackBotId_fkey";

-- DropForeignKey
ALTER TABLE "Game" DROP CONSTRAINT "Game_setId_fkey";

-- DropForeignKey
ALTER TABLE "Game" DROP CONSTRAINT "Game_whiteBotId_fkey";

-- DropForeignKey
ALTER TABLE "_BotToSet" DROP CONSTRAINT "_BotToSet_A_fkey";

-- DropForeignKey
ALTER TABLE "_BotToSet" DROP CONSTRAINT "_BotToSet_B_fkey";

-- AlterTable
ALTER TABLE "Game" DROP COLUMN "blackBotId",
DROP COLUMN "setId",
DROP COLUMN "whiteBotId";

-- DropTable
DROP TABLE "Set";

-- DropTable
DROP TABLE "_BotToSet";

-- CreateTable
CREATE TABLE "_BotToGame" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_BotToGame_AB_unique" ON "_BotToGame"("A", "B");

-- CreateIndex
CREATE INDEX "_BotToGame_B_index" ON "_BotToGame"("B");

-- AddForeignKey
ALTER TABLE "_BotToGame" ADD FOREIGN KEY ("A") REFERENCES "Bot"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BotToGame" ADD FOREIGN KEY ("B") REFERENCES "Game"("id") ON DELETE CASCADE ON UPDATE CASCADE;
