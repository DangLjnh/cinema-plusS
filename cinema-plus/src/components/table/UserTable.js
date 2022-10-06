import axios from "axios";
import ActionDelete from "components/action/ActionDelete";
import ActionEdit from "components/action/ActionEdit";
import LabelStatus from "components/label/LabelStatus";
import { clientSide, serverSide } from "config/config";
import { UserContext } from "contexts/UserProvider";
import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Swal from "sweetalert2";
import { userRole, userStatus } from "utils/constant";
import Table from "./Table";
const UserTableStyle = styled.div``;
const UserTable = () => {
  const [users, setUsers] = useState([]);
  // let [users, setUsers] = useContext(UserContext);
  const navigate = useNavigate();
  useEffect(() => {
    axios.get(`${serverSide}/get/users`).then((response) => {
      setUsers(response.data);
    });
  }, []);
  const handleDeleteUser = (user) => {
    console.log("🚀 ~ file: UserTable.js ~ line 19 ~ UserTable ~ users", users);
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
        axios.post(`${clientSide}/delete/user/${user.uid}`, {
          uid: user.uid,
        });
        setTimeout(() => {
          axios.get(`${serverSide}/get/users`).then((response) => {
            setUsers(response.data);
          });
        }, 1000);
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
  const renderUserItem = (user) => {
    if (!user) return;
    return (
      <tr key={user.uid}>
        <td title={user.id}>{user?.uid}</td>
        <td className="flex items-center gap-x-3">
          <img
            src={user.avatar || "/user.png"}
            alt=""
            className="flex-shrink-0 object-cover w-10 h-10 rounded-full"
          />
          <div className="flex-1">
            <p className="text-[#dfe6e9]">{user.displayName}</p>
            <p className="text-sm text-gray-400">
              {user.createdAt.slice(0, 10)}
            </p>
          </div>
        </td>
        <td title={user.email}>{user.email}</td>
        <td>{renderLabelStatus(Number(user?.status))}</td>
        <td>{renderLabelRole(Number(user?.role))}</td>
        <td>
          <div className="flex items-center gap-x-3">
            <ActionEdit
              onClick={() => navigate(`/manage-user/update-user/${user.uid}`)}
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
  return (
    <UserTableStyle>
      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Info</th>
            <th>Email</th>
            <th>Status</th>
            <th>Role</th>
            <th className="bg-">Action</th>
          </tr>
        </thead>
        <tbody>
          {users?.length > 0 && users.map((user) => renderUserItem(user))}
        </tbody>
      </Table>
    </UserTableStyle>
  );
};

export default UserTable;
