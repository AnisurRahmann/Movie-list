import axios from "axios";
import { MovieDataType } from "../../types/movieTypes";
const { REACT_APP_BASE_URL } = process.env;

const API_URL = `${REACT_APP_BASE_URL}/movies/`;

const createMovie = async (movieData: MovieDataType, token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      AccessControlAllowOrigin: "*",
    },
  };

  const response = await axios.post(API_URL + "addNewMovie", movieData, config);
  return response.data;
};

const getMovie = async (token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      AccessControlAllowOrigin: "*",
    },
  };
  const response = await axios.get(API_URL, config);
  return response.data;
};

const addFavoriteMovie = async (data:any,token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      AccessControlAllowOrigin: "*",
    },
  };
  const response = await axios.post(API_URL + "addFavoriteMovie",data, config);
  return response.data;
}

const getFavoriteMovieForUser = async (data:any, token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      AccessControlAllowOrigin: "*",
    },
  };
  const response = await axios.post(
    API_URL + "getAllFavoriteMoviesForUser",
    data,
    config
  );
  return response.data;
}

const movieService = {
  createMovie,
  getMovie,
  addFavoriteMovie,
  getFavoriteMovieForUser,
};

export default movieService;
