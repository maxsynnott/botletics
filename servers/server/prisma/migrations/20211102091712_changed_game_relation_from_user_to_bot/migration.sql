/*
  Warnings:

  - You are about to drop the column `blackUserId` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `whiteUserId` on the `Game` table. All the data in the column will be lost.
  - Added the required column `blackBotId` to the `Game` table without a default value. This is not possible if the table is not empty.
  - Added the required column `whiteBotId` to the `Game` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Game" DROP CONSTRAINT "Game_blackUserId_fkey";

-- DropForeignKey
ALTER TABLE "Game" DROP CONSTRAINT "Game_whiteUserId_fkey";

-- AlterTable
ALTER TABLE "Game" DROP COLUMN "blackUserId",
DROP COLUMN "whiteUserId",
ADD COLUMN     "blackBotId" TEXT NOT NULL,
ADD COLUMN     "whiteBotId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_whiteBotId_fkey" FOREIGN KEY ("whiteBotId") REFERENCES "Bot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_blackBotId_fkey" FOREIGN KEY ("blackBotId") REFERENCES "Bot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
