import { fetcher, tmdbAPI, tvAPI } from "config/config";
import SidebarSiRe from "modules/SidebarSiRe";
import React from "react";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import styled from "styled-components";
import Section from "components/section/Section";
import WatchTitle from "components/watch/WatchTitle";
import WatchVoteYear from "components/watch/WatchVoteYear";
import WatchCategories from "components/watch/WatchCategories";
import WatchOverview from "components/watch/WatchOverview";
import { useEffect } from "react";
import { Dropdown } from "components/dropdown";
import { useDispatch, useSelector } from "react-redux";
import { setHistory, setOptionDetail } from "redux/movieSlice";
import CommentReply from "components/comment/CommentReply";
import CommentList from "components/comment/CommentList";
import CommentInput from "components/comment/CommentInput";
// import { ReadMore } from "react-read-more";
const WatchMoviePageStyle = styled.div`
  svg {
    &:hover {
      /* fill: #6680c0; */
    }
  }
  .title-watch {
    /* display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;
    max-width: 100%;
    white-space: pre-wrap;
    word-break: break-all; */
  }
  @media screen and (max-width: 767.98px) {
    .watch-movie {
      height: 200px;
    }
    .title-watch {
      font-size: 25px;
    }
    .categories {
      column-gap: 10px;
      .cate-items {
        /* px-5 py-[7px] */
        padding-top: 3px;
        padding-bottom: 3px;
        padding-left: 14px;
        padding-right: 14px;
        font-size: 12px;
      }
    }
  }
`;
const DropdownOptionDetail = [
  {
    id: 1,
    name: "Descending",
    dataName: "Descending",
  },
  {
    id: 2,
    name: "Ascending",
    dataName: "Ascending",
  },
  {
    id: 3,
    name: "Newest",
    dataName: "Newest",
  },
  {
    id: 3,
    name: "Oldest",
    dataName: "Oldest",
  },
];
const WatchMoviePage = ({ category }) => {
  const { movieID, tvID } = useParams();
  const dispatch = useDispatch();
  const { optionDetail } = useSelector((state) => state.news);

  const result = useSWR(
    category === tmdbAPI
      ? tmdbAPI.getMovieDetail(movieID)
      : tvAPI.getTVDetail(tvID),
    fetcher
  );
  const { data } = result;
  useEffect(() => {
    document.title = `Watch: ${data?.title} | Cinema Plus`;
    String(dispatch(setOptionDetail("Descending")));
    // dispatch(setHistory(resultHistory));
    // window.scroll(0, 0);
  }, [data, dispatch]);
  if (!data) return null;
  return (
    <WatchMoviePageStyle>
      <SidebarSiRe page="recomenđations" category={category}></SidebarSiRe>
      <iframe
        src={tmdbAPI.getWatchMovie(data?.imdb_id)}
        allowFullScreen
        title={String(data.title)}
        className="w-full h-[550px] watch-movie"
      ></iframe>
      <WatchTitle name={data?.title}></WatchTitle>
      <WatchVoteYear
        voteAverage={data?.vote_average}
        releaseDate={data?.release_date}
        className={"my-4"}
      ></WatchVoteYear>
      <WatchCategories category={category} data={data}></WatchCategories>
      <WatchOverview
        overview={data?.overview}
        className={"mt-7 mb-4"}
      ></WatchOverview>
      <Section
        className="section-sire"
        recommendations="recommendations"
        tmdbAPI={category === tmdbAPI ? tmdbAPI : ""}
        tvAPI={category === tvAPI ? tvAPI : ""}
      ></Section>
      <div className="my-10 comment">
        <div className="flex justify-between">
          <h2 className="text-2xl font-semibold text-white">Comments</h2>
          <Dropdown
            className={`w-auto min-w-[135px] text-neutral-400 relative`}
          >
            <Dropdown.Select className="cursor-pointer">
              {optionDetail && optionDetail !== "Descending"
                ? optionDetail
                : "Descending"}
            </Dropdown.Select>
            <Dropdown.List className="w-auto">
              {DropdownOptionDetail.map((item) => {
                return (
                  <Dropdown.Option
                    key={item.id}
                    className="px-3 py-2 rounded-lg cursor-pointer hover:bg-neutral-600"
                    data-option={item.dataName}
                  >
                    {item.name}
                  </Dropdown.Option>
                );
              })}
            </Dropdown.List>
          </Dropdown>
        </div>
        <CommentInput className={"mt-10"}></CommentInput>
        <CommentList className={"mt-10"}></CommentList>
      </div>
    </WatchMoviePageStyle>
  );
};

export default WatchMoviePage;
