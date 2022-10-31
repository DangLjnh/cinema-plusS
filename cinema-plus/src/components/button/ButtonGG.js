import firebase, { auth } from "../../firebase/config";
import React from "react";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useContext } from "react";
import { UserContext } from "contexts/UserProvider";
import axios from "axios";
import { clientSide, serverSide } from "config/config";
import { userProvider, userRole, userStatus } from "utils/constant";
import { toast } from "react-toastify";
import { useState } from "react";

const ggProvider = new firebase.auth.GoogleAuthProvider();
const ButtonGG = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useContext(UserContext);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    axios.get(`${serverSide}/get/users`).then((response) => {
      setUsers(response.data);
    });
  }, []);
  const handleGoogleLogin = () => {
    auth.signInWithPopup(ggProvider);
    auth.onAuthStateChanged((user) => {
      if (user) {
        const result = users?.filter((userFilter) => {
          return (
            user?.email === userFilter.email &&
            userFilter.provider === userProvider.google
          );
        });
        let userCurrent = Object.assign({}, ...result);
        if (Object.keys(userCurrent).length !== 0) {
          axios
            .post(`${clientSide}/post/currentUser`, {
              uid: userCurrent.uid,
              displayName: userCurrent.displayName,
              email: userCurrent.email,
              photoURL: userCurrent.photoURL,
              role: userCurrent.role,
              status: userCurrent.status,
              provider: userProvider.google,
            })
            .then((res) => {
              if (res) {
                setCurrentUser({
                  displayName: user.displayName,
                  email: user.email,
                  photoURL: user.photoURL,
                  role: userRole.user,
                  status: userStatus.active,
                  provider: userProvider.google,
                });
                toast.success("Login sucessfull");
                navigate("/");
                return;
              }
            });
        } else {
          axios
            .post(`${clientSide}/post/user`, {
              displayName: user.displayName,
              email: user.email,
              photoURL: user.photoURL,
              role: userRole.user,
              status: userStatus.active,
              provider: userProvider.google,
            })
            .then((res) => {
              if (res) {
                axios
                  .post(`${clientSide}/post/currentUser`, {
                    displayName: user.displayName,
                    email: user.email,
                    photoURL: user.photoURL,
                    role: userRole.user,
                    status: userStatus.active,
                    provider: userProvider.google,
                  })
                  .then((res) => {
                    if (res) {
                      setCurrentUser({
                        displayName: user.displayName,
                        email: user.email,
                        photoURL: user.photoURL,
                        role: userRole.user,
                        status: userStatus.active,
                        provider: userProvider.google,
                      });
                      toast.success("Login sucessfull");
                      navigate("/");
                      return;
                    }
                  });
              }
            });
        }
      }
    });
  };
  // auth.signOut();
  return (
    <Button
      bgColor={"white"}
      className={"w-1/2 my-5 text-black relative "}
      onClick={handleGoogleLogin}
    >
      <span className="flex items-center justify-center gap-x-3">
        <img
          src="https://kt.city/static/icon-social-google.svg"
          alt=""
          className="w-[25px h-[25px]"
        />
        <span>Google</span>
      </span>
    </Button>
  );
};

export default ButtonGG;
