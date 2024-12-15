-- CreateEnum
CREATE TYPE "request_status" AS ENUM ('Pending', 'Approved', 'Rejected');

-- AlterTable
ALTER TABLE "pets" ADD COLUMN     "is_available" BOOLEAN NOT NULL DEFAULT true;

-- CreateTable
CREATE TABLE "adoption_requests" (
    "request_id" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "pet_id" INTEGER NOT NULL,
    "status" "request_status" NOT NULL DEFAULT 'Pending',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "adoption_requests_pkey" PRIMARY KEY ("request_id")
);

-- CreateTable
CREATE TABLE "pet_adoptions" (
    "adoption_id" SERIAL NOT NULL,
    "pet_id" INTEGER NOT NULL,
    "adopter_id" TEXT NOT NULL,
    "adopted_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "pet_adoptions_pkey" PRIMARY KEY ("adoption_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "pet_adoptions_pet_id_key" ON "pet_adoptions"("pet_id");

-- AddForeignKey
ALTER TABLE "adoption_requests" ADD CONSTRAINT "adoption_requests_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "adoption_requests" ADD CONSTRAINT "adoption_requests_pet_id_fkey" FOREIGN KEY ("pet_id") REFERENCES "pets"("pet_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pet_adoptions" ADD CONSTRAINT "pet_adoptions_pet_id_fkey" FOREIGN KEY ("pet_id") REFERENCES "pets"("pet_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pet_adoptions" ADD CONSTRAINT "pet_adoptions_adopter_id_fkey" FOREIGN KEY ("adopter_id") REFERENCES "users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
