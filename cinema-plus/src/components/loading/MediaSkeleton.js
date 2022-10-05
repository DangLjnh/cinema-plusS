import React from "react";
import LoadingSkeleton from "./LoadingSkeleton";

const MediaSkeleton = () => {
  return (
    <div className="mt-10">
      <div className="mb-5">
        <LoadingSkeleton
          height={"28px"}
          width="30%"
          className={"mb-5"}
        ></LoadingSkeleton>
        <LoadingSkeleton height={"140px"} radius="4px"></LoadingSkeleton>
        <LoadingSkeleton
          height={"16px"}
          width="35%"
          className={"mt-2"}
        ></LoadingSkeleton>
      </div>
      <div className="">
        <LoadingSkeleton
          height={"28px"}
          width="30%"
          className={"mb-5"}
        ></LoadingSkeleton>
        <LoadingSkeleton height={"140px"} radius="4px"></LoadingSkeleton>
        <LoadingSkeleton
          height={"16px"}
          width="35%"
          className={"mt-2"}
        ></LoadingSkeleton>
      </div>
    </div>
  );
};

export default MediaSkeleton;
