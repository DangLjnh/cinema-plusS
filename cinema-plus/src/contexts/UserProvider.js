import React from "react";
import { createContext } from "react";
import { useState } from "react";

export const UserContext = createContext();
const UserProvider = (props) => {
  const [currentUser, setCurrentUser] = useState({});

  const value = [currentUser, setCurrentUser];
  return <UserContext.Provider value={value} {...props}></UserContext.Provider>;
};

export default UserProvider;
