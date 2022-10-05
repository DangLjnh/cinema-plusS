import React, { useEffect } from "react";
import Section from "components/section/Section";
import SidebarDiscovery from "modules/SidebarDiscovery";
import { tmdbAPI } from "config/config";
import { useDispatch, useSelector } from "react-redux";
import {
  setDateFrom,
  setDateTo,
  setGenres,
  setGenresName,
  setNextPage,
  setOption,
  setQueryNow,
  setQueryTv,
  setRuntimeFrom,
  setRuntimeTo,
  setSearch,
  setSearchOption,
  setSortBy,
} from "redux/movieSlice";
const DiscoveryPage = () => {
  const dispatch = useDispatch();
  const { genres, currentDate } = useSelector((state) => state.news);
  useEffect(() => {
    dispatch(setQueryNow("upcoming"));
    dispatch(setQueryTv("on_the_air"));
    // dispatch(setSearchOption("multi"));
    // dispatch(setSortBy(""));
    dispatch(setNextPage(1));
    dispatch(setOption(""));
    dispatch(setSearch(""));
    dispatch(setSortBy(""));
    if (genres) dispatch(setOption("Most popular"));
    document.addEventListener("click", (e) => {
      if (
        e.target.matches(".direction-name") ||
        e.target.matches(".sidebar-item-title")
      ) {
        dispatch(setGenres(""));
        dispatch(setRuntimeTo("200"));
        dispatch(setRuntimeFrom("0"));
        dispatch(setDateFrom("2002-11-04"));
        dispatch(setDateTo(currentDate));
        dispatch(setGenresName(""));
      }
    });
    document.title = `Discovery Movie | Cinema Plus`;
    window.scroll(0, 0);
  }, [dispatch, genres, currentDate]);
  return (
    <div>
      <Section bestFit="upcoming" tmdbAPI={tmdbAPI}></Section>
    </div>
  );
};

export default DiscoveryPage;
