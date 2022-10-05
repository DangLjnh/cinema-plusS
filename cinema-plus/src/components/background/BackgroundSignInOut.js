import { fetcher, tmdbAPI } from "config/config";
import React from "react";
import useSWR from "swr";

const BackgroundSignInOut = ({ className }) => {
  const { data, error } = useSWR(tmdbAPI.getTrendingAll, fetcher);
  if (!data) return;
  const { results } = data;
  if (!results) return;
  const filmTrending = results?.slice(0, 1);
  return (
    <>
      {filmTrending &&
        filmTrending.map((item) => {
          return (
            <img
              key={"123"}
              src={tmdbAPI.imageOriginal(item.backdrop_path)}
              alt=""
              className={`absolute object-cover inset-0 z-[-1] top-0 left-0 w-full h-full ${className}`}
            />
          );
        })}
    </>
  );
};

export default BackgroundSignInOut;
