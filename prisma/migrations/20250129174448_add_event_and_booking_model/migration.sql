/*
  Warnings:

  - The `ticketType` column on the `Booking` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `status` column on the `Booking` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `status` column on the `Event` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "TYPEOPTION" AS ENUM ('pending', 'booked', 'cancelled');

-- AlterTable
ALTER TABLE "Booking" DROP COLUMN "ticketType",
ADD COLUMN     "ticketType" "TYPEOPTION" DEFAULT 'booked',
DROP COLUMN "status",
ADD COLUMN     "status" "TYPEOPTION" DEFAULT 'booked';

-- AlterTable
ALTER TABLE "Event" DROP COLUMN "status",
ADD COLUMN     "status" "TYPEOPTION" DEFAULT 'pending';

-- DropEnum
DROP TYPE "BOOKINGSTATUS";

-- DropEnum
DROP TYPE "STATUS";

-- DropEnum
DROP TYPE "TICKETTYPE";
