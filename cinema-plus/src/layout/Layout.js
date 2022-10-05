import Sidebar from "modules/Sidebar";
import SidebarHome from "modules/SidebarHome";
import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import styled from "styled-components";
import SidebarDiscovery from "modules/SidebarDiscovery";
import { tmdbAPI } from "config/config";
const LayoutStyle = styled.div``;
const Layout = ({ page }) => {
  return (
    <LayoutStyle>
      <Header page={page}></Header>
      <div className="layout-main">
        <Sidebar></Sidebar>
        <div className="layout-children">
          <Outlet></Outlet>
        </div>
        {/* <SidebarDiscovery tmdbAPI={tmdbAPI}></SidebarDiscovery> */}
      </div>
    </LayoutStyle>
  );
};

export default Layout;
