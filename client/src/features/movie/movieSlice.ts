import { createAsyncThunk, createSlice,  } from "@reduxjs/toolkit";
import { MovieDataType } from "../../types/movieTypes";
import movieService from "./movieService";

interface MovieState {
  movies: MovieDataType[];
  favoriteMovies: MovieDataType[];
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  newFavoriteMovieAdded: boolean;
  message: string;
}



const initialState = {
  movies: [],
  favoriteMovies: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  newFavoriteMovieAdded: false,
  message: "",
} as MovieState;

export const createMovie = createAsyncThunk(
  "movies/create",
  async (movieData: MovieDataType, thunkAPI:any) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await movieService.createMovie(movieData, token);
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getMovies = createAsyncThunk(
  "movies/get",
  async (_, thunkAPI: any) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await movieService.getMovie(token);
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const addFavoriteMovie = createAsyncThunk(
  "movies/createFavoriteMovie",
  async (data: any, thunkAPI: any) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await movieService.addFavoriteMovie(data, token);
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getFavoriteMovieForUser = createAsyncThunk(
  "movies/getFavoriteMovieForUser",
  async (data: any, thunkAPI: any) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await movieService.getFavoriteMovieForUser(data, token);
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    reset: (state) => {
      state.movies = [];
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.newFavoriteMovieAdded = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createMovie.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createMovie.fulfilled, (state, action: any) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.movies.push(action.payload);
      })
      .addCase(createMovie.rejected, (state, action: any) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getMovies.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMovies.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.movies = action.payload;
      })
      .addCase(getMovies.rejected, (state, action: any) => {
        state.isLoading = false;
        state.isError = true;
        state.movies = action.payload;
      })
      .addCase(addFavoriteMovie.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addFavoriteMovie.fulfilled, (state, action: any) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.newFavoriteMovieAdded = true;
      })
      .addCase(addFavoriteMovie.rejected, (state, action: any) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getFavoriteMovieForUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFavoriteMovieForUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.favoriteMovies = action.payload;
      })
      .addCase(getFavoriteMovieForUser.rejected, (state, action: any) => {
        state.isLoading = false;
        state.isError = true;
        state.favoriteMovies = action.payload;
      });
  },
});

export const { reset } = movieSlice.actions;

export default movieSlice.reducer;
