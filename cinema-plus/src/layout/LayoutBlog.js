import Author from "../components/author/Author";
import Sidebar from "modules/Sidebar";
import SidebarDashboard from "modules/SidebarDashboard";
import SidebarDetail from "modules/SidebarDetail";
import React from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Header from "./Header";
import Logo from "components/other/Logo";
const LayoutBlogStyle = styled.div`
  margin: 0 80px;
  .header-detail {
    display: none;
  }
  @media screen and (max-width: 1023.98px) {
  }
  @media screen and (max-width: 767.98px) {
    .header-dashboard {
      display: none;
    }
    .header-detail {
      position: relative;
      display: grid;
    }
  }
`;
const LayoutBlog = () => {
  return (
    <LayoutBlogStyle>
      <Header page="home" className=" header-detail"></Header>
      <div className="flex justify-between my-10 header-dashboard">
        <Logo className={"w-[180px] "}></Logo>
        <div className="flex items-center gap-x-5">
          <p className="text-white">Movie</p>
          <p className="">Tv show</p>
        </div>
        <div className="flex items-center justify-end gap-x-5">
          <Author></Author>
        </div>
      </div>
      <div className="layout-main-detail">
        <div className="layout-children">
          <Outlet></Outlet>
        </div>
      </div>
    </LayoutBlogStyle>
  );
};

export default LayoutBlog;
