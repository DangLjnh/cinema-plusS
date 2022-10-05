import { createAsyncThunk } from "@reduxjs/toolkit";
import { auth } from "../firebase/config";
import {
  requestGetGenreMovie,
  requestGetGenreTv,
  requestGetMovie,
  requestGetTvShow,
  requestMovieListGenre,
  requestMovieSearch,
} from "./request";

const handleFetchMovie = createAsyncThunk(
  "movie/handleFetchMovie",
  //neu nhieu query thi dung {...,...,...}
  async ({ query, page }, thunkAPI) => {
    const response = await requestGetMovie({ query, page });
    if (!response) return;
    return response.data.results;
  }
);
const handleFetchTv = createAsyncThunk(
  "tv/handleFetchTv",
  //neu nhieu query thi dung {...,...,...}
  async ({ query, page }, thunkAPI) => {
    const response = await requestGetTvShow({ query, page });
    if (!response) return;
    return response.data.results;
  }
);
const handleFetchGenreMovie = createAsyncThunk(
  "movie/handleFetchGenreMovie",
  //neu nhieu query thi dung {...,...,...}
  async (
    { genre, sortBy, runtimeFrom, runtimeTo, from, to, page },
    thunkAPI
  ) => {
    const response = await requestGetGenreMovie({
      genre,
      sortBy,
      runtimeFrom,
      runtimeTo,
      from,
      to,
      page,
    });
    if (!response) return;
    return response.data;
  }
);
const handleFetchGenreTv = createAsyncThunk(
  "tv/handleFetchGenreTv",
  //neu nhieu query thi dung {...,...,...}
  async (
    { genre, sortBy, runtimeFrom, runtimeTo, from, to, page },
    thunkAPI
  ) => {
    const response = await requestGetGenreTv({
      genre,
      sortBy,
      runtimeFrom,
      runtimeTo,
      from,
      to,
      page,
    });
    if (!response) return;
    // dispatch(setTotalPage(response?.data.));
    return response.data;
  }
);
const handleFetchListGenre = createAsyncThunk(
  "movie/handleFetchListGenre",
  async (query, thunkAPI) => {
    const response = await requestMovieListGenre();
    if (!response) return;
    return response.data.genres;
  }
);

const handleFetchSearchMovie = createAsyncThunk(
  "movie/handleFetchSearchMovie",
  async ({ category, query, page }, thunkAPI) => {
    const response = await requestMovieSearch({ category, query, page });
    if (!response) return;
    return response.data.results;
  }
);

const handleFetchSearchMovieTotal = createAsyncThunk(
  "movie/handleFetchSearchMovieTotal",
  async ({ category, query }, thunkAPI) => {
    const response = await requestMovieSearch({ category, query });
    if (!response) return;
    return response.data;
  }
);

const handleGetDetailUser = createAsyncThunk(
  "movie/handleGetDetailUser",
  () => {
    auth.onAuthStateChanged((user) => {
      return user;
    });
  }
);
auth.onAuthStateChanged((user) => {
  return user;
});
export {
  handleFetchMovie,
  handleFetchListGenre,
  handleFetchTv,
  handleFetchGenreMovie,
  handleFetchGenreTv,
  handleFetchSearchMovie,
  handleFetchSearchMovieTotal,
  handleGetDetailUser,
};
