// import Author from "components/Author";
import Author from "components/author/Author.js";
import React from "react";
import { v4 } from "uuid";
import SidebarItem from "./SidebarItem";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { setIsActive } from "redux/movieSlice";
import axios from "axios";
import { NavLink } from "react-router-dom";
import Logo from "components/other/Logo";

const sidebarGeneral = [
  {
    id: 1,
    title: "Dashboard",
    url: "/dashboard",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-7 h-7"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
        ></path>
      </svg>
    ),
  },
  {
    id: 2,
    title: "Posts",
    url: "/manage/user",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="w-7 h-7"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
        />
      </svg>
    ),
  },
  {
    id: 2,
    title: "Categories",
    url: "/manage/categories",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
        />
      </svg>
    ),
  },
  {
    id: 123,
    title: "Users",
    url: "/manage/user",
    icon: (
      <svg viewBox="0 0 28 24" fill="none" className="h-6 w-7">
        <path
          d="M11 19C11 19.9834 11.0979 20.6606 11.2925 21.1469C11.4709 21.593 11.7436 21.9128 12.2063 22.1699C12.7052 22.4471 13.452 22.6649 14.5896 22.8053C15.719 22.9448 17.1593 23 19 23C20.8407 23 22.281 22.9448 23.4104 22.8053C24.5479 22.6649 25.2948 22.4471 25.7937 22.1699C26.2564 21.9128 26.5291 21.593 26.7075 21.1469C26.9021 20.6606 27 19.9834 27 19C27 18.0166 26.9021 17.3394 26.7075 16.8531C26.5291 16.407 26.2564 16.0872 25.7937 15.8301C25.2948 15.5529 24.5479 15.3351 23.4104 15.1947C22.281 15.0552 20.8407 15 19 15C17.1593 15 15.719 15.0552 14.5896 15.1947C13.452 15.3351 12.7052 15.5529 12.2063 15.8301C11.7436 16.0872 11.4709 16.407 11.2925 16.8531C11.0979 17.3394 11 18.0166 11 19Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle
          r="5"
          transform="matrix(-1 0 0 1 19 6)"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path
          d="M11 3C8.6 3 7 5 7 7C7 9 8.6 11 11 11"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M6.86667 21C3.13333 21 1 20.5 1 17.5C1 14.5 3.13333 14 9 14"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    onclick: () => {},
  },
  {
    id: 123,
    title: "Pending",
    url: "/manage/user",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        className="w-6 h-6"
      >
        <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"></path>
        <path d="M13 7h-2v5.414l3.293 3.293 1.414-1.414L13 11.586z"></path>
      </svg>
    ),
    onclick: () => {},
  },
  {
    id: 2,
    title: "Log out",
    url: "/sign-in",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-7 h-7"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
        />
      </svg>
    ),
  },
];
const sidebarLitst = [{ id: 3, title: "General", sidebarItem: sidebarGeneral }];
const SidebarDashboardStyle = styled.div`
  width: 150px;
  position: relative;
  transition: all 0.2s linear;
  @media screen and (max-width: 1023.98px) {
    .sidebar {
      /* position: relative; */
    }
  }

  @media screen and (max-width: 767.98px) {
    position: absolute;
    z-index: 1002;
    transform: translate(-300%, -125px);
    .sidebar {
      background-color: black;
      width: 320px;
      height: 100vh;
      transition: all 0.2s linear;
    }
  }
`;
const SidebarDashboard = ({ className }) => {
  const { isActive } = useSelector((state, action) => state.news);
  const dispatch = useDispatch();
  const sidebar = document.querySelector(".sidebar");
  if (isActive === true) {
    sidebar?.classList.add("is-active");
  } else sidebar?.classList.remove("is-active");
  window.addEventListener("click", (e) => {
    // console.log(e.target);
    if (!sidebar?.contains(e.target) && !e.target.matches(".toggleBar")) {
      sidebar?.classList.remove("is-active");
      dispatch(setIsActive(false));
    }
    if (e.target.matches(".menu-item") || e.target.matches(".sidebar-item")) {
      sidebar?.classList.remove("is-active");
      dispatch(setIsActive(false));
    }
  });
  return (
    <SidebarDashboardStyle className={`${className}`}>
      <div className="fixed w-[150px] sidebar">
        {sidebarLitst.map((item) => {
          return (
            <SidebarItem
              classNameItem="!mb-[50px]"
              classNameTitle={"text-[15px]"}
              hasTitle={false}
              key={v4()}
              sidebarList={item.sidebarItem}
              title={item.title}
            ></SidebarItem>
          );
        })}
      </div>
    </SidebarDashboardStyle>
  );
};

export default SidebarDashboard;