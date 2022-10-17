import React from "react";
import { useDispatch } from "react-redux";
import {
  setOption,
  setOptionDetail,
  setOptionSort,
  setQueryNow,
  setQueryTv,
  setSortBy,
} from "redux/movieSlice";
import { useDropdown } from "./dropdown-context";

const Option = (props) => {
  // const { sortBy } = useSelector((state) => state.news);
  const { setShow } = useDropdown();
  const { onClick, className } = props;
  const dispatch = useDispatch();
  const handleClick = (e) => {
    onClick && onClick();
    setShow(false);
    String(dispatch(setOption(e.target.textContent)));
    String(dispatch(setQueryNow(e.target.dataset.name)));
    String(dispatch(setQueryTv(e.target.dataset.name)));
    String(dispatch(setSortBy(e.target.dataset.sort)));
    String(dispatch(setOptionDetail(e.target.dataset.option)));
    // String(dispatch(setOptionSort(e.target.dataset.title)));
  };
  return (
    <div
      className={`flex items-center justify-between px-3 py-4 rounded-md cursor-pointer dropdown-option hover:bg-neutral-600 ${className}`}
      onClick={handleClick}
      {...props}
    >
      {props.children}
    </div>
  );
};

export default Option;
