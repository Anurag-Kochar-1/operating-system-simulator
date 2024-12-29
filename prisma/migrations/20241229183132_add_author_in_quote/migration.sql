/*
  Warnings:

  - You are about to drop the column `by` on the `Quote` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Quote" DROP COLUMN "by",
ADD COLUMN     "author" TEXT NOT NULL DEFAULT 'Anonymous';
