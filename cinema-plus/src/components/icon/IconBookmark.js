import React from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";
const IconBookmarkStyle = styled.div`
  svg:hover {
  }
`;
const IconBookmark = ({ post, ...props }) => {
  // const [cartItems, setCartItems] = useState();
  // console.log(
  //   "🚀 ~ file: IconBookmark.js ~ line 11 ~ IconBookmark ~ cartItems",
  //   cartItems
  // );
  // let posts = [];
  // let p = [];
  // const handleClickIcon = () => {
  //   setCartItems((prevItem) => [...prevItem, post.postID]);
  //   toast.success("Bookmark post success ");
  // };
  return (
    <IconBookmarkStyle {...props}>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="cursor-pointer"
        // onClick={handleClickIcon}
      >
        <path
          d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M17 2.43994V12.4199C17 14.3899 15.59 15.1599 13.86 14.1199L12.54 13.3299C12.24 13.1499 11.76 13.1499 11.46 13.3299L10.14 14.1199C8.41 15.1499 7 14.3899 7 12.4199V2.43994"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M17 2.43994V12.4199C17 14.3899 15.59 15.1599 13.86 14.1199L12.54 13.3299C12.24 13.1499 11.76 13.1499 11.46 13.3299L10.14 14.1199C8.41 15.1499 7 14.3899 7 12.4199V2.43994"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </IconBookmarkStyle>
  );
};

export default IconBookmark;
