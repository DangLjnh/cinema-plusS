import { ReadMore } from "components/other/ReadMore";
import Search from "components/search/Search";
import { fetcher, tmdbAPI, tvAPI } from "config/config";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import useSWR from "swr";
import styled from "styled-components";
import MovieSidebarDetail from "components/movie/MovieSidebarDetail";
import { v4 } from "uuid";
import SibarCast from "modules/SibarCast";
import Section from "components/section/Section";
import { useEffect } from "react";
import CastSkeleton from "components/loading/CastSkeleton";
const CastPageStyle = styled.div`
  @media screen and (max-width: 1023.98px) {
  }
  @media screen and (max-width: 767.98px) {
    img {
      width: 100%;
    }
    .detail-cast {
      display: block;
    }
  }
`;
const CastPage = () => {
  const params = useParams();
  const { castID } = params;
  const { data } = useSWR(tmdbAPI?.getDetailPerson(castID), fetcher);
  useEffect(() => {
    document.title = `${data?.name} | Cinema Plus`;
    window.scroll(0, 0);
  }, [data]);
  return (
    <CastPageStyle>
      {!data && <CastSkeleton></CastSkeleton>}
      {data && (
        <div className="tracking-wide">
          <div className="flex items-center gap-x-10 detail-cast">
            <img
              srcSet={`${tmdbAPI.imageOriginal(data?.profile_path)} 4x`}
              alt=""
              className="rounded-md max-w-[220px] h-[340px] object-cover"
            />
            <div className="flex flex-col gap-y-9">
              <h2 className="text-2xl">
                Name: <span className="text-white">{data?.name}</span>
              </h2>
              {data?.birthday && (
                <p>
                  Birthday:{" "}
                  <span className="text-white">{data?.birthday} </span>{" "}
                  {!data?.deathday && (
                    <>
                      |
                      <span className="text-white">
                        {" "}
                        {new Date().getFullYear() -
                          new Date(data?.birthday).getFullYear()}
                        <span className="text-grayText"> years old</span>
                      </span>
                    </>
                  )}
                  {data?.deathday && (
                    <>
                      |
                      <span className="text-white">
                        {" "}
                        {new Date(data?.deathday).getFullYear() -
                          new Date(data?.birthday).getFullYear()}
                        <span className="text-grayText"> years old</span>
                      </span>
                    </>
                  )}
                </p>
              )}

              {data?.deathday && (
                <p>
                  Death day: <span className="text-white">{data.deathday}</span>
                </p>
              )}
              {data?.known_for_department && (
                <p>
                  Known for department:{" "}
                  <span className="text-white">
                    {data?.known_for_department}
                  </span>
                </p>
              )}

              {data?.place_of_birth && (
                <p>
                  Place of birth:{" "}
                  <span className="text-white">{data?.place_of_birth}</span>
                </p>
              )}
              <p>
                Popularity:{" "}
                <span className="text-white">{data?.popularity}</span>
              </p>
            </div>
          </div>
          {data?.biography && (
            <div>
              <h2 className="my-5 text-xl text-white">Biography</h2>
              <ReadMore numberText="780">{data?.biography}</ReadMore>
            </div>
          )}
        </div>
      )}
      <SibarCast></SibarCast>
      <Section className="mt-5" knowFor="knowFor" tmdbAPI={tmdbAPI}></Section>
      <Section knowFor="knowFor" tvAPI={tvAPI}></Section>
    </CastPageStyle>
  );
};

export default CastPage;
