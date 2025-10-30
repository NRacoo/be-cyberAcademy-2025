/*
  Warnings:

  - You are about to drop the column `user_id` on the `moduls` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."moduls" DROP CONSTRAINT "moduls_user_id_fkey";

-- AlterTable
ALTER TABLE "moduls" DROP COLUMN "user_id";
