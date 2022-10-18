import React from "react";
import BlogBanner from "./BlogBanner";
import styled from "styled-components";
import TitlePosts from "components/title/TitlePosts";
import PostItem from "components/post/PostItem";
import BlogCategoriesSide from "components/categories/BlogCategoriesSide";
const BlogMoviePageStyle = styled.div`
  .post-new-item:first-child {
    grid-column: 1/3;
    grid-row: 1/3;
  }
  .post-fy-item:first-child {
    grid-column: 1/3;
  }
`;
const BlogPage = () => {
  return (
    <BlogMoviePageStyle>
      <BlogBanner></BlogBanner>
      <div className="my-10">
        <TitlePosts>
          Phổ biến trên Cinema<span className="font-semibold">Plus</span>
        </TitlePosts>
        <div className="grid grid-cols-4 gap-x-6 mt-7">
          <PostItem> </PostItem>
          <PostItem> </PostItem>
          <PostItem> </PostItem>
          <PostItem> </PostItem>
        </div>
      </div>
      <div className="mt-[80px] mb-10">
        <TitlePosts>Mới nhất</TitlePosts>
        <div className="grid grid-cols-4 grid-rows-2 gap-5 mt-7">
          <PostItem
            className={"post-new-item"}
            classNameTop="gap-x-10"
            classNameTitle={"!text-2xl"}
            date={true}
          >
            {" "}
          </PostItem>
          <PostItem className={"post-new-item"}> </PostItem>
          <PostItem className={"post-new-item"}> </PostItem>
          <PostItem className={"post-new-item"}> </PostItem>
          <PostItem className={"post-new-item"}> </PostItem>
        </div>
      </div>
      <div className="mt-[80px] mb-10">
        <TitlePosts>Dành cho bạn</TitlePosts>
        <div className="grid grid-cols-3 gap-x-10 mt-7">
          <div className="flex flex-col post-fy-item gap-y-8">
            <div className="flex items-center gap-x-5">
              <img
                src="https://images.unsplash.com/photo-1519456264917-42d0aa2e0625?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                alt=""
                className="w-full h-[210px] object-cover"
              />
              <div className="flex flex-col justify-between post-fy-content gap-y-12">
                <div className="flex items-center whitespace-nowrap gap-x-3">
                  <p>Chuyện trò - tâm sự</p>
                  <div className="w-[5px] h-[5px] bg-current rounded-full "></div>
                  <p>8 phút đọc</p>
                </div>
                <div className="">
                  <p className="text-lg font-medium text-white">
                    Bị bắt nạt nơi công sở bắt nạt
                  </p>
                </div>
                <div className="flex items-center gap-x-3">
                  <img
                    src="https://images.unsplash.com/photo-1557130680-0f816eef4743?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=813&q=80"
                    alt=""
                    className="object-cover w-6 h-6 rounded-full shrink-0"
                  />
                  <p className="text-sm">Dang Linh</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap items-center w-full gap-3">
            <BlogCategoriesSide></BlogCategoriesSide>
          </div>
        </div>
      </div>
    </BlogMoviePageStyle>
  );
};

export default BlogPage;
