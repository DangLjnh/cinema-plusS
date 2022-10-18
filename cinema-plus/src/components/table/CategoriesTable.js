import axios from "axios";
import ActionDelete from "components/action/ActionDelete";
import ActionEdit from "components/action/ActionEdit";
import LabelStatus from "components/label/LabelStatus";
import { clientSide, serverSide } from "config/config";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { status } from "utils/constant";
import styled from "styled-components";
import Table from "./Table";
import { v4 } from "uuid";
import Swal from "sweetalert2";
import ReactPaginate from "react-paginate";

const CategoriesTableStyle = styled.div`
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
const CategoriesTable = ({ className }) => {
  const itemsPerPage = 8;
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [itemPrevPage, setItemPrevPage] = useState(0);
  const [itemAfterPage, setItemAfterPage] = useState(8);
  const [pageCount, setPageCount] = useState(0);
  useEffect(() => {
    setPageCount(Math.ceil(categories.length / itemsPerPage));
  }, [categories.length]);
  useEffect(() => {
    axios.get(`${clientSide}/get/categories`).then((response) => {
      setCategories(response.data);
    });
  }, []);
  const renderLabelCondition = (statuss) => {
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
  const handleDeleteCategory = (category) => {
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
          .post(`${clientSide}/delete/category/${category.categoryID}`, {
            categoryID: category.categoryID,
          })
          .then((res) => {
            if (res) {
              axios.get(`${clientSide}/get/categories`).then((response) => {
                setCategories(response.data);
              });
            }
          });
      }
    });
  };
  const renderCategoryItem = (category) => {
    if (!category) return;
    return (
      <tr key={v4()}>
        <td>{category.categoryID}</td>
        <td title={category.name}>{category?.name}</td>
        <td title={category.slug}>{category.slug}</td>
        <td>{category.createdAt.slice(0, 10)}</td>
        <td>{renderLabelCondition(Number(category?.status))}</td>
        <td>
          <div className="flex items-center gap-x-3">
            <ActionEdit
              onClick={() =>
                navigate(
                  `/manage/categories/update-category/${category.categoryID}`
                )
              }
            ></ActionEdit>
            <ActionDelete
              onClick={() => {
                handleDeleteCategory(category);
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
    <CategoriesTableStyle className={className}>
      <Table>
        <thead>
          <tr>
            <th>CategoryID</th>
            <th>Name</th>
            <th>Slug</th>
            <th>Created at</th>
            <th>Condition</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {categories?.length > 0 &&
            categories.slice(itemPrevPage, itemAfterPage).map((category) => {
              return renderCategoryItem(category);
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
    </CategoriesTableStyle>
  );
};

export default CategoriesTable;
