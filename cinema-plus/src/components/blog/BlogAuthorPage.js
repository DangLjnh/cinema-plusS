import axios from "axios";
import Button from "components/button/Button";
import PostCategory from "components/post/PostCategory";
import PostImage from "components/post/PostImage";
import PostMeta from "components/post/PostMeta";
import PostTitle from "components/post/PostTitle";
import TitlePosts from "components/title/TitlePosts";
import { clientSide } from "config/config";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BlogAuthorCategoryItem from "./BlogAuthorCategoryItem";

const BlogAuthorPage = () => {
  const { authorID } = useParams();
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .post(`${clientSide}/get/postItemByUid`, {
        uid: authorID,
      })
      .then((res) => setPosts(res.data));
    axios
      .post(`${clientSide}/get/userItem`, {
        uid: authorID,
      })
      .then((res) => setUser(Object.assign({}, ...res.data)));
    window.scroll(0, 0);
  }, []);
  return (
    <>
      <div className="flex items-center justify-between my-10">
        <TitlePosts>Author : {user?.displayName}</TitlePosts>
        <Button
          className={"text-white w-[130px] h-[48px]"}
          onClick={() => navigate("/blog")}
        >
          Go to blog
        </Button>
      </div>
      <div className="grid grid-cols-4 gap-5">
        {posts?.length > 0 &&
          posts.map((post) => {
            return (
              <BlogAuthorCategoryItem  post={post}></BlogAuthorCategoryItem>
            );
          })}
      </div>
    </>
  );
};

export default BlogAuthorPage;
