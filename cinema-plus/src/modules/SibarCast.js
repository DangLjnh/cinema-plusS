import MovieSidebarDetail from "components/movie/MovieSidebarDetail";
import Search from "components/search/Search";
import { fetcher, tmdbAPI, tvAPI } from "config/config";
import React from "react";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import { v4 } from "uuid";
import styled from "styled-components";
import LoadingSidebarHome from "components/loading/LoadingSidebarHome";
const SibarCastStyle = styled.div`
  .cast-list {
    &::-webkit-scrollbar {
      width: 5px;
      border-radius: 20px;
    }
    &::-webkit-scrollbar-track {
      box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 20px;
      background-image: linear-gradient(to bottom, #808080, #2c3e50);
    }
  }
  @media screen and (max-width: 1023.98px) {
    display: none;
  }
`;
const SibarCast = ({ className }) => {
  const params = useParams();
  const { castID } = params;
  const { data: dataCastMovie } = useSWR(
    tmdbAPI?.getMoviePerson(castID),
    fetcher
  );
  const dataCastMovieSort = dataCastMovie?.cast;
  const dataCastMovieSortList =
    dataCastMovieSort &&
    [...dataCastMovieSort].sort((a, b) => b.vote_average - a.vote_average);
  const { data: dataCastTv } = useSWR(tvAPI?.getTvPerson(castID), fetcher);
  const dataCastTvSort = dataCastTv?.cast;
  const dataCastTvSortList =
    dataCastTvSort &&
    [...dataCastTvSort].sort((a, b) => b.vote_average - a.vote_average);
  return (
    <SibarCastStyle
      className={`fixed top-2 w-[250px] right-[20px] z-[1001] mt-5 sidebar-cast ${className}`}
    >
      <Search></Search>
      <h2 className="my-5 text-xl text-white">Famous film of actors</h2>
      <div className="max-h-[520px] overflow-y-auto cast-list">
        {!dataCastMovie && <LoadingSidebarHome number={3}></LoadingSidebarHome>}
        {!dataCastTv && <LoadingSidebarHome number={3}></LoadingSidebarHome>}
        {dataCastMovieSortList?.slice(0, 10)?.map((item) => {
          if (!item.poster_path || item.poster_path === null) return null;
          return (
            <MovieSidebarDetail item={item} key={v4()}></MovieSidebarDetail>
          );
        })}
        {dataCastTvSortList &&
          [...dataCastTvSort]?.slice(0, 10)?.map((item) => {
            if (!item.poster_path || item.poster_path === null) return null;
            return (
              <MovieSidebarDetail item={item} key={v4()}></MovieSidebarDetail>
            );
          })}
      </div>
    </SibarCastStyle>
  );
};

export default SibarCast;
