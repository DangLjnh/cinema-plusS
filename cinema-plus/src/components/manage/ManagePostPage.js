import Button from "components/button/Button";
import PostsTable from "components/table/PostsTable";
import ManageUserTitle from "components/title/ManageUserTitle";
import React from "react";
import { useNavigate } from "react-router-dom";

const ManagePostPage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="flex justify-between">
        <ManageUserTitle
          className=""
          title="Manage posts"
          desc={`Here you can manage your posts.`}
        ></ManageUserTitle>
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
