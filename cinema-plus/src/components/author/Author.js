import Button from "components/button/Button";
import { UserContext } from "contexts/UserProvider";
import React from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
const AuthorStyled = styled.div`
  @media screen and (max-width: 374.98px) {
    .author-name {
      font-size: 13px;
    }
  }
`;
const Author = () => {
  const navigate = useNavigate();
  let [currentUser, setCurrentUser] = useContext(UserContext);
  return (
    <>
      {currentUser.role === 1 && (
        <Button
          className={"text-white"}
          onClick={() => navigate("/manage-user")}
        >
          Manage user
        </Button>
      )}

      {currentUser &&
        Object.keys(currentUser).length === 0 &&
        Object.getPrototypeOf(currentUser) === Object.prototype && (
          <Button
            className={"text-white transition-all hover:opacity-80"}
            onClick={() => navigate("/sign-in")}
          >
            Sign in
          </Button>
        )}

      {currentUser && Object.keys(currentUser).length !== 0 && (
        <AuthorStyled className="flex items-center gap-x-5">
          <h3 className="text-sm text-white capitalize author-name">
            {currentUser.displayName}
          </h3>
          <img
            src={currentUser.photoURL || "../user.png"}
            alt=""
            className="object-cover w-10 h-10 rounded-full"
          />
        </AuthorStyled>
      )}
    </>
  );
};

export default Author;
