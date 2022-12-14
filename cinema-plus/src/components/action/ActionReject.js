import React from "react";
import styled from "styled-components";
const ActionRejectStyle = styled.span`
  &:hover {
    border: 1px solid #fecaca;
    svg {
      path {
        stroke: #fecaca;
      }
    }
  }
`;
// #fecaca
const ActionReject = ({ onClick = () => {} }) => {
  return (
    <>
      <ActionRejectStyle
        title="Reject"
        className="flex items-center justify-center w-10 h-10 border border-[#bdc3c7] rounded cursor-pointer action"
        onClick={onClick}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10.49 2.23006L5.49997 4.11006C4.34997 4.54006 3.40997 5.90006 3.40997 7.12006V14.5501C3.40997 15.7301 4.18997 17.2801 5.13997 17.9901L9.43997 21.2001C10.85 22.2601 13.17 22.2601 14.58 21.2001L18.88 17.9901C19.83 17.2801 20.61 15.7301 20.61 14.5501V7.12006C20.61 5.89006 19.67 4.53006 18.52 4.10006L13.53 2.23006C12.68 1.92006 11.32 1.92006 10.49 2.23006Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M14.15 13.4399L9.90002 9.18994"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M14.1 9.23999L9.84998 13.49"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </ActionRejectStyle>
    </>
  );
};

export default ActionReject;
