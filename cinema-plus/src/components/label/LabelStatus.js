import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const LabelStatusStyles = styled.span`
  display: inline-block;
  padding: 7px 15px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
`;
/**
 *
 * @param type - "default" "success" "warning" "danger"
 * @returns
 */
const LabelStatus = ({ children, type = "default" }) => {
  let styleClassName = "text-gray-500 bg-gray-100";
  switch (type) {
    case "success":
      styleClassName = "text-[#5b5a5a] bg-[#a6f4d0]";
      break;
    case "warning":
      styleClassName = "text-yellow-500 bg-yellow-100";
      break;
    case "danger":
      styleClassName = "text-[#5b5a5a] bg-red-100";
      break;
    case "user":
      styleClassName = "text-[#5b5a5a] bg-[#e5e7ea]";
      break;
    case "mod":
      styleClassName = "text-lime-500 bg-lime-100";
      break;
    case "admin":
      styleClassName = "text-[#5b5a5a] bg-orange-100";
      break;

    default:
      break;
  }
  return (
    <LabelStatusStyles className={styleClassName}>{children}</LabelStatusStyles>
  );
};
LabelStatus.propTypes = {
  children: PropTypes.node,
  type: PropTypes.oneOf([
    "default",
    "success",
    "warning",
    "danger",
    "user",
    "mod",
    "admin",
    "editor",
  ]).isRequired,
};
export default LabelStatus;
