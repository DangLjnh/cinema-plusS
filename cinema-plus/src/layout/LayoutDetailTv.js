import Sidebar from "modules/Sidebar";
import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import Header from "./Header";
import styled from "styled-components";
import SidebarDetail from "modules/SidebarDetail";
import SidebarWatchTv from "modules/SidebarWatchTv";
const LayoutDetailStyle = styled.div`
  .header-detail,
  .sidebar-detail {
    display: none;
  }
  .layout-main-detail {
    display: grid;
    grid-template-columns: 50px minmax(0, 1fr) 250px;
    column-gap: 50px;
  }
  @media screen and (max-width: 1023.98px) {
    .layout-main-detail {
      grid-template-columns: 60px 1fr;
      column-gap: 10px;
      .sidebar-watch-tv {
        grid-column: 2/3;
      }
    }
  }
  @media screen and (max-width: 767.98px) {
    .sidebar-detail {
      display: block;
    }
    .header-detail {
      position: relative;
      display: grid;
    }
    .layout-main-detail {
      grid-template-columns: 1fr;
      .sidebar-watch-tv {
        grid-column: 1/2;
      }
    }
  }
`;

const LayoutDetailTv = () => {
  return (
    <LayoutDetailStyle>
      <Header page="home" className="header-detail"></Header>
      <div className="layout-main-detail">
        <SidebarDetail className={"sidebar-tv-detail"}></SidebarDetail>
        <Sidebar className="sidebar-detail"></Sidebar>
        <div className="layout-children">
          <Outlet></Outlet>
        </div>
        <SidebarWatchTv className={"sidebar-watch-tv"}></SidebarWatchTv>
      </div>
    </LayoutDetailStyle>
  );
};

export default LayoutDetailTv;
