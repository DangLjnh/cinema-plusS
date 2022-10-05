import BackgroundSignInOut from "components/background/BackgroundSignInOut";
import Button from "components/button/Button";
import { IconEyeClose, IconEyeOpen } from "components/icon";
import Logo from "components/other/Logo";
import SignInUpTitle from "components/title/SignInUpTitle";
import firebase, { auth } from "../firebase/config";
import Field from "input/Field";
import Input from "input/Input";
import Label from "input/Label";
import LayoutSignInOut from "layout/LayoutSignInOut";
import React, { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import ButtonFB from "components/button/ButtonFB";
import { useForm } from "react-hook-form";
import axios from "axios";
import ButtonGG from "components/button/ButtonGG";
import { useState } from "react";
import { toast } from "react-toastify";
import { useContext } from "react";
import { UserContext } from "contexts/UserProvider";
import { setCurrentUser } from "redux/movieSlice";
import { userRole } from "utils/constant";
const SignInPageStyle = styled.form`
  height: 100vh;
  margin-left: -20px;
  margin-right: -20px;
  svg {
    transition: all 1s linear;
  }
  .bg-trans {
    background: rgba(0, 0, 0, 0.8);
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
`;
const schema = yup.object({
  email: yup.string().email().required("Please enter your email address"),
  password: yup
    .string()
    .min(8, "Your password must be at least 8 characters or greater")
    .required("Please enter your password"),
});

const SignInPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);
  let [currentUser, setCurrentUser] = useContext(UserContext);
  const {
    control, //mac dinh
    handleSubmit, //sử dụng để lấy value
    formState: { errors, isValid },
    // watch,
    // reset,
    //mac dinh
  } = useForm({
    mode: onchange,
    resolver: yupResolver(schema),
  });
  // useEffect(() => {
  //   if (currentUser?.email) navigate("/");
  // }, [currentUser, navigate]);
  useEffect(() => {
    const arrayErrors = Object.values(errors);
    if (arrayErrors.length > 0) {
      toast.error(arrayErrors[0]?.message, {
        pauseOnHover: false,
        delay: 0,
      });
    }
  }, [errors]);
  // const [userCorrect, setUserCorrect] = useState({});
  useEffect(() => {
    axios.get("http://localhost:8080/get").then((response) => {
      setUsers(response.data);
    });
    axios.get("http://localhost:8080/get/currentUser").then((response) => {
      const data = Object.assign({}, ...response.data);
      setCurrentUser(data);
    });
    if (currentUser?.email) navigate("/");
  }, []);
  const handleSignIn = (values) => {
    const result = users?.filter((user) => {
      return values?.email === user.email && values?.password === user.password;
    });
    currentUser = Object.assign({}, ...result);
    if (result) {
      axios
        .post("http://localhost:3000/post/currentUser", {
          // uid: 5,
          displayName: currentUser.displayName,
          email: values.email,
          password: values.password,
          photoURL: "",
          // createdAt: dateCurrent,
          role: userRole.user,
        })
        .then((res) => console.log("success, dictionary sent,", res))
        .catch((err) => {
          console.log(err.response);
        });
      setCurrentUser(currentUser);
      toast.success("Login sucessfull");
      navigate("/");
    } else {
      toast.error("Login fail");
    }
  };
  // auth.signOut();
  return (
    <>
      <SignInPageStyle onSubmit={handleSubmit(handleSignIn)}>
        <Logo className={"absolute z-[100] m-5 top-0 left-0"}></Logo>
        <BackgroundSignInOut></BackgroundSignInOut>
        <LayoutSignInOut>
          <div className="m-10">
            <SignInUpTitle>Sign in</SignInUpTitle>
            <p className="mt-3 text-center">
              Welcome back! Please enter your details.
            </p>
            <div className="flex gap-x-5 social">
              <ButtonGG></ButtonGG>
              <ButtonFB></ButtonFB>
            </div>
            <Field>
              <Input type={"email"} name="email" control={control}></Input>
              <Label>Email</Label>
            </Field>
            <Field className={"my-5"}>
              <Input
                type={"password"}
                name="password"
                control={control}
              ></Input>
              <Label>Password</Label>
              <div className="absolute -translate-y-1/2 input-icon right-5 top-1/2">
                <IconEyeClose></IconEyeClose>
              </div>
            </Field>
            <Button type="submit" className={"w-full text-white "}>
              Sign in
            </Button>
            <p className="mt-5 text-center">
              If you don't have an account.{" "}
              <NavLink
                className={
                  "text-white font-medium text-lg underline search-result"
                }
                to={"/sign-up"}
              >
                Sign up
              </NavLink>
            </p>
          </div>
        </LayoutSignInOut>
      </SignInPageStyle>
      <div className="absolute z-1 inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.8)] to-[rgba(0,0,0,0.4)] "></div>
    </>
  );
};

export default SignInPage;
// {
//   <div className="absolute flex gap-x-[100px] -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">
//     <div className="w-[80vh] h-[80vh] bg-[#191d29] rounded-xl"></div>
//     <div className="w-[80vh] h-[80vh] bg-[#191d29] rounded-xl flex items-center justify-center">
//       <img srcSet="../../Space.png 2.5x" alt="" />
//     </div>{" "}
//   </div>;
// }
{
  /* <SignInPageStyle>
        <div className="absolute z-10 w-[200px] h-[200px] bg-slate-300 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">
          <input type="text" />
        </div>
        ;
      </SignInPageStyle>
       */
}
