import { fetcher, tmdbAPI, tvAPI } from "config/config";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import useSWR from "swr";
import styled from "styled-components";
import { setTrailer } from "redux/movieSlice";
import { useEffect } from "react";
const TrailerStyle = styled.div`
  /* animation: fadeIn 0.2s; */
  .close {
    &:hover {
      path {
        stroke: #6680c0;
      }
    }
  }
  /* @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  } */
  @media screen and (max-width: 1023.98px) {
    .video-trailer {
      width: 650px;
      height: 400px;
    }
    .close {
      top: 30%;
      right: 50px;
    }
  }
  @media screen and (max-width: 767.98px) {
    .video-trailer {
      width: 350px;
      height: 200px;
    }
    .close {
      top: 35%;
      right: 0px;
    }
  }
`;
const Trailer = ({ category }) => {
  const { trailerID } = useSelector((state, action) => state.news);
  const dispatch = useDispatch();
  const { data } = useSWR(
    category === tmdbAPI
      ? tmdbAPI.getMovieMeta(trailerID, "videos")
      : tvAPI.getTVMeta(trailerID, "videos"),
    fetcher
  );
  if (!data) return;
  const { results } = data;
  const trailers = [];
  // const teasers = [];
  results?.forEach((item) => {
    if (item?.type === "Trailer") trailers?.push(item);
  });
  const videoTrailerNear = Object.assign({}, ...trailers?.slice(0, 1));
  const handleClick = (e) => {
    if (e.target.matches(".overlay") || e.target.matches(".close")) {
      dispatch(setTrailer(false));
    }
  };
  if (!videoTrailerNear) return null;
  return (
    <TrailerStyle className="trailer" onClick={handleClick}>
      <div className="absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.9)] to-[rgba(0,0,0,0.4)] rounded-lg z-[101] overlay">
        <iframe
          src={`https://www.youtube.com/embed/${videoTrailerNear?.key}`}
          allowFullScreen
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          title={`${videoTrailerNear?.name}`}
          className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[1100px] h-[510px] rounded-md z-[102] video-trailer`}
        ></iframe>
        <svg
          width="50"
          height="50"
          viewBox="0 0 30 30"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`absolute right-[190px] top-[75px] z-[102] cursor-pointer close`}
        >
          <path
            d="M1 12C1 14.4477 1.13246 16.3463 1.46153 17.827C1.78807 19.2963 2.29478 20.2921 3.00136 20.9986C3.70794 21.7052 4.70365 22.2119 6.17298 22.5385C7.65366 22.8675 9.55232 23 12 23C14.4477 23 16.3463 22.8675 17.827 22.5385C19.2963 22.2119 20.2921 21.7052 20.9986 20.9986C21.7052 20.2921 22.2119 19.2963 22.5385 17.827C22.8675 16.3463 23 14.4477 23 12C23 9.55232 22.8675 7.65366 22.5385 6.17298C22.2119 4.70365 21.7052 3.70794 20.9986 3.00136C20.2921 2.29478 19.2963 1.78807 17.827 1.46153C16.3463 1.13246 14.4477 1 12 1C9.55232 1 7.65366 1.13246 6.17298 1.46153C4.70365 1.78807 3.70794 2.29478 3.00136 3.00136C2.29478 3.70794 1.78807 4.70365 1.46153 6.17298C1.13246 7.65366 1 9.55232 1 12Z"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="pointer-events-none"
          />
          <path
            d="M15 9L12 12M12 12L9 15M12 12L15 15M12 12L9 9"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="pointer-events-none"
          />
        </svg>
      </div>
    </TrailerStyle>
  );
};

export default Trailer;
