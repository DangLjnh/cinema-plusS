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
    url: "/manage/posts",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M22 16.7399V4.66994C22 3.46994 21.02 2.57994 19.83 2.67994H19.77C17.67 2.85994 14.48 3.92994 12.7 5.04994L12.53 5.15994C12.24 5.33994 11.76 5.33994 11.47 5.15994L11.22 5.00994C9.44 3.89994 6.26 2.83994 4.16 2.66994C2.97 2.56994 2 3.46994 2 4.65994V16.7399C2 17.6999 2.78 18.5999 3.74 18.7199L4.03 18.7599C6.2 19.0499 9.55 20.1499 11.47 21.1999L11.51 21.2199C11.78 21.3699 12.21 21.3699 12.47 21.2199C14.39 20.1599 17.75 19.0499 19.93 18.7599L20.26 18.7199C21.22 18.5999 22 17.6999 22 16.7399Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12 5.48999V20.49"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M7.75 8.48999H5.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8.5 11.49H5.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
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
      <svg viewBox="0 0 28 24" fill="none" className="w-6 h-6">
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
    url: "/manage/pending/post",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M15.24 2H8.76004C5.00004 2 4.71004 5.38 6.74004 7.22L17.26 16.78C19.29 18.62 19 22 15.24 22H8.76004C5.00004 22 4.71004 18.62 6.74004 16.78L17.26 7.22C19.29 5.38 19 2 15.24 2Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
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
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6"
      >
        <path
          d="M1 12C1 14.34 1.06106 16.0017 1.25668 17.2352C1.4501 18.4548 1.76102 19.1562 2.18952 19.6492C2.62684 20.1523 3.28127 20.5491 4.39218 20.9735C5.21877 21.2892 6.21147 21.5906 7.45436 21.9679C7.90366 22.1042 8.38566 22.2506 8.90432 22.4111C10.7506 22.9824 12.0615 23.1022 12.9939 22.9235C13.8671 22.7562 14.4688 22.3176 14.928 21.562C15.4168 20.7577 15.753 19.5733 15.956 17.9349C16.1573 16.3094 16.2174 14.3317 16.2174 12C16.2174 9.66824 16.1573 7.69057 15.956 6.06507C15.753 4.42669 15.4168 3.24233 14.928 2.43805C14.4688 1.68242 13.8671 1.24377 12.9939 1.07648C12.0614 0.897844 10.7506 1.01757 8.90431 1.58891C8.38572 1.74939 7.90378 1.89568 7.45453 2.03205C6.21156 2.40934 5.21881 2.71068 4.39218 3.02646C3.28127 3.45084 2.62684 3.8476 2.18952 4.35072C1.76102 4.8437 1.4501 5.54512 1.25668 6.76477C1.06106 7.99824 1 9.65992 1 12Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <ellipse
          rx="0.956522"
          ry="0.960001"
          transform="matrix(-1 0 0 1 12.4348 12.1621)"
          fill="currentColor"
        />
        <path
          d="M16.2609 20.64C21.0435 20.64 21.0435 19.4727 21.0435 12.1554C21.0435 4.83798 21.0435 3.35999 16.2609 3.35999"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
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
