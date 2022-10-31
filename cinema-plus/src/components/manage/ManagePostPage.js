import axios from "axios";
import Button from "components/button/Button";
import PostsTable from "components/table/PostsTable";
import ManageTitle from "components/title/ManageTitle";
import { clientSide } from "config/config";
import { UserContext } from "contexts/UserProvider";
import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ManagePostPage = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState();
  const [currentUser] = useContext(UserContext);
  useEffect(() => {
    axios.get(`${clientSide}/get/posts`).then((response) => {
      if (response) {
        setPosts(response.data);
      }
    });
  }, []);

  const filterPostOfUser = posts.filter((post) => {
    return post.uid === currentUser.uid;
  });
  if (filterPostOfUser.length === 0)
    return (
      <div className="flex justify-between">
        <ManageTitle
          className=""
          title="You don't have any post!!"
        ></ManageTitle>
        <Button
          className={"text-white h-[48px]"}
          onClick={() => navigate("/manage/post/create-post")}
        >
          Create posts
        </Button>
      </div>
    );
  return (
    <div>
      <div className="flex justify-between">
        <ManageTitle
          className=""
          title="Manage posts"
          desc={`Here you can manage your posts.`}
        ></ManageTitle>
        <Button
          className={"text-white h-[48px]"}
          onClick={() => navigate("/manage/post/create-post")}
        >
          Create posts
        </Button>
      </div>
      <div className="mb-10">
        <PostsTable></PostsTable>
      </div>
    </div>
  );
};

export default ManagePostPage;
