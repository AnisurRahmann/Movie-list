import { useEffect } from "react";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import MovieTable from "../components/MovieTable";
import Spinner from "../components/Spinner";
import { getMovies, reset } from "../features/movie/movieSlice";

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const {
    movies,
    isLoading,
    newFavoriteMovieAdded,
    isError,
  } = useAppSelector((state) => state.movies);

  useEffect(() => {
    if (isError) {
      // Error silently
      console.log(isError)
    }
    if (newFavoriteMovieAdded) {
      toast.success("Added to your favorite list");
      dispatch(getMovies());
    }
    dispatch(getMovies());
    return () => {
      dispatch(reset());
    };
  }, [user, isError, newFavoriteMovieAdded, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section className="heading">
        <h6>Welcome {user && user.name}</h6>
      </section>
      <section>
        <MovieTable data={movies} />
      </section>
    </>
  );
};

export default Dashboard;
