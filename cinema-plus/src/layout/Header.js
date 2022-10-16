import Author from "components/author/Author.js";
import Logo from "components/other/Logo";
import Search from "components/search/Search";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { setIsActive } from "redux/movieSlice";
import styled from "styled-components";
import { v4 } from "uuid";

const HeaderStyle = styled.div`
  display: grid;
  grid-template-columns: 200px minmax(0, 1fr) 250px;
  column-gap: 20px;
  position: sticky;
  position: -webkit-sticky;
  top: 0; /* required */
  z-index: 100; /* position: relative; */
  .toggleBar {
    display: none;
    &:hover {
      svg {
        path {
          stroke: white;
        }
      }
    }
    svg,
    path {
      pointer-events: none;
    }
  }
  @media screen and (max-width: 1023.98px) {
    grid-template-columns: 200px 1fr;
    .search-header {
      display: none;
    }
    .image-logo {
      h2 {
        font-size: 15px;
      }
      span {
        font-size: 22px;
      }
    }
  }
  @media screen and (max-width: 767.98px) {
    grid-template-columns: 1fr;
    row-gap: 10px;
    padding: 20px 0;
    .toggleBar {
      cursor: pointer;
      display: block;
      position: absolute;
      top: 20%;
      right: 0;
      transform: translateX(-50%);
    }
    .direction {
      .direction-name {
        font-size: 14px;
      }
    }
  }
  @media screen and (max-width: 374.98px) {
    .direction {
      .direction-name {
        font-size: 13px;
      }
    }
  }
`;

const Header = ({ page, className }) => {
  const { isActive } = useSelector((state, action) => state.news);
  const dispatch = useDispatch();
  let directions = [];
  switch (page) {
    case "home":
      directions = [
        {
          id: 1,
          title: "Movie",
          url: "/",
        },
        {
          id: 2,
          title: "Tv Shows",
          url: "/tvshow",
        },
      ];
      break;
    case "discovery":
      directions = [
        {
          id: 1,
          title: "Movie",
          url: "/discovery/movie",
        },
        {
          id: 2,
          title: "Tv Shows",
          url: "/discovery/tvshow",
        },
      ];
      break;
    default:
      break;
  }

  const handleToogleBar = (e) => {
    dispatch(setIsActive(!isActive));
    // this.toogle.current;
  };
  return (
    <HeaderStyle
      className={`top-0 grid w-full grid-cols-3 py-8 layout bg-bgDark header ${className}`}
    >
      <Logo></Logo>
      <span className="toggleBar" onClick={handleToogleBar}>
        <svg
          width="24"
          height="20"
          viewBox="0 0 14 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13 1H1M13 5H9M13 9H5"
            stroke="#757279"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <div className="flex items-center justify-between">
        <div className="direction">
          {directions.map((item) => {
            return (
              <NavLink
                key={v4()}
                className={({ isActive }) =>
                  isActive ? "font-bold text-white" : ""
                }
                to={item.url}
              >
                <span className={`mr-5 text-base direction-name`}>
                  {item.title}
                </span>
              </NavLink>
            );
          })}
        </div>
        <Author dashboard={true} manageUser={false}></Author>
      </div>
      {page === "discovery" && <Search className={"search-header"}></Search>}
    </HeaderStyle>
  );
};

export default Header;
