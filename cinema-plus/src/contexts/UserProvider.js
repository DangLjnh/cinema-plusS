import React from "react";
import { createContext } from "react";
import { useState } from "react";

export const UserContext = createContext();
const UserProvider = (props) => {
  const [currentUser, setCurrentUser] = useState({});
  const [users, setUsers] = useState([]);
  const [history, setHistory] = useState([]);
  const [itemPerPage, setItemPerPage] = useState(0);
  const value = [
    currentUser,
    setCurrentUser,
    users,
    setUsers,
    history,
    setHistory,
    itemPerPage,
    setItemPerPage,
  ];
  return <UserContext.Provider value={value} {...props}></UserContext.Provider>;
};

export default UserProvider;
