-- CreateEnum
CREATE TYPE "VehicleType" AS ENUM ('TUK_TUK', 'CAR', 'VAN', 'BUS');

-- AlterTable
ALTER TABLE "Tour" ADD COLUMN     "vehicle" "VehicleType" NOT NULL DEFAULT 'TUK_TUK';
