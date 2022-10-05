import axios from "axios";
// https://api.themoviedb.org/3/movie/now_playing?api_key=6f98426dd6afd025ac4266b4ae12bdd6
const apiKey = "6f98426dd6afd025ac4266b4ae12bdd6";
function requestGetMovie({ query, page = 1 }) {
  return axios.request({
    method: "GET",
    url: `https://api.themoviedb.org/3/movie/${query}?api_key=${apiKey}${page}`,
    // params: {
    //   query,
    // },
  });
}
// https://api.themoviedb.org/3/movie/up_coming?api_key="6f98426dd6afd025ac4266b4ae12bdd6"
function requestGetTvShow({ query, page }) {
  return axios.request({
    method: "GET",
    url: `https://api.themoviedb.org/3/tv/${query}?api_key=${apiKey}${page}`,
    //tự đông hiểu ?query=react
    // params: {
    //   query,
    // },
  });
}

function requestGetGenreMovie({
  genre = "",
  sortBy,
  runtimeFrom = "",
  runtimeTo = "",
  from = "",
  to = "",
  page = "&page=1",
}) {
  return axios.request({
    method: "GET",
    url: `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}${genre}${sortBy}${runtimeTo}${runtimeFrom}${from}${to}${page}`,
  });
}
function requestGetGenreTv({
  genre = "",
  sortBy,
  runtimeFrom = "",
  runtimeTo = "",
  from = "",
  to = "",
  page = "&page=1",
}) {
  return axios.request({
    method: "GET",
    url: `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}${genre}${sortBy}${runtimeTo}${runtimeFrom}${from}${to}${page}`,
  });
}

function requestMovieListGenre() {
  return axios.request({
    method: "GET",
    url: `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`,
    //tự đông hiểu ?query=react
    // params: {
    //   query,
    // },
  });
}

function requestMovieSearch({ category, query, page = 1 }) {
  return axios.request({
    method: "GET",
    url: `http://api.themoviedb.org/3/search/${category}?api_key=${apiKey}&page=${page}`,
    params: {
      query,
    },
  });
}

export {
  requestGetMovie,
  requestMovieListGenre,
  requestGetTvShow,
  requestGetGenreMovie,
  requestGetGenreTv,
  requestMovieSearch,
};
