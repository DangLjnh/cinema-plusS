import React from "react";
import styled from "styled-components";
import ComentContent from "./ComentContent";
import CommentAvatar from "./CommentAvatar";
import CommentEllips from "./CommentEllips";
const LayoutCommentStyle = styled.div`
  button {
    transition: 0.2s all linear;
  }
`;
const CommentItem = ({ className, children }) => {
  return (
    <LayoutCommentStyle className={`flex max-w-[85%] gap-x-5 ${className}`}>
      <CommentAvatar></CommentAvatar>
      <ComentContent>{children}</ComentContent>
      <CommentEllips></CommentEllips>
    </LayoutCommentStyle>
  );
};

export default CommentItem;
