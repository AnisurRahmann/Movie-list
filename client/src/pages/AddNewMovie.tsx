import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Select from "react-select";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import Spinner from "../components/Spinner";
import { createMovie, reset } from "../features/movie/movieSlice";
import { MovieDataType, MovieGenreType } from "../types/movieTypes";


const options = [
  { value: "action", label: "Action" },
  { value: "comedy", label: "Comedy" },
  { value: "drama", label: "Drama" },
  { value: "fantasy", label: "Fantasy" },
  { value: "horror", label: "Horror" },
  { value: "mystery", label: "Mystery" },
  { value: "romance", label: "Romance" },
  { value: "thriller", label: "Thriller" },
  { value: "western", label: "Western" },
] as MovieGenreType[];

const AddNewMovie = () => {
  const {
    register,
    handleSubmit,
    reset: formReset,
    formState: { errors, isDirty, isValid },
  } = useForm<MovieDataType>({
    mode: "onChange",
  });

  const [selectedOption, setSelectedOption] = useState<MovieGenreType[]>();

  const dispatch = useAppDispatch();

  const { movies, isLoading, isSuccess, isError, message } = useAppSelector(
    (state) => state.movies
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess && movies.length === 1) {
      toast.success("New Movie Added");
      formReset();
      dispatch(reset());
    }
  }, [isSuccess, isError, movies.length, message, formReset, dispatch]);

  const onSubmit: SubmitHandler<MovieDataType> = (data) => {
    dispatch(
      createMovie({
        movieName: data.movieName,
        movieRatings: data.movieRatings,
        movieDuration: data.movieDuration,
        movieSummary: data.movieSummary,
        movieDirector: data.movieDirector,
        movieVotes: data.movieVotes,
        movieGross: data.movieGross,
        movieMetaScore: data.movieMetaScore,
        movieReleaseYear: data.movieReleaseYear,
        movieImage: data.movieImage,
        movieGenre: selectedOption?.map((option: any) => option.value),
      })
    );
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section className="heading">
        <p>Add new Movie</p>
      </section>
      <section className="form">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label htmlFor="text">Movie Name</label>
            <input
              className="form-control"
              {...register("movieName", {
                required: "Movie Name is required",
              })}
            />
            <p className="form-error">
              {errors.movieName && errors.movieName.message}
            </p>

            <label htmlFor="text">Movie Ratings</label>
            <input
              className="form-control"
              {...register("movieRatings", {
                required: "Ratings is required",
              })}
            />
            <p className="form-error">
              {errors.movieRatings && errors.movieRatings.message}
            </p>

            <label htmlFor="text">Movie Duration</label>
            <input
              className="form-control"
              {...register("movieDuration", {
                required: "Duration is required",
                pattern: {
                  value: /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
                  message: "Please enter valid duration e.g.: HH:MM",
                },
              })}
            />
            <p className="form-error">
              {errors.movieDuration && errors.movieDuration.message}
            </p>

            <label htmlFor="text">Movie Summary</label>
            <input
              className="form-control"
              {...register("movieSummary", {
                required: "Summary is required",
              })}
            />
            <p className="form-error">
              {errors.movieSummary && errors.movieSummary.message}
            </p>

            <label htmlFor="text">Movie Director</label>
            <input
              className="form-control"
              {...register("movieDirector", {
                required: "Director name is required",
              })}
            />
            <p className="form-error">
              {errors.movieDirector && errors.movieDirector.message}
            </p>

            <label htmlFor="text">Movie Votes</label>
            <input
              className="form-control"
              {...register("movieVotes", {
                required: "Votes is required",
              })}
            />
            <p className="form-error">
              {errors.movieVotes && errors.movieVotes.message}
            </p>

            <label htmlFor="text">Movie Gross</label>
            <input
              className="form-control"
              {...register("movieGross", {
                required: "Gross is required",
              })}
            />
            <p className="form-error">
              {errors.movieGross && errors.movieGross.message}
            </p>

            <label htmlFor="text">Movie Metascore</label>
            <input
              className="form-control"
              {...register("movieMetaScore", {
                required: "Metascore is required",
              })}
            />
            <p className="form-error">
              {errors.movieMetaScore && errors.movieMetaScore.message}
            </p>

            <label htmlFor="text">Movie release year</label>
            <input
              type="date"
              className="form-control"
              {...register("movieReleaseYear", {
                required: "Release year is required",
              })}
            />
            <p className="form-error">
              {errors.movieReleaseYear && errors.movieReleaseYear.message}
            </p>
            <label htmlFor="text">Movie Image</label>
            <input
              className="form-control"
              {...register("movieImage", {
                required: "Movie poster link is required",
                pattern: {
                  value:
                    /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/,
                  message: "Please enter valid image url link",
                },
              })}
            />
            <p className="form-error">
              {errors.movieImage && errors.movieImage.message}
            </p>
            <label htmlFor="select">Movie genre</label>
            <Select
              options={options}
              isMulti
              // @ts-ignore
              onChange={setSelectedOption}
              defaultValue={selectedOption}
            />
          </div>
          <div className="form-group">
            <button
              type="submit"
              className="btn btn-block"
              disabled={
                !isDirty ||
                !isValid ||
                (selectedOption && selectedOption?.length < 1)
              }
            >
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default AddNewMovie;
