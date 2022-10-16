import React from "react";
import { NavLink } from "react-router-dom";

const Logo = ({ className }) => {
  return (
    <div
      className={`flex items-center text-lg text-white image-logo gap-x-3 ${className}`}
    >
      <NavLink to="/">
        <img srcSet="../../../cp-min.png" alt="" className="w-12 h-9" />
      </NavLink>
      <NavLink to="/">
        <div className="flex">
          <h2>Cinema</h2>
          <span className="text-2xl font-semibold">Plus</span>
        </div>
      </NavLink>
    </div>
  );
};

export default Logo;
