import axios from "axios";
import Button from "components/button/Button";
import ManageTitle from "components/title/ManageTitle";
import { clientSide, serverSide } from "config/config";
import { UserContext } from "contexts/UserProvider";
import Field from "input/Field";
import Input from "input/Input";
import SidebarProfile from "modules/SidebarProfile";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { userProvider } from "utils/constant";

const ProfilePage = () => {
  let [currentUser, setCurrentUser] = useContext(UserContext);
  console.log(
    "🚀 ~ file: ProfilePage.js ~ line 19 ~ ProfilePage ~ currentUser",
    currentUser
  );
  const [loading, setLoading] = useState(false);
  const [loadingImg, setLoadingImg] = useState(false);
  const [users, setUsers] = useState([]);
  const {
    control, //mac dinh
    handleSubmit, //sử dụng để lấy value
    formState: { errors, isValid },
    watch,
    reset,
    register,
    //mac dinh
  } = useForm({
    mode: onchange,
    // resolver: yupResolver(schema),
  });
  useEffect(() => {
    axios.get(`${serverSide}/get/users`).then((response) => {
      setUsers(response.data);
    });
    window.scrollTo(0, 0);
  }, []);
  const handleUploadImage = (e) => {
    setLoadingImg(true);
    const formData = new FormData();
    formData.append("uid", currentUser.uid);
    formData.append("file", e.target.files[0]);
    axios
      .post("http://localhost:3000/upload/currentUser", formData)
      .then((res) => {
        if (res) {
          axios
            .post(`${serverSide}/get/userItem`, {
              uid: currentUser.uid,
            })
            .then((res) => {
              setLoadingImg(false);
              setCurrentUser(Object.assign({}, ...res.data));
            });
        }
      });
  };
  const handleDeleteImage = () => {
    setLoadingImg(true);
    axios
      .post(`${clientSide}/delete/currentUser/image`, {
        uid: currentUser.uid,
        publicID: currentUser.publicID,
      })
      .then((res) => {
        if (res) {
          axios
            .post(`${clientSide}/delete/image`, {
              uid: currentUser.uid,
              publicID: currentUser.publicID,
            })
            .then((res) => {
              if (res) {
                axios.get(`${serverSide}/get/currentUser`).then((res) => {
                  setLoadingImg(false);
                  setCurrentUser(Object.assign({}, ...res.data));
                  window.location.reload();
                });
              }
            });
        }
      });
  };
  const handleUpdateProfile = (values) => {
    setLoading(true);
    // const formData = new FormData();
    // formData.append("uid", values.uid);
    // formData.append("file", values.file[0]);
    const result = users?.filter((user) => {
      return values?.email === user.email;
    });
    if (result.length > 0 && currentUser.email !== values.email) {
      toast.error("Email already exist");
      setLoading(false);
      return;
    } else {
      axios
        .post(`${clientSide}/post/updateUser`, {
          uid: currentUser.uid,
          displayName: values.displayName,
          email: values.email,
          password: values.password,
          photoURL: currentUser.photoURL || "",
          role: currentUser.role,
          status: currentUser.status,
        })
        .then((res) => {
          if (res) {
            axios
              .post(`${clientSide}/post/update/currentUser`, {
                uid: currentUser.uid,
                photoURL: currentUser.photoURL || "",
              })
              .then((ress) => {
                console.log(ress);
                if (ress) {
                  toast.success("Update profile successfully!");
                  setLoading(false);
                }
              });
            // navigate("/manage-user");
            // if (values?.file[0] || userDetail.photoURL) {
            //   axios
            //     .post("http://localhost:3000/upload", formData)
            //     .then((res) => {
            //       if (res) {
            //         toast.success("Update user successfully!");
            //         setLoading(false);
            //         navigate("/manage-user");
            //       }
            //     });
            // } else {
            // }
          }
        });
    }
  };
  useEffect(() => {
    reset({
      displayName: currentUser.displayName,
      email: currentUser.email,
      password: currentUser.password,
      photoURL: currentUser.photoURL,
    });
  }, [
    currentUser.displayName,
    currentUser.email,
    currentUser.password,
    currentUser.photoURL,
    reset,
  ]);
  return (
    <>
      <form onSubmit={handleSubmit(handleUpdateProfile)}>
        <ManageTitle
          className=""
          title="Update profile"
          desc={`Here you can edit public information about yourself.`}
          desc2="If you signed in with Google or Facebook, you can't change your email and password."
        ></ManageTitle>
        <div className=" form-layout">
          <Field>
            <p className="mb-3 text-[17px] text-white">Display name</p>
            <Input
              className="!p-4"
              type={"text"}
              name="displayName"
              control={control}
            ></Input>
          </Field>
          <Field>
            <p className="mb-3 text-[17px] text-white">Email</p>
            <Input
              className="!p-4"
              type={"email"}
              name="email"
              control={control}
              disabled={
                currentUser.provider === userProvider.cinemaPlus ? false : true
              }
            ></Input>
          </Field>
        </div>
        <div className=" form-layout">
          <Field>
            <p className="mb-3 text-[17px] text-white">Password</p>
            <Input
              className="!p-4"
              type={"password"}
              name="password"
              control={control}
              disabled={
                currentUser.provider === userProvider.cinemaPlus ? false : true
              }
            ></Input>
          </Field>
        </div>
        <div className="flex items-center justify-center">
          <Button
            type="submit"
            className={"text-white h-[48px]"}
            isLoading={loading}
            disabled={loading}
          >
            Update profile
          </Button>
        </div>

        <div className="fixed top-[115px] w-[250px] right-[10px] z-[100]">
          <div className="rounded-full mx-auto w-[200px] h-[200px] mb-10">
            <label
              className={`${
                currentUser.photoURL === "" || !currentUser.photoURL
                  ? "cursor-pointer"
                  : ""
              } flex items-center justify-center bg-neutral-400 border border-neutral-300 border-dashed w-full min-h-[200px] relative overflow-hidden group h-full !rounded-full`}
            >
              <input
                type="file"
                className="hidden-input"
                {...register("file")}
                disabled={
                  currentUser.photoURL === "" || !currentUser.photoURL
                    ? false
                    : true
                }
                // accept=".jpg, .jpeg, .png"
                onChange={handleUploadImage}
                // {...rest}
              />
              {loadingImg && (
                <div className="min-h-[130px] max-w-[250px] flex items-center justify-center relative">
                  <div className="loader">
                    <div className="inner one"></div>
                    <div className="inner two"></div>
                    <div className="inner three"></div>
                  </div>
                </div>
              )}
              {!currentUser.photoURL && !loadingImg && (
                <div className="flex flex-col items-center text-center pointer-events-none">
                  <img
                    src="../../../img-upload.png"
                    alt="upload-img"
                    className="max-w-[80px] mb-5"
                  />
                  <p className="font-medium text-white">Choose photo</p>
                </div>
              )}
              {currentUser.photoURL && !loadingImg && (
                <>
                  <img
                    src={currentUser?.photoURL}
                    className="object-cover w-full h-full"
                    alt=""
                  />
                  <button
                    type="button"
                    className="absolute z-10 flex items-center justify-center invisible w-16 h-16 text-red-500 transition-all bg-white rounded-full opacity-0 cursor-pointer group-hover:opacity-100 group-hover:visible"
                    onClick={handleDeleteImage}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </>
              )}
            </label>
          </div>
        </div>
      </form>
    </>
  );
};

export default ProfilePage;
