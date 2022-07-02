import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { GetAllFavoriteMoviesForUser } from "./dto/getFavoriteMovieForUser.dto";

@Injectable()
export class MoviesService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.movie.findMany({
      include: {
        users: {
          include: {
            user: true,
          },
        },
      },
    });
  }

  async addNewMovie(addNewMovieDto) {
    return await this.prisma.movie.createMany({
      data: addNewMovieDto,
    });
  }

  addFavoriteMovie(favoriteMovieDto) {
    favoriteMovieDto.forEach(async (d: any) => {
      await this.prisma.favoriteMovie.createMany({ data: d });
    });
  }

  async getAllFavoriteMoviesForUser(
    getAllFavoriteMoviesForUser: GetAllFavoriteMoviesForUser
  ) {
    const data = await this.prisma.user.findUnique({
      where: { email: getAllFavoriteMoviesForUser.email },
      include: {
        movies: {
          include: {
            movie: true,
          },
        },
      },
    });

    return {
      movies: data.movies,
    };
  }
}
