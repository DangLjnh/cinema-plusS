import Button from "components/button/Button";
import UsersTable from "components/table/UsersTable";
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
          desc="Here you can manage your user."
          desc2="If user signed in Google or Facebook, you can't change email and password."
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
      <div className="mb-10">
        <UsersTable></UsersTable>
      </div>
    </>
  );
};

export default ManageUserPage;
