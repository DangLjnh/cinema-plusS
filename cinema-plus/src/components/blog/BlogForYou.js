import BlogTimeRead from "components/content/BlogTimeRead";
import React from "react";
import styled from "styled-components";

const BlogForYouStyle = styled.div`
  .post-blog-title {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;
    max-width: 100%;
    white-space: pre-wrap;
    word-break: break-all;
    width: 250px;
  }
`;
const BlogForYou = ({ post }) => {
  return (
    <BlogForYouStyle className="flex items-center gap-x-5">
      <div className="relative w-full h-[210px]">
        <img
          src={post.photoURL}
          alt=""
          className="object-cover w-full h-full rounded-lg"
        />
        <div className="absolute inset-0 bg-gradient-to-t rounded-lg from-[rgba(0,0,0,0.4)] to-[rgba(0,0,0,0.2)]"></div>
      </div>
      <div className="flex flex-col justify-between post-fy-content gap-y-8">
        <div className="flex items-center whitespace-nowrap gap-x-3">
          <p>{post.categoryName}</p>
          <div className="w-[5px] h-[5px] bg-current rounded-full "></div>
          <BlogTimeRead content={post.content}></BlogTimeRead>
        </div>
        <div className="">
          <p
            title={post.title}
            className="text-lg font-medium text-white post-blog-title"
          >
            {post.title}
          </p>
        </div>
        <div className="flex items-center gap-x-3">
          <img
            src={post.photoUser || "/user.png"}
            alt=""
            className="object-cover w-6 h-6 rounded-full shrink-0"
          />
          <p className="text-sm">{post.nameAuthor}</p>
        </div>
      </div>
    </BlogForYouStyle>
  );
};

export default BlogForYou;
