import Sidebar from "modules/Sidebar";
import SidebarDetail from "modules/SidebarDetail";
import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import Header from "./Header";
import styled from "styled-components";
import SidebarWatchTv from "modules/SidebarWatchTv";
const LayoutDetailStyle = styled.div`
  .header-detail,
  .sidebar-detail {
    display: none;
  }
  .layout-main-detail {
    display: grid;
    grid-template-columns: 50px minmax(0, 1fr) ${(props) =>
        props.columnRight ? "" : "250px"};
    column-gap: 50px;
  }
  @media screen and (max-width: 1023.98px) {
    .layout-main-detail {
      grid-template-columns: 60px 1fr;
      column-gap: 10px;
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
    }
  }
`;

const LayoutDetail = ({ columnRight = false }) => {
  return (
    <LayoutDetailStyle columnRight={columnRight}>
      <Header page="home" className="header-detail"></Header>
      <div className="layout-main-detail">
        <SidebarDetail></SidebarDetail>
        <Sidebar className="sidebar-detail"></Sidebar>
        <div className="layout-children">
          <Outlet></Outlet>
        </div>
      </div>
    </LayoutDetailStyle>
  );
};

export default LayoutDetail;
