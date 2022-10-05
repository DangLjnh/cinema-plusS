import { tmdbAPI, tvAPI } from "config/config";
import Sidebar from "modules/Sidebar";
import SidebarDiscovery from "modules/SidebarDiscovery";
import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import styled from "styled-components";
const LayoutDiscoveryStyle = styled.div`
  @media screen and (max-width: 1023.98px) {
    .layout-main {
      display: grid;
      grid-template-columns: 200px minmax(0, 1fr);
      column-gap: 30px;
      .layout-children {
        grid-row: 2/3;
        grid-column: 2/3;
      }
      .sidebar-discovery {
        grid-row: 1/2;
        grid-column: 2/3;
      }
    }
  }
  @media screen and (max-width: 767.98px) {
    .layout-main {
      grid-template-columns: 1fr;
      column-gap: 0;
      .layout-children {
        grid-row: 2/3;
        grid-column: 2/3;
        max-width: 350px;
      }
      .sidebar-discovery {
        grid-row: 1/2;
        grid-column: 2/3;
      }
    }
  }
`;
const LayoutDiscovery = ({ category }) => {
  return (
    <LayoutDiscoveryStyle>
      <Header page="discovery"></Header>
      <div className="layout-main">
        <Sidebar></Sidebar>
        <div className="layout-children">
          <Outlet></Outlet>
        </div>
        <SidebarDiscovery
          category={category}
          className="sidebar-discovery"
        ></SidebarDiscovery>
      </div>
    </LayoutDiscoveryStyle>
  );
};

export default LayoutDiscovery;
