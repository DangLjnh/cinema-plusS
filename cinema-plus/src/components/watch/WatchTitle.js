import React from "react";
import styled from "styled-components";
const WatchTitleStyle = styled.h2`
  @media screen and (max-width: 767.98px) {
    font-size: 28px;
    margin-top: 10px /* 16px */;
    margin-bottom: 10px /* 16px */;
  }
`;
const WatchTitle = ({ name }) => {
  if (!name) return;
  return (
    <WatchTitleStyle className="font-bold text-[35px] my-4 w-full title-watch text-white">
      {name}
    </WatchTitleStyle>
  );
};

export default WatchTitle;
