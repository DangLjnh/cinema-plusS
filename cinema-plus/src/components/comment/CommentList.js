import React from "react";
import CommentReply from "./CommentReply";
import CommentItem from "./CommentItem";

const CommentList = ({ className }) => {
  return (
    <div className={className}>
      <CommentItem>
        <CommentReply></CommentReply>
      </CommentItem>
    </div>
  );
};

export default CommentList;
