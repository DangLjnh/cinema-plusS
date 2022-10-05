import { fetcher, tvAPI } from "config/config";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  setActiveSeason,
  setEpisodeNumber,
  setSeasonNumber,
} from "redux/movieSlice";
import useSWR from "swr";
import { v4 } from "uuid";
import styled from "styled-components";
import { useState } from "react";
const SeasonDetailStyle = styled.div`
  /* height: 0; */
  .season-item {
    /* opacity: 0; */
    /* visibility: hidden; */
  }
  .title-detail {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;
    max-width: 100%;
    white-space: pre-wrap;
  }
  .active-sidebar-detail {
    background-color: #404040;
    color: white;
    .index {
      font-weight: 500;
      color: ${(props) => props.theme.blueLight};
    }
  }
`;
const SeasonDetail = ({ season, className }) => {
  const params = useParams();
  const dispatch = useDispatch();
  const { tvID } = params;
  const seasonEp = useSWR(tvAPI.getSeasonTv(tvID, season), fetcher);
  const { data: seasonDetail } = seasonEp;
  if (!seasonDetail) return;
  return (
    <SeasonDetailStyle className={`transition-all rounded-md ${className}`}>
      {seasonDetail?.episodes?.map((item, index) => {
        return (
          <div
            className={`items-center p-3 mt-3 transition-all rounded-md season-item episode gap-x-3 hover:bg-neutral-700 flex sidebar-item-detail`}
            onClick={(e) => {
              const itemDetail = document.querySelectorAll(
                ".sidebar-item-detail"
              );
              [...itemDetail].forEach((item) => {
                item.classList.remove("active-sidebar-detail");
              });
              e.target.classList.add("active-sidebar-detail");
              dispatch(setSeasonNumber(item.season_number));
              dispatch(setEpisodeNumber(item.episode_number));
            }}
            key={v4()}
          >
            <span className="text-white pointer-events-none index">
              {index + 1}
            </span>
            {item.still_path ? (
              <img
                src={tvAPI.imageOriginalTV(item.still_path)}
                alt=""
                className="w-[100px] h-[65px] rounded-md object-cover pointer-events-none"
              />
            ) : (
              <img
                src={"../../../default_image.png"}
                alt=""
                className="w-[100px] h-[65px] rounded-md object-cover pointer-events-none"
              />
            )}
            <span className="text-sm pointer-events-none title-detail">
              {item.name}
            </span>
          </div>
        );
      })}
    </SeasonDetailStyle>
  );
};

export default SeasonDetail;
