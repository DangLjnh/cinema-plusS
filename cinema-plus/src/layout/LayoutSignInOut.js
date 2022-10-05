import React from "react";
import styled from "styled-components";
const LayoutSignInOutStyle = styled.div`
  background: rgba(0, 0, 0, 0.8);
  @media screen and (max-width: 767.98px) {
    .social {
      font-size: 12px;
      column-gap: 8px;
    }
    width: 300px;
    height: 650px;
  }
`;
const LayoutSignInOut = ({ children, className }) => {
  return (
    <LayoutSignInOutStyle
      className={`absolute bg-trans z-10 w-[450px] h-[600px] bg-slate-300 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 ${className}`}
    >
      {children}
    </LayoutSignInOutStyle>
  );
};

export default LayoutSignInOut;
