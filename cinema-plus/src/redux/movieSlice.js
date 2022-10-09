import { createSlice, createAction } from "@reduxjs/toolkit";
import { auth } from "../firebase/config";
import {
  handleFetchGenreMovie,
  handleFetchGenreTv,
  handleFetchListGenre,
  handleFetchMovie,
  handleFetchSearchMovie,
  handleFetchSearchMovieTotal,
  handleFetchTv,
  handleGetDetailUser,
  // handleFetchMoviePopular,
} from "./handler";
const date = new Date().getDate();
const month = new Date().getMonth();
const year = new Date().getFullYear();
const currentDate = `${year}-${month + 1 < 10 ? `0${month + 1}` : month + 1}-${
  date < 10 ? `0${date}` : date
}`;
export const setLoading = createAction("setLoading");
export const setQueryNow = createAction("setQueryNow");
export const setQueryTv = createAction("setQueryTv");
export const setQueryPopular = createAction("setQueryPopular");
export const setIsActive = createAction("setIsActive");
export const setOption = createAction("setOption");
export const setShows = createAction("setShows");
export const setGenres = createAction("setGenres");
export const setGenresName = createAction("setGenresName");
export const setSortBy = createAction("setSortBy");
export const setSearch = createAction("setSearch");
export const setSearchOption = createAction("setSearchOption");
export const setSeasonNumber = createAction("setSeasonNumber");
export const setActiveSeason = createAction("setActiveSeason");
export const setEpisodeNumber = createAction("setEpisodeNumber");
export const setTrailer = createAction("setTrailer");
export const setTrailerID = createAction("setTrailerID");
export const setNextPage = createAction("setNextPage");
export const setRuntimeTo = createAction("setRuntimeTo");
export const setRuntimeFrom = createAction("setRuntimeFrom");
export const setDateFrom = createAction("setDateFrom");
export const setDateTo = createAction("setDateTo");
export const setOptionDetail = createAction("setOptionDetail");
export const setTotalPage = createAction("setTotalPage");
export const setDataCast = createAction("setDataCast");

const initialState = {
  results: [],
  resultsTV: [],
  loading: true,
  isActive: false,
  shows: false,
  queryNow: "",
  queryTV: "",
  option: "",
  sortBy: "",
  queryPopular: "",
  genreMovieList: [],
  genreTvList: [],
  searchMovieList: [],
  searchMovieTotal: 0,
  genres: "",
  genresName: "",
  search: "",
  activeSeason: false,
  seasonNumber: 1,
  episodeNumber: 1,
  searchOption: "multi",
  trailer: false,
  trailerID: 0,
  nextPage: 1,
  runtimeTo: "200",
  runtimeFrom: "0",
  dateFrom: `2002-11-04`,
  currentDate: `${year}-${month + 1 < 10 ? `0${month + 1}` : month + 1}-${
    date < 10 ? `0${date}` : date
  }`,
  dateTo: `${String(currentDate)}`,
  // dateTo: `2022-11-04`,
  optionDetail: "Descending",
  totalPage: 0,
  dataCast: {},
  detailUser: {},
};

const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(handleFetchMovie.fulfilled, (state, action) => {
        state.results = action.payload;
        state.loading = false;
      })
      .addCase(handleFetchTv.fulfilled, (state, action) => {
        state.resultsTV = action.payload;
      })
      .addCase(handleFetchGenreMovie.fulfilled, (state, action) => {
        state.genreMovieList = action.payload;
        state.loading = false;
      })
      .addCase(handleFetchGenreTv.fulfilled, (state, action) => {
        state.genreTvList = action.payload;
        state.loading = false;
      })
      .addCase(handleFetchSearchMovie.fulfilled, (state, action) => {
        state.searchMovieList = action.payload;
        // state.loading = false;
      })
      .addCase(handleFetchSearchMovieTotal.fulfilled, (state, action) => {
        state.searchMovieTotal = action.payload;
        state.loading = false;
      })
      .addCase(handleFetchGenreMovie.pending, (state, action) => {
        state.loading = true;
        state.genreMovieList = [];
      })
      .addCase(handleFetchGenreTv.pending, (state, action) => {
        state.genreTvList = [];
        state.loading = true;
      })
      .addCase(handleFetchMovie.pending, (state, action) => {
        state.loading = true;
        state.results = "";
      })
      .addCase(handleFetchSearchMovie.pending, (state, action) => {
        state.loading = true;
        state.searchMovieList = [];
      })
      .addCase(handleFetchSearchMovieTotal.pending, (state, action) => {
        state.searchMovieTotal = "";
        state.loading = true;
      })
      .addCase(handleFetchMovie.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(handleFetchGenreMovie.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(handleFetchGenreTv.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(handleFetchSearchMovie.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(handleFetchSearchMovieTotal.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(handleGetDetailUser.fulfilled, (state, action) => {
        state.detailUser = action.payload;
      })
      .addCase(setLoading, (state, action) => {
        state.loading = action.payload;
      })
      .addCase(setQueryNow, (state, action) => {
        state.queryNow = action.payload;
      })
      .addCase(setQueryTv, (state, action) => {
        state.queryTV = action.payload;
      })
      .addCase(setQueryPopular, (state, action) => {
        state.queryPopular = action.payload;
      })
      .addCase(setIsActive, (state, action) => {
        state.isActive = action.payload;
      })
      .addCase(setOption, (state, action) => {
        state.option = action.payload;
      })
      .addCase(setShows, (state, action) => {
        state.shows = action.payload;
      })
      .addCase(setGenres, (state, action) => {
        state.genres = action.payload;
      })
      .addCase(setGenresName, (state, action) => {
        state.genresName = action.payload;
      })
      .addCase(setSortBy, (state, action) => {
        state.sortBy = action.payload;
      })
      .addCase(setSearch, (state, action) => {
        state.search = action.payload;
      })
      .addCase(setActiveSeason, (state, action) => {
        state.activeSeason = action.payload;
      })
      .addCase(setSeasonNumber, (state, action) => {
        state.seasonNumber = action.payload;
      })
      .addCase(setEpisodeNumber, (state, action) => {
        state.episodeNumber = action.payload;
      })
      .addCase(setSearchOption, (state, action) => {
        state.searchOption = action.payload;
      })
      .addCase(setTrailer, (state, action) => {
        state.trailer = action.payload;
      })
      .addCase(setTrailerID, (state, action) => {
        state.trailerID = action.payload;
      })
      .addCase(setNextPage, (state, action) => {
        state.nextPage = action.payload;
      })
      .addCase(setRuntimeFrom, (state, action) => {
        state.runtimeFrom = action.payload;
      })
      .addCase(setRuntimeTo, (state, action) => {
        state.runtimeTo = action.payload;
      })
      .addCase(setDateFrom, (state, action) => {
        state.dateFrom = action.payload;
      })
      .addCase(setDateTo, (state, action) => {
        state.dateTo = action.payload;
      })
      .addCase(setOptionDetail, (state, action) => {
        state.optionDetail = action.payload;
      })
      .addCase(setTotalPage, (state, action) => {
        state.totalPage = action.payload;
      })
      .addCase(setDataCast, (state, action) => {
        state.dataCast = action.payload;
      });
  },
});

export default movieSlice.reducer;
