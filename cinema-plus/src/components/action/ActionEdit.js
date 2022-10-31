import React from "react";
import styled from "styled-components";

const ActionEditStyle = styled.span`
  &:hover {
    border: 1px solid #a6f4d0;
    svg {
      path {
        stroke: #a6f4d0;
      }
    }
  }
`;
const ActionEdit = ({ onClick = () => {} }) => {
  return (
    <ActionEditStyle
      className="flex items-center justify-center w-10 h-10 border border-[#bdc3c7] rounded cursor-pointer action"
      onClick={onClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
        />
      </svg>
    </ActionEditStyle>
  );
};

export default ActionEdit;
