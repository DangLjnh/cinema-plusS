import { fetcher, tmdbAPI, tvAPI } from "config/config";
import React from "react";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import { v4 } from "uuid";
import styled from "styled-components";
import LoadingSkeleton from "components/loading/LoadingSkeleton";
import MediaSkeleton from "components/loading/MediaSkeleton";
const MediaDetailStyle = styled.div`
  @media screen and (max-width: 1023.98px) {
    .video {
      height: 200px;
    }
  }
`;
const MediaDetail = ({ movie, category, className }) => {
  const { movieID, tvID } = useParams();
  const { data } = useSWR(
    category === movie.runtime
      ? tmdbAPI.getMovieMeta(movieID, "videos")
      : tvAPI.getTVMeta(tvID, "videos"),
    fetcher
  );
  if (!data) return;
  const { results } = data;
  const trailers = [];
  const teasers = [];
  results?.forEach((item) => {
    if (item.type === "Trailer") trailers.push(item);
  });
  results?.forEach((item) => {
    if (item.type === "Teaser") teasers.push(item);
  });
  //remove array outer object
  const videoTrailerNear = Object.assign({}, ...trailers.slice(0, 1));
  const videoTeaserrNear = Object.assign({}, ...teasers.slice(0, 1));
  const videos = [
    {
      id: 1,
      name: "Trailer",
      video: videoTrailerNear,
    },
    {
      id: 2,
      name: "Teaser",
      video: videoTeaserrNear,
    },
  ];
  return (
    <>
      {!results ? (
        <MediaSkeleton></MediaSkeleton>
      ) : (
        <MediaDetailStyle className={`mt-10 ${className}`}>
          {videos.map((item) => {
            return (
              <div className="mb-5" key={v4()}>
                <h2 className="mb-5 text-2xl font-semibold text-white">
                  {item.name}
                </h2>
                <iframe
                  key={v4()}
                  src={`https://www.youtube.com/embed/${item.video.key}`}
                  allowFullScreen
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  title={`${item.video.name}`}
                  className={`w-full h-[140px] video rounded-md`}
                ></iframe>
                <p className="mt-2 trailer-title">{item.video.name}</p>
              </div>
            );
          })}
        </MediaDetailStyle>
      )}
    </>
  );
};

export default MediaDetail;
