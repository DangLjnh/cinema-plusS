import Button from "components/button/Button";
import DashboardItem from "components/dashboard/DashboardItem";
import ManageTitle from "components/title/ManageTitle";
import UsersTable from "../components/table/UsersTable";
import React from "react";
import styled from "styled-components";
import { v4 } from "uuid";
import Table from "components/table/Table";
import ActionEdit from "components/action/ActionEdit";
import ActionDelete from "components/action/ActionDelete";
import { useState } from "react";
import { clientSide } from "config/config";
import axios from "axios";
import { useEffect } from "react";
import RecentPostsTable from "components/table/RecentPostsTable";
import RecentUsersTable from "components/table/RecentUsersTable";
const DashboardPageStyle = styled.div`
  .grid-table {
    grid-template-columns: 2fr 1fr;
  }
  .see-more {
    svg {
      transition: stroke 0.2s linear;
    }
    p {
      transition: all 0.2s linear;
    }
    &:hover {
      p {
        color: white;
      }
      svg {
        stroke: white;
      }
    }
  }
`;
const DashboardPage = () => {
  const [users, setUsers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    axios.get(`${clientSide}/get/users`).then((response) => {
      setUsers(response.data);
    });
    axios.get(`${clientSide}/get/categories`).then((response) => {
      setCategories(response.data);
    });
    axios.get(`${clientSide}/get/posts`).then((response) => {
      setPosts(response.data);
    });
  }, []);
  const dashboardList = [
    {
      id: 11,
      bgColor: "bg-sky-200",
      number: users.length,
      title: "Users",
      icon: (
        <svg
          className="w-9 h-9"
          viewBox="0 0 32 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9 16C9 16.7707 9.08597 17.2679 9.23736 17.6085C9.37083 17.9088 9.57842 18.1417 9.97671 18.3408C10.4105 18.5577 11.0689 18.7319 12.0811 18.8443C13.0843 18.9558 14.3639 19 16 19C17.6361 19 18.9157 18.9558 19.9189 18.8443C20.9311 18.7319 21.5895 18.5577 22.0233 18.3408C22.4216 18.1417 22.6292 17.9088 22.7626 17.6085C22.914 17.2679 23 16.7707 23 16C23 15.2293 22.914 14.7321 22.7626 14.3915C22.6292 14.0912 22.4216 13.8583 22.0233 13.6592C21.5895 13.4423 20.9311 13.2681 19.9189 13.1557C18.9157 13.0442 17.6361 13 16 13C14.3639 13 13.0843 13.0442 12.0811 13.1557C11.0689 13.2681 10.4105 13.4423 9.97671 13.6592C9.57842 13.8583 9.37083 14.0912 9.23736 14.3915C9.08597 14.7321 9 15.2293 9 16Z"
            stroke="#3867d6"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle
            r="4"
            transform="matrix(-1 0 0 1 16 5)"
            stroke="#3867d6"
            strokeWidth="2"
          />
          <path
            d="M23 3C24.8 3 26 4.5 26 6C26 7.5 24.8 9 23 9"
            stroke="#3867d6"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M9 3C7.2 3 6 4.5 6 6C6 7.5 7.2 9 9 9"
            stroke="#3867d6"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M26.6 18C29.4 18 31 17.5714 31 15C31 12.4286 29.4 12 25 12"
            stroke="#3867d6"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M5.4 18C2.6 18 1 17.5714 1 15C1 12.4286 2.6 12 7 12"
            stroke="#3867d6"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      id: 12,
      bgColor: "bg-[#a6f4d0]",
      number: posts.length,
      title: "Posts",
      // #218c74s #8e44ad #e9d5ff
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="w-9 h-9"
          stroke="#218c74"
          fill="none"
        >
          <path d="M21 8c-.202 0-4.85.029-9 2.008C7.85 8.029 3.202 8 3 8a1 1 0 0 0-1 1v9.883a1 1 0 0 0 .305.719c.195.188.48.305.729.28l.127-.001c.683 0 4.296.098 8.416 2.025.016.008.034.005.05.011.119.049.244.083.373.083s.254-.034.374-.083c.016-.006.034-.003.05-.011 4.12-1.928 7.733-2.025 8.416-2.025l.127.001c.238.025.533-.092.729-.28.194-.189.304-.449.304-.719V9a1 1 0 0 0-1-1zM4 10.049c1.485.111 4.381.48 7 1.692v7.742c-3-1.175-5.59-1.494-7-1.576v-7.858zm16 7.858c-1.41.082-4 .401-7 1.576v-7.742c2.619-1.212 5.515-1.581 7-1.692v7.858z"></path>
          <circle cx="12" cy="5" r="3"></circle>
        </svg>
      ),
    },
    {
      id: 13,
      bgColor: "bg-[#ffcccc]",
      number: categories.length,
      title: "Categories",
      // #218c74s #8e44ad #e9d5ff
      icon: (
        <svg
          viewBox="0 0 26 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-8 h-8"
        >
          <circle cx="6" cy="18" r="1" fill="#d27575" />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M2.23044 17.8231C2.06632 16.3462 2 14.4487 2 12C2 9.55133 2.06632 7.6538 2.23044 6.17691C2.39657 4.68189 2.64923 3.76218 2.93598 3.18868C3.18721 2.68622 3.45451 2.46222 3.79035 2.31294C4.20686 2.12781 4.87032 2 6 2C7.12968 2 7.79314 2.12781 8.20965 2.31294C8.54549 2.46222 8.81279 2.68622 9.06402 3.18868C9.35077 3.76218 9.60343 4.68189 9.76956 6.17691C9.93368 7.6538 10 9.55133 10 12C10 14.4487 9.93368 16.3462 9.76956 17.8231C9.60343 19.3181 9.35077 20.2378 9.06402 20.8113C8.81279 21.3138 8.54549 21.5378 8.20965 21.6871C7.79314 21.8722 7.12968 22 6 22C4.87032 22 4.20686 21.8722 3.79035 21.6871C3.45451 21.5378 3.18721 21.3138 2.93598 20.8113C2.64923 20.2378 2.39657 19.3181 2.23044 17.8231ZM6 24C1.059 24 0 21.882 0 12C0 2.118 1.059 0 6 0C9.31139 0 10.8792 0.951299 11.5531 4.55342C16.2385 0.366177 18.2887 0.319076 21.2122 3.24259C24.0052 6.03564 24.0869 8.03153 20.4373 12.2898C24.8747 12.8595 26 14.3985 26 18.0001C26 22.9411 23.882 24.0001 14 24.0001C11.6612 24.0001 9.75734 23.9408 8.21348 23.7847C7.5803 23.9377 6.84722 24 6 24ZM10.7243 21.9464C11.6894 21.9835 12.7758 22.0001 14 22.0001C16.4487 22.0001 18.3462 21.9338 19.8231 21.7697C21.3181 21.6035 22.2378 21.3509 22.8113 21.0641C23.3138 20.8129 23.5378 20.5456 23.6871 20.2098C23.8722 19.7932 24 19.1298 24 18.0001C24 16.8704 23.8722 16.207 23.6871 15.7905C23.5378 15.4546 23.3138 15.1873 22.8113 14.9361C22.2378 14.6493 21.3181 14.3967 19.8231 14.2305C19.4915 14.1937 19.1387 14.1618 18.7633 14.1344C18.2186 14.7085 17.6212 15.3189 16.9695 15.9705C14.5208 18.4193 12.6543 20.1018 11.1123 21.1041C10.9969 21.4146 10.868 21.6945 10.7243 21.9464ZM12 12C12 10.0411 11.9584 8.38726 11.8532 6.99454C12.7244 6.17301 13.4917 5.49463 14.179 4.94484C15.3536 4.00517 16.1826 3.5335 16.7909 3.33073C17.3238 3.15309 17.6712 3.1837 18.0142 3.31563C18.4397 3.47924 18.9992 3.85799 19.798 4.6568C20.5968 5.45561 20.9755 6.01511 21.1391 6.44054C21.2711 6.78357 21.3017 7.13098 21.124 7.66391C20.9213 8.2722 20.4496 9.1012 19.5099 10.2758C18.5817 11.4362 17.2868 12.8248 15.5553 14.5563C14.0533 16.0583 12.8093 17.2317 11.7485 18.1223C11.9316 16.5212 12 14.5113 12 12Z"
            fill="#d27575"
          />
        </svg>
      ),
    },
    {
      id: 15,
      bgColor: "bg-[#eac392]",
      number: `~954.414`,
      title: "Films",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="w-8 h-8"
          fill="#ccae62"
        >
          <path d="M18 11c0-.959-.68-1.761-1.581-1.954C16.779 8.445 17 7.75 17 7c0-2.206-1.794-4-4-4-1.517 0-2.821.857-3.5 2.104C8.821 3.857 7.517 3 6 3 3.794 3 2 4.794 2 7c0 .902.312 1.727.817 2.396A1.994 1.994 0 0 0 2 11v8c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2v-2.638l4 2v-7l-4 2V11zm-5-6c1.103 0 2 .897 2 2s-.897 2-2 2-2-.897-2-2 .897-2 2-2zM6 5c1.103 0 2 .897 2 2s-.897 2-2 2-2-.897-2-2 .897-2 2-2zM4 19v-8h12l.002 8H4z"></path>
        </svg>
      ),
    },
  ];
  return (
    <DashboardPageStyle>
      <div className="flex items-center justify-between">
        <ManageTitle
          title="Dashboard"
          desc="Here you can manage dashboard."
        ></ManageTitle>
      </div>
      <div className="grid grid-cols-4 gap-x-8">
        {dashboardList.map((item) => {
          return (
            <DashboardItem
              bgColor={item.bgColor}
              number={item.number}
              icon={item.icon}
              title={item.title}
              key={v4()}
            ></DashboardItem>
          );
        })}
      </div>
      <div className="grid mt-10 mb-10 grid-table gap-x-10">
        <RecentPostsTable></RecentPostsTable>
        <RecentUsersTable></RecentUsersTable>
      </div>
    </DashboardPageStyle>
  );
};

export default DashboardPage;
