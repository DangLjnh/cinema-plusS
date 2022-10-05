import React from "react";
import { v4 } from "uuid";
import LoadingSkeleton from "./LoadingSkeleton";
import styled from "styled-components";
const BannerSkeletonStyle = styled.div`
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
const BannerSkeleton = () => {
  return (
    <div className="w-full h-[400px]">
      <div className="flex gap-x-10">
        <LoadingSkeleton height="400px" radius={"8px"} className="banner-big">
          <BannerSkeletonStyle>
            <div className="flex items-center gap-x-[7%]">
              <LoadingSkeleton
                width={"24%"}
                height="335px"
                radius={"8px"}
                className="ml-[2.8%] mt-[4%]"
              />
              <div className="w-[49%]">
                <LoadingSkeleton height="30px"></LoadingSkeleton>
                <LoadingSkeleton
                  width={"70px"}
                  height="15px"
                  className="my-[10px]"
                ></LoadingSkeleton>
                <LoadingSkeleton height="43px"></LoadingSkeleton>
                <div className=" flex flex-wrap gap-3 my-[20px]">
                  {Array(3)
                    .fill(0)
                    .map((item) => {
                      return (
                        <LoadingSkeleton
                          radius={"4px"}
                          width="25%"
                          height={"32px"}
                          key={v4()}
                          // to={handleTo(item)}
                        ></LoadingSkeleton>
                      );
                    })}
                </div>
                <div className="flex gap-x-5 button-container">
                  <LoadingSkeleton
                    height={"48px"}
                    radius="8px"
                    className=""
                  ></LoadingSkeleton>
                  <LoadingSkeleton
                    height={"48px"}
                    radius="8px"
                    className=""
                  ></LoadingSkeleton>
                </div>
              </div>
            </div>
          </BannerSkeletonStyle>
        </LoadingSkeleton>
        <LoadingSkeleton
          width={"22%"}
          height="400px"
          radius={"8px"}
          className="banner-small"
        >
          <BannerSkeletonStyle>
            <LoadingSkeleton
              width={"80%"}
              height="335px"
              radius={"8px"}
              className="ml-[9.5%] mt-[14%]"
            />
          </BannerSkeletonStyle>
        </LoadingSkeleton>
      </div>
    </div>
  );
};

export default BannerSkeleton;
