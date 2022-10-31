import Author from "../components/author/Author";
import Sidebar from "modules/Sidebar";
import SidebarDashboard from "modules/SidebarDashboard";
import SidebarDetail from "modules/SidebarDetail";
import React, { useContext } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Header from "./Header";
import Logo from "components/other/Logo";
import Button from "components/button/Button";
import { UserContext } from "contexts/UserProvider";
const LayoutBlogStyle = styled.div`
  margin: 0 80px;
  min-height: 100vh;
  /* margin: 0 auto -50px; */
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
  const navigate = useNavigate();
  let [currentUser] = useContext(UserContext);
  return (
    <>
      <LayoutBlogStyle>
        <Header page="home" className=" header-detail"></Header>
        <div className="flex justify-between my-10 header-dashboard">
          <Logo className={"w-[180px] "}></Logo>
          {currentUser.role === 1 && (
            <Button
              className={"text-white h-[48px]"}
              onClick={() => navigate("/dashboard")}
            >
              Dashboard
            </Button>
          )}
          <Button
            className={"text-white h-[48px]"}
            onClick={() => navigate("/")}
          >
            Go to watch movie
          </Button>
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
      <footer className="mt-auto h-[20px] p-5 text-white -mx-5 bg-neutral-600 flex justify-between items-center">
        <p>Copyright Dang Linh © 19/7/2022</p>
        <div className="flex items-center gap-x-3">
          <p>facebook</p>
          <p>ithub</p>
        </div>
      </footer>
    </>
  );
};

export default LayoutBlog;
