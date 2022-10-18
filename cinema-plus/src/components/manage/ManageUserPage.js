import Button from "components/button/Button";
import UsersTable from "components/table/UsersTable";
import ManageTitle from "components/title/ManageTitle";
import React from "react";
import { useNavigate } from "react-router-dom";

const ManageUserPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex items-start justify-between">
        <ManageTitle
          title="Manage users"
          desc="Here you can manage your user."
          desc2="If user signed in Google or Facebook, you can't change email and password."
        ></ManageTitle>
        <Button
          className={"text-white h-[48px]"}
          onClick={() => {
            navigate("/manage/user/create-user");
          }}
        >
          Create user
        </Button>
      </div>
      <div className="mb-10">
        <UsersTable></UsersTable>
      </div>
    </>
  );
};

export default ManageUserPage;
