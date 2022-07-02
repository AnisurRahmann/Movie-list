-- CreateTable
CREATE TABLE "Movie" (
    "id" TEXT NOT NULL,
    "movieImage" TEXT NOT NULL,
    "movieName" TEXT NOT NULL,
    "movieRatings" TEXT NOT NULL,
    "movieDuration" TEXT NOT NULL,
    "movieSummary" TEXT NOT NULL,
    "movieDirector" TEXT NOT NULL,
    "MovieVotes" TEXT NOT NULL,
    "MovieGross" TEXT NOT NULL,
    "MoveMetaScore" TEXT NOT NULL,
    "MovieGenres" TEXT[],
    "MovieReleaseYear" TEXT NOT NULL,

    CONSTRAINT "Movie_pkey" PRIMARY KEY ("id")
);
