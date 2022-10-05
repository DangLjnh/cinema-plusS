import React from "react";
import LoadingSkeleton from "./LoadingSkeleton";

const CastSkeleton = () => {
  return (
    <div className="tracking-wide">
      <div className="flex items-center gap-x-10 detail-cast">
        <LoadingSkeleton width={"220px"} height="340px" radius={"4px"} />
        <div className="flex flex-col gap-y-9">
          <LoadingSkeleton width={"300px"} height="25px"></LoadingSkeleton>
          <LoadingSkeleton width={"275px"} height="25px"></LoadingSkeleton>
          <LoadingSkeleton width={"250px"} height="25px"></LoadingSkeleton>
          <LoadingSkeleton width={"350px"} height="25px"></LoadingSkeleton>
          <LoadingSkeleton width={"140px"} height="25px"></LoadingSkeleton>
        </div>
      </div>
      <div>
        <LoadingSkeleton
          width={"105px"}
          height="25px"
          className={"my-5"}
        ></LoadingSkeleton>
        <LoadingSkeleton width={"95%"} height="140px"></LoadingSkeleton>
      </div>
    </div>
  );
};

export default CastSkeleton;
