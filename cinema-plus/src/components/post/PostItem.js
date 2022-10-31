import axios from "axios";
import BlogTimeRead from "components/content/BlogTimeRead";
import IconBookmark from "components/icon/IconBookmark";
import { clientSide } from "config/config";
import { UserContext, useUser } from "contexts/UserProvider";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";

const PostItem = ({ className, classNameTop, classNameTitle, date, post }) => {
  const [currentUser, setCurrentUser] = useState({});
  const [bookmarkList, setBookmarkList] = useState([]);
  useEffect(() => {
    axios.get(`${clientSide}/get/currentUser`).then((response) => {
      const data = Object.assign({}, ...response.data);
      setCurrentUser(data);
    });
  }, []);
  useEffect(() => {
    axios
      .post(`${clientSide}/get/bookmark/posts/${currentUser.uid}`, {
        uid: currentUser.uid,
      })
      .then((res) => {
        setBookmarkList(res.data);
      });
  }, [currentUser, bookmarkList]);
  function addToBookmark(postID) {
    const result = bookmarkList?.filter((user) => {
      return currentUser?.uid === user.uid;
    });
    const postOld = Object.assign({}, ...result);
    const parseArray = JSON.parse(postOld.postID);
    if (result.length > 0) {
      axios
        .post(`${clientSide}/post/update/bookmark/posts/${currentUser.uid}`, {
          uid: currentUser.uid,
          postID: JSON.stringify([...parseArray, postID]),
        })
        .then((res) => {
          if (res) {
            axios
              .post(`${clientSide}/get/bookmark/posts/${currentUser.uid}`, {
                uid: currentUser.uid,
              })
              .then((res) => {
                setBookmarkList(res.data);
                toast.success("Add to bookmark successfull!");
              });
          }
        });
      return;
    } else {
      axios
        .post(`${clientSide}/post/bookmark/posts/${currentUser.uid}`, {
          uid: currentUser.uid,
          displayName: currentUser.displayName,
          email: currentUser.email,
          postID: `[${postID}]`,
        })
        .then((res) => {
          toast.success("Add to bookmark successfull!");
        });
    }
  }
  return (
    <div className={`relative ${className}`}>
      <img
        src={post.photoURL}
        alt=""
        className="object-cover w-full h-[240px] rounded-lg"
      />
      <div className="absolute inset-0 bg-gradient-to-t rounded-lg from-[rgba(0,0,0,0.7)] to-[rgba(0,0,0,0.5)]"></div>
      <div className="absolute text-white inset-5">
        <div
          className={`flex items-center font-light gap-x-3 mb-5 ${classNameTop}`}
        >
          <NavLink to={`/blog/posts/${post.uid}`}>{post.nameAuthor}</NavLink>
          <div className="w-[5px] h-[5px] bg-current rounded-full"></div>
          <NavLink to={`/blog/posts/category/${post.categoryID}`}>
            {post.categoryName}
          </NavLink>
          <div className="w-[5px] h-[5px] bg-current rounded-full"></div>
          <BlogTimeRead content={post.content}></BlogTimeRead>
          <div className="w-[5px] h-[5px] bg-current rounded-full"></div>
          <IconBookmark
            post={post}
            onClick={() => addToBookmark(post.postID)}
          ></IconBookmark>
          {date && (
            <>
              <div className="w-[5px] h-[5px] bg-current rounded-full"></div>
              <p>8 August</p>
            </>
          )}
        </div>
        <NavLink
          to={`/blog/post/${post.slug}/${post.postID}`}
          className={`text-[17px] font-medium ${classNameTitle}`}
        >
          {post.title}
        </NavLink>
      </div>
    </div>
  );
};

export default PostItem;
