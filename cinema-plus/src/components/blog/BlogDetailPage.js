import axios from "axios";
import PostCategory from "components/post/PostCategory";
import PostImage from "components/post/PostImage";
import PostMeta from "components/post/PostMeta";
import { clientSide } from "config/config";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import parse from "html-react-parser";
import styled from "styled-components";
import PostTitle from "components/post/PostTitle";
const PostDetailsPageStyles = styled.div`
  /* padding-bottom: 100px; */
  .post {
    &-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 40px;
      margin: 40px 0;
    }
    &-feature {
      width: 100%;
      max-width: 640px;
      height: 466px;
      border-radius: 20px;
    }
    &-heading {
      font-size: 30px;
      margin-bottom: 16px;
    }
    &-info {
      flex: 1;
    }
    &-content {
      max-width: 800px;
      margin: 20px auto;
      img {
        width: 100%;
      }
    }
  }
  .author {
    margin-top: 40px;
    margin-bottom: 80px;
    display: flex;
    border-radius: 20px;
    /* background-color: ${(props) => props.theme.grayF3}; */
    &-image {
      width: 200px;
      height: 200px;
      flex-shrink: 0;
      border-radius: inherit;
    }
    &-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: inherit;
    }
    &-content {
      flex: 1;
      padding: 20px;
    }
    &-name {
      font-weight: bold;
      margin-bottom: 10px;
      font-size: 20px;
    }
    &-desc {
      font-size: 14px;
      line-height: 2;
    }
  }
  @media screen and (max-width: 1023.98px) {
    padding-bottom: 40px;
    .post {
      &-header {
        flex-direction: column;
      }
      &-feature {
        height: auto;
      }
      &-heading {
        font-size: 26px;
      }
      &-content {
        margin: 40px 0;
      }
    }
    .author {
      flex-direction: column;
      &-image {
        width: 100%;
        height: auto;
      }
    }
  }
`;
const BlogDetailPage = () => {
  const { postID } = useParams(); //slug dungf useParams, id dùng useSearchParams
  const [postInfo, setPostInfo] = useState("");
  useEffect(() => {
    axios
      .post(`${clientSide}/get/postItem`, {
        postID: postID,
      })
      .then((res) => setPostInfo(Object.assign({}, ...res.data)));
    window.scrollTo(0, 0);
  }, []);
  return (
    <PostDetailsPageStyles>
      <div className="">
        <div className="post-header">
          <PostImage
            url={postInfo.photoURL}
            className="post-feature"
          ></PostImage>
          <div className="post-info">
            <PostCategory
              className="mb-6 bg-neutral-400 text-[#1a161f]"
              category={postInfo.category}
            >
              {postInfo.categoryName}
            </PostCategory>
            <PostTitle postInfo={postInfo}></PostTitle>
            <PostMeta postInfo={postInfo}></PostMeta>
          </div>
        </div>
        <div className="post-content">
          {/* parse to html */}
          <div className="entry-content">
            {parse(String(postInfo?.content))}
          </div>
          {/* <AuthorBox authorID={user?.id}></AuthorBox> */}
        </div>
        {/* <PostRelated
          postInfo={postInfo}
          categoryID={postInfo?.categoryID}
        ></PostRelated> */}
      </div>
    </PostDetailsPageStyles>
  );
};

export default BlogDetailPage;
