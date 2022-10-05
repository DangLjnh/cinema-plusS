import { ReadMore } from "components/other/ReadMore";
import React from "react";

const WatchOverview = ({ className, overview }) => {
  return (
    <div className={`${className}`}>
      <h2 className="mb-2 text-xl font-semibold text-white">Overview:</h2>
      <ReadMore>{overview}</ReadMore>
    </div>
  );
};

export default WatchOverview;
