import React from "react";

const SignInUpTitle = ({ children, className }) => {
  return (
    <h2
      className={`text-center text-3xl text-white font-semibold ${className}`}
    >
      {children}
    </h2>
  );
};

export default SignInUpTitle;
