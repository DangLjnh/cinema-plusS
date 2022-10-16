import React from "react";

const PostItem = ({ className, classNameTop, classNameTitle, date }) => {
  return (
    <div className={`relative ${className}`}>
      <img
        src="https://images.unsplash.com/photo-1490138139357-fc819d02e344?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
        alt=""
        className="object-cover w-full h-full rounded-lg"
      />
      <div className="absolute inset-0 bg-gradient-to-t rounded-lg from-[rgba(0,0,0,0.7)] to-[rgba(0,0,0,0.5)]"></div>
      <div className="absolute text-white inset-5">
        <div
          className={`flex items-center font-light gap-x-3 mb-5 ${classNameTop}`}
        >
          <p>Dang Linh</p>
          <div className="w-[5px] h-[5px] bg-current rounded-full"></div>
          <p>Phim</p>
          <div className="w-[5px] h-[5px] bg-current rounded-full"></div>
          <p>8 phút đọc</p>
          {date && (
            <>
              <div className="w-[5px] h-[5px] bg-current rounded-full"></div>
              <p>8 August</p>
            </>
          )}
        </div>
        <h2 className={`text-[17px] font-medium ${classNameTitle}`}>
          Đọc gì để hiểu về cách bộ não “đánh lừa” chúng ta?
        </h2>
      </div>
    </div>
  );
};

export default PostItem;
