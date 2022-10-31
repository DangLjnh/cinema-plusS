import axios from "axios";
import { serverSide } from "config/config";
import React from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { createContext } from "react";
import { useState } from "react";

export const UserContext = createContext();
const UserProvider = (props) => {
  const [currentUser, setCurrentUser] = useState({});
  const [users, setUsers] = useState([]);
  const [history, setHistory] = useState([]);
  const [itemPerPage, setItemPerPage] = useState(0);
  const [photos, setPhotos] = useState([]);
  const [bookmarkItem, setBookmarkItem] = useState([]);
  function addToBookmark(newItem) {
    setBookmarkItem((prevItem) => [...prevItem, newItem]);
  }
  const value = [
    currentUser,
    setCurrentUser,
    users,
    setUsers,
    history,
    setHistory,
    itemPerPage,
    setItemPerPage,
    addToBookmark,
    bookmarkItem,
    setBookmarkItem,
  ];
  return <UserContext.Provider value={value} {...props}></UserContext.Provider>;
};
function useUser() {
  const context = useContext(UserContext);
  if (context === "undefined")
    throw new Error("useGallery must be used within GalleryProvier");
  return context;
}
export { UserProvider, useUser };
