import React from "react";
import { useSelector } from "react-redux";
import { useDropdown } from "./dropdown-context";

const List = ({ children }) => {
  const { show } = useDropdown();
  return (
    <>
      {show && (
        <div className="absolute z-10 w-full mt-2 rounded-md dropdown-list bg-neutral-700">
          {children}
        </div>
      )}
    </>
  );
};

export default List;
