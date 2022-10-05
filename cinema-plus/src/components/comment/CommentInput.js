import React from "react";

const CommentInput = ({ className }) => {
  return (
    <div className={className}>
      <div className="flex max-w-[95%] mx-auto gap-x-5">
        <input
          type="text"
          className="w-full px-5 py-3 text-sm text-white bg-[#404040] rounded-full outline-none placeholder:text-sm placeholder:text-[#a3a3a3]"
          placeholder="Write comment..."
        />
        <button className="">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="#6680c0"
            className="w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default CommentInput;
