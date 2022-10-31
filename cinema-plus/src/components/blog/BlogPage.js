import React from "react";
import BlogBanner from "./BlogBanner";
import styled from "styled-components";
import TitlePosts from "components/title/TitlePosts";
import PostItem from "components/post/PostItem";
import BlogCategoriesSide from "components/categories/BlogCategoriesSide";
import { useEffect } from "react";
import axios from "axios";
import { clientSide } from "config/config";
import { useState } from "react";
import BlogForYou from "./BlogForYou";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";
import { v4 } from "uuid";
import { useUser } from "contexts/UserProvider";
const BlogMoviePageStyle = styled.div`
  .post-new-item:first-child {
    img {
      height: 100%;
    }
    grid-column: 1/3;
    grid-row: 1/3;
  }
  .post-fy-item:first-child {
    grid-column: 1/3;
  }
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
const BlogPage = () => {
  const { currentUser } = useUser();
  console.log(
    "🚀 ~ file: BlogPage.js ~ line 61 ~ BlogPage ~ currentUser",
    currentUser
  );
  const [posts, setPosts] = useState([]);
  const itemsPerPage = 5;
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [itemPrevPage, setItemPrevPage] = useState(0);
  const [itemAfterPage, setItemAfterPage] = useState(8);
  const [pageCount, setPageCount] = useState(0);
  const forYou = document.querySelector(".for-you");
  const elDistanceToTop =
    window.pageYOffset + forYou?.getBoundingClientRect().top;
  const marginScrollTop = 50;
  useEffect(() => {
    axios.get(`${clientSide}/get/posts`).then((response) => {
      setPosts(response.data);
    });
  }, []);
  useEffect(() => {
    setPageCount(Math.ceil(posts.length / itemsPerPage));
  }, [posts.length]);
  const postPopularList = posts.filter((post) => {
    return !!+post.hot === true; //-!!+post.hot (convert 1 to true)
  });
  const newestPostList = [...posts]?.sort(
    (a, b) =>
      new Date(b?.createdAt.slice(0, 10)) - new Date(a?.createdAt.slice(0, 10))
  );
  const handlePageClick = (e) => {
    setItemPrevPage(e.selected * itemsPerPage);
    setItemAfterPage((e.selected + 1) * itemsPerPage);
    window.scrollTo(0, elDistanceToTop - marginScrollTop);
    // console.log(forYou.scrollTop);
  };
  return (
    <BlogMoviePageStyle>
      <BlogBanner></BlogBanner>
      <div className="my-10">
        <TitlePosts>
          Phổ biến trên Cinema<span className="font-semibold">Plus</span>
        </TitlePosts>
        <div className="grid grid-cols-3 gap-x-6 mt-7">
          {postPopularList.slice(0, 3).map((post) => {
            return <PostItem key={v4()} post={post}></PostItem>;
          })}
        </div>
      </div>
      <div className="mt-[80px] mb-10">
        <TitlePosts>Mới nhất</TitlePosts>
        <div className="grid grid-cols-4 grid-rows-2 gap-5 mt-7">
          {newestPostList.slice(0, 5).map((post) => {
            return (
              <PostItem
                key={v4()}
                className={"post-new-item"}
                post={post}
              ></PostItem>
            );
          })}
        </div>
      </div>
      <div className="mt-[80px] mb-10 for-you">
        <TitlePosts>Dành cho bạn</TitlePosts>
        <div className="relative grid grid-cols-3 gap-x-10 mt-7">
          <div className="flex flex-col post-fy-item gap-y-12">
            {posts?.length > 0 &&
              posts.slice(itemPrevPage, itemAfterPage).map((item) => {
                return <BlogForYou key={v4()} post={item}></BlogForYou>;
              })}
            <ReactPaginate
              breakLabel="..."
              nextLabel="next >"
              onPageChange={handlePageClick}
              pageRangeDisplayed={1}
              pageCount={pageCount}
              previousLabel="< previous"
              renderOnZeroPageCount={null}
              className="pagination"
            />
          </div>
          <div className="flex sticky top-5 flex-wrap h-[250px] items-center w-full gap-3">
            <BlogCategoriesSide></BlogCategoriesSide>
          </div>
        </div>
      </div>
    </BlogMoviePageStyle>
  );
};

export default BlogPage;
// eslint-disable-next-line no-lone-blocks
{
  /* <PostItem
            className={"post-new-item"}
            classNameTop="gap-x-10"
            classNameTitle={"!text-2xl"}
            date={true}
          ></PostItem>
          <PostItem className={"post-new-item"}> </PostItem>
          <PostItem className={"post-new-item"}> </PostItem>
          <PostItem className={"post-new-item"}> </PostItem>
          <PostItem className={"post-new-item"}> </PostItem> */
}
