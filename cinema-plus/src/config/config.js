export const fetcher = (...args) => fetch(...args).then((res) => res.json());
export const apiKey = "6f98426dd6afd025ac4266b4ae12bdd6";
const tmdbEndpoint = "https://api.themoviedb.org/3/movie";
const tvEndpoint = "https://api.themoviedb.org/3/tv";
//`https://api.themoviedb.org/3/search/movie?api_key=95f2419536f533cdaa1dadf83c606027&query=minion`
// http://api.themoviedb.org/3/search/multi?api_key=95f2419536f533cdaa1dadf83c606027&query=minion
// https://api.themoviedb.org/3/discover/movie?api_key=6f98426dd6afd025ac4266b4ae12bdd6&with_genres=18&with_genres=12
// https://api.themoviedb.org/3/discover/movie?api_key=6f98426dd6afd025ac4266b4ae12bdd6&with_genres=18?sort_by=popularity.desc
// http://api.themoviedb.org/3/search/keyword?api_key=95f2419536f533cdaa1dadf83c606027&query=one
// https://api.themoviedb.org/3/discover/movie?api_key=95f2419536f533cdaa1dadf83c606027&with_genres=35&sort_by=popularity.desc
const tmdbAPI = {
  getMovieList: (type, page = 1) =>
    `${tmdbEndpoint}/${type}?api_key=${apiKey}&page=${page}`,
  getTrendingMovie: `https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}`,
  getTrendingAll: `https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}`,
  getMovieGenre: `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}`,
  imageOriginal: (url) => `https://image.tmdb.org/t/p/original${url}`,
  getMovieListGenre: `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`,
  getDiscoverMovie: (type) =>
    `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&sort_by=${type}`,
  getMovieDetail: (movieID) => `${tmdbEndpoint}/${movieID}?api_key=${apiKey}`,
  getMovieMeta: (movieID, type) =>
    `${tmdbEndpoint}/${movieID}/${type}?api_key=${apiKey}`,
  getWatchMovie: (imdb_id) =>
    `https://www.2embed.to/embed/imdb/movie?id=${imdb_id}`,
  getSearchPerson: `https://api.themoviedb.org/3/search/person?api_key=${apiKey}`,
  getDetailPerson: (castID) =>
    `https://api.themoviedb.org/3/person/${castID}?api_key=${apiKey}`,
  getMoviePerson: (castID) =>
    `https://api.themoviedb.org/3/person/${castID}/movie_credits?api_key=${apiKey}`,
  searchKeyWord: (query) =>
    `http://api.themoviedb.org/3/search/keyword?api_key=${apiKey}&query=${query}`,
};
const tvAPI = {
  getTvList: (type, page = 1) =>
    `${tvEndpoint}/${type}?api_key=${apiKey}&page=${page}`,
  getTrendingTv: `https://api.themoviedb.org/3/trending/tv/day?api_key=${apiKey}`,
  getTrendingAll: `https://api.themoviedb.org/3/trending/tv/week?api_key=${apiKey}`,
  getTvListGenre: `https://api.themoviedb.org/3/genre/tv/list?api_key=${apiKey}`,
  getTVDetail: (tvID) => `${tvEndpoint}/${tvID}?api_key=${apiKey}`,
  getTVMeta: (tvID, type) => `${tvEndpoint}/${tvID}/${type}?api_key=${apiKey}`,
  getWatchTV: (imdb_id, season, episode) =>
    `https://www.2embed.to/embed/tmdb/tv?id=${imdb_id}&s=${season}&e=${episode}`,
  getSeasonTv: (tvID, seasonNumber) =>
    `https://api.themoviedb.org/3/tv/${tvID}/season/${seasonNumber}?api_key=${apiKey}`,
  getSeasonEpTv: (tvID, seasonNumber, episodeNumber) =>
    `https://api.themoviedb.org/3/tv/${tvID}/season/${seasonNumber}/episode/${episodeNumber}?api_key=${apiKey}`,
  getTvPerson: (castID) =>
    `https://api.themoviedb.org/3/person/${castID}/tv_credits?api_key=${apiKey}`,
  imageOriginalTV: (url) => `https://image.tmdb.org/t/p/original${url}`,
};
const serverSide = "http://localhost:8080";
const clientSide = "http://localhost:3000";
export { tmdbAPI, tvAPI, serverSide, clientSide };

/**
   * const { data: currencyName } = useSWR(tmdbAPI.currencyName, fetcher);
  const arrayCurrencyName = Object.keys(currencyName);
  // results.push(data?.rates?. VND);
  const { data } = useSWR(tmdbAPI.currency, fetcher);
  const { rates } = data;
  const results = [];
  arrayCurrencyName.forEach((item) => {
    results.push(rates[item]);
  });
  // 1a2abbad811e440bbf1f35874f4a91b7
currency:
    "https://api.currencyfreaks.com/latest?apikey=1a2abbad811e440bbf1f35874f4a91b7",
  currencyName: "https://api.currencyfreaks.com/currency-symbols",
   */
