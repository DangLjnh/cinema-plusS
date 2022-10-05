import { fetcher, tmdbAPI, tvAPI } from "config/config";
import React from "react";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import styled from "styled-components";
import Search from "components/search/Search";
import SeasonDetail from "components/other/SeasonDetail";
import { v4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { setActiveSeason, setSeasonNumber } from "redux/movieSlice";
import { useState } from "react";
import LayoutSF from "components/LayoutSF";
import Categories from "components/categories/Categories";
import useScrollDropDown from "hooks/useScrollDropdown";
import useScrollDropDownDetail from "hooks/useScrollDropdownDetail";
import { useRef } from "react";
import { withErrorBoundary } from "react-error-boundary";
const SidebarWatchTvStyle = styled.div`
  .title-eps {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;
    max-width: 100%;
    white-space: pre-wrap;
    word-break: break-all;
  }
  .season-item {
    transition: all 0.25s linear;
  }
  .season-list {
    &::-webkit-scrollbar {
      width: 5px;
      border-radius: 20px;
    }

    &::-webkit-scrollbar-track {
      box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 20px;
      background-image: linear-gradient(to bottom, #808080, #2c3e50);
    }
  }
  .season-poster {
    transition: all 0.2s linear;
  }
  .sort-content {
    opacity: 0;
    visibility: hidden;
    /* display: none; */
    transition: all 0.2s ease;
    height: 0;
    .sidebar-item-detail {
      /* opacity: 0;
      visibility: hidden;
      height: 0;
      margin-top: 0;
      padding: 0; */
    }
  }
  .season-header {
    transition: all 0.3s ease;
  }
  @media screen and (max-width: 1023.98px) {
    .search-watch-tv {
      display: none;
    }
  }
  @media screen and (max-width: 767.98px) {
    .search-watch-tv {
      display: none;
    }
  }
`;
const LayoutSFStyle = styled.div`
  .is-active-dropdown {
    opacity: 1;
    visibility: visible;
    .sidebar-item-detail {
      /* opacity: 1;
      visibility: visible;
      height: auto;
      margin-top: 12px;
      padding: 12px; */
    }
    /* display: block; */
  }
  .is-active-option {
  }
`;
const SidebarWatchTv = ({ className }) => {
  // const { activeSeason } = useSelector((state, action) => state.news);
  const dispatch = useDispatch();
  const { active, handleToogleDropdown } =
    useScrollDropDownDetail("is-active-dropdown");
  // const [activeSeason, setActiveSeason] = useState(false);
  const params = useParams();
  const { tvID } = params;
  const result = useSWR(tvAPI.getTVDetail(tvID), fetcher);
  const { data } = result;
  if (!data) return;
  const { seasons } = result?.data;
  if (!seasons) return;
  return (
    <SidebarWatchTvStyle className={className}>
      {/* season_number */}
      <Search className="mt-10 mb-5 search-watch-tv"></Search>
      <h2 className="text-xl text-white pointer-events-none">Seasons</h2>
      {/* overflow-y-auto h-[835px] */}
      <div className={`season-list h-[700px] overflow-y-auto`}>
        {seasons.map((item, index) => {
          return (
            <LayoutSFStyle
              className={`w-full bg-[#262628] sort rounded-lg`}
              key={index + 1 * 99}
            >
              <div
                className={`w-full h-[116px] cursor-pointer season-header`}
                onClick={() => {
                  dispatch(setSeasonNumber(item.season_number));
                }}
              >
                <div
                  className="my-5 rounded-md season-item"
                  onClick={handleToogleDropdown}
                >
                  <div className="flex items-center w-full p-2 rounded-md cursor-pointer season-poster gap-x-5 hover:bg-neutral-700">
                    <img
                      src={tvAPI.imageOriginalTV(item?.poster_path)}
                      alt=""
                      className="w-[100px] h-[100px] rounded-md object-cover pointer-events-none"
                    />
                    <div className="pointer-events-none season-content">
                      <h2 className="mb-1 title-eps text-white">{item.name}</h2>
                      <span className="text-[15px]">
                        Episode: {item.episode_count}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="sort-content">
                  <SeasonDetail season={item.season_number}></SeasonDetail>
                </div>
              </div>
            </LayoutSFStyle>
          );
        })}
      </div>
      {/* <h2 className="mb-3 text-xl font-semibold text-white">Seasons</h2>
      <div className="h-[680px] overflow-y-auto season-list">
        {seasons.map((item, index) => {
          return (
            <div key={v4()}>
              <div className="my-3 rounded-md season-item">
                <div
                  className="flex items-center p-2 rounded-md cursor-pointer season-poster gap-x-5 hover:bg-neutral-700"
                  onClick={(e) => {
                    setActiveSeason(!activeSeason);
                  }}
                >
                  <img
                    src={tvAPI.imageOriginalTV(item?.poster_path)}
                    alt=""
                    className="w-[100px] h-[100px] rounded-md object-cover"
                  />
                  <div className="season-content">
                    <h2 className="mb-1 text-white">{item.name}</h2>
                    <span className="text-[15px]">
                      Episode: {item.episode_count}
                    </span>
                  </div>
                </div>
                <SeasonDetail
                  activeSeason={activeSeason}
                  season={item.season_number}
                ></SeasonDetail>
              </div>
            </div>
          );
        })}
      </div> */}
    </SidebarWatchTvStyle>
  );
};

function FallbackComponent() {
  return (
    <div className="text-xl font-bold text-center text-red-400 bg-red-50">
      Something went wrong with components SidebarWatchTv
    </div>
  );
}

export default withErrorBoundary(SidebarWatchTv, {
  FallbackComponent,
});
