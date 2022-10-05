import React from "react";

const ManageUserTitle = ({ title, desc }) => {
  return (
    <div className="mb-10">
      <h1 className="text-3xl font-medium text-white">{title}</h1>
      <p className="dashboard-short-desc">{desc}</p>
    </div>
  );
};

export default ManageUserTitle;
