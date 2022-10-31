import axios from "axios";
import ActionDelete from "components/action/ActionDelete";
import ActionEdit from "components/action/ActionEdit";
import ActionView from "components/action/ActionView";
import LabelStatus from "components/label/LabelStatus";
import { clientSide } from "config/config";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { status } from "utils/constant";
import { v4 } from "uuid";
import styled from "styled-components";
import ReactPaginate from "react-paginate";
import Table from "./Table";
import ActionApprove from "components/action/ActionApprove";
import ActionReject from "components/action/ActionReject";
import { toast } from "react-toastify";
const PendingPostTableStyle = styled.div`
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
const PendingPostTable = () => {
  const itemsPerPage = 8;
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [postsPending, setPostsPending] = useState([]);
  const [itemPrevPage, setItemPrevPage] = useState(0);
  const [itemAfterPage, setItemAfterPage] = useState(8);
  const [pageCount, setPageCount] = useState(0);
  useEffect(() => {
    axios.get(`${clientSide}/get/posts`).then((response) => {
      setPosts(response.data);
    });
  }, []);
  useEffect(() => {
    setPostsPending(
      posts.filter((post) => {
        return post.status === status.pending;
      })
    );
  }, [posts]);
  useEffect(() => {
    setPageCount(Math.ceil(postsPending.length / itemsPerPage));
  }, [postsPending.length]);
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
  const handleRejectPost = (post) => {
    Swal.fire({
      title: "Are you reject post?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#7877fa",
      cancelButtonColor: "#ee5253",
      confirmButtonText: "Yes, reject it!",
      // iconColor: "#7877fa",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Rejected!",
          text: "User has been rejected.",
          icon: "success",
          confirmButtonColor: "#7877fa",
        });
        axios
          .post(`${clientSide}/post/update/postStatus`, {
            postID: post.postID,
            status: status.reject,
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
  const handleApprovePost = (post) => {
    axios
      .post(`${clientSide}/post/update/postStatus`, {
        postID: post.postID,
        status: status.approve,
      })
      .then((res) => {
        if (res) {
          axios.get(`${clientSide}/get/posts`).then((response) => {
            toast.success("Approve post successfully!");
            setPosts(response.data);
          });
        }
      });
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
              <h3 className="font-medium" title={post.title}>
                {post.title.length < 48
                  ? post.title
                  : `${post.title.slice(0, 48)}...`}
              </h3>
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
          <span>
            {post.nameAuthor.length < 17
              ? post.nameAuthor
              : `${post.nameAuthor.slice(0, 14)}...`}
          </span>
        </td>
        <td>{renderPostStatus(post.status)}</td>
        <td>
          <div className="flex items-center gap-x-3">
            <ActionView
              onClick={() => navigate(`/blog/post/${post.slug}/${post.postID}`)}
            ></ActionView>
            <ActionApprove
              onClick={() => {
                handleApprovePost(post);
              }}
            ></ActionApprove>
            <ActionReject
              onClick={() => {
                handleRejectPost(post);
              }}
            ></ActionReject>
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
    <PendingPostTableStyle>
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
          {postsPending?.length > 0 &&
            postsPending.slice(itemPrevPage, itemAfterPage).map((user) => {
              return renderPostItem(user);
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
      ></ReactPaginate>
    </PendingPostTableStyle>
  );
};

export default PendingPostTable;
