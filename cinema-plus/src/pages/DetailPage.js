import axios from "axios";
import BannerDetail from "components/banner/BannerDetail";
import MovieDetail from "components/movie/MovieDetail";
import Section from "components/section/Section";
import { clientSide, fetcher, tmdbAPI, tvAPI } from "config/config";
import { UserContext } from "contexts/UserProvider";
import SidebarSiRe from "modules/SidebarSiRe";
import React, { useEffect } from "react";
import { useContext } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { setHistory, setOptionDetail } from "redux/movieSlice";
import styled from "styled-components";
import useSWR from "swr";
import { v4 } from "uuid";
import NotFoundPage from "./NotFoundPage";
const DetailPageStyle = styled.div``;
const DetailPage = ({ category }) => {
  const { movieID, tvID } = useParams();
  let [currentUser, setCurrentUser, history, setHistory] =
    useContext(UserContext);
  useEffect(() => {
    axios.post(`${clientSide}/post/bookmark/${movieID || tvID}`, {
      uid: currentUser.uid,
      displayName: currentUser.displayName,
      email: currentUser.email,
      filmID: movieID || tvID,
    });
    // .then((res) => {
    //   console.log(res.data);
    // });
  }, []);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const result = useSWR(
    category === tmdbAPI
      ? tmdbAPI.getMovieDetail(movieID)
      : tvAPI.getTVDetail(tvID),
    fetcher
  );
  const { data } = result;
  useEffect(() => {
    document.title = `${data?.title || data?.name} | Cinema Plus`;
    String(dispatch(setOptionDetail("Descending")));
    // if (resultHistory !== []) dispatch(setHistory(history.push(movieID)));
  }, [data, dispatch]);
  if (data?.status_code === 34) navigate("/not-found-film");
  if (!data) return;
  return (
    <DetailPageStyle className="mb-5">
      <SidebarSiRe page="similar" category={category}></SidebarSiRe>
      <BannerDetail movie={data}></BannerDetail>
      <MovieDetail movie={data}></MovieDetail>
      <Section
        className="section-sire"
        similar="similar"
        tmdbAPI={category === tmdbAPI ? tmdbAPI : ""}
        tvAPI={category === tvAPI ? tvAPI : ""}
      ></Section>
    </DetailPageStyle>
  );
};

export default DetailPage;
