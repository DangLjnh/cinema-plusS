import React from "react";
import { useSelector } from "react-redux";
import { useDropdown } from "./dropdown-context";

const Select = ({ children, className = "" }) => {
  const { option, optionDetail } = useSelector((state) => state.news);
  const { toggle, show, setShow } = useDropdown();
  const selected = document.querySelector(".dropdown-selected");
  window.addEventListener("click", (e) => {
    if (e.target.matches(".dropdown-option")) setShow(false);
    if (
      selected &&
      !selected.contains(e.target) &&
      e.target.matches(".sort-header")
    ) {
      setShow(false);
    }
  });
  return (
    <div
      className={`flex items-center justify-between p-2 rounded-md text-md bg-neutral-700 dropdown-selected cursor-pointer ${className}`}
      onClick={toggle}
    >
      <span className="pointer-events-none">
        {children}
        {/* {option && option !== "" ? option : placeholder} */}
        {/* {optionDetail && optionDetail !== "descending"
          ? optionDetail
          : placeholder} */}
      </span>
      <span>
        {show ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 15l7-7 7 7"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        )}
      </span>
    </div>
  );
};

export default Select;
