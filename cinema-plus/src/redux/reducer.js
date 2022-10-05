import { combineReducers } from "@reduxjs/toolkit";
import movieSlice from "./movieSlice";

const reducer = combineReducers({
  news: movieSlice,
});

export default reducer;
