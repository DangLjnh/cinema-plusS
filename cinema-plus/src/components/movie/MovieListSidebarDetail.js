import React from "react";
import { v4 } from "uuid";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import useSWR from "swr";
import { fetcher, tmdbAPI, tvAPI } from "config/config";
import MovieSidebarDetail from "./MovieSidebarDetail";
import { useEffect } from "react";
import LoadingSidebarHome from "components/loading/LoadingSidebarHome";
import LoadingSkeleton from "components/loading/LoadingSkeleton";
const MovieListSidebarDetailStyle = styled.div`
  .sidebar-details {
    /* display: unset; */
    .sidebar-detail-inner {
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
  }
`;
const MovieListSidebarDetail = ({ category, page }) => {
  const { movieID, tvID } = useParams();
  // Recommendations
  const { data } = useSWR(
    category === tmdbAPI
      ? tmdbAPI.getMovieMeta(
          String(movieID),
          page === "similar" ? "similar" : "recommendations"
        )
      : tvAPI.getTVMeta(
          String(tvID),
          page === "similar" ? "similar" : "recommendations"
        ),
    fetcher
  );
  const results = data?.results || [];
  return (
    <>
      <MovieListSidebarDetailStyle className="">
        {!data ? (
          <LoadingSkeleton
            width={"65px"}
            height="20px"
            className={"mb-5"}
          ></LoadingSkeleton>
        ) : (
          <h2 className="pb-[20px] text-white text-lg">
            {page === "similar" ? "Similar" : "Recomendation"}
          </h2>
        )}
        {!data && <LoadingSidebarHome number={3}></LoadingSidebarHome>}
        <div className="sidebar-details">
          <div className="max-h-[485px] overflow-y-auto sidebar-detail-inner">
            {results?.map((item) => {
              if (!item.poster_path) return null;
              return (
                <div key={v4()}>
                  <MovieSidebarDetail item={item}></MovieSidebarDetail>
                </div>
              );
            })}
          </div>
        </div>
      </MovieListSidebarDetailStyle>
    </>
  );
};

export default MovieListSidebarDetail;
