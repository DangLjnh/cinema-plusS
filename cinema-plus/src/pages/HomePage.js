import Header from "layout/Header";
import Sidebar from "modules/Sidebar";
import React, { useEffect } from "react";
import { v4 } from "uuid";
import styled from "styled-components";
import Banner from "components/banner/Banner";
import { Swiper, SwiperSlide } from "swiper/react";
import MovieList from "components/movie/MovieList";
import Section from "components/section/Section";
import SidebarHome from "modules/SidebarHome";
import { fetcher, tmdbAPI } from "config/config";
import { useDispatch, useSelector } from "react-redux";
import { setSearch, setTrailer } from "redux/movieSlice";
import Trailer from "components/modal/Trailer";
import useSWR from "swr";
const HomePageStyle = styled.div`
  /* display: grid;
  grid-template-columns: minmax(0, 1fr) 250px; */
`;

const Homepage = () => {
  const dispatch = useDispatch();
  const { trailer } = useSelector((state, action) => state.news);
  useEffect(() => {
    dispatch(setSearch(""));
    // dispatch(setTrailer(false));
    document.title = `Movie | Cinema Plus`;
    window.scroll(0, 0);
    if (trailer) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [dispatch, trailer]);
  return (
    <HomePageStyle>
      <SidebarHome type="upcoming" tmdbAPI={tmdbAPI}></SidebarHome>
      <Banner type="now_playing" tmdbAPI={tmdbAPI}></Banner>
      <Section nowPlaying="now_playing" tmdbAPI={tmdbAPI}></Section>
      <Section upcoming="upcoming" tmdbAPI={tmdbAPI}></Section>
      <Section popular="popular" tmdbAPI={tmdbAPI}></Section>
      <Section topRated="top_rated" tmdbAPI={tmdbAPI}></Section>
      {/* <Trailer category={tmdbAPI}></Trailer> */}
      {trailer === true && <Trailer category={tmdbAPI}></Trailer>}
    </HomePageStyle>
  );
};

export default Homepage;
