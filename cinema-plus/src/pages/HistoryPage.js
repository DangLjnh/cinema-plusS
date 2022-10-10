import { UserContext } from "contexts/UserProvider";
import React from "react";
import { useContext } from "react";

const HistoryPage = () => {
  let [movieListHistory] = useContext(UserContext);
  console.log(
    "🚀 ~ file: HistoryPage.js ~ line 7 ~ HistoryPage ~ movieListHistory",
    movieListHistory
  );
  return <div></div>;
};

export default HistoryPage;
