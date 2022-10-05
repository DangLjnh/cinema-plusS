import React from "react";
import propsType from "prop-types";
const LoadingSkeleton = ({ className, height, width, radius, children }) => {
  return (
    <div
      className={`skeleton ${className}`}
      style={{
        height: height,
        width: width || "100%",
        borderRadius: radius,
      }}
    >
      {children}
    </div>
  );
};
LoadingSkeleton.propsType = {
  className: propsType.string,
  height: propsType.string.isRequired,
  width: propsType.string,
  borderRadius: propsType.string,
};
export default LoadingSkeleton;
