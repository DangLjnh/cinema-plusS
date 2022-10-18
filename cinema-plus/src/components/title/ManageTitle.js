import React from "react";

const ManageTitle = ({ title, desc, desc2 = "", className = "" }) => {
  return (
    <div className={`mb-10 ${className}`}>
      <h1 className="mb-3 text-3xl font-medium text-white">{title}</h1>
      <p className="dashboard-short-desc">{desc}</p>
      <p className="dashboard-short-desc">{desc2}</p>
    </div>
  );
};

export default ManageTitle;
