import { ApiProperty } from "@nestjs/swagger";
import { Movie } from "@prisma/client";

export class MovieEntity implements Movie {
  @ApiProperty()
  id: string;

  @ApiProperty()
  movieImage: string;

  @ApiProperty()
  movieName: string;

  @ApiProperty()
  movieRatings: string;

  @ApiProperty()
  movieDuration: string;

  @ApiProperty()
  movieSummary: string;

  @ApiProperty()
  movieDirector: string;

  @ApiProperty()
  movieVotes: string;

  @ApiProperty()
  movieGross: string;

  @ApiProperty()
  movieMetaScore: string;

  @ApiProperty()
  movieGenre: string[];

  @ApiProperty()
  movieReleaseYear: string;

  constructor(partial: Partial<MovieEntity>) {
    Object.assign(this, partial);
    // short for 👇
    // this.id = partial.id;
  }
}
