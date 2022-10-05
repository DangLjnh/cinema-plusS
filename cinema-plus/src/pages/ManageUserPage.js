import Button from "components/button/Button";
import UserTable from "components/table/UserTable";
import ManageUserTitle from "components/title/ManageUserTitle";
import React from "react";

const ManageUserPage = () => {
  return (
    <div>
      <div className="flex justify-between mt-[35px]">
        <ManageUserTitle
          title="Users"
          desc="Manage your user"
        ></ManageUserTitle>
        <Button className={"text-white h-[48px]"}>Create user</Button>
      </div>
      <UserTable></UserTable>
    </div>
  );
};

export default ManageUserPage;
