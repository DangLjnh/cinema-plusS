import React from "react";
import styled from "styled-components";
import LoadingSkeleton from "./LoadingSkeleton";
const BannerDetailSkeletonStyle = styled.div`
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
const BannerDetailSkeleton = () => {
  return (
    <LoadingSkeleton className="relative">
      <div className="banner">
        <LoadingSkeleton
          height={"400px"}
          radius="8px"
          className={"banner-detail-img"}
        ></LoadingSkeleton>
        <BannerDetailSkeletonStyle>
          <div className="banner-content text-white absolute bottom-5 left-[25%] max-w-[600px]">
            <LoadingSkeleton height={"36px"} width="600px"></LoadingSkeleton>
            <div className="categories max-w-[600px] flex flex-wrap gap-3 text-sm mb-5 mt-10">
              <LoadingSkeleton
                width={"120px"}
                height="36px"
                radius={"8px"}
              ></LoadingSkeleton>
              <LoadingSkeleton
                width={"120px"}
                height="36px"
                radius={"8px"}
              ></LoadingSkeleton>
              <LoadingSkeleton
                width={"120px"}
                height="36px"
                radius={"8px"}
              ></LoadingSkeleton>
            </div>
          </div>
        </BannerDetailSkeletonStyle>
      </div>
      <BannerDetailSkeletonStyle>
        <LoadingSkeleton
          width={"180px"}
          height="280px"
          radius={"8px"}
          className="h-[280px] w-[180px] object-cover absolute -bottom-[20%] left-[5%] rounded-lg"
        ></LoadingSkeleton>
        <LoadingSkeleton
          width={"50px"}
          height="50px"
          radius={"100%"}
          className="icon absolute right-[5.5%] top-[10%]"
        ></LoadingSkeleton>
        <LoadingSkeleton
          width={"162px"}
          height="51px"
          radius={"999px"}
          className="absolute bottom-[40px] right-[5%]"
        ></LoadingSkeleton>
      </BannerDetailSkeletonStyle>
    </LoadingSkeleton>
  );
};

export default BannerDetailSkeleton;
