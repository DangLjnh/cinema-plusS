import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Logo = ({ className }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate("/")}
      className={`flex items-center text-lg text-white image-logo gap-x-3 cursor-pointer ${className}`}
    >
      <img srcSet="../../../cp-min.png" alt="" className="w-12 h-9" />
      <div className="flex">
        <h2>Cinema</h2>
        <span className="text-2xl font-semibold">Plus</span>
      </div>
    </div>
  );
};

export default Logo;
