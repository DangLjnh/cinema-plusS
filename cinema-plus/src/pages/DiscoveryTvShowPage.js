import Section from "components/section/Section";
import { tvAPI } from "config/config";
import SidebarDiscovery from "modules/SidebarDiscovery";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setGenres,
  setGenresName,
  setNextPage,
  setOption,
  setQueryNow,
  setQueryTv,
  setRuntimeFrom,
  setRuntimeTo,
  setSearch,
  setSortBy,
} from "redux/movieSlice";

const DiscoveryTvShowPage = () => {
  const dispatch = useDispatch();
  const { genres } = useSelector((state) => state.news);
  useEffect(() => {
    dispatch(setQueryNow("upcoming"));
    dispatch(setQueryTv("on_the_air"));
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
        dispatch(setRuntimeFrom("0"));
        dispatch(setRuntimeTo("200"));
        dispatch(setGenres(""));
        dispatch(setGenresName(""));
      }
    });
    document.title = `Discovery Tv | Cinema Plus`;
  }, [dispatch, genres]);
  return (
    <div>
      <Section bestFit="on_the_air" tvAPI={tvAPI}></Section>
    </div>
  );
};

export default DiscoveryTvShowPage;
