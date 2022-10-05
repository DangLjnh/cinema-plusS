import React from "react";
import styled from "styled-components";
const CancelStyle = styled.div`
  &:hover {
    color: #ff7979;
    svg {
      path {
        stroke: #ff7979;
      }
    }
  }
`;
const Cancel = ({ ...props }) => {
  return (
    <CancelStyle className="flex items-center gap-x-2" {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        class="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <span className="">Cancel</span>
    </CancelStyle>
  );
};

export default Cancel;
