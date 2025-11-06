/*
  Warnings:

  - The values [ML] on the enum `Topik` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Topik_new" AS ENUM ('WebDev', 'IoT', 'ComVis', 'NetSec');
ALTER TABLE "users" ALTER COLUMN "topik" TYPE "Topik_new" USING ("topik"::text::"Topik_new");
ALTER TABLE "moduls" ALTER COLUMN "topik" TYPE "Topik_new" USING ("topik"::text::"Topik_new");
ALTER TABLE "Submissions" ALTER COLUMN "topik" TYPE "Topik_new" USING ("topik"::text::"Topik_new");
ALTER TABLE "tasks" ALTER COLUMN "topik" TYPE "Topik_new" USING ("topik"::text::"Topik_new");
ALTER TYPE "Topik" RENAME TO "Topik_old";
ALTER TYPE "Topik_new" RENAME TO "Topik";
DROP TYPE "public"."Topik_old";
COMMIT;
