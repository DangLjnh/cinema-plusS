import LoadingSpinner from "components/loading/LoadingSpinner";
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Button = ({
  onClick,
  className,
  full = false,
  bgColor,
  to = "/",
  children = "Explore now",
  type = "button",
  disabled,
  isLoading,
  ...props
}) => {
  let bgClassName = "bg-gradient";
  switch (bgColor) {
    case "primary":
      bgClassName = "bg-gradient";
      break;
    case "grayDark":
      bgClassName = "bg-[#373739]";
      break;
    case "white":
      bgClassName = "bg-white";
      break;
    case "fb":
      bgClassName = "bg-[#385ca8]";
      break;
    default:
      break;
  }
  const child =
    isLoading === true ? <LoadingSpinner></LoadingSpinner> : children;
  return (
    <>
      <button
        className={`${
          full ? "w-full" : ""
        } px-6 py-3 font-medium transition-all bg-opacity-100 rounded-lg ${className} ${bgClassName} ${
          disabled && "opacity-80"
        }`}
        type={type}
        onClick={onClick}
        disabled={disabled}
        {...props}
      >
        {child}
      </button>
    </>
  );
};

export default Button;
