import React, { useEffect } from "react";
import MovieCard from "./MovieCard";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { handleFetchGenreMovie, handleFetchGenreTv } from "redux/handler";
import { v4 } from "uuid";
import { tmdbAPI, tvAPI } from "config/config";
import { withErrorBoundary } from "react-error-boundary";
import Paginate from "components/other/Paginate";
import NotFoundPage from "pages/NotFoundPage";
import MovieListSkeleton from "components/loading/MovieListSkeleton";
const MovieListDiscoveryStyle = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
`;
const MovieListDiscovery = ({ type, category, className = "" }) => {
  const dispatch = useDispatch();
  const {
    queryNow,
    queryTV,
    genreMovieList,
    genreTvList,
    genres,
    sortBy,
    runtimeTo,
    runtimeFrom,
    dateFrom,
    dateTo,
    nextPage,
    loading,
  } = useSelector((state) => state.news);
  useEffect(() => {
    if (genres || runtimeTo) {
      dispatch(
        handleFetchGenreMovie({
          genre: `&with_genres=${String(genres)}`,
          sortBy:
            sortBy === ""
              ? `&sort_by=popularity.desc`
              : `&sort_by=${String(sortBy)}`,
          runtimeFrom: `&with_runtime.gte=${String(runtimeFrom)}`,
          runtimeTo: `&with_runtime.lte=${String(runtimeTo)}`,
          from: `&primary_release_date.gte=${dateFrom}`,
          to: `&primary_release_date.lte=${dateTo}`,
          page: `&page=${nextPage}`,
        })
      );
    }
    if (genres || runtimeTo) {
      dispatch(
        handleFetchGenreTv({
          genre: `&with_genres=${String(genres)}`,
          sortBy:
            sortBy === ""
              ? `&sort_by=popularity.desc`
              : `&sort_by=${String(sortBy)}`,
          runtimeFrom: `&with_runtime.gte=${String(runtimeFrom)}`,
          runtimeTo: `&with_runtime.lte=${String(runtimeTo)}`,
          from: `&first_air_date.gte=${dateFrom}`,
          to: `&first_air_date.lte=${dateTo}`,
          page: `&page=1`,
        })
      );
    }
  }, [
    dispatch,
    type,
    genres,
    sortBy,
    runtimeFrom,
    runtimeTo,
    dateFrom,
    dateTo,
    nextPage,
  ]);
  return (
    <div>
      {loading && <MovieListSkeleton number={20}></MovieListSkeleton>}
      {/* {!genreTvList && <MovieListSkeleton number={20}></MovieListSkeleton>} */}
      <MovieListDiscoveryStyle className={className}>
        {category === tmdbAPI &&
          genreMovieList?.results?.length > 0 &&
          genreMovieList?.results?.map((item) => {
            if (!item.poster_path) return null;
            return <MovieCard data={item} key={v4()}></MovieCard>;
          })}
        {category === tvAPI &&
          genreTvList?.results?.length > 0 &&
          genreTvList?.results.map((item) => {
            if (!item.poster_path) return null;
            return <MovieCard data={item} key={v4()}></MovieCard>;
          })}
      </MovieListDiscoveryStyle>
      {category === tmdbAPI && genreMovieList?.total_results !== 0 && (
        <Paginate
          className="paginate-movie"
          totalResults={genreMovieList?.total_results}
        ></Paginate>
      )}
      {category === tvAPI && genreTvList?.total_results !== 0 && (
        <Paginate
          className="paginate-movie"
          totalResults={genreTvList?.total_results}
        ></Paginate>
      )}
      {genreMovieList?.total_results === 0 && (
        <NotFoundPage
          hasLogo={false}
          hasButton={false}
          title="Result not found"
          desc="I couldn't find the film of your option."
        ></NotFoundPage>
      )}
    </div>
  );
};

function FallbackComponent() {
  return (
    <div className="text-xl font-bold text-center text-red-400 bg-red-50">
      Something went wrong with components MovieListDiscovery
    </div>
  );
}

export default withErrorBoundary(MovieListDiscovery, {
  FallbackComponent,
});

/**
 * { {genres && category === tmdbAPI
        ? genreMovieList?.map((item) => {
            return <MovieCard data={item} key={v4()}></MovieCard>;
          })
        : ""}
      {genres && category === tvAPI
        ? genreTvList.map((item) => {
            if (!item.poster_path) return null;
            return <MovieCard data={item} key={v4()}></MovieCard>;
          })
        : ""} 
 */
