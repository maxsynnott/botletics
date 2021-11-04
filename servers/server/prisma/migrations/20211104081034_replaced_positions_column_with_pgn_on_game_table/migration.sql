/*
  Warnings:

  - You are about to drop the column `positions` on the `Game` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Game" DROP COLUMN "positions",
ADD COLUMN     "pgn" TEXT;
