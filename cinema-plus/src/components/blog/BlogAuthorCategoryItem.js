import PostCategory from "components/post/PostCategory";
import PostImage from "components/post/PostImage";
import PostMeta from "components/post/PostMeta";
import PostTitle from "components/post/PostTitle";
import React from "react";

const BlogAuthorCategoryItem = ({ post }) => {
  if (!post) return;
  return (
    <div className="flex flex-col">
      <PostImage
        url={post.photoURL}
        className="w-full h-[202px] rounded-lg object-cover"
      ></PostImage>
      <PostCategory
        className="my-4 bg-neutral-400 text-[#1a161f]"
        category={post.categoryID}
      >
        {post.categoryName}
      </PostCategory>
      <div className="flex flex-col flex-1">
        <PostTitle postInfo={post} className="mb-4 "></PostTitle>
        <div className="mt-auto">
          <PostMeta postInfo={post}></PostMeta>
        </div>
      </div>
    </div>
  );
};

export default BlogAuthorCategoryItem;
