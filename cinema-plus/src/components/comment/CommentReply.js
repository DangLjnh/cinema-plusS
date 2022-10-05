import React from "react";
import CommentAvatar from "./CommentAvatar";
import ComentContent from "./ComentContent";
import CommentEllips from "./CommentEllips";
const CommentReply = () => {
  return (
    <div className="flex comment gap-x-5">
      <CommentAvatar></CommentAvatar>
      <ComentContent></ComentContent>
      <CommentEllips></CommentEllips>
    </div>
  );
};

export default CommentReply;
