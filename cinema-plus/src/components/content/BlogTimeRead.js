import React from "react";

const BlogTimeRead = ({ content }) => {
  const time = Math.round(content.split(" ").length / 200);
  return <p>{`${time} phút đọc`}</p>;
};

export default BlogTimeRead;
