import axios from "axios";
import { clientSide } from "config/config";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { v4 } from "uuid";
import BlogAuthorCategoryItem from "./BlogAuthorCategoryItem";

const BlogBookmark = () => {
  const [currentUser, setCurrentUser] = useState({});
  const [posts, setPosts] = useState([]);
  const [post, setPost] = useState([]);
  const [postListBookmark, setPostListBookmark] = useState([]);
  const [parseArray, setParseArray] = useState([]);
  const [postValue, setPostValue] = useState([]);
  useEffect(() => {
    axios.get(`${clientSide}/get/currentUser`).then((response) => {
      if (response) {
        const data = Object.assign({}, ...response.data);
        axios
          .post(`${clientSide}/get/bookmark/posts/${currentUser.uid}`, {
            uid: data.uid,
          })
          .then((res) => {
            if (res) setPosts(res.data);
          });
      }
    });
  }, []);
  useEffect(() => {
    setPost(posts && Object.assign({}, ...posts));
  }, [posts]);
  useEffect(() => {
    setParseArray(
      post && Object.keys(post).length > 0 && JSON.parse(post?.postID)
    );
  }, [post]);
  useEffect(() => {
    parseArray?.length > 0 &&
      parseArray?.forEach((postID) => {
        axios
          .post(`${clientSide}/get/postItem`, {
            postID: postID,
          })
          .then((res) => {
            if (res) {
              let data = Object.assign({}, ...res.data);
              setPostListBookmark((prevItems) => {
                setPostValue([...prevItems, data]);
                return [...prevItems, data];
              });
            }
          });
      });
  }, [parseArray]);
  return (
    <div>
      <div className="grid grid-cols-4 gap-5">
        {postListBookmark?.length > 0 &&
          postListBookmark.map((postt) => {
            return (
              <BlogAuthorCategoryItem post={postt}></BlogAuthorCategoryItem>
            );
          })}
      </div>
    </div>
  );
};

export default BlogBookmark;
