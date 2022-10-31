import React from "react";
import { NavLink } from "react-router-dom";
import styled, { css } from "styled-components";
const PostCategoryStyle = styled.div`
  display: inline-block;
  padding: 4px 14px;
  border-radius: 10px;
  color: ${(props) => props.theme.gray6B};
  font-size: 14px;
  font-weight: 600;
  a {
    display: block;
  }

  /* white-space: nowrap;
  overflow: hidden; //k cho dai qua
  text-overflow: ellipsis; */
`;
const PostCategory = ({
  children,
  type = "primary",
  className = "",
  category,
  // to = "/",
}) => {
  return (
    <NavLink to={`/blog/posts/category/${category}`}>
      <PostCategoryStyle type={type} className={`post-category ${className}`}>
        {children}
      </PostCategoryStyle>
    </NavLink>
  );
};

export default PostCategory;
