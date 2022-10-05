import React from "react";
import styled from "styled-components";
const LabelStyle = styled.label`
  transition: 0.25s linear;
`;
const Label = ({ children }) => {
  return (
    <LabelStyle className="absolute top-1/2 left-[20px] -translate-y-1/2 pointer-events-none text-grayText font-semibold text-sm">
      {children}
    </LabelStyle>
  );
};

export default Label;
