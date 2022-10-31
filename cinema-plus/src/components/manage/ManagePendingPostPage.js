import Button from "components/button/Button";
import PendingPostTable from "components/table/PendingPostTable";
import ManageTitle from "components/title/ManageTitle";
import { UserContext } from "contexts/UserProvider";
import React from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { userRole } from "utils/constant";

const ManagePendingPostPage = () => {
  const navigate = useNavigate();
  const [currentUser] = useContext(UserContext);
  if (currentUser.role !== userRole.admin) {
    return (
      <ManageTitle title="You don't have access to this page!!!"></ManageTitle>
    );
  }
  return (
    <>
      <div className="flex items-start justify-between">
        <ManageTitle
          title="Pending post"
          desc="Here you can approve or reject post of user."
        ></ManageTitle>
        <Button
          className={"text-white h-[48px]"}
          onClick={() => {
            navigate("/manage/post/create-post");
          }}
        >
          Create post
        </Button>
      </div>
      <div className="mb-10">
        <PendingPostTable></PendingPostTable>
      </div>
    </>
  );
};

export default ManagePendingPostPage;
