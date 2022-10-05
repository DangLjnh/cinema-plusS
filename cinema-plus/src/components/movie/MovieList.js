import React, { useEffect } from "react";
import MovieCard from "./MovieCard";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import { useDispatch, useSelector } from "react-redux";
// import { handleFetchMovie } from "redux/handler";
import { v4 } from "uuid";
import { fetcher, tmdbAPI, tvAPI } from "config/config";
import useSWR from "swr";
import { useParams } from "react-router-dom";
import MovieListSkeleton from "components/loading/MovieListSkeleton";
import LoadingSidebarHome from "components/loading/LoadingSidebarHome";

const MovieListStyle = styled.div`
  @media screen and (max-width: 1023.98px) {
    max-width: 570px;
  }
  @media screen and (max-width: 767.98px) {
    max-width: 350px;
  }
`;
const MovieList = ({ type, category, className = "" }) => {
  const { movieID, tvID, castID } = useParams();
  const { data } = useSWR(
    type && category === tmdbAPI
      ? category?.getMovieList(type)
      : category?.getTvList(type),
    fetcher
  );
  const { data: similar } = useSWR(
    type && category === tmdbAPI
      ? category?.getMovieMeta(movieID, type === "similar" ? "similar" : type)
      : category?.getTVMeta(tvID, type === "similar" ? "similar" : type),
    fetcher
  );
  const { data: recommendations } = useSWR(
    type && category === tmdbAPI
      ? category?.getMovieMeta(
          movieID,
          type === "recommendations" ? "recommendations" : type
        )
      : category?.getTVMeta(
          tvID,
          type === "recommendations" ? "recommendations" : type
        ),
    fetcher
  );
  const { data: knowFor } = useSWR(
    type && category === tmdbAPI
      ? category?.getMoviePerson(castID)
      : category?.getTvPerson(castID),
    fetcher
  );

  const similarList = similar?.results || [];
  const recommendationList = recommendations?.results || [];
  const knowForList = knowFor?.cast || [];
  const movies = data?.results || [];
  return (
    <MovieListStyle className={`movie-list item ${className}`}>
      <Swiper grabCursor={true} spaceBetween={20} slidesPerView={"auto"}>
        {!data && <MovieListSkeleton></MovieListSkeleton>}
        {data &&
          type !== "similar" &&
          movies?.length > 0 &&
          movies.map((movie) => {
            if (!movie.poster_path) return null;
            return (
              <SwiperSlide key={v4()}>
                <MovieCard data={movie} key={v4}></MovieCard>
              </SwiperSlide>
            );
          })}
        {type === "similar" &&
          similarList?.length > 0 &&
          similarList.map((movie) => {
            if (!movie.poster_path) return null;
            return (
              <SwiperSlide key={v4()}>
                <MovieCard data={movie} key={v4}></MovieCard>
              </SwiperSlide>
            );
          })}
        {type === "recommendations" &&
          recommendationList?.length > 0 &&
          recommendationList.map((movie) => {
            if (!movie.poster_path) return null;
            return (
              <SwiperSlide key={v4()}>
                <MovieCard data={movie} key={v4}></MovieCard>
              </SwiperSlide>
            );
          })}
        {type === "knowFor" &&
          knowForList?.length > 0 &&
          knowForList.map((movie) => {
            if (!movie.poster_path) return null;
            return (
              <SwiperSlide key={v4()}>
                <MovieCard data={movie} key={v4}></MovieCard>
              </SwiperSlide>
            );
          })}
      </Swiper>
    </MovieListStyle>
  );
};

export default MovieList;
