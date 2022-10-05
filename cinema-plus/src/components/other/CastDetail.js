import { fetcher, tmdbAPI, tvAPI } from "config/config";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import useSWR from "swr";
import styled from "styled-components";
import { v4 } from "uuid";
import NotFoundPage from "pages/NotFoundPage";
const CastDetailStyle = styled.div`
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
`;
const CastDetail = ({ hide, movie, category }) => {
  const navigate = useNavigate();
  const { movieID, tvID } = useParams();
  const { data } = useSWR(
    category === movie?.runtime
      ? tmdbAPI.getMovieMeta(movieID, "credits")
      : tvAPI.getTVMeta(tvID, "credits"),
    fetcher
  );
  if (!data) return;
  const { cast } = data;
  return (
    <div>
      {!cast || cast.length === 0 ? (
        <NotFoundPage
          hasButton={false}
          hasLogo={false}
          sizeImg="3x"
          title="Not found cast"
          desc="Sorry, i couldn't find the cast of film."
          className="mt-10"
          classNameTitle="text-xl"
          classNameDesc="text-base"
        ></NotFoundPage>
      ) : (
        <CastDetailStyle
          className={`grid grid-cols-2 my-10 h-[400px] overflow-y-auto gap-x-10 gap-y-10 cast ${
            hide ? "hidden" : ""
          }`}
        >
          {cast?.length > 0
            ? cast.map((item) => {
                if (!item.profile_path) return null;
                return (
                  <div
                    className="flex items-center justify-center gap-x-3"
                    key={v4()}
                  >
                    <img
                      src={tmdbAPI.imageOriginal(item.profile_path)}
                      alt=""
                      className="w-[70px] h-[70px] object-cover rounded-full cursor-pointer"
                      onClick={() => {
                        navigate(`../cast/${item?.id}`);
                      }}
                    />
                    <div className="flex-1 content">
                      <h2
                        className="text-lg cursor-pointer text-blueLight"
                        onClick={() => {
                          navigate(`../cast/${item?.id}`);
                        }}
                      >
                        {item.original_name}
                      </h2>
                      <p className="text-sm">{item.character}</p>
                    </div>
                  </div>
                );
              })
            : ""}
        </CastDetailStyle>
      )}
    </div>
  );
};

export default CastDetail;
