import { useEffect, CSSProperties } from "react";
import { toast } from "react-toastify";
import { FixedSizeList } from "react-window";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import MovieCard from "../components/MovieCard";
import Spinner from "../components/Spinner";
import { getFavoriteMovieForUser, reset } from "../features/movie/movieSlice";

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
    movieMetaScore?: string;
  };
}

 interface RowDataType {
   index: number;
   data: favoriteMoviesData[];
   style: CSSProperties;
 }

const FavoriteMovies = () => {
  const dispatch = useAppDispatch();
  const { favoriteMovies, isLoading, isError, message } = useAppSelector(
    (state: any) => state.movies
  );
  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    dispatch(getFavoriteMovieForUser({ email: user.email }));
    return () => {
      dispatch(reset());
    };
  }, [dispatch, isError, message, user.email]);

  const Row = ({ index, style, data }: RowDataType) => {
    return (
      <div style={style}>
        <MovieCard data={data} index={index} />
      </div>
    );
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div>
      <section className="Heading">
        <h1>{user && user.name}`s Favorite Movies</h1>
        {favoriteMovies?.movies?.length === 0 && <p>No favorite movie found</p>}
      </section>
      <section>
        <FixedSizeList
          height={700}
          itemCount={favoriteMovies?.movies?.length}
          itemSize={250}
          width={1200}
          itemData={favoriteMovies.movies}
        >
          {Row}
        </FixedSizeList>
      </section>
    </div>
  );
};

export default FavoriteMovies;
