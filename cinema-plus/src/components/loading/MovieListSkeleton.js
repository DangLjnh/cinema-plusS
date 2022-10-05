import React from "react";
import LoadingSkeleton from "./LoadingSkeleton";
import styled from "styled-components";
import { v4 } from "uuid";
const MovieListSkeletonStyle = styled.div`
  .skeleton {
    background-color: #5b5a5a;
    background-image: linear-gradient(
      110deg,
      #5b5a5a 8%,
      #928f8f 18%,
      #5b5a5a 33%
    );
    background-size: 200% 100%;
    animation: 1.5s shiny linear infinite;
  }
  @keyframes shiny {
    to {
      background-position-x: -200%;
    }
  }
`;
const MovieListSkeleton = ({ number = 4 }) => {
  return (
    <>
      <div className="grid grid-cols-4 gap-5 movie-list-pc">
        {Array(number)
          .fill(0)
          .map((item) => {
            return (
              <LoadingSkeleton height="470px" radius={"8px"} key={v4()}>
                <MovieListSkeletonStyle className="p-3">
                  <LoadingSkeleton
                    height={"250px"}
                    radius="8px"
                    className={"mb-5"}
                  ></LoadingSkeleton>
                  <div className="flex flex-col flex-1 h-[175px]">
                    <LoadingSkeleton
                      height={"20px"}
                      className="mb-3"
                    ></LoadingSkeleton>
                    <div className="flex flex-col flex-1">
                      <div className="flex items-center justify-between mt-auto text-sm font-medium opacity-50 mb-7">
                        <LoadingSkeleton
                          height={"15px"}
                          width="40px"
                        ></LoadingSkeleton>
                        <LoadingSkeleton
                          height={"15px"}
                          width="50px"
                        ></LoadingSkeleton>
                      </div>
                    </div>
                    <LoadingSkeleton
                      height={"48px"}
                      className={"rounded-lg"}
                    ></LoadingSkeleton>
                  </div>
                </MovieListSkeletonStyle>
              </LoadingSkeleton>
            );
          })}
      </div>
      <div className="grid grid-cols-2 gap-x-5 movie-list-tablet">
        {Array(2)
          .fill(0)
          .map((item) => {
            return (
              <LoadingSkeleton height="470px" radius={"8px"} key={v4()}>
                <MovieListSkeletonStyle className="p-3">
                  <LoadingSkeleton
                    height={"250px"}
                    radius="8px"
                    className={"mb-5"}
                  ></LoadingSkeleton>
                  <div className="flex flex-col flex-1 h-[175px]">
                    <LoadingSkeleton
                      height={"20px"}
                      className="mb-3"
                    ></LoadingSkeleton>
                    <div className="flex flex-col flex-1">
                      <div className="flex items-center justify-between mt-auto text-sm font-medium opacity-50 mb-7">
                        <LoadingSkeleton
                          height={"15px"}
                          width="40px"
                        ></LoadingSkeleton>
                        <LoadingSkeleton
                          height={"15px"}
                          width="50px"
                        ></LoadingSkeleton>
                      </div>
                    </div>
                    <LoadingSkeleton
                      height={"48px"}
                      className={"rounded-lg"}
                    ></LoadingSkeleton>
                  </div>
                </MovieListSkeletonStyle>
              </LoadingSkeleton>
            );
          })}
      </div>
      <div className="grid movie-list-mobile">
        <LoadingSkeleton height="470px" radius={"8px"} key={v4()}>
          <MovieListSkeletonStyle className="p-3">
            <LoadingSkeleton
              height={"250px"}
              radius="8px"
              className={"mb-5"}
            ></LoadingSkeleton>
            <div className="flex flex-col flex-1 h-[175px]">
              <LoadingSkeleton
                height={"20px"}
                className="mb-3"
              ></LoadingSkeleton>
              <div className="flex flex-col flex-1">
                <div className="flex items-center justify-between mt-auto text-sm font-medium opacity-50 mb-7">
                  <LoadingSkeleton
                    height={"15px"}
                    width="40px"
                  ></LoadingSkeleton>
                  <LoadingSkeleton
                    height={"15px"}
                    width="50px"
                  ></LoadingSkeleton>
                </div>
              </div>
              <LoadingSkeleton
                height={"48px"}
                className={"rounded-lg"}
              ></LoadingSkeleton>
            </div>
          </MovieListSkeletonStyle>
        </LoadingSkeleton>
        <LoadingSkeleton height="470px" radius={"8px"}>
          <MovieListSkeletonStyle className="p-3">
            <LoadingSkeleton
              height={"250px"}
              radius="8px"
              className={"mb-5"}
            ></LoadingSkeleton>
            <div className="flex flex-col flex-1 h-[175px]">
              <LoadingSkeleton
                height={"20px"}
                className="mb-3"
              ></LoadingSkeleton>
              <div className="flex flex-col flex-1">
                <div className="flex items-center justify-between mt-auto text-sm font-medium opacity-50 mb-7">
                  <LoadingSkeleton
                    height={"15px"}
                    width="40px"
                  ></LoadingSkeleton>
                  <LoadingSkeleton
                    height={"15px"}
                    width="50px"
                  ></LoadingSkeleton>
                </div>
              </div>
              <LoadingSkeleton
                height={"48px"}
                className={"rounded-lg"}
              ></LoadingSkeleton>
            </div>
          </MovieListSkeletonStyle>
        </LoadingSkeleton>
      </div>
    </>
  );
};

export default MovieListSkeleton;
