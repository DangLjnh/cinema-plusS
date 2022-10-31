import firebase, { auth } from "../../firebase/config";
import React from "react";
import Button from "./Button";
import { useContext } from "react";
import { UserContext } from "contexts/UserProvider";
import axios from "axios";
import { clientSide, serverSide } from "config/config";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useState } from "react";
import { userProvider, userRole, userStatus } from "utils/constant";
const ButtonFB = () => {
  const navigate = useNavigate();
  let [currentUser, setCurrentUser] = useContext(UserContext);
  const fbProvider = new firebase.auth.FacebookAuthProvider();
  const [users, setUsers] = useState([]);
  useEffect(() => {
    axios.get(`${serverSide}/get/users`).then((response) => {
      setUsers(response.data);
    });
  }, []);
  const handleFbLogin = () => {
    auth.signInWithPopup(fbProvider);
    auth.onAuthStateChanged((user) => {
      if (user) {
        const result = users?.filter((userFilter) => {
          return (
            user?.email === userFilter.email &&
            userFilter.provider === userProvider.facebook
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
              provider: userProvider.facebook,
            })
            .then((res) => {
              if (res) {
                setCurrentUser({
                  displayName: user.displayName,
                  email: user.email,
                  photoURL: user.photoURL,
                  role: userRole.user,
                  status: userStatus.active,
                  provider: userProvider.facebook,
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
              provider: userProvider.facebook,
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
                    provider: userProvider.facebook,
                  })
                  .then((res) => {
                    if (res) {
                      setCurrentUser({
                        displayName: user.displayName,
                        email: user.email,
                        photoURL: user.photoURL,
                        role: userRole.user,
                        status: userStatus.active,
                        provider: userProvider.facebook,
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
      bgColor={"fb"}
      className={"w-1/2 my-5 text-black relative"}
      onClick={handleFbLogin}
    >
      <span className="flex items-center justify-center gap-x-3">
        <img
          src="https://kt.city/static/icon-social-facebook.svg"
          alt=""
          className="w-[25px h-[25px]"
        />
        <span className="text-white">Facebook</span>
      </span>
    </Button>
  );
};

export default ButtonFB;
