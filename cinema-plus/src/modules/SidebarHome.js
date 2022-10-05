import Button from "components/button/Button";
import Categories from "components/categories/Categories";
import MovieListSidebar from "components/movie/MovieListSidebar";
import Search from "components/search/Search";
import { fetcher, tmdbAPI } from "config/config";
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import useSWR from "swr";
import { v4 } from "uuid";
const SidebarHomeStyle = styled.div`
  margin-top: -77px;
  @media screen and (max-width: 1023.98px) {
    display: none;
  }
  .upcoming {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    width: 100%;
    max-width: 100%;
    white-space: pre-wrap;
    word-break: break-all;
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
`;

const SidebarHome = ({ type, tmdbAPI, tvAPI }) => {
  const navigate = useNavigate();
  return (
    <SidebarHomeStyle className="fixed w-[250px] right-[10px] z-[100]">
      <Search className={"mb-7"}></Search>
      <Categories category={tmdbAPI || tvAPI}></Categories>
      <MovieListSidebar
        type={type}
        category={tmdbAPI || tvAPI}
      ></MovieListSidebar>
      <Button
        onClick={() =>
          navigate(`${tmdbAPI ? "/discovery/movie" : "/discovery/tvshow"}`)
        }
        full
        bgColor={"grayDark"}
        className="px-6 py-3 mt-5 font-normal text-white rounded-full bg-neutral-700 hover:bg-neutral-600"
      >
        See more
      </Button>
    </SidebarHomeStyle>
  );
};

export default SidebarHome;
