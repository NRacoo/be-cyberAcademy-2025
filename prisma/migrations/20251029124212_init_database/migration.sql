/*
  Warnings:

  - Added the required column `topik` to the `moduls` table without a default value. This is not possible if the table is not empty.
  - Added the required column `topik` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Topik" AS ENUM ('WebDev', 'IoT', 'ML', 'NetSec');

-- AlterTable
ALTER TABLE "moduls" ADD COLUMN     "topik" "Topik" NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "topik" "Topik" NOT NULL;
