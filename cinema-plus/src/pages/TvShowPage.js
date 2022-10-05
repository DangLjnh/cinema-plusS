import Banner from "components/banner/Banner";
import Trailer from "components/modal/Trailer";
import Section from "components/section/Section";
import { tvAPI } from "config/config";
import SidebarHome from "modules/SidebarHome";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearch, setTrailer } from "redux/movieSlice";
const TvShow = () => {
  const dispatch = useDispatch();
  const { trailer } = useSelector((state, action) => state.news);
  useEffect(() => {
    dispatch(setSearch(""));
    dispatch(setTrailer(false));
    document.title = `Tv | Cinema Plus`;
  }, [dispatch]);
  return (
    <div>
      <SidebarHome type="popular" tvAPI={tvAPI}></SidebarHome>
      <Banner type="popular" tvAPI={tvAPI}></Banner>
      <Section airingToday="airing_today" tvAPI={tvAPI}></Section>
      <Section onTheAir="on_the_air" tvAPI={tvAPI}></Section>
      <Section popular="popular" tvAPI={tvAPI}></Section>
      <Section topRated="top_rated" tvAPI={tvAPI}></Section>
      {trailer && <Trailer category={tvAPI}></Trailer>}
    </div>
  );
};

export default TvShow;
