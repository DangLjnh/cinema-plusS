import React from "react";
import { NavLink } from "react-router-dom";

const SeeMore = ({ title, to = "/" }) => {
  return (
    <div className="flex justify-between mb-2">
      <p className="text-xl text-white">{title}</p>
      <NavLink
        to={to}
        className="flex items-center cursor-pointer see-more gap-x-1"
      >
        <p>See more</p>
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
            />
          </svg>
        </span>
      </NavLink>
    </div>
  );
};

export default SeeMore;
