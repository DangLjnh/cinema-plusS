import React from "react";
import { useSelector } from "react-redux";
import { useDropdown } from "./dropdown-context";

const List = ({ children, className }) => {
  const { show } = useDropdown();
  return (
    <>
      {show && (
        <div
          className={`absolute w-full mt-2 rounded-md dropdown-list bg-neutral-700 ${className}`}
        >
          {children}
        </div>
      )}
    </>
  );
};

export default List;
