/*
  Warnings:

  - A unique constraint covering the columns `[pet_id,user_id]` on the table `favorites` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "favorites_pet_id_user_id_key" ON "favorites"("pet_id", "user_id");
