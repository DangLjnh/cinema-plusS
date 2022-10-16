import React from "react";

const DashboardItem = ({ bgColor, number, title, className, icon }) => {
  return (
    <div>
      <div
        className={`flex items-center justify-between h-[120px] px-[15%] ${bgColor} text-[#5b5a5a] rounded-lg ${className}`}
      >
        <div className="">
          <p className="text-2xl font-medium text-black">{number}</p>
          <p>{title}</p>
        </div>
        <span>{icon}</span>
      </div>
    </div>
  );
};

export default DashboardItem;
