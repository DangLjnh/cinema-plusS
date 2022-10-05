import React from "react";
import { v4 } from "uuid";
import LoadingSkeleton from "./LoadingSkeleton";
import styled from "styled-components";
const LoadingSidebarHomeStyle = styled.div`
  .upcoming-item:not(:last-child) {
    margin-bottom: 32px;
  }
`;
const LoadingSidebarHome = ({ number = 2 }) => {
  return (
    <>
      <LoadingSidebarHomeStyle className="min-h-[330px] upcoming">
        {Array(number)
          .fill(0)
          .map((item) => {
            return (
              <div
                key={v4()}
                className="flex items-center upcoming-item gap-x-5"
              >
                <LoadingSkeleton
                  height="150px"
                  width="100px"
                  radius={"8px"}
                ></LoadingSkeleton>
                <div className="upcoming-item-content">
                  <LoadingSkeleton
                    width={"110px"}
                    height="15px"
                  ></LoadingSkeleton>
                  <LoadingSkeleton
                    width={"82px"}
                    height="12px"
                    className="my-[15px]"
                  ></LoadingSkeleton>
                  <LoadingSkeleton
                    radius={"9999px"}
                    width="70px"
                    height={"25px"}
                  ></LoadingSkeleton>
                </div>
              </div>
            );
          })}
      </LoadingSidebarHomeStyle>
    </>
  );
};

export default LoadingSidebarHome;
