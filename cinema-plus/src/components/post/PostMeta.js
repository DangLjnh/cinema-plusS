import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
const PostMetaStyle = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 14px;
  font-weight: 600;
  margin-left: auto;
  color: inherit;
  cursor: pointer;
  .post {
    &-dot {
      display: inline-block;
      width: 4px;
      height: 4px;
      background-color: currentColor;
      border-radius: 100rem;
    }
    &-time {
    }
    &-author {
    }
  }
`;
const PostMeta = ({ className, to = "/", postInfo }) => {
  if (!postInfo) return;
  return (
    <NavLink to={to}>
      <PostMetaStyle className={`post-info ${className}`}>
        <span className="post-time">{postInfo?.createdAt?.slice(0, 10)}</span>
        <span className="post-dot"></span>
        <p>{postInfo?.nameAuthor}</p>
        {/* <NavLink
          // to={`/author/${postInfo?.user.username}`}
          className="post-author"
        >
          {postInfo?.nameAuthor}
        </NavLink> */}
      </PostMetaStyle>
    </NavLink>
  );
};

export default PostMeta;
