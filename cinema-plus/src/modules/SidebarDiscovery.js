import Categories from "components/categories/Categories";
import Filter from "components/filter/Filter";
import Search from "components/search/Search";
import Sort from "components/sort/Sort";
import React from "react";
import styled from "styled-components";

const SidebarDiscoveryStyle = styled.div`
  .discovery-search {
    display: none;
  }
  @media screen and (max-width: 1023.98px) {
    z-index: 20;
    position: relative;
    margin-top: 10px;
    margin-bottom: 10px;
    /* width: 80%; */
    margin-left: auto;
    margin-right: auto;
    .discovery-search {
      display: block;
    }
    .sort {
      margin-top: 0;
    }
  }
  @media screen and (max-width: 767.98px) {
    position: relative;
    margin-top: 10px;
    margin-bottom: 10px;
    width: 100%;
    .discovery-search {
    }
    /* margin-left: 5px; */
    /* left: 0; */
    /* bottom: 0; */
    /* width: 200px; */
    /* display: none; */
    .sort {
      margin-top: 0;
    }
  }
`;
const SidebarDiscovery = ({ category, className }) => {
  return (
    <SidebarDiscoveryStyle className={className}>
      <Search className="discovery-search mb-5 z-[10]"></Search>
      <Sort category={category} className="sort"></Sort>
      <Filter category={category} className="filter"></Filter>
    </SidebarDiscoveryStyle>
  );
};

export default SidebarDiscovery;
