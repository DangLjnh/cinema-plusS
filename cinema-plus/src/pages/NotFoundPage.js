import Button from "components/button/Button";
import Logo from "components/other/Logo";
import Header from "layout/Header";
import React from "react";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
const NotFoundPageStyle = styled.div`
  .title-not-found {
    position: relative;
    &::after {
      content: "";
      position: absolute;
      width: 150%;
      left: 50%;
      transform: translateX(-50%);
      height: 2.5px;
      bottom: 0;
      background: -webkit-linear-gradient(#9841f4, #5ba8ff);
    }
  }
  .btn {
    --body-bg: #1a161f;
    --btn-gradient: linear-gradient(to right, #9841f4 0%, #5ba8ff 100%);
    --btn-txt-color: #ffffff;
    position: relative;
    border: none;
    outline: none;
    display: block;
  }

  .btn-animation {
    border-radius: 5px;
  }

  .btn-animation:hover {
    cursor: pointer;
  }

  .btn-animation span {
    display: block;
  }

  .btn-animation span:nth-child(1) {
    padding: 1.8rem 5.5rem;
    background-image: var(--btn-gradient);
    border-radius: 5px;
  }

  .btn-animation span:nth-child(2),
  .btn-animation span:nth-child(3),
  .btn-animation span:nth-child(4) {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  .btn-animation span:nth-child(4) {
    width: calc(100% - 16px);
    height: calc(100% - 16px);
    display: flex;
    align-items: center;
    justify-content: center;
    background-image: var(--btn-gradient);
    color: var(--btn-txt-color);
    font-weight: 500;
    font-size: 16px;
    transition: all 0.3s ease;
    border-radius: 1px;
  }

  .btn-animation:hover span:nth-child(4) {
    width: 100%;
    height: 100%;
    border-radius: 5px;
  }

  .btn-animation span:nth-child(3) {
    width: calc(100% - 4px);
    height: calc(100% - 4px);
    background-color: var(--body-bg);
    border-radius: 4px;
  }

  .btn-animation span:nth-child(2) {
    height: 60%;
    width: 105%;
    background-color: var(--body-bg);
    animation: rotate 2s linear infinite;
  }

  @keyframes rotate {
    0% {
      transform: translate(-50%, -50%) rotate(0deg);
    }

    100% {
      transform: translate(-50%, -50%) rotate(180deg);
    }
  }
`;
const NotFoundPage = ({
  hasLogo = true,
  title = "Page not found",
  desc = "Sorry, i couldn't find the page you are looking for.",
  hasButton = true,
  sizeImg = "1.9x",
  className = "",
  classNameTitle = "",
  classNameDesc = "",
}) => {
  useEffect(() => {
    document.title = "Page not found | Cinema Plus";
  }, []);
  return (
    <>
      {hasLogo && <Logo className={"mt-5"}></Logo>}
      <NotFoundPageStyle
        className={`flex flex-col items-center justify-center tracking-wide text-white ${className}`}
      >
        <img srcSet={`../../../404-logo-2.png ${sizeImg}`} alt="" />
        <h2 className={`pb-5 my-5 text-2xl title-not-found ${classNameTitle}`}>
          {title}
        </h2>
        <span className={`mb-5 text-lg ${classNameDesc}`}>{desc}</span>
        {hasButton && (
          <NavLink to={"/"}>
            <button className="btn btn-animation mt-10 mb-[52px]">
              <span></span>
              <span></span>
              <span></span>
              <span>Take me home</span>
            </button>
          </NavLink>
        )}
        {/* <span>© 2018 - 2022 F8. Nền tảng học lập trình hàng đầu Việt Nam</span> */}
      </NotFoundPageStyle>
    </>
  );
};

export default NotFoundPage;
