import LoadingSidebarHome from "components/loading/LoadingSidebarHome";
import { fetcher, tmdbAPI, tvAPI } from "config/config";
import React from "react";
import { useNavigate } from "react-router-dom";
import useSWR from "swr";
import { v4 } from "uuid";
import MovieSidebar from "./MovieSidebar";

const MovieListSidebar = ({ type, category }) => {
  const navigate = useNavigate();
  const { data, error } = useSWR(
    category === tmdbAPI ? tmdbAPI.getTrendingMovie : tvAPI.getTrendingTv,
    fetcher
  );
  const movies = data?.results || [];
  return (
    <>
      <h2 className="py-[20px] text-white text-lg">
        Trending {category === tmdbAPI ? "Movies" : "Tv Shows"}
      </h2>
      {!data && <LoadingSidebarHome></LoadingSidebarHome>}
      {data && movies?.length > 0 && (
        <div className=" max-h-[330px] overflow-y-auto upcoming">
          {movies?.length > 0 &&
            movies.map((movie) => {
              return (
                <MovieSidebar
                  category={category}
                  movie={movie}
                  key={v4()}
                ></MovieSidebar>
              );
            })}
        </div>
      )}
    </>
  );
};

export default MovieListSidebar;
