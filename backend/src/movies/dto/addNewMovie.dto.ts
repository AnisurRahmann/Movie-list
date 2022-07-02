import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";

import { IsArray, IsNotEmpty, IsString } from "class-validator";



export class AddNewMovieDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  movieImage: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  movieName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  movieRatings: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  movieDuration: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  movieSummary: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  movieDirector: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  movieVotes: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  movieGross: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  movieMetaScore: string;

  @IsArray()
  @ApiProperty()
  movieGenre: string[];
}
