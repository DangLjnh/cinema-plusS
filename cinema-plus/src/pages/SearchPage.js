import MovieList from "components/movie/MovieList";
import MovieListDiscovery from "components/movie/MovieListDiscovery";
import MovieSearch from "components/movie/MovieSearch";
import Search from "components/search/Search";
import Section from "components/section/Section";
import { tmdbAPI } from "config/config";
import SidebarSearch from "modules/SidebarSearch";
import React, { useEffect } from "react";
import { withErrorBoundary } from "react-error-boundary";
import { useDispatch } from "react-redux";
import {
  setNextPage,
  setOption,
  setSearchOption,
  setSortBy,
} from "redux/movieSlice";
import styled from "styled-components";
const SearchPageStyle = styled.div`
  .search-page {
    width: 40%;
  }
  @media screen and (max-width: 1023.98px) {
    .search-page {
      width: 70%;
      margin-top: 20px;
    }
  }
  @media screen and (max-width: 767.98px) {
    .search-page {
      width: 100%;
    }
  }
`;
const SearchPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setSearchOption("multi"));
    dispatch(setSortBy(""));
    dispatch(setNextPage(1));
    document.title = `Search | Cinema Plus`;
    window.scroll(0, 0);
  }, [dispatch]);
  return (
    <SearchPageStyle>
      <SidebarSearch></SidebarSearch>
      <Search className="mx-auto mb-6 search-page"></Search>
      <MovieSearch></MovieSearch>
    </SearchPageStyle>
  );
};

function FallbackComponent() {
  return (
    <div className="text-xl font-bold text-center text-red-400 bg-red-50">
      Something went wrong with components SearchPage
    </div>
  );
}

export default withErrorBoundary(SearchPage, {
  FallbackComponent,
});
