export interface MovieDataType {
  movieName: string;
  movieRatings: string;
  movieDuration: string;
  movieSummary: string;
  movieDirector: string;
  movieVotes: string;
  movieGross: string;
  movieMetaScore: string;
  movieReleaseYear: string;
  movieImage: string;
  movieGenre?: MovieGenreType[];
  movies?: any;
}

export interface MovieGenreType {
  value: string;
  label: string;
}
