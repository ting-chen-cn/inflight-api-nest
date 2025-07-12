/*
  Warnings:

  - The primary key for the `Passenger` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Passenger" DROP CONSTRAINT "Passenger_pkey",
ALTER COLUMN "passengerId" DROP DEFAULT,
ALTER COLUMN "passengerId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Passenger_pkey" PRIMARY KEY ("passengerId");
DROP SEQUENCE "Passenger_passengerId_seq";
