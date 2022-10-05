import React from "react";
import { createContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/config";

export const AuthContext = createContext();
const AuthProvider = ({ children, ...props }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const unsubscribed = auth.onAuthStateChanged((user) => {
      if (user) {
        const { displayName, email, uid, photoURL } = user;
        setUser({ displayName, email, uid, photoURL });
        // setIsLoading(false);
        navigate("/");
        // return;
      }
      // navigate("/sign-in");
    });
    //clean func
    return () => {
      unsubscribed();
    };
  }, [navigate]);
  return (
    <AuthContext.Provider value={{ user }} {...props}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
