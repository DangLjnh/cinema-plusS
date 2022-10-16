import BackgroundSignInOut from "components/background/BackgroundSignInOut";
import { fetcher, tmdbAPI } from "config/config";
import React from "react";
import styled from "styled-components";
import useSWR from "swr";

const BlogBannerStyle = styled.div``;
const BlogBanner = ({ className }) => {
  const { data, error } = useSWR(tmdbAPI.getTrendingAll, fetcher);
  if (!data) return;
  const { results } = data;
  if (!results) return;
  const filmTrending = results?.slice(0, 1);
  return (
    <BlogBannerStyle
      className={`min-h-[480px] relative -mx-[100px] ${className}`}
    >
      <BackgroundSignInOut></BackgroundSignInOut>
      <div className="absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.7)] to-[rgba(0,0,0,0.5)]"></div>
      <div className="absolute inset-0 z-10 h-[30%] top-1/2 -translate-y-1/2 bg-gradient-to-t from-[rgba(255,255,255,0.4)] to-[rgba(255,255,255,0.2)]">
        <p className="absolute text-6xl font-light text-white -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">
          Cinema<span className="font-semibold">Plus</span> - Blogging
        </p>
      </div>
    </BlogBannerStyle>
  );
};

export default BlogBanner;
