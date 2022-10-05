import Button from "components/button/Button";
import { UserContext } from "contexts/UserProvider";
import React from "react";
import { useContext } from "react";
import styled from "styled-components";
const AuthorStyled = styled.div`
  @media screen and (max-width: 374.98px) {
    .author-name {
      font-size: 13px;
    }
  }
`;
const Author = () => {
  let [currentUser, setCurrentUser] = useContext(UserContext);
  return (
    <>
      <Button className={"text-white"}>Manage user</Button>
      <AuthorStyled className="flex items-center gap-x-5">
        <h3 className="text-sm text-white author-name">
          {currentUser.displayName}
        </h3>
        <img
          src="https://images.unsplash.com/photo-1657299141984-dd9196274cde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
          alt=""
          className="object-cover w-10 h-10 rounded-full"
        />
      </AuthorStyled>
    </>
  );
};

export default Author;
