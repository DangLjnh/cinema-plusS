import useScrollDropDown from "hooks/useScrollDropdown";
import React from "react";
import styled from "styled-components";
const LayoutSFStyle = styled.div`
  .sort-content {
    transition: height 0.2s linear;
    opacity: 0;
    visibility: hidden;
    transition: all 0.2s ease;
    height: 0;
  }
  .is-active-dropdown {
    opacity: 1;
    visibility: visible;
    height: 0;
  }
  .is-active-option {
    display: block;
  }
`;
const LayoutSF = ({ name, title, children, className }) => {
  const { active, handleToogleDropdown } =
    useScrollDropDown("is-active-dropdown");
  return (
    <LayoutSFStyle
      className={`w-full bg-[#262628] sort rounded-lg  px-4 py-2 ${className}`}
    >
      <div
        className="flex items-center justify-between w-full cursor-pointer sort-header"
        onClick={handleToogleDropdown}
      >
        <h2 className="text-white pointer-events-none">{title}</h2>
        <span>
          {active ? (
            <svg
              width="14"
              height="8"
              viewBox="0 0 14 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13 1L7 7L1 1"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ) : (
            <svg
              width="8"
              height="14"
              viewBox="0 0 8 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 1L7 7L1 13"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </span>
      </div>
      <div className="text-white sort-content">
        <div className="pt-[10px]">
          <h2 className="pt-[10px] mb-5 border-t-2 border-[#373739]">{name}</h2>
        </div>
        {children}
      </div>
    </LayoutSFStyle>
  );
};

export default LayoutSF;
