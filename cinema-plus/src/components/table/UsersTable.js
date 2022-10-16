import axios from "axios";
import ActionDelete from "components/action/ActionDelete";
import ActionEdit from "components/action/ActionEdit";
import LabelStatus from "components/label/LabelStatus";
import Paginate from "components/other/Paginate";
import { clientSide, serverSide } from "config/config";
import { UserContext } from "contexts/UserProvider";
import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Swal from "sweetalert2";
import { userProvider, userRole, userStatus } from "utils/constant";
import Table from "./Table";
const UserTableStyle = styled.div`
  .pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 15px;
    li {
      cursor: pointer;
    }
    li:not(:first-child, :last-child) {
      a {
        padding: 8px 15px;
        /* width: 35px;
      height: 35px; */
        border-radius: 50%;
        font-size: 15px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #262628;
        &:hover {
          background-color: #404040;
        }
      }
    }
    .selected {
      a {
        color: white;
        background-color: ${(props) => props.theme.blueLight} !important;
      }
    }
  }
`;
const UsersTable = ({ className }) => {
  const itemsPerPage = 8;
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [itemPrevPage, setItemPrevPage] = useState(0);
  const [itemAfterPage, setItemAfterPage] = useState(8);
  const [pageCount, setPageCount] = useState(0);
  let [currentUser] = useContext(UserContext);
  const usersFilterAdmin = users?.filter((user) => {
    return user?.role !== userRole.admin;
  });
  useEffect(() => {
    setPageCount(Math.ceil(usersFilterAdmin.length / itemsPerPage));
  }, [usersFilterAdmin.length]);
  useEffect(() => {
    axios.get(`${serverSide}/get/users`).then((response) => {
      setUsers(response.data);
    });
  }, []);
  const handleDeleteUser = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#7877fa",
      cancelButtonColor: "#ee5253",
      confirmButtonText: "Yes, delete it!",
      // iconColor: "#7877fa",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "User has been deleted.",
          icon: "success",
          confirmButtonColor: "#7877fa",
        });
        axios
          .post(`${clientSide}/delete/user/${user.uid}`, {
            uid: user.uid,
          })
          .then((res) => {
            if (res) {
              axios.get(`${clientSide}/get/users`).then((response) => {
                setUsers(response.data);
              });
            }
          });
      }
    });
  };
  const renderLabelStatus = (status) => {
    switch (status) {
      case userStatus.active:
        return <LabelStatus type="success">Active</LabelStatus>;
      case userStatus.ban:
        return <LabelStatus type="danger">Ban</LabelStatus>;
      default:
        break;
    }
  };
  const renderLabelRole = (role) => {
    switch (role) {
      case userRole.admin:
        return <LabelStatus type="admin">Admin</LabelStatus>;
      case userRole.mod:
        return <LabelStatus type="mod">Moderator</LabelStatus>;
      case userRole.user:
        return <LabelStatus type="user">User</LabelStatus>;
      default:
        break;
    }
  };
  const renderProvider = (provider) => {
    switch (provider) {
      case userProvider.cinemaPlus:
        return (
          <img
            className="w-[25px] h-[26px] rounded-md"
            src="../cinemaPlus-logo.png"
            alt=""
          />
        );
      case userProvider.facebook:
        return (
          <img
            className="w-[25px h-[25px]"
            src="https://kt.city/static/icon-social-facebook.svg"
            alt=""
          />
        );
      case userProvider.google:
        return (
          <img
            className="w-[25px h-[25px]"
            src="https://kt.city/static/icon-social-google.svg"
            alt=""
          />
        );
      default:
        break;
    }
  };
  const renderUserItem = (user) => {
    if (!user) return;
    return (
      <tr key={user.uid}>
        <td title={user.id}>{user?.uid}</td>
        <td className="flex items-center gap-x-3">
          <img
            src={user.photoURL || "/user.png"}
            alt=""
            className="flex-shrink-0 object-cover w-10 h-10 rounded-full"
          />
          <div className="flex-1">
            <p className="text-[#dfe6e9] capitalize">{user.displayName}</p>
            <p className="text-sm text-gray-400">
              {user.createdAt.slice(0, 10)}
            </p>
          </div>
        </td>
        <td title={user.email}>{user.email}</td>
        <td>{renderLabelStatus(Number(user?.status))}</td>
        <td>{renderLabelRole(Number(user?.role))}</td>
        <td className="flex items-center justify-center">
          {renderProvider(Number(user?.provider))}
        </td>
        <td>
          <div className="flex items-center gap-x-3">
            <ActionEdit
              onClick={() => navigate(`/manage/user/update-user/${user.uid}`)}
            ></ActionEdit>
            <ActionDelete
              onClick={() => {
                handleDeleteUser(user);
              }}
            ></ActionDelete>
          </div>
        </td>
      </tr>
    );
  };
  const handlePageClick = (e) => {
    setItemPrevPage(e.selected * 8);
    setItemAfterPage((e.selected + 1) * 8);
    window.scrollTo(0, 0);
  };
  return (
    <UserTableStyle className={className}>
      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Info</th>
            <th>Email</th>
            <th>Status</th>
            <th>Role</th>
            <th>Provider</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {usersFilterAdmin?.length > 0 &&
            usersFilterAdmin.slice(itemPrevPage, itemAfterPage).map((user) => {
              if (currentUser.uid === user.uid) return null;
              return renderUserItem(user);
            })}
        </tbody>
      </Table>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={1}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        className="my-10 pagination"
      />
    </UserTableStyle>
  );
};

export default UsersTable;
