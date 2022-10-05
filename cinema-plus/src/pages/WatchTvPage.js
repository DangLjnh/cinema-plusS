import { fetcher, tvAPI } from "config/config";
import React from "react";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { withErrorBoundary } from "react-error-boundary";
import WatchVoteYear from "components/watch/WatchVoteYear";
import WatchTitle from "components/watch/WatchTitle";
import WatchCategories from "components/watch/WatchCategories";
import WatchOverview from "components/watch/WatchOverview";
import { useEffect } from "react";
const WatchTvPageStyle = styled.div`
  @media screen and (max-width: 767.98px) {
    .watch-tv {
      height: 200px;
    }
    .title-ep {
      white-space: normal;
    }
    .title-watchTV {
      flex-direction: column;
      align-items: unset;
      justify-content: unset;
      column-gap: unset;
      span {
        text-align: left;
        font-size: 16px;
        margin-bottom: 10px;
      }
    }
  }
`;
const WatchTvPage = ({ category }) => {
  const params = useParams();
  const { tvID } = params;
  const { seasonNumber, episodeNumber } = useSelector(
    (state, action) => state.news
  );
  const result = useSWR(category.getTVDetail(tvID), fetcher);
  const season = useSWR(tvAPI.getSeasonTv(tvID, seasonNumber), fetcher);
  const seasonEp = useSWR(
    tvAPI.getSeasonEpTv(tvID, seasonNumber, episodeNumber),
    fetcher
  );
  const { data } = result;
  useEffect(() => {
    document.title = `Watch: ${data?.name} | Cinema Plus`;
    window.scroll(0, 0);
  }, [data]);
  const { data: seasonDetail } = season;
  const seasonEpDetail = seasonEp?.data;
  if (!result) return null;
  if (!seasonEp) return null;
  return (
    <WatchTvPageStyle>
      <iframe
        src={tvAPI.getWatchTV(tvID, seasonNumber, episodeNumber)}
        allowFullScreen
        title={data?.title}
        className="w-full h-[550px] watch-tv"
      ></iframe>
      <div className="flex items-center justify-between tracking-wide text-white title-watchTV">
        <WatchTitle name={data?.name}></WatchTitle>
        <span
          className={`text-xl italic title-ep font-light text-right ${
            seasonEpDetail?.name?.length < 25 && "whitespace-nowrap"
          } `}
        >
          {seasonEpDetail?.name}
        </span>
      </div>
      <div className="flex justify-between">
        <WatchVoteYear
          voteAverage={seasonEpDetail?.vote_average}
          releaseDate={seasonEpDetail?.air_date}
        ></WatchVoteYear>
        <span>
          Season {seasonNumber === 0 ? seasonDetail.name : seasonNumber} —
          Episode {episodeNumber}
        </span>
      </div>
      <WatchCategories category={category} data={data}></WatchCategories>
      <WatchOverview
        overview={data?.overview}
        className={"mt-7"}
      ></WatchOverview>
    </WatchTvPageStyle>
  );
};

function FallbackComponent() {
  return (
    <div className="text-xl font-bold text-center text-red-400 bg-red-50">
      Something went wrong with components WatchTvPage
    </div>
  );
}

export default withErrorBoundary(WatchTvPage, {
  FallbackComponent,
});
