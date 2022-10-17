import axios from "axios";
import ActionDelete from "components/action/ActionDelete";
import ActionEdit from "components/action/ActionEdit";
import ActionView from "components/action/ActionView";
import LabelStatus from "components/label/LabelStatus";
import { clientSide } from "config/config";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { status } from "utils/constant";
import { v4 } from "uuid";
import Table from "./Table";

const PostsTable = () => {
  const itemsPerPage = 8;
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [itemPrevPage, setItemPrevPage] = useState(0);
  const [itemAfterPage, setItemAfterPage] = useState(8);
  const [pageCount, setPageCount] = useState(0);
  useEffect(() => {
    axios.get(`${clientSide}/get/posts`).then((response) => {
      setPosts(response.data);
    });
  }, []);
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
  const renderPostItem = (post) => {
    if (!post) return;
    return (
      <tr key={v4()}>
        <td>{post.postID}</td>
        <td className="!pr-[50px]">
          <div className="flex items-center gap-x-3">
            <img
              src={post.photoURL || "/default-image.png"}
              alt=""
              className="w-[66px] h-[55px] rounded object-cover"
            />
            <div className="flex-1">
              <h3 className="font-medium">{post.title}</h3>
              <time className="text-sm text-gray-400">
                {post.createdAt.slice(0, 10)}
              </time>
            </div>
          </div>
        </td>
        <td>
          <span>{post.categoryName}</span>
        </td>
        <td>
          <span>{post.nameAuthor}</span>
        </td>
        <td>{renderPostStatus(post.status)}</td>
        <td>
          <div className="flex items-center gap-x-3">
            <ActionView
              onClick={() => navigate(`/blog/post/${post.slug}/${post.postID}`)}
            ></ActionView>
            <ActionEdit
            // onClick={() => navigate(`/manage/user/update-user/${user.uid}`)}
            ></ActionEdit>
            <ActionDelete
            // onClick={() => {
            //   handleDeleteUser(user);
            // }}
            ></ActionDelete>
          </div>
        </td>
      </tr>
    );
  };
  return (
    <div>
      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Post</th>
            <th>Category</th>
            <th>Author</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts?.length > 0 &&
            posts.map((user) => {
              return renderPostItem(user);
            })}
        </tbody>
      </Table>
    </div>
  );
};

export default PostsTable;
