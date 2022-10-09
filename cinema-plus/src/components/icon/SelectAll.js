import React from "react";
import styled from "styled-components";
const SelectAllStyle = styled.div`
  &:hover {
    color: #10ac84;
    svg {
      path {
        stroke: #10ac84;
      }
    }
  }
`;
const SelectAll = () => {
  return (
    <SelectAllStyle className="flex items-center gap-x-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path
          d="M20 2H8c-1.103 0-2 .897-2 2v12c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2V4c0-1.103-.897-2-2-2zM8 16V4h12l.002 12H8z"
          stroke="currentColor"
        ></path>
        <path
          d="M4 8H2v12c0 1.103.897 2 2 2h12v-2H4V8zm8.933 3.519-1.726-1.726-1.414 1.414 3.274 3.274 5.702-6.84-1.538-1.282z"
          stroke="currentColor"
        ></path>
      </svg>
      <span className="">Select All</span>
    </SelectAllStyle>
  );
};

export default SelectAll;
