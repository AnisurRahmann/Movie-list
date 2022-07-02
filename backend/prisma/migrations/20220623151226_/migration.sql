/*
  Warnings:

  - You are about to drop the column `MoveMetaScore` on the `Movie` table. All the data in the column will be lost.
  - You are about to drop the column `MovieGenres` on the `Movie` table. All the data in the column will be lost.
  - You are about to drop the column `MovieGross` on the `Movie` table. All the data in the column will be lost.
  - You are about to drop the column `MovieReleaseYear` on the `Movie` table. All the data in the column will be lost.
  - You are about to drop the column `MovieVotes` on the `Movie` table. All the data in the column will be lost.
  - Added the required column `movieGenre` to the `Movie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `movieGross` to the `Movie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `movieMetaScore` to the `Movie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `movieReleaseYear` to the `Movie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `movieVotes` to the `Movie` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Movie" DROP COLUMN "MoveMetaScore",
DROP COLUMN "MovieGenres",
DROP COLUMN "MovieGross",
DROP COLUMN "MovieReleaseYear",
DROP COLUMN "MovieVotes",
ADD COLUMN     "movieGenre" TEXT NOT NULL,
ADD COLUMN     "movieGross" TEXT NOT NULL,
ADD COLUMN     "movieMetaScore" TEXT NOT NULL,
ADD COLUMN     "movieReleaseYear" TEXT NOT NULL,
ADD COLUMN     "movieVotes" TEXT NOT NULL;
