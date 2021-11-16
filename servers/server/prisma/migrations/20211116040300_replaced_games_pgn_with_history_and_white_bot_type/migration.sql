/*
  Warnings:

  - You are about to drop the column `pgn` on the `Game` table. All the data in the column will be lost.
  - Added the required column `whiteBotType` to the `Game` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Game" DROP COLUMN "pgn",
ADD COLUMN     "history" TEXT[],
ADD COLUMN     "whiteBotType" TEXT NOT NULL;
