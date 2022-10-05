import Categories from "components/categories/Categories";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleFetchListGenre, handleFetchMovie } from "redux/handler";
// import { handleFetchListGenre } from "redux/handler";
import styled from "styled-components";
import { v4 } from "uuid";
import useSWR from "swr";
import { fetcher, tmdbAPI, tvAPI } from "config/config";
import Button from "components/button/Button";
import { NavLink, useNavigate } from "react-router-dom";
import {
  setGenres,
  setGenresName,
  setTrailer,
  setTrailerID,
} from "redux/movieSlice";
const BannerItemStyle = styled.div`
  .banner-desc {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;
    max-width: 100%;
    white-space: pre-wrap;
    word-break: break-all;
  }
  .categories-item {
    background: rgba(255, 255, 255, 0.3);
    &:hover {
      background: rgba(255, 255, 255, 0.2);
    }
  }
  .buttonTrans {
    background: rgba(255, 255, 255, 0.4);
    &:hover {
      background: rgba(255, 255, 255, 0.3);
    }
  }
  @media screen and (max-width: 1023.98px) {
    .button-container {
      column-gap: 15px;
      .button-navigate {
        padding-top: 10px /* 12px */;
        padding-bottom: 10px /* 12px */;
      }
    }
    .bannter-title {
      font-size: 26px;
    }
    /* .banner-desc {
      display: none;
    } */
    .categories,
    span {
      /* padding: 3px 5px; */
      font-size: 12px;
      /* margin-top: 10px;
      margin-bottom: 10px; */
    }
  }
  @media screen and (max-width: 767.98px) {
    width: 100%;
    .button-container {
      column-gap: 10px;
    }
    .bannter-title {
      font-size: 24px;
    }
    /* .banner-desc {
      display: none;
    } */
    .banner-small-image {
      display: none;
    }
  }
`;
const BannerItem = ({ movie, last, category }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, error } = useSWR(
    category === tmdbAPI ? category.getMovieListGenre : category.getTvListGenre,
    fetcher
  );
  const genres = data?.genres || [];
  if (genres.length > 0) {
    const genreIDs = genres;
    const genreID = movie.genre_ids;
    const result1 = genreIDs.reduce((a, b) => {
      a[b.id] = b.name;
      return a;
    }, {});
    var results = genreID.map((item) => {
      return { id: item, name: result1[item] };
    });
  }
  const handleClickCategory = (item) => {
    dispatch(setGenres(item.id));
    dispatch(setGenresName(item.name));
    if (category === tmdbAPI) navigate(`/discovery/movie?genre=${item.id}`);
    if (category === tvAPI) navigate(`/discovery/tvshow?genre=${item.id}`);
  };
  if (!movie) return null;
  return (
    <BannerItemStyle
      className={`h-[400px] relative rounded-lg ${
        last ? "w-[100%]" : "w-[95%]"
      }`}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.9)] to-[rgba(0,0,0,0.4)] rounded-lg"></div>
      <img
        src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
        alt=""
        className="object-cover w-full h-full rounded-lg"
      />
      <div className="banner-content absolute w-[80%] justify-center text-white -translate-y-1/2 top-1/2 left-[3%]">
        <div className="flex items-center gap-x-[7%]">
          <img
            src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
            alt=""
            onClick={() =>
              navigate(
                `${
                  category === tmdbAPI
                    ? `movie/${movie.id}`
                    : `../tvshow/${movie.id}`
                }`
              )
            }
            className="w-[30%] h-[335px] rounded-lg flex-shrink-0 object-cover cursor-pointer banner-small-image"
          />
          <div className="">
            <h2 className="text-3xl font-bold bannter-title">
              {movie.title || movie.name}
            </h2>
            <span className="text-sm my-[10px] inline-block">
              {movie.release_date || movie.first_air_date}
            </span>
            <p className="banner-desc max-w-[400px]">{movie.overview}</p>
            <div className="categories max-w-[250] flex flex-wrap gap-3 text-sm my-[20px]">
              {results?.length > 0 &&
                results.map((item) => {
                  return (
                    <span
                      className="px-4 py-[6px] rounded-md font-normal cursor-pointer categories-item"
                      key={v4()}
                      onClick={() => handleClickCategory(item)}
                      // to={handleTo(item)}
                    >
                      {item.name}
                    </span>
                  );
                })}
            </div>
            <div className="flex gap-x-5 button-container">
              <Button
                full
                onClick={() => {
                  dispatch(setTrailer(true));
                  dispatch(setTrailerID(movie.id));
                }}
                className="mt-auto buttonTrans button-navigate"
              >
                Trailer
              </Button>
              <Button
                onClick={() =>
                  navigate(
                    `${
                      category === tmdbAPI
                        ? `movie/${movie.id}`
                        : `../tvshow/${movie.id}`
                    }`
                  )
                }
                full
                className="whitespace-nowrap button-navigate hover:opacity-80"
              ></Button>
            </div>
          </div>
        </div>
      </div>
    </BannerItemStyle>
  );
};

export default BannerItem;
