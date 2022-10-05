import Button from "components/button/Button";
import { tmdbAPI } from "config/config";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setGenres, setGenresName } from "redux/movieSlice";
import { v4 } from "uuid";
import styled from "styled-components";
const WatchCategoriesStyle = styled.div`
  /* .categories {
    display: flex;
    flex-wrap: wrap;
  } */
  .buttonTrans {
    background: #404040;
    color: #a3a3a3;
    &:hover {
      background: #373739;
    }
  }
  @media screen and (max-width: 767.98px) {
    flex-wrap: wrap;
    column-gap: 10px;
    row-gap: 10px;
    button {
      font-size: 13px;
    }
  }
`;
const WatchCategories = ({ category, data }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const genres = data?.genres;
  if (!genres) return;
  return (
    <WatchCategoriesStyle className="categories my-4 flex gap-x-4 max-w-[600px]">
      {genres?.length > 0 &&
        genres?.map((genre) => {
          return (
            <Button
              className="px-5 py-[7px] whitespace-nowrap cate-items text-[15px] rounded-md font-[400] cursor-pointer buttonTrans text-white"
              key={v4()}
              onClick={(e) => {
                navigate(
                  category === tmdbAPI
                    ? `/discovery/movie?genre=${genre.id}`
                    : `/discovery/tvshow?genre=${genre.id}`
                );
                dispatch(setGenres(genre.id));
                dispatch(setGenresName(genre.name));
              }}
            >
              {genre.name}
            </Button>
          );
        })}
    </WatchCategoriesStyle>
  );
};
export default WatchCategories;
