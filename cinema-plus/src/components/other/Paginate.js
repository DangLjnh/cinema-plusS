import { UserContext } from "contexts/UserProvider";
import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { withErrorBoundary } from "react-error-boundary";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import { handleFetchSearchMovie } from "redux/handler";
import { setNextPage } from "redux/movieSlice";
import styled from "styled-components";
const PaginateStyle = styled.div`
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
const Paginate = ({ totalResults, className = "", itemsPerPage = 20 }) => {
  const dispatch = useDispatch();
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const { search, searchOption } = useSelector((state, action) => state.news);
  useEffect(() => {
    if (!totalResults) return;
    setPageCount(Math.ceil(totalResults / itemsPerPage));
    // if (search) {
    //   dispatch(
    //     handleFetchSearchMovie({ category: searchOption, query: search })
    //   );
    // }
  }, [dispatch, search, searchOption, totalResults, itemOffset]);
  const handlePageClick = (e) => {
    // const newOffset = (e.selected * itemsPerPage) % totalResults;
    // setItemOffset(newOffset);
    window.scrollTo(0, 0);
    dispatch(setNextPage(e.selected + 1));
  };
  return (
    <PaginateStyle className={`my-10 ${className}`}>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        className="pagination"
      />
    </PaginateStyle>
  );
};

function FallbackComponent() {
  return (
    <div className="text-xl font-bold text-center text-red-400 bg-red-50">
      Something went wrong with components MovieList
    </div>
  );
}

export default withErrorBoundary(Paginate, {
  FallbackComponent,
});
