import React from "react";
import { NavLink } from "react-router-dom";

const PostTitle = ({ postInfo, className, to = "/" }) => {
  return (
    <NavLink
      to={`/blog/post/${postInfo.slug}/${postInfo.postID}`}
      className={`font-medium text-white post-heading block ${className}`}
    >
      {postInfo.title}
    </NavLink>
  );
};

export default PostTitle;
