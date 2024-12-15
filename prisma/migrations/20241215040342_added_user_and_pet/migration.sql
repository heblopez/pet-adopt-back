-- CreateEnum
CREATE TYPE "category" AS ENUM ('Dogs', 'Cats', 'Hamsters', 'Fish');

-- CreateEnum
CREATE TYPE "gender" AS ENUM ('Male', 'Female');

-- CreateTable
CREATE TABLE "users" (
    "user_id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT,
    "avatar_url" TEXT,
    "phone_number" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "pets" (
    "pet_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "category" "category" NOT NULL,
    "image_url" TEXT NOT NULL,
    "breed" TEXT NOT NULL,
    "age" DECIMAL(4,2) NOT NULL,
    "location" TEXT NOT NULL,
    "gender" "gender" NOT NULL,
    "weight" DECIMAL(5,2) NOT NULL,
    "about" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "owner_id" TEXT NOT NULL,

    CONSTRAINT "pets_pkey" PRIMARY KEY ("pet_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "pets" ADD CONSTRAINT "pets_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
