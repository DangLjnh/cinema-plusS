import Button from "components/button/Button";
import UserTable from "components/table/UserTable";
import ManageUserTitle from "components/title/ManageUserTitle";
import React from "react";
import { useNavigate } from "react-router-dom";

const ManageUserPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex justify-between mt-[35px]">
        <ManageUserTitle
          title="Users"
          desc="Manage your user"
        ></ManageUserTitle>
        <Button
          className={"text-white h-[48px]"}
          onClick={() => {
            navigate("/manage-user/create-user");
          }}
        >
          Create user
        </Button>
      </div>
      <UserTable></UserTable>
    </>
  );
};

export default ManageUserPage;
