import React from "react";
import styled from "styled-components";
const ActionApproveStyle = styled.span`
  &:hover {
    border: 1px solid #a6f4d0;
    svg {
      path {
        stroke: #a6f4d0;
      }
    }
  }
`;
const ActionApprove = ({ onClick = () => {} }) => {
  return (
    <>
      <ActionApproveStyle
        title="Approve"
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
            d="M10.49 2.23006L5.50003 4.11006C4.35003 4.54006 3.41003 5.90006 3.41003 7.12006V14.5501C3.41003 15.7301 4.19003 17.2801 5.14003 17.9901L9.44003 21.2001C10.85 22.2601 13.17 22.2601 14.58 21.2001L18.88 17.9901C19.83 17.2801 20.61 15.7301 20.61 14.5501V7.12006C20.61 5.89006 19.67 4.53006 18.52 4.10006L13.53 2.23006C12.68 1.92006 11.32 1.92006 10.49 2.23006Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M9.05005 11.8701L10.66 13.4801L14.96 9.18005"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </ActionApproveStyle>
    </>
  );
};

export default ActionApprove;
