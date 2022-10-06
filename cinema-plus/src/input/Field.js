import React from "react";

const Field = ({ className, children }) => {
  return (
    <div
      className={`input-focus-effect relative flex-col-reverse ${className}`}
    >
      {children}
    </div>
  );
};

export default Field;
