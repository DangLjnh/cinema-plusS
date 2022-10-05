import firebase, { auth } from "../../firebase/config";
import React from "react";
import Button from "./Button";

const ggProvider = new firebase.auth.GoogleAuthProvider();
const ButtonGG = () => {
  const handleGoogleLogin = () => {
    auth.signInWithPopup(ggProvider);
  };
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
