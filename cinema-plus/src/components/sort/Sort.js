import { Dropdown } from "components/dropdown";
import LayoutSF from "components/LayoutSF";
import { tmdbAPI, tvAPI } from "config/config";
import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
const Sort = ({ category, className }) => {
  const { option } = useSelector((state) => state.news);
  return (
    <div className={className}>
      <LayoutSF name="Sort result" title="Sort">
        <Dropdown>
          <Dropdown.Select>
            {option === "" ? "Most popular" : option}
          </Dropdown.Select>
          <Dropdown.List>
            <Dropdown.Option data-sort="popularity.desc">
              Most popular
            </Dropdown.Option>
            <Dropdown.Option data-sort={String("vote_average.desc")}>
              Most rating
            </Dropdown.Option>
            <Dropdown.Option data-sort="release_date.desc">
              Most recent
            </Dropdown.Option>
          </Dropdown.List>
        </Dropdown>
      </LayoutSF>
    </div>
  );
};

export default Sort;
