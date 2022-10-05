import firebase, { auth } from "../../firebase/config";
import React from "react";
import Button from "./Button";
const ButtonFB = () => {
  const fbProvider = new firebase.auth.FacebookAuthProvider();
  const handleFbLogin = () => {
    auth.signInWithPopup(fbProvider);
  };
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
