/*
  Warnings:

  - The primary key for the `FavoriteMovie` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `FavoriteMovie` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `FavoriteMovie` table. All the data in the column will be lost.
  - You are about to drop the column `imdbLink` on the `FavoriteMovie` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `FavoriteMovie` table. All the data in the column will be lost.
  - Added the required column `movieId` to the `FavoriteMovie` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FavoriteMovie" DROP CONSTRAINT "FavoriteMovie_pkey",
DROP COLUMN "createdAt",
DROP COLUMN "id",
DROP COLUMN "imdbLink",
DROP COLUMN "name",
ADD COLUMN     "movieId" TEXT NOT NULL,
ADD CONSTRAINT "FavoriteMovie_pkey" PRIMARY KEY ("movieId", "userId");

-- AddForeignKey
ALTER TABLE "FavoriteMovie" ADD CONSTRAINT "FavoriteMovie_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
