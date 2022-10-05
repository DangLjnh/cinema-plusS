import Button from "components/button/Button";
import React from "react";
import { v4 } from "uuid";
import styled from "styled-components";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setGenres, setGenresName } from "redux/movieSlice";
import BannerDetailSkeleton from "components/loading/BannerDetailSkeleton";
const BannerDetailStyle = styled.div`
  .btn-watch {
    background-image: linear-gradient(to right, #9841f4, #5ba8ff);
    /* bottom-10 right-[5%] */
    bottom: 40px;
    right: 5%;
    &:hover {
      opacity: 0.85;
    }
  }
  .heart {
    transition: all 0.2s linear;
    &:hover {
      border: 3px solid #6680c0;
      path {
        transition: all 0.25s linear;
        stroke: #6680c0;
      }
    }
  }
  @media screen and (max-width: 1023.98px) {
    .banner-content {
      left: 35%;
      max-width: 450px;
    }
    .btn-watch {
      /* bottom-10 right-[5%] */
      bottom: unset;
      top: 40px;
      right: 15%;
      padding-left: 28px;
      padding-right: 28px;
      padding-top: 10px;
      padding-bottom: 10px;
      font-size: 16px;
    }
    .banner-detail-title {
      font-size: 35px;
    }
    .categories {
      .categories-item {
        /* px-5 py-[6px] text-base rounded-md font-normal */
        padding-left: 12px;
        padding-right: 12px;
        padding-top: 4px;
        padding-bottom: 4px;
        font-size: 14px;
      }
    }
  }
  @media screen and (max-width: 767.98px) {
    .banner-detail-img {
      height: 350px;
    }
    .banner-content {
      display: none;
      /* position: relative; */
    }
    .btn-watch {
      top: unset;
      bottom: 5px;
      right: 3%;
      /* bottom-10 right-[5%] */
      padding-left: 25px;
      padding-right: 25px;
      padding-top: 10px;
      padding-bottom: 10px;
      font-size: 14px;
    }
  }
`;
const BannerDetail = ({ movie }) => {
  const genres = movie?.genres;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <div>
      {!movie && <BannerDetailSkeleton></BannerDetailSkeleton>}
      {movie && (
        <BannerDetailStyle className="relative">
          <div className="absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.6)] to-[rgba(0,0,0,0.4)] rounded-b-lg"></div>
          <div className="banner">
            <img
              src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
              alt=""
              className="h-[400px] w-full object-cover banner-detail-img rounded-b-lg"
            />
            <div className="banner-content text-white absolute bottom-5 left-[25%] max-w-[600px]">
              <h2 className="font-bold text-[42px] banner-detail-title">
                {movie.title || movie.name}
              </h2>
              <div className="categories max-w-[600px] flex flex-wrap gap-3 text-sm my-[20px]">
                {genres?.length > 0 &&
                  genres.map((genre) => {
                    return (
                      <NavLink
                        to={
                          movie.title
                            ? `/discovery/movie?genre=${genre.id}`
                            : `/discovery/tvshow?genre=${genre.id}`
                        }
                        key={v4()}
                      >
                        <Button
                          className="px-5 py-[6px] text-base rounded-md font-normal cursor-pointer categories-item"
                          key={v4()}
                          onClick={(e) => {
                            dispatch(setGenres(genre.id));
                            dispatch(setGenresName(genre.name));
                          }}
                        >
                          {genre.name}
                        </Button>
                      </NavLink>
                    );
                  })}
              </div>
            </div>
            <Button
              className="whitespace-nowrap absolute text-white px-8 py-3 rounded-full text-[18px] btn-watch"
              onClick={() =>
                navigate(
                  movie.title
                    ? `../../movie/${movie.id}/watch`
                    : `../../tvshow/${movie.id}/watch`
                )
              }
            >
              Watch now
            </Button>
          </div>
          <img
            src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
            alt=""
            className="h-[280px] w-[180px] object-cover absolute -bottom-[20%] left-[5%] rounded-lg"
          />
          <div className="icon absolute right-[5.5%] top-[10%] cursor-pointer">
            <svg
              width="50"
              height="50"
              viewBox="0 0 24 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="border-[3px] border-white rounded-full p-[10px] heart"
            >
              <path
                d="M7.6 1C9.29038 1 10.8323 1.84142 12 2.8C13.1677 1.84142 14.7096 1 16.4 1C20.0451 1 23 3.71049 23 7.05386C23 13.795 15.3274 17.721 12.7981 18.8321C12.2886 19.056 11.7114 19.056 11.2019 18.8321C8.67259 17.721 1 13.7948 1 7.0537C1 3.71033 3.95492 1 7.6 1Z"
                stroke="white"
                strokeWidth="2"
              />
            </svg>
          </div>
        </BannerDetailStyle>
      )}
      <div className="text-white mt-[95px] title-detail-phone">
        <h2 className="font-bold text-[35px]">{movie.title || movie.name}</h2>
        <div className="categories flex flex-wrap gap-3 text-sm my-[20px]">
          {genres?.length > 0 &&
            genres.map((genre) => {
              return (
                <NavLink
                  to={
                    movie.title
                      ? `/discovery/movie?genre=${genre.id}`
                      : `/discovery/tvshow?genre=${genre.id}`
                  }
                  key={v4()}
                >
                  <Button
                    className="px-5 py-[6px] text-base rounded-md font-normal cursor-pointer categories-item"
                    key={v4()}
                    onClick={(e) => {
                      dispatch(setGenres(genre.id));
                    }}
                  >
                    {genre.name}
                  </Button>
                </NavLink>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default BannerDetail;
