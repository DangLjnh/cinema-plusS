import Button from "components/button/Button";
import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const MovieCardStyle = styled.div`
  svg {
    fill: yellow;
  }
  .checked {
    fill: white;
  }
  label span svg {
    transition: 0.2s all linear;
  }
  input:checked + span svg {
    opacity: 1;
  }
`;
const MovieCard = ({ data }) => {
  const navigate = useNavigate();
  if (!data) return null;
  return (
    <>
      <MovieCardStyle className="flex flex-col h-full p-3 text-white rounded-lg select-none movie-card bg-[#262628]">
        <img
          src={`https://image.tmdb.org/t/p/original${String(
            data.poster_path || data.profile_path
          )}`}
          alt=""
          className="w-full h-[250px] object-cover rounded-lg mb-5 cursor-pointer"
          onClick={() => {
            navigate(
              `${
                data.release_date
                  ? `../movie/${data.id}`
                  : data.first_air_date
                  ? `../tvshow/${data.id}`
                  : `../cast/${data.id}`
              }`
            );
          }}
        />
        <div className="flex flex-col flex-1">
          <h3 className="mb-3 text-xl font-bold text-white card-title">
            {data.title || data.name}
          </h3>
          <div className="flex flex-col flex-1">
            <div className="flex items-center justify-between mt-auto text-sm font-medium opacity-50 mb-7">
              <span className="text-white">
                {new Date(data.release_date).getFullYear() ||
                  new Date(data.first_air_date).getFullYear() ||
                  ""}
              </span>
              <div className="flex items-center px-3 py-[6px] vote gap-x-2 ">
                <span className="text-white">
                  {data?.vote_average === 10
                    ? data?.vote_average
                    : data?.vote_average?.toFixed(1)}
                  {/* {Math.round(data.vote_average * 10) / 10} */}
                </span>
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  // fill="#f9ca24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.0312 1C13.0666 1 14.6926 5.69969 15.2795 7.50668C15.4141 7.92126 15.7943 8.20684 16.23 8.22162C18.1151 8.28556 23 8.55772 23 9.66144C23 10.7495 19.5188 13.4853 18.0955 14.5583C17.7427 14.8243 17.5982 15.2836 17.734 15.704C18.3132 17.4975 19.7048 22.1483 18.8117 22.8815C17.9323 23.6034 14.1749 20.7486 12.6485 19.5286C12.2692 19.2254 11.7305 19.2251 11.3511 19.528C9.82346 20.7477 6.06764 23.6035 5.25065 22.8815C4.41962 22.1471 5.73815 17.4816 6.28237 15.6949C6.40915 15.2786 6.26319 14.8287 5.91569 14.5668C4.4996 13.4997 1 10.7523 1 9.66144C1 8.55659 5.89498 8.285 7.77586 8.22142C8.20861 8.2068 8.58723 7.92462 8.72415 7.51385C9.32468 5.71216 10.9944 1 12.0312 1Z"
                    stroke="none"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>
          {/* <button className="px-6 py-3 font-medium text-white rounded-lg transition-all bg-blueDark hover:bg-[#0c2461]">
          Watch now
        </button> */}
          <Button
            full={true}
            bgColor="primary"
            className="hover:opacity-80"
            //chuyển đến /movie/id (id của phim)
            onClick={() => {
              navigate(
                `${
                  data.release_date
                    ? `../movie/${data.id}`
                    : data.first_air_date
                    ? `../tvshow/${data.id}`
                    : `../cast/${data.id}`
                }`
              );
            }}
          ></Button>
        </div>
        {/* <label className="mt-3 text-center cursor-pointer">
          <input type="checkbox" name="" id="" className="hidden" />
          <span className="inline-flex items-center justify-center w-6 h-6 p-1 text-white border rounded-md border-grayText">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 opacity-0 checked"
              viewBox="0 0 20 20"
              fill="white"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </label> */}
      </MovieCardStyle>
    </>
  );
};

export default MovieCard;
