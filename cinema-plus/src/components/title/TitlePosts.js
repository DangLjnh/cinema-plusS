import React from "react";
import styled from "styled-components";
const TitlePostsStyle = styled.p`
  position: relative;
  &::after {
    content: "";
    position: absolute;
    width: 40%;
    height: 3px;
    background: linear-gradient(to right, #9841f4, #5ba8ff);
    left: 0;
    top: -15px;
  }
`;
const TitlePosts = ({ children }) => {
  return (
    <TitlePostsStyle className="inline-block text-2xl text-white title-posts">
      {children}
    </TitlePostsStyle>
  );
};

export default TitlePosts;
