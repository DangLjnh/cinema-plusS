import Button from "components/button/Button";
import CategoriesTable from "components/table/CategoriesTable";
import ManageUserTitle from "components/title/ManageUserTitle";
import React from "react";
import { useNavigate } from "react-router-dom";

const ManageCategoriesPage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="flex items-start justify-between">
        <ManageUserTitle
          title="Categories"
          desc="Here you can manage your category."
        ></ManageUserTitle>
        <Button
          className={"text-white h-[48px]"}
          onClick={() => {
            navigate("/manage/categories/create-category");
          }}
        >
          Create category
        </Button>
      </div>
      <div className="mb-10">
        <CategoriesTable></CategoriesTable>
      </div>
    </div>
  );
};

export default ManageCategoriesPage;
