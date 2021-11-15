/*
  Warnings:

  - You are about to drop the `_BotToGame` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `activeBotId` to the `Game` table without a default value. This is not possible if the table is not empty.
  - Added the required column `passiveBotId` to the `Game` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_BotToGame" DROP CONSTRAINT "_BotToGame_A_fkey";

-- DropForeignKey
ALTER TABLE "_BotToGame" DROP CONSTRAINT "_BotToGame_B_fkey";

-- AlterTable
ALTER TABLE "Game" ADD COLUMN     "activeBotId" TEXT NOT NULL,
ADD COLUMN     "passiveBotId" TEXT NOT NULL;

-- DropTable
DROP TABLE "_BotToGame";

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_activeBotId_fkey" FOREIGN KEY ("activeBotId") REFERENCES "Bot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_passiveBotId_fkey" FOREIGN KEY ("passiveBotId") REFERENCES "Bot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
