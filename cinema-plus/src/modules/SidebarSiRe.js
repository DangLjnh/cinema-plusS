import Button from "components/button/Button";
import MovieListSidebarDetail from "components/movie/MovieListSidebarDetail";
import Search from "components/search/Search";
import { fetcher, tmdbAPI, tvAPI } from "config/config";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { v4 } from "uuid";
import styled from "styled-components";
import useSWR from "swr";
const SidebarSiReStyle = styled.div`
  @media screen and (max-width: 1023px) {
    display: none;
  }
`;
const SidebarSiRe = ({ category, page }) => {
  const navigate = useNavigate();
  return (
    <SidebarSiReStyle className="fixed w-[250px] right-[20px] z-[1001] mt-5">
      <Search className={"mb-7"}></Search>
      <MovieListSidebarDetail
        page={page}
        category={category}
      ></MovieListSidebarDetail>
      <Button
        onClick={() =>
          navigate(
            `${category === tmdbAPI ? "/discovery/movie" : "/discovery/tvshow"}`
          )
        }
        full
        bgColor={"grayDark"}
        className="px-6 py-3 mt-5 font-normal text-white rounded-full hover:bg-neutral-600 bg-neutral-700"
      >
        See more
      </Button>
    </SidebarSiReStyle>
  );
};

export default SidebarSiRe;
