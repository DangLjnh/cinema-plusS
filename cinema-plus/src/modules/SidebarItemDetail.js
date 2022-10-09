import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { v4 } from "uuid";
import styled from "styled-components";
import axios from "axios";
import { useContext } from "react";
import { UserContext } from "contexts/UserProvider";
import { toast } from "react-toastify";
import { auth } from "../firebase/config";
import { deleteUser } from "firebase/auth";
const SidebarItemStyle = styled.div`
  .sidebar-item-title {
    background: ${(props) => props.theme.gradiendGray};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  .sidebar-title {
    background: -webkit-linear-gradient(#9841f4, #5ba8ff);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  .is-active {
    .sidebar-item-title {
      font-weight: 700;
      background: -webkit-linear-gradient(#eee, #eee);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .sidebar-item {
      &::after {
        position: absolute;
        content: "";
        width: 3px;
        height: 100%;
        right: -10px;
        background-color: #6680c0;
      }
    }
    .sidebar-icon {
      color: #6680c0;
    }
    svg {
      fill: none;
      path {
        stroke: #6680c0;
      }
    }
  }
  .sidebar-item {
    &:hover {
      .sidebar-item-title {
        font-weight: 700;
        background: -webkit-linear-gradient(#eee, #eee);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        cursor: pointer;
      }
      svg {
        path {
          stroke: #6680c0;
        }
      }
    }
  }
  @media screen and (max-width: 1023.98px) {
    .sidebar-title {
      margin-bottom: 15px;
    }
  }
  @media screen and (max-width: 767.98px) {
    margin-left: 50px;
    margin-top: 50px;
    .is-active {
      .sidebar-item {
        &::after {
          right: 0;
        }
      }
    }
    .sidebar-item {
      &:hover {
        &::after {
          right: 0;
        }
      }
    }
  }
`;
const SidebarItemDetail = ({ sidebarList, title }) => {
  const navigate = useNavigate();
  let [currentUser, setCurrentUser] = useContext(UserContext);
  const user = auth.currentUser;
  if (!sidebarList) return null;
  return (
    <SidebarItemStyle className="menu">
      {sidebarList.map((item) => {
        return (
          <NavLink
            className={({ isActive }) => (isActive ? "is-active" : "")}
            to={item?.url}
            key={v4()}
            onClick={() => {
              if (item.title === "Log out") {
                setCurrentUser({});
                axios
                  .post("http://localhost:3000/delete/currentUser", {
                    uid: currentUser.uid,
                    displayName: currentUser.displayName,
                    email: currentUser.email,
                    password: currentUser.password,
                    photoURL: currentUser.photoURL,
                    createdAt: currentUser.createdAt,
                    role: currentUser.role,
                  })
                  .then((res) => console.log("success, dictionary sent,", res))
                  .catch((err) => {
                    console.log(err.response);
                  });
                navigate("/sign-in");
                toast.success("Log out successfull!");
                auth.signOut();
                deleteUser(user);
                window.location.reload();
              }
            }}
          >
            <div
              className={`relative flex items-center h-full mb-[30px] text-[15px] menu-item sidebar-item hover:text-blueLight`}
            >
              <span className={`p-1 sidebar-icon`}>{item.icon}</span>
            </div>
          </NavLink>
        );
      })}
    </SidebarItemStyle>
  );
};

export default SidebarItemDetail;
