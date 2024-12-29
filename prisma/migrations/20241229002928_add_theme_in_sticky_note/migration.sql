/*
  Warnings:

  - You are about to drop the column `backgroundColor` on the `StickyNote` table. All the data in the column will be lost.
  - You are about to drop the column `textColor` on the `StickyNote` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "StickyNote" DROP COLUMN "backgroundColor",
DROP COLUMN "textColor",
ADD COLUMN     "theme" TEXT NOT NULL DEFAULT 'yellow';
