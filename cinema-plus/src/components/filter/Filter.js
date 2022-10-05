import LayoutSF from "components/LayoutSF";
import React, { useState } from "react";
import Categories from "components/categories/Categories";
import { tmdbAPI } from "config/config";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  setDateFrom,
  setDateTo,
  setRuntimeFrom,
  setRuntimeTo,
} from "redux/movieSlice";
import DateInput from "components/date/DateInput";
import RangeInputTo from "components/range/RangeInputTo";
import RangeInputFrom from "components/range/RangeInputFrom";
import { withErrorBoundary } from "react-error-boundary";
import { useEffect } from "react";
const FilterStyle = styled.div`
  @media screen and (max-width: 1023.98px) {
    .category-filter {
      max-height: 200px;
    }
  }
`;
const Filter = ({ category, className }) => {
  const { runtimeFrom, runtimeTo, dateFrom, dateTo } = useSelector(
    (state) => state.news
  );
  const dateF = dateFrom
    .split("")
    .reverse()
    .join("")
    .slice(0, 10)
    .split("")
    .reverse()
    .join("");
  const dateT = dateTo
    .split("")
    .reverse()
    .join("")
    .slice(0, 10)
    .split("")
    .reverse()
    .join("");
  const dispatch = useDispatch();
  const inputRangeTo = document.querySelector(".range-to");
  const inputRangeFrom = document.querySelector(".range-from");
  if (inputRangeTo) {
    let valPercent = (inputRangeTo?.value / inputRangeTo?.max) * 100 - 2;
    inputRangeTo.style.background = `linear-gradient(to right, #9841f4, #5ba8ff ${valPercent}%,
      #212123 ${valPercent}%)`;
  }
  if (inputRangeFrom) {
    let valPercent = (inputRangeFrom?.value / inputRangeFrom?.max) * 100 + 1;
    inputRangeFrom.style.background = `linear-gradient(to right, #9841f4, #5ba8ff ${valPercent}%,
      #212123 ${valPercent}%)`;
  }
  const handleRangeChangeTo = (e) => {
    String(dispatch(setRuntimeTo(e.target.value)));
  };
  const handleRangeChangeFrom = (e) => {
    String(dispatch(setRuntimeFrom(e.target.value)));
  };
  //   from = `&primary_release_date.gte=2002-11-04`,
  // `&primary_release_date.gte=${e.target.value}`
  const handleDateChangeFrom = (e) => {
    dispatch(setDateFrom(e.target.value));
  };
  const handleDateChangeTo = (e) => {
    dispatch(setDateTo(e.target.value));
  };
  // var thenum = runtime?.match(/\d/g);
  if (!runtimeTo) return;
  return (
    <FilterStyle className={`my-5 ${className}`}>
      <LayoutSF title="Filter" name="Genres" className={`mt-5`}>
        <Categories
          category={category}
          className="max-h-[260px] category-filter"
        ></Categories>
        <div className="box">
          <h2 className="my-3">Runtime</h2>
          <div className="relative">
            <RangeInputFrom
              // disabled={runtimeFrom === runtimeTo ? true : false}
              onChange={handleRangeChangeFrom}
              value={runtimeFrom}
            ></RangeInputFrom>
            <RangeInputTo
              onChange={handleRangeChangeTo}
              value={runtimeTo}
            ></RangeInputTo>
          </div>
        </div>
        <div>
          <h2 className="my-3">Release Dates</h2>
          <DateInput
            className="from-date"
            onChange={handleDateChangeFrom}
            value={String(dateF)}
            title="From"
          ></DateInput>
          <DateInput
            className="mt-5 to-date"
            onChange={handleDateChangeTo}
            value={String(dateT)}
            title="To"
          ></DateInput>
        </div>
      </LayoutSF>
    </FilterStyle>
  );
};

function FallbackComponent() {
  return (
    <div className="text-xl font-bold text-center text-red-400 bg-red-50">
      Something went wrong with components Filter
    </div>
  );
}

export default withErrorBoundary(Filter, {
  FallbackComponent,
});
