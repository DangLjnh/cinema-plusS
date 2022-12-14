import Layout from "layout/Layout";
import BookmarkPage from "pages/BookmarkPage";
import DiscoveryPage from "pages/DiscoveryPage";
import HistoryPage from "pages/HistoryPage";
import Homepage from "pages/HomePage";
import ProfilePage from "pages/ProfilePage";
import SearchPage from "pages/SearchPage";
import SeriesPage from "pages/SeriesPage";
import TvShowPage from "pages/TvShowPage";
import React, { Suspense, lazy, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { handleFetchMovie } from "redux/handler";
import DiscoveryTvShowPage from "pages/DiscoveryTvShowPage";
import DetailPage from "pages/DetailPage";
import LayoutDetail from "layout/LayoutDetail";
import { clientSide, tmdbAPI, tvAPI } from "config/config";
import WatchMoviePage from "pages/WatchMoviePage";
import WatchTvPage from "pages/WatchTvPage";
import LayoutDetailTv from "layout/LayoutDetailTv";
import LayoutDiscovery from "layout/LayoutDiscovery";
import NotFoundPage from "pages/NotFoundPage";
import CastPage from "pages/CastPage";
import SignInPage from "pages/SignInPage";
import SignUpPage from "pages/SignUpPage";
import axios from "axios";
import { useContext } from "react";
import { UserContext } from "contexts/UserProvider";
import UserUpdate from "components/user/UserUpdate";
import UserCreate from "components/user/UserCreate";
import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";
import DashboardPage from "pages/DashboardPage";
import LayoutDashboard from "layout/LayoutDashboard";
import LayoutBlog from "layout/LayoutBlog";
import BlogPage from "components/blog/BlogPage";
import BlogCategoriesCreate from "components/categories/BlogCategoriesCreate";
import BlogCategoriesUpdate from "components/categories/BlogCategoriesUpdate";
import ManageUserPage from "components/manage/ManageUserPage";
import ManageCategoriesPage from "components/manage/ManageCategoriesPage";
import ManagePostPage from "components/manage/ManagePostPage";
import PostCreate from "components/post/PostCreate";
import PostUpdate from "components/post/PostUpdate";
import BlogDetailPage from "components/blog/BlogDetailPage";
import BlogAuthorPage from "components/blog/BlogAuthorPage";
import BlogCategoryPage from "components/blog/BlogCategoryPage";
import BlogBookmark from "components/blog/BlogBookmark";
import ManagePendingPostPage from "components/manage/ManagePendingPostPage";
const App = () => {
  const [currentUser, setCurrentUser] = useContext(UserContext);
  const cld = new Cloudinary({
    cloud: {
      cloudName: "dwkckmmr7",
    },
  });
  useEffect(() => {
    axios.get(`${clientSide}/get/currentUser`).then((response) => {
      const data = Object.assign({}, ...response.data);
      setCurrentUser(data);
    });
  }, []);
  return (
    <>
      {/* <AdvancedImage cldImg={myImage} /> */}
      <Routes>
        <Route path="*" element={<NotFoundPage></NotFoundPage>}></Route>
        <Route path="/sign-in" element={<SignInPage></SignInPage>}></Route>
        <Route path="/sign-up" element={<SignUpPage></SignUpPage>}></Route>
        <Route element={<Layout page="home"></Layout>}>
          <Route path="/" element={<Homepage></Homepage>}></Route>
          <Route path="/tvshow" element={<TvShowPage></TvShowPage>}></Route>
          <Route path="/series" element={<SeriesPage></SeriesPage>}></Route>
          <Route path="/search" element={<SearchPage></SearchPage>}></Route>
          <Route path="/cast/:castID" element={<CastPage></CastPage>}></Route>
          <Route path="/history" element={<HistoryPage></HistoryPage>}></Route>
          <Route path="/profile" element={<ProfilePage></ProfilePage>}></Route>
          <Route path="/movie" element={<ProfilePage></ProfilePage>}></Route>
          <Route
            path="/bookmarked"
            element={<BookmarkPage></BookmarkPage>}
          ></Route>
        </Route>
        <Route element={<LayoutDiscovery category={tmdbAPI}></LayoutDiscovery>}>
          <Route
            path="/discovery/movie"
            element={<DiscoveryPage></DiscoveryPage>}
          ></Route>
        </Route>
        <Route element={<LayoutDiscovery category={tvAPI}></LayoutDiscovery>}>
          <Route
            path="/discovery/tvshow"
            element={<DiscoveryTvShowPage></DiscoveryTvShowPage>}
          ></Route>
        </Route>
        <Route element={<LayoutDetail></LayoutDetail>}>
          <Route
            // /movie/:movieID qua ch??? kh??c th?? d??ng useParams ????? l???y n?? v???
            path="/movie/:movieID"
            element={<DetailPage category={tmdbAPI}></DetailPage>}
          ></Route>
          <Route
            // /movie/:movieID qua ch??? kh??c th?? d??ng useParams ????? l???y n?? v???
            path="/tvshow/:tvID"
            element={<DetailPage category={tvAPI}></DetailPage>}
          ></Route>
          <Route
            path="/movie/:movieID/watch"
            element={<WatchMoviePage category={tmdbAPI}></WatchMoviePage>}
          ></Route>
        </Route>
        {/* <Route element={<LayoutDetail columnRight></LayoutDetail>}></Route> */}
        <Route element={<LayoutDashboard></LayoutDashboard>}>
          <Route
            path="/dashboard"
            element={<DashboardPage></DashboardPage>}
          ></Route>
          <Route
            path="/manage/user"
            element={<ManageUserPage></ManageUserPage>}
          ></Route>
          <Route
            path="/manage/pending/post"
            element={<ManagePendingPostPage></ManagePendingPostPage>}
          ></Route>
          <Route
            path="/manage/user/update-user/:userID"
            element={<UserUpdate></UserUpdate>}
          ></Route>
          <Route
            path="/manage/user/create-user"
            element={<UserCreate></UserCreate>}
          ></Route>
          <Route
            path="/manage/categories"
            element={<ManageCategoriesPage></ManageCategoriesPage>}
          ></Route>
          <Route
            path="/manage/categories/create-category"
            element={<BlogCategoriesCreate></BlogCategoriesCreate>}
          ></Route>
          <Route
            path="/manage/categories/update-category/:categoryID"
            element={<BlogCategoriesUpdate></BlogCategoriesUpdate>}
          ></Route>
          <Route
            path="/manage/posts"
            element={<ManagePostPage></ManagePostPage>}
          ></Route>
          <Route
            path="/manage/post/create-post"
            element={<PostCreate></PostCreate>}
          ></Route>
          <Route
            path="/manage/post/update-post/:postID"
            element={<PostUpdate></PostUpdate>}
          ></Route>
        </Route>
        <Route element={<LayoutBlog></LayoutBlog>}>
          <Route path="/blog" element={<BlogPage></BlogPage>}></Route>
          <Route
            path="/blog/post/:slug/:postID"
            element={<BlogDetailPage></BlogDetailPage>}
          ></Route>
          <Route
            path="/blog/posts/:authorID"
            element={<BlogAuthorPage></BlogAuthorPage>}
          ></Route>
          <Route
            path="/blog/posts/category/:categoryID"
            element={<BlogCategoryPage></BlogCategoryPage>}
          ></Route>
          <Route
            path="/blog/posts/bookmark/:userID"
            element={<BlogBookmark></BlogBookmark>}
          ></Route>
        </Route>
        <Route element={<LayoutDetailTv></LayoutDetailTv>}>
          <Route
            path="/tvshow/:tvID/watch"
            element={<WatchTvPage category={tvAPI}></WatchTvPage>}
          ></Route>
        </Route>
      </Routes>
    </>
  );
};

export default App;
