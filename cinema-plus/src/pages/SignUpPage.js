import axios from "axios";
import BackgroundSignInOut from "components/background/BackgroundSignInOut";
import Button from "components/button/Button";
import { IconEyeClose, IconEyeOpen } from "components/icon";
import Logo from "components/other/Logo";
import SignInUpTitle from "components/title/SignInUpTitle";
import Field from "input/Field";
import Input from "input/Input";
import Label from "input/Label";
import LayoutSignInOut from "layout/LayoutSignInOut";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { userRole, userStatus } from "utils/constant";
import { v4 } from "uuid";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserContext } from "contexts/UserProvider";
import { clientSide, serverSide } from "config/config";
const SignUpPageStyle = styled.form`
  height: 100vh;
  margin-left: -20px;
  margin-right: -20px;
  svg {
    transition: all 1s linear;
  }

  .input-focus-effect input:focus + label,
  .input-focus-effect input:not(:placeholder-shown) + label {
    transform: translateY(-5px);
    top: 10px;
    color: #7a74f9;
  }
  .input-focus-effect input:focus + label + div,
  .input-focus-effect input:not(:placeholder-shown) + label + div {
    svg {
      path {
        stroke: #7a74f9;
      }
    }
  }
  @media screen and (max-width: 767.98px) {
    /* w-[450px] h-[600px] */
    .social {
      font-size: 12px;
      column-gap: 8px;
      img {
        width: 20px;
        height: 20px;
      }
    }
    .last-name {
      margin-top: 20px;
    }
    .contact {
      display: block;
    }
    .bg-trans {
      width: 300px;
      height: 650px;
    }
  }
`;
const schema = yup.object({
  displayName: yup.string().required("Please enter your display name"),
  email: yup.string().email().required("Please enter your email address"),
  password: yup
    .string()
    .min(8, "Your password must be at least 8 characters or greater")
    .required("Please enter your password"),
});
const SignUpPage = () => {
  let [currentUser, setCurrentUser] = useContext(UserContext);
  const [users, setUsers] = useState("");
  const navigate = useNavigate();
  const {
    control, //mac dinh
    handleSubmit, //sử dụng để lấy value
    formState: { errors, isValid, isSubmitting },
    reset,
    // watch,
    // reset,
    //mac dinh
  } = useForm({
    mode: onchange,
    resolver: yupResolver(schema),
  });
  useEffect(() => {
    const arrayErrors = Object.values(errors);
    if (arrayErrors.length > 0) {
      toast.error(arrayErrors[0]?.message, {
        pauseOnHover: false,
        delay: 0,
      });
    }
  }, [errors]);
  useEffect(() => {
    axios.get(`${serverSide}/get/users`).then((response) => {
      setUsers(response.data);
    });
    if (currentUser?.email) navigate("/");
  }, []);
  const handleSignUp = (values) => {
    let userID = 0;
    const result = users?.filter((user) => {
      return values?.email === user.email;
    });
    if (result === []) {
      toast.error("Email already exist");
      return;
    } else {
      axios.post(`${clientSide}/post/user`, {
        displayName: values.displayName,
        email: values.email,
        password: values.password,
        photoURL: "",
        role: 3,
        status: 1,
      });
      setTimeout(() => {
        axios.get(`${serverSide}/get/users`).then((response) => {
          const usersAfter = response.data;
          const result = usersAfter?.filter((user) => {
            return values?.email === user.email;
          });
          let userCurrent = Object.assign({}, ...result);
          axios.post(`${clientSide}/post/currentUser`, {
            uid: userCurrent.uid,
            displayName: userCurrent.displayName,
            email: userCurrent.email,
            password: userCurrent.password,
            photoURL: "",
            role: userCurrent.role,
            status: userCurrent.status,
          });
          setCurrentUser(Object.assign({}, ...result));
        });
      }, 1000);

      // axios.post("http://localhost:3000/post/currentUser", {
      //   // uid: currentUser.uid,
      //   displayName: values.displayName,
      //   email: values.email,
      //   password: values.password,
      //   photoURL: "",
      //   // createdAt: dateCurrent,
      //   role: currentUser.role,
      //   status: currentUser.status,
      // });
      toast.success("Register user successfully!");
      navigate("/");
    }
  };
  return (
    <>
      <SignUpPageStyle onSubmit={handleSubmit(handleSignUp)}>
        <Logo className={"absolute z-[100] m-5 top-0 left-0"}></Logo>
        <BackgroundSignInOut></BackgroundSignInOut>
        <LayoutSignInOut>
          <div className="m-10">
            <SignInUpTitle>Sign up</SignInUpTitle>
            <p className="mt-3 text-center">Welcome to Cinema Plus!</p>
            <div className="flex gap-x-5 social">
              <Button
                bgColor={"white"}
                className={"w-1/2 my-5 text-black relative"}
              >
                <span className="flex items-center justify-center gap-x-3">
                  <img
                    src="https://kt.city/static/icon-social-google.svg"
                    alt=""
                    className="w-[25px] h-[25px]"
                  />
                  <span>Google</span>
                </span>
              </Button>
              <Button
                bgColor={"fb"}
                className={"w-1/2 my-5 text-black relative"}
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
            </div>
            <Field className={"mb-5"}>
              <Input type={"text"} name="displayName" control={control}></Input>
              <Label>Display name</Label>
            </Field>
            <Field>
              <Input type={"email"} name="email" control={control}></Input>
              <Label>Email</Label>
            </Field>
            <Field className={"my-5"}>
              <Input type="password" name="password" control={control}></Input>
              <Label>Password</Label>
              <div className="absolute -translate-y-1/2 input-icon right-5 top-1/2">
                <IconEyeClose></IconEyeClose>
              </div>
            </Field>
            <Button
              type="submit"
              className={`w-full text-white `}
              isLoading={isSubmitting}
              disabled={isSubmitting}
            >
              Sign up
            </Button>
            <p className="mt-5 text-center">
              You already have an account?{" "}
              <NavLink
                className={
                  "text-white font-medium text-lg underline search-result"
                }
                to={"/sign-in"}
              >
                Sign in
              </NavLink>
            </p>
          </div>
        </LayoutSignInOut>
        {/* <div className="absolute bg-trans z-10 w-[450px] h-[600px] bg-slate-300 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2"></div> */}
      </SignUpPageStyle>
      <div className="absolute z-1 inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.8)] to-[rgba(0,0,0,0.4)] "></div>
    </>
  );
};

export default SignUpPage;
