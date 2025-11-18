-- DropForeignKey
ALTER TABLE "public"."Submissions" DROP CONSTRAINT "Submissions_group_id_fkey";

-- AlterTable
ALTER TABLE "Submissions" ALTER COLUMN "group_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Submissions" ADD CONSTRAINT "Submissions_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "groups"("id") ON DELETE SET NULL ON UPDATE CASCADE;
