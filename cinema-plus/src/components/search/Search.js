import { fetcher, tmdbAPI } from "config/config";
import useDebounce from "hooks/useDebounce";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  handleFetchSearchMovie,
  handleFetchSearchMovieTotal,
} from "redux/handler";
import { setSearch, setSearchOption } from "redux/movieSlice";
import useSWR from "swr";
import { v4 } from "uuid";
import styled from "styled-components";
import { withErrorBoundary } from "react-error-boundary";
const SearchStyle = styled.form`
  input {
    ::placeholder {
      color: #525252;
    }
  }
`;
const Search = ({ className }) => {
  const navigate = useNavigate();
  const [key, setKey] = useState("");
  const { search, searchOption, nextPage } = useSelector(
    (state, action) => state.news
  );
  const dispatch = useDispatch();
  const debounce = useDebounce(search, 800);
  const debounceKey = useDebounce(key, 200);
  const { data, error } = useSWR(
    debounceKey && tmdbAPI?.searchKeyWord(String(debounceKey)),
    fetcher
  );
  useEffect(() => {
    if (debounce) {
      dispatch(
        handleFetchSearchMovie({
          category: searchOption,
          query: debounce,
          page: nextPage,
        })
      );
      dispatch(
        handleFetchSearchMovieTotal({ category: searchOption, query: debounce })
      );
    }
  }, [dispatch, search, searchOption, debounce, nextPage]);
  const hanldeSearch = (e) => {
    document.querySelector(".search-key-list").classList.remove("hidden");
    String(setKey(e.target.value));
  };
  const handleSubmit = (e) => {
    dispatch(setSearch(key));
    e.preventDefault();
    dispatch(setSearchOption("multi"));
    navigate("/search");
    setKey("");
  };
  const handleSearchKey = (e) => {
    dispatch(setSearchOption("multi"));
    dispatch(setSearch(e.target.textContent));
    navigate("/search");
    document.querySelector(".search-key-list").classList.add("hidden");
  };
  const searchKeyList = data?.results?.slice(0, 5) || [];
  return (
    <SearchStyle
      onSubmit={handleSubmit}
      className={`relative w-full ${className}`}
    >
      <div
        className={`flex items-center gap-x-3 border border-grayText rounded-full py-3 px-3 w-full`}
      >
        <span className="flex-shrink-0 text-gray-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </span>
        <input
          type="text"
          className="w-full text-sm text-white bg-transparent outline-none placeholder:text-sm"
          placeholder="Search..."
          // value={search}
          onChange={hanldeSearch}
        />
        {/* <input type="submit" value="submit" className="bg-slate-300" /> */}
      </div>
      <div className="absolute bg-neutral-700 w-full rounded-lg mt-4 search-key-list">
        {searchKeyList.length > 0 &&
          searchKeyList.map((item) => {
            return (
              <div
                className="flex items-center w-full gap-5 px-5 py-3 rounded-lg cursor-pointer hover:bg-neutral-600"
                onClick={handleSearchKey}
                key={v4()}
              >
                <span className="flex-shrink-0 text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </span>
                <h2 className="text-white">{item.name}</h2>
              </div>
            );
          })}
      </div>
    </SearchStyle>
  );
};
function FallbackComponent() {
  return (
    <div className="text-xl font-bold text-center text-red-400 bg-red-50">
      Something went wrong with components Search
    </div>
  );
}

export default withErrorBoundary(Search, {
  FallbackComponent,
});
