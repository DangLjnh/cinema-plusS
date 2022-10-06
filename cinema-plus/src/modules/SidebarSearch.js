import LayoutSF from "components/LayoutSF";
import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { withErrorBoundary } from "react-error-boundary";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { setSearchOption } from "redux/movieSlice";
import styled from "styled-components";
import { v4 } from "uuid";
const SidebarSearchStyle = styled.div`
  .active-search-option {
    background-color: #525252;
  }
  @media screen and (max-width: 1023.98px) {
    position: relative;
    /* margin-top: 10px;
    margin-bottom: 10px; */
    width: 80%;
    margin-left: auto;
    margin-right: auto;
    /* display: none; */
    .sort {
      margin-top: 0;
    }
  }
  @media screen and (max-width: 767.98px) {
    width: 100%;
    margin-left: 8px;
  }
`;
const listSidebarSearch = [
  {
    title: "All",
    dataName: "multi",
  },
  {
    title: "Movie",
    dataName: "movie",
  },
  {
    title: "Tv show",
    dataName: "tv",
  },
];
const SidebarSearch = ({ className }) => {
  const { search } = useSelector((state, action) => state.news);
  const dispatch = useDispatch();
  const [all, setAll] = useState(true);
  const [movie, setMovie] = useState(false);
  const [tv, setTV] = useState(false);
  const [cast, setCast] = useState(false);
  useEffect(() => {
    if (search) {
      setAll(true);
      setMovie(false);
      setTV(false);
      setCast(false);
    }
  }, [search]);

  const handleSearchOptionAll = (e) => {
    dispatch(setSearchOption(e.target.dataset.name));
    setAll(true);
    setMovie(false);
    setTV(false);
    setCast(false);
  };
  const handleSearchOptionMovie = (e) => {
    dispatch(setSearchOption(e.target.dataset.name));
    setAll(false);
    setMovie(true);
    setTV(false);
    setCast(false);
  };
  const handleSearchOptionTv = (e) => {
    dispatch(setSearchOption(e.target.dataset.name));
    setAll(false);
    setMovie(false);
    setTV(true);
    setCast(false);
  };
  const handleSearchOptionCast = (e) => {
    dispatch(setSearchOption(e.target.dataset.name));
    setAll(false);
    setMovie(false);
    setTV(false);
    setCast(true);
  };
  return (
    <SidebarSearchStyle className="fixed w-[250px] right-[20px] z-[2]">
      <LayoutSF title="Search results" name="">
        <div className="mt-[-10px]">
          <div
            className={`px-2 py-2 mb-4 text-center rounded-md cursor-pointer dropdown-option hover:bg-neutral-600 ${
              all && "active-search-option"
            }`}
            onClick={handleSearchOptionAll}
            data-name="multi"
            key={v4()}
          >
            All
          </div>
          <div
            className={`px-2 py-2 mb-4 text-center rounded-md cursor-pointer dropdown-option hover:bg-neutral-600 ${
              movie && "active-search-option"
            }`}
            onClick={handleSearchOptionMovie}
            data-name="movie"
            key={v4()}
          >
            Movie
          </div>
          <div
            className={`px-2 py-2 mb-4 text-center rounded-md cursor-pointer dropdown-option hover:bg-neutral-600 ${
              tv && "active-search-option"
            }`}
            onClick={handleSearchOptionTv}
            data-name="tv"
            key={v4()}
          >
            Tv show
          </div>
          <div
            className={`px-2 py-2 mb-4 text-center rounded-md cursor-pointer dropdown-option hover:bg-neutral-600 ${
              cast && "active-search-option"
            }`}
            onClick={handleSearchOptionCast}
            data-name="person"
            key={v4()}
          >
            Cast
          </div>
        </div>
      </LayoutSF>
    </SidebarSearchStyle>
  );
};
function FallbackComponent() {
  return (
    <div className="text-xl font-bold text-center text-red-400 bg-red-50">
      Something went wrong with components MovieListSearch
    </div>
  );
}

export default withErrorBoundary(SidebarSearch, {
  FallbackComponent,
});
