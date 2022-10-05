import React from "react";

const CommentEllips = () => {
  return (
    <button className="w-[70px] h-[32px] hover:bg-red-200 rounded-full">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-Wdth="1.5"
        stroke="currentColor"
        className="w-full h-full "
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
        />
      </svg>
    </button>
  );
};

export default CommentEllips;
