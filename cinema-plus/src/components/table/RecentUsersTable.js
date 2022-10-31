import axios from "axios";
import ActionDelete from "components/action/ActionDelete";
import ActionEdit from "components/action/ActionEdit";
import SeeMore from "components/other/SeeMore";
import { clientSide } from "config/config";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { v4 } from "uuid";
import Table from "./Table";

const RecentUsersTable = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  useEffect(() => {
    axios.get(`${clientSide}/get/users`).then((response) => {
      setUsers(response.data);
    });
  }, []);
  let newestUserList = [...users]?.sort(
    (a, b) =>
      new Date(b?.createdAt.slice(0, 10)) - new Date(a?.createdAt.slice(0, 10))
  );
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
  const renderUserItem = (user) => {
    return (
      <tr key={v4()}>
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
        <td className="">
          <div className="flex gap-x-5">
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
  return (
    <div className="">
      <SeeMore title={"Recent users"} to="/manage/user"></SeeMore>
      <Table>
        <thead>
          <tr>
            <th>Info</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {newestUserList.length > 0 &&
            newestUserList.slice(0, 9).map((user) => {
              return renderUserItem(user);
            })}
        </tbody>
      </Table>
    </div>
  );
};

export default RecentUsersTable;
