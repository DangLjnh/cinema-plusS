import React from "react";
import BannerItem from "./BannerItem";
import { SwiperSlide, Swiper, useSwiper } from "swiper/react";
import { Pagination } from "swiper";
import SwiperCore, { Autoplay } from "swiper";
import "swiper/scss";
import "swiper/scss/pagination";
import "swiper/scss/autoplay";
import styled from "styled-components";
import { v4 } from "uuid";
import { fetcher } from "config/config";
import useSWR from "swr";
import BannerSkeleton from "components/loading/BannerSkeleton";
const BannerStyle = styled.div`
  position: relative;
  .banner {
    display: grid;
    grid-template-columns: unset;
    grid-auto-flow: column;
    grid-auto-columns: 78%;
    overflow-x: hidden;
    scroll-snap-type: x mandatory;
    scroll-snap-stop: always;
  }
  @media screen and (max-width: 767.98px) {
    .banner {
      display: grid;
      grid-template-columns: unset;
      grid-auto-flow: column;
      grid-auto-columns: 100%;
      overflow-x: hidden;
      scroll-snap-type: x mandatory;
      scroll-snap-stop: always;
    }
  }
`;
function SlideNextButton() {
  const swiper = useSwiper();
  return (
    <button
      className="z-10 p-5 text-white btn-next"
      onClick={() => swiper.slideNext()}
    >
      <svg
        width="8"
        height="14"
        viewBox="0 0 8 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1 1L7 7L1 13"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
function SlidePrevButton() {
  const swiper = useSwiper();
  return (
    <button
      className="z-10 p-5 text-white btn-next"
      onClick={() => swiper.slidePrev()}
    >
      <svg
        width="8"
        height="14"
        viewBox="0 0 8 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7 13L1 7L7 1"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
const Banner = ({ type, tmdbAPI, tvAPI }) => {
  const { data, error } = useSWR(
    tmdbAPI ? tmdbAPI.getMovieList(type) : tvAPI.getTvList(type),
    fetcher
  );
  SwiperCore.use([Autoplay]);
  const movies = data?.results || [];
  return (
    <BannerStyle>
      {!data && <BannerSkeleton></BannerSkeleton>}
      <Swiper
        grabCursor={true}
        slidesPerView={"auto"}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        className="mb-10 banner"
      >
        {data &&
          movies?.length > 0 &&
          movies.map((item, index) => {
            if (index === 19) {
              return (
                <SwiperSlide key={v4()}>
                  <BannerItem
                    movie={item}
                    key={v4()}
                    last
                    category={tmdbAPI || tvAPI}
                  ></BannerItem>
                </SwiperSlide>
              );
            } else {
              return (
                <SwiperSlide key={v4()}>
                  <BannerItem
                    movie={item}
                    key={v4()}
                    category={tmdbAPI || tvAPI}
                  ></BannerItem>
                </SwiperSlide>
              );
            }
          })}
        <div className="absolute top-0 z-[100]">
          <SlidePrevButton></SlidePrevButton>
          <SlideNextButton></SlideNextButton>
        </div>
      </Swiper>
    </BannerStyle>
  );
};

export default Banner;
