import React from "react";
import styled from "styled-components";

const SpinnerStyle = styled.div`
  width: 26px;
  height: 26px;
  border: 3px solid white;
  border-top: 3px solid transparent;
  border-bottom: 3px solid transparent;
  border-radius: 100rem;
  display: inline-block;
  animation: spin 1s infinite linear;
  @keyframes spin {
    100% {
      transform: rotate(360deg);
    }
  }
`;
const LoadingSpinner = ({ size = "20px", borderSize = "5px" }) => {
  return <SpinnerStyle size={size} borderSize={borderSize}></SpinnerStyle>;
};

export default LoadingSpinner;
