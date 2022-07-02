import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { FavoriteMovieDto } from "./dto/favoriteMovie.dto";
import { GetAllFavoriteMoviesForUser } from "./dto/getFavoriteMovieForUser.dto";
import { MovieEntity } from "./entities/movie.entity";
import { MoviesService } from "./movies.service";
import { AddNewMovieDto } from "./dto/addNewMovie.dto";

@Controller("movies")
@ApiTags("movies")
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: [MovieEntity] })
  async findAll() {
    const movies = await this.moviesService.findAll();
    return movies.map((movie) => new MovieEntity(movie));
  }

  @Post("addNewMovie")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async addNewMovie(@Body() addNewMovieDto: AddNewMovieDto) {
    return await this.moviesService.addNewMovie(addNewMovieDto)
  }

  @Post("getAllFavoriteMoviesForUser")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async getAllFavoriteMoviesForUser(
    @Body() getAllFavoriteMoviesForUser: GetAllFavoriteMoviesForUser
  ) {
    return await this.moviesService.getAllFavoriteMoviesForUser(
      getAllFavoriteMoviesForUser
    );
  }

  @Post("addFavoriteMovie")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse()
  async addFavoriteMovie(@Body() favoriteMovieDto: FavoriteMovieDto) {
    return await this.moviesService.addFavoriteMovie(favoriteMovieDto);
  }
}
