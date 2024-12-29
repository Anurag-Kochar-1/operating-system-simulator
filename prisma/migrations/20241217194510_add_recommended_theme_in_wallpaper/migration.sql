-- CreateEnum
CREATE TYPE "Theme" AS ENUM ('DARK', 'LIGHT');

-- AlterTable
ALTER TABLE "Wallpaper" ADD COLUMN     "recommendedTheme" "Theme" NOT NULL DEFAULT 'DARK';
