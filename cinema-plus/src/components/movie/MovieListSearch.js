import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import MovieCard from "./MovieCard";
import { withErrorBoundary } from "react-error-boundary";
import { v4 } from "uuid";
import Paginate from "components/other/Paginate";
import { useState } from "react";
import { setCountMovieFail } from "redux/movieSlice";
import { useEffect } from "react";
import MovieListSkeleton from "components/loading/MovieListSkeleton";
import LoadingSkeleton from "components/loading/LoadingSkeleton";
const MovieSearchStyle = styled.div`
  .search-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 20px;
  }
`;
const MovieListSearch = () => {
  const { search, searchMovieList, searchMovieTotal, loading } = useSelector(
    (state, action) => state.news
  );
  return (
    <MovieSearchStyle>
      {loading ? (
        <LoadingSkeleton
          height={"28px"}
          width="40%"
          className={"mb-5"}
        ></LoadingSkeleton>
      ) : (
        <h2 className="mb-5 text-xl text-white">
          Search results for <strong className="search-result">{search}</strong>{" "}
          ( {searchMovieTotal.total_results} results found )
        </h2>
      )}

      {loading ? (
        <MovieListSkeleton number={20}></MovieListSkeleton>
      ) : (
        <div>
          <div className="search-list">
            {search &&
              searchMovieList.length > 0 &&
              searchMovieList.map((item) => {
                if (item.poster_path === null || item.profile_path === null) {
                  return null;
                }
                return <MovieCard data={item} key={v4()}></MovieCard>;
              })}
          </div>
          <Paginate totalResults={searchMovieTotal.total_results}></Paginate>
        </div>
      )}
    </MovieSearchStyle>
  );
};
function FallbackComponent() {
  return (
    <div className="text-xl font-bold text-center text-red-400 bg-red-50">
      Something went wrong with components MovieListSearch
    </div>
  );
}

export default withErrorBoundary(MovieListSearch, {
  FallbackComponent,
});
