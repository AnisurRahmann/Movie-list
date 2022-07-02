interface favoriteMoviesData {
  movieId: string;
  userId: string;
  movie: {
    id?: string;
    movieDirector?: string;
    movieDuration?: string;
    movieGenre?: string[] | undefined;
    movieGross?: string;
    movieImage?: string;
    movieName?: string;
    movieSummary?: string;
    movieVotes?: string;
    movieReleaseYear?: string;
    movieRatings?: string;
    movieMetaScore?: string

  };
}

const MovieCard = ({
  data,
  index,
}: {
  data: favoriteMoviesData[];
  index: number;
}) => {
  const {
    movieDirector,
    movieDuration,
    movieGenre,
    movieGross,
    movieImage,
    movieName,
    movieSummary,
  } = data[index].movie;

  return (
    <figure className="movie">
      <div className="movie-hero">
        <img src={movieImage} className="movie-img" alt={movieName} />
      </div>
      <div className="movie-content">
        <div className="movie-title">
          <h1 className="heading-primary">{movieName}</h1>
          {movieGenre?.map((item: any) => {
            return <div className="movie-tag">{item}</div>;
          })}
        </div>
        <p className="movie-description">{movieSummary}</p>
        <div className="movie-details">
          <p className="movie-detail">{movieDirector}</p>
          <p className="movie-detail">{movieDuration}</p>
          <p className="movie-detail">{movieGross}</p>
        </div>
      </div>
    </figure>
  );
};
export default MovieCard;
