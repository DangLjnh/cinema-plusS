import { fetcher, tmdbAPI, tvAPI } from "config/config";
import React from "react";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import styled from "styled-components";
import { v4 } from "uuid";
import { ReadMoreReview } from "./ReadMore";
import { Dropdown } from "components/dropdown";
import { useSelector } from "react-redux";
import ReviewItem from "./ReviewItem";
import { useEffect } from "react";
import { withErrorBoundary } from "react-error-boundary";
import NotFoundPage from "pages/NotFoundPage";
import { useState } from "react";
const ReviewsDetailStyle = styled.div`
  .comment-list {
    @media screen and (max-width: 1023.98px) {
      height: 350px;
      .comment-list-inner {
        margin-right: 0;
      }
    }
  }
  @media screen and (max-width: 767.98px) {
    .review-athor {
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
      width: 100%;
      max-width: 100%;
      white-space: pre-wrap;
      word-break: break-all;
      max-width: 150px;
    }
    .review-content-inner {
      margin-right: 10px;
    }
  }
`;
const DropdownOptionDetail = [
  {
    id: 1,
    name: "Descending",
    dataName: "Descending",
  },
  {
    id: 2,
    name: "Ascending",
    dataName: "Ascending",
  },
  {
    id: 3,
    name: "Newest",
    dataName: "Newest",
  },
  {
    id: 3,
    name: "Oldest",
    dataName: "Oldest",
  },
];
const ReviewsDetail = ({ hide, movie, category, className }) => {
  const { optionDetail } = useSelector((state) => state.news);
  const { movieID, tvID } = useParams();
  const { data } = useSWR(
    category === movie.runtime
      ? tmdbAPI.getMovieMeta(movieID, "reviews")
      : tvAPI.getTVMeta(tvID, "reviews"),
    fetcher
  );
  useEffect(() => {
    const reviewList = document.querySelector(".comment-list");
    if (reviewList) {
      reviewList.style.scrollBehavior = "smooth";
      reviewList.scroll(0, 0);
    }
  }, [optionDetail]);
  if (!data) return null;
  const { results } = data;
  let descending = [...results]?.sort(
    (a, b) => b?.author_details?.rating - a?.author_details?.rating
  );
  let ascending = [...results]?.sort(
    (a, b) => a?.author_details?.rating - b?.author_details?.rating
  );
  let newest = [...results]?.sort(
    (a, b) =>
      new Date(b?.created_at.slice(0, 10)) -
      new Date(a?.created_at.slice(0, 10))
  );
  let oldest = [...results]?.sort(
    (a, b) =>
      new Date(a?.created_at.slice(0, 10)) +
      new Date(b?.created_at.slice(0, 10))
  );
  if (!results) return;
  return (
    <ReviewsDetailStyle
      className={`${hide ? "hidden" : ""} mb-10 ${className}`}
    >
      <div className="flex items-center justify-end my-5 gap-x-5">
        <p>Sort Rating:</p>
        <Dropdown
          className={`w-auto min-w-[135px] text-neutral-400 relative ${
            results.length === 0
              ? "opacity-30 cursor-default pointer-events-none"
              : ""
          }`}
        >
          <Dropdown.Select className="cursor-pointer">
            {optionDetail && optionDetail !== "Descending"
              ? optionDetail
              : "Descending"}
          </Dropdown.Select>
          <Dropdown.List className="w-auto">
            {DropdownOptionDetail.map((item) => {
              return (
                <Dropdown.Option
                  key={item.id}
                  className="px-3 py-2 rounded-lg cursor-pointer hover:bg-neutral-600"
                  data-option={item.dataName}
                >
                  {item.name}
                </Dropdown.Option>
              );
            })}
          </Dropdown.List>
        </Dropdown>
      </div>
      <div className="comment-list h-[370px] overflow-y-auto">
        <div className="mr-[40px] comment-list-inner">
          {results.length === 0 && (
            <NotFoundPage
              hasButton={false}
              hasLogo={false}
              sizeImg="3x"
              title="Not found reviews"
              desc="Sorry, i couldn't find the review of viewer."
              classNameTitle="text-xl"
              classNameDesc="text-base"
            ></NotFoundPage>
          )}
          {optionDetail === "Descending" &&
            descending.map((review) => {
              return <ReviewItem review={review} key={v4()}></ReviewItem>;
            })}
          {optionDetail === "Ascending" &&
            ascending.map((review) => {
              return <ReviewItem review={review} key={v4()}></ReviewItem>;
            })}
          {optionDetail === "Newest" &&
            newest.map((review) => {
              return <ReviewItem review={review} key={v4()}></ReviewItem>;
            })}
          {optionDetail === "Oldest" &&
            oldest.map((review) => {
              return <ReviewItem review={review} key={v4()}></ReviewItem>;
            })}
        </div>
      </div>
    </ReviewsDetailStyle>
  );
};

function FallbackComponent() {
  return (
    <div className="text-xl font-bold text-center text-red-400 bg-red-50">
      Something went wrong with components ReviewsDetail
    </div>
  );
}

export default withErrorBoundary(ReviewsDetail, {
  FallbackComponent,
});
/**
 <NotFoundPage
            hasButton={false}
            hasLogo={false}
            sizeImg="5x"
            title="Not found reviews"
            desc="I couldn't find the review of viewer."
            classNameTitle="text-xl"
            classNameDesc="text-base"
          ></NotFoundPage> 
          */
