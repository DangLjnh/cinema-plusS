import axios from "axios";
import ActionDelete from "components/action/ActionDelete";
import ActionEdit from "components/action/ActionEdit";
import ActionView from "components/action/ActionView";
import LabelStatus from "components/label/LabelStatus";
import SeeMore from "components/other/SeeMore";
import { clientSide } from "config/config";
import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { status } from "utils/constant";
import { v4 } from "uuid";
import Table from "./Table";

const RecentPostsTable = () => {
  const itemsPerTable = 8;
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    axios.get(`${clientSide}/get/posts`).then((response) => {
      setPosts(response.data);
    });
  }, []);
  let newestPostList = [...posts]?.sort(
    (a, b) =>
      new Date(b?.createdAt.slice(0, 10)) - new Date(a?.createdAt.slice(0, 10))
  );
  const renderPostStatus = (statuss) => {
    switch (statuss) {
      case status.approve:
        return <LabelStatus type="success">Active</LabelStatus>;
      case status.pending:
        return <LabelStatus type="warning">Pending</LabelStatus>;
      case status.reject:
        return <LabelStatus type="danger">Reject</LabelStatus>;
      default:
        break;
    }
  };
  const handleDeletePost = (post) => {
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
          .post(`${clientSide}/delete/post/${post.postID}`, {
            postID: post.postID,
          })
          .then((res) => {
            if (res) {
              axios.get(`${clientSide}/get/posts`).then((response) => {
                setPosts(response.data);
              });
            }
          });
      }
    });
  };
  const renderPostItem = (post) => {
    if (!post) return;
    return (
      <tr key={v4()}>
        <td className="flex items-center gap-x-3">
          <img
            src={post.photoURL}
            alt=""
            className="flex-shrink-0 object-cover w-10 h-10 rounded-full"
          />
          <div className="flex-1">
            <p className="text-[#dfe6e9] capitalize" title={post.title}>
              {post.title.length < 30
                ? post.title
                : `${post.title.slice(0, 28)}...`}
            </p>
            <p className="text-sm text-gray-400">
              {post.createdAt.slice(0, 10)}
            </p>
          </div>
        </td>
        <td>
          {post.nameAuthor.length < 11
            ? post.nameAuthor
            : `${post.nameAuthor.slice(0, 10)}...`}
        </td>
        <td>{renderPostStatus(post.status)}</td>
        <td className="flex items-center gap-x-3">
          <ActionView
            onClick={() => navigate(`/blog/post/${post.slug}/${post.postID}`)}
          ></ActionView>
          <ActionEdit
            onClick={() => navigate(`/manage/post/update-post/${post.postID}`)}
          ></ActionEdit>
          <ActionDelete
            onClick={() => {
              handleDeletePost(post);
            }}
          ></ActionDelete>
        </td>
      </tr>
    );
  };
  return (
    <div>
      <SeeMore title={"Recent posts"} to="/manage/posts"></SeeMore>
      <Table>
        <thead>
          <tr>
            <th>Post</th>
            <th>Author</th>
            <th>Status</th>
            <th className="bg-">Action</th>
          </tr>
        </thead>
        <tbody>
          {newestPostList.slice(0, itemsPerTable).map((post) => {
            console.log(post);
            return renderPostItem(post);
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default RecentPostsTable;
