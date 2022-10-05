import React from "react";
import { useSelector } from "react-redux";
import { v4 } from "uuid";
import MovieCard from "./MovieCard";
import styled from "styled-components";
import MovieListDiscovery from "./MovieListDiscovery";
import { tmdbAPI, tvAPI } from "config/config";
import MovieListSearch from "./MovieListSearch";
import CastList from "components/cast/CastList";
const MovieSearchStyle = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
`;
const MovieSearch = ({ className = "" }) => {
  const { searchMovieList, searchOption, search } = useSelector(
    (state, action) => state.news
  );
  return (
    <div className={className}>
      {search && searchMovieList.length > 0 && (
        <MovieListSearch></MovieListSearch>
      )}
      {!search && searchOption === "multi" && (
        <MovieListDiscovery
          type="now_playing"
          category={tmdbAPI}
        ></MovieListDiscovery>
      )}
      {!search && searchOption === "movie" && (
        <MovieListDiscovery
          type="now_playing"
          category={tmdbAPI}
        ></MovieListDiscovery>
      )}
      {!search && searchOption === "tv" && (
        <MovieListDiscovery
          type="airing_today"
          category={tvAPI}
        ></MovieListDiscovery>
      )}
    </div>
  );
};

export default MovieSearch;
