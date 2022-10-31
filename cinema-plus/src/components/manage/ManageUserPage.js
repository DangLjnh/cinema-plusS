import Button from "components/button/Button";
import UsersTable from "components/table/UsersTable";
import ManageTitle from "components/title/ManageTitle";
import { UserContext } from "contexts/UserProvider";
import React from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { userRole } from "utils/constant";

const ManageUserPage = () => {
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
