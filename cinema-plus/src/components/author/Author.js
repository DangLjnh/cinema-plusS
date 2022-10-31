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
const Author = ({ dashboard = false, blog = false, bookmarkPost }) => {
  const navigate = useNavigate();
  let [currentUser, setCurrentUser] = useContext(UserContext);
  return (
    <>
      {dashboard && (
        <Button
          className={"text-white h-[48px]"}
          onClick={() => navigate("/dashboard")}
        >
          Dashboard
        </Button>
      )}
      {blog && (
        <Button
          className={"text-white h-[48px]"}
          onClick={() => navigate("/blog")}
        >
          Go to blog
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
      {bookmarkPost && (
        <Button
          className={"text-white transition-all hover:opacity-80"}
          onClick={() => navigate(`/blog/posts/bookmark/${currentUser.uid}`)}
        >
          Bookmark
        </Button>
      )}

      {currentUser && Object.keys(currentUser).length !== 0 && (
        <AuthorStyled className="flex items-center gap-x-5">
          <h3 className="text-sm text-white capitalize author-name">
            {currentUser.displayName}
          </h3>
          <img
            src={currentUser.photoURL || "../../../user.png"}
            alt=""
            className="object-cover w-10 h-10 rounded-full"
          />
        </AuthorStyled>
      )}
    </>
  );
};

export default Author;
