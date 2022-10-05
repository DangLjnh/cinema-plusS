import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { v4 } from "uuid";
import useSWR from "swr";
import { fetcher, tmdbAPI } from "config/config";
import Button from "components/button/Button";
import { setGenres, setGenresName } from "redux/movieSlice";
import { NavLink, useNavigate } from "react-router-dom";
const CategoriesStyle = styled.div`
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
  .active-category {
    background-color: #525252;
  }
`;
// const results = [];
// results.push(genre.id);
// const genge = results.join("&with_genres=");
// var genreList = results.join("&genre=");
const Categories = ({ category, className }) => {
  const { data, error } = useSWR(
    category === tmdbAPI ? category.getMovieListGenre : category.getTvListGenre,
    fetcher
  );
  const dispatch = useDispatch();
  const genres = data?.genres || [];
  // useEffect(() => {
  //   setLoading(false);
  // }, []);
  return (
    <>
      {!data && (
        <div className="min-h-[130px] max-w-[250px] flex items-center justify-center relative">
          <div className="loader">
            <div className="inner one"></div>
            <div className="inner two"></div>
            <div className="inner three"></div>
          </div>
        </div>
      )}
      {data && (
        <CategoriesStyle
          className={`max-w-[250px] categories flex flex-wrap gap-2 text-sm max-h-[130px] overflow-y-auto ${className}`}
        >
          {genres?.length > 0 &&
            genres.map((genre) => {
              return (
                <NavLink
                  key={v4()}
                  to={
                    category === tmdbAPI
                      ? `/discovery/movie?genre=${genre.id}`
                      : `/discovery/tvshow?genre=${genre.id}`
                  }
                >
                  <Button
                    bgColor={"grayDark"}
                    className="px-4 py-[8px] !font-normal text-white rounded-full bg-neutral-700 hover:bg-neutral-600"
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
        </CategoriesStyle>
      )}
    </>
  );
};

export default Categories;
