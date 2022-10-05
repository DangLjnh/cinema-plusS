import CastDetail from "components/other/CastDetail";
import MediaDetail from "components/other/MediaDetail";
import OverallDetail from "components/other/OverallDetail";
import ReviewsDetail from "components/other/ReviewsDetail";
import { tmdbAPI } from "config/config";
import React, { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import styled from "styled-components";
const MovieDetailStyle = styled.div`
  display: grid;
  grid-template-columns: 150px 1fr 265px;
  column-gap: 35px;
  @media screen and (max-width: 1023.98px) {
    grid-template-columns: 150px 1fr;
    column-gap: 20px;
    .right {
      grid-row: 2/3;
      grid-column: 1/3;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      column-gap: 20px;
      margin-right: unset;
    }
  }
  @media screen and (max-width: 767.98px) {
    grid-template-columns: 1fr;
    column-gap: unset;
    .left {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-column: 1/2;
      grid-row: 2/3;
      border: unset;
      .rating {
        margin-top: unset;
      }
      .runtime {
        margin-bottom: unset;
      }
    }
    .middle {
      display: block;
      padding-right: unset;
      margin-top: -10px;
      grid-column: 1/2;
      grid-row: 1/2;
    }
    .right {
      margin-top: -20px;
      display: block;
      grid-row: 3/4;
      column-gap: unset;
      row-gap: 20px;
    }
  }

  .rings {
    display: flex;
    flex-direction: row;
  }

  .percent1,
  .cirle-percent,
  .circle {
    width: 100%;
    /* height: 200px; */
  }

  .circle {
    position: absolute;
    fill: none;
    stroke-width: 4;
    transform: translate(10px, 10px);
    stroke-dasharray: 220;
    stroke-linecap: round;
  }

  .circle:nth-child(1) {
    stroke-dashoffset: 0;
    stroke: #424242;
  }

  .percent1 .circle:nth-child(2) {
    stroke-dashoffset: calc(220 - (220 * ${(props) => props.percent}) / 10);
    stroke: #6680c0;
    animation: percent 1.5s linear;
    animation-delay: 1s;
  }

  .number {
    color: #fff;
  }

  .percent1 span {
    color: #6680c0;
  }

  @keyframes percent {
    0% {
      stroke-dashoffset: 0;
      stroke-width: 0;
    }
  }
  .comment:not(:last-child) {
    border-bottom: 1px solid #525252;
    padding-bottom: 20px;
    margin-bottom: 20px;
  }
  .comment-list {
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
  .middle {
    border: none;
  }
  .trailer-title {
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;
    max-width: 100%;
    white-space: pre-wrap;
    word-break: break-all;
  }
  /* text-white transition-all -translate-y-3 border-b-2 border-blueLight */
  .is-active-detail {
    color: white;
    transform: translateY(-12px);
    border-bottom: 2px solid ${(props) => props.theme.blueLight};
  }
`;
const MovieDetail = ({ movie }) => {
  const [overall, setOverall] = useState(false);
  const [review, setReview] = useState(true);
  const [cast, setCast] = useState(true);
  // const btnDetail = document.querySelectorAll(".btn-detail");
  // [...btnDetail].forEach((item) => item.addEventListener("click", handleClick));
  // const handleClick = () => {
  //   console.log("hihi");
  // };
  const nodeRef = useRef();
  var btnOverall = document?.querySelector(".btn-overall");
  var btnCast = document?.querySelector(".btn-cast");
  var btnReview = document?.querySelector(".btn-review");
  const handleClickOverall = (e) => {
    e.target.classList.add("is-active-detail");
    btnCast?.classList.remove("is-active-detail");
    btnReview?.classList.remove("is-active-detail");
    setOverall(false);
    setCast(true);
    setReview(true);
  };
  const handleClickCast = (e) => {
    btnOverall?.classList.remove("is-active-detail");
    e.target.classList.add("is-active-detail");
    btnReview?.classList.remove("is-active-detail");
    nodeRef.current.classList.remove("is-active-detail");
    setOverall(true);
    setCast(false);
    setReview(true);
  };
  const handleClickReview = (e) => {
    btnOverall?.classList.remove("is-active-detail");
    btnCast?.classList.remove("is-active-detail");
    e.target.classList.add("is-active-detail");
    nodeRef.current.classList.remove("is-active-detail");
    setOverall(true);
    setCast(true);
    setReview(false);
  };
  if (!movie) return;
  return (
    <div>
      <MovieDetailStyle className="movie-detail" percent={movie.vote_average}>
        <div className="border-r border-neutral-700 left">
          <div className="rating mt-[150px]">
            <h2 className="mb-5 text-2xl font-semibold text-center text-white">
              Rating
            </h2>
            <div className="rings">
              <div className="relative -translate-x-1/3 percent1 left-1/2">
                <svg className="cirle-percent">
                  <circle className="circle" cx="35" cy="35" r="35"></circle>
                  <circle className="circle" cx="35" cy="35" r="35"></circle>
                </svg>
                <div className="absolute w-[75px] h-[75px] top-[10px] left-[10px] number flex items-center justify-center">
                  <h2 className="number-percent">
                    {movie?.vote_average?.toFixed(1)}
                  </h2>
                </div>
              </div>
            </div>
          </div>
          <div className="mb-10 text-center runtime">
            <h2 className="mb-4 text-2xl font-semibold text-white">
              {movie.name ? "Ep runtime" : "Runtime"}
            </h2>
            <span className="inline-block mt-2 text-xl tracking-wide">
              {movie?.runtime || movie?.last_episode_to_air?.runtime || 0} min
            </span>
          </div>
        </div>
        <div className="border-r border-neutral-700 middle pr-[30px]">
          <div className="flex justify-center mt-10 text-lg transition-all gap-x-10">
            <button
              className="tracking-wide transition-all is-active-detail btn-overall"
              onClick={handleClickOverall}
              ref={nodeRef}
            >
              Overall
            </button>
            <button
              className="tracking-wide transition-all btn-cast"
              onClick={handleClickCast}
            >
              Cast
            </button>
            <button
              className="tracking-wide transition-all btn-review"
              onClick={handleClickReview}
            >
              Reviews
            </button>
          </div>
          <OverallDetail hide={overall} movie={movie}></OverallDetail>
          <CastDetail
            hide={cast}
            movie={movie}
            category={movie.runtime || movie.episode_run_time || 0}
          ></CastDetail>
          <ReviewsDetail
            hide={review}
            movie={movie}
            category={movie.runtime || movie.episode_run_time}
          ></ReviewsDetail>
        </div>
        <MediaDetail
          className="right"
          movie={movie}
          category={movie.runtime || movie.episode_run_time}
        ></MediaDetail>
      </MovieDetailStyle>
      {/* <MediaDetail
        className="right-ipad"
        movie={movie}
        category={movie.runtime || movie.episode_run_time}
      ></MediaDetail> */}
    </div>
  );
};

export default MovieDetail;
