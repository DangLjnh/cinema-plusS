import axios from "axios";
import Button from "components/button/Button";
import FieldCheckboxes from "components/field/FieldCheckboxes";
import ImageUpload from "components/image/ImageUpLoad";
import ShowPassword from "components/other/ShowPassword";
import Radio from "components/radio/Radio";
import ManageUserTitle from "components/title/ManageUserTitle";
import { clientSide, serverSide } from "config/config";
import { UserContext } from "contexts/UserProvider";
import Field from "input/Field";
import Input from "input/Input";
import Label from "input/Label";
import React from "react";
import { useState } from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { userProvider, userRole, userStatus } from "utils/constant";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
const UserUpdate = () => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const { userID } = useParams();
  const navigate = useNavigate();
  let [userDetail, setUserDetail] = useState({});
  const schema = yup.object({
    email: yup.string().email().required("Please enter your email address"),
    password:
      userDetail.provider === userProvider.cinemaPlus &&
      yup
        .string()
        .min(8, "Your password must be at least 8 characters or greater")
        .required("Please enter your password"),
    displayName: yup.string().required("Please enter your display name"),
  });
  useEffect(() => {
    axios
      .post(`${serverSide}/get/userItem`, {
        uid: userID,
      })
      .then((res) => setUserDetail(Object.assign({}, ...res.data)));
    axios.get(`${serverSide}/get/users`).then((response) => {
      setUsers(response.data);
    });
    window.scrollTo(0, 0);
  }, []);
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
    resolver: yupResolver(schema),
  });
  const watchStatus = Number(watch("status"));
  const watchRole = Number(watch("role"));
  useEffect(() => {
    const arrayErrors = Object.values(errors);
    if (arrayErrors.length > 0) {
      toast.error(arrayErrors[0]?.message, {
        pauseOnHover: false,
        delay: 0,
      });
    }
  }, [errors]);
  const handleUpdateUser = (values) => {
    // for (let i = 0; i < values.file.length; i++) {
    //   const file = values.file[i];
    //   console.log(JSON.stringify(file));
    // }
    // for (const file of values.file) {
    //   console.log(`\n${file}`);
    // }
    const data = new FormData();
    data.append("file", values.file[0]);
    setLoading(true);
    const result = users?.filter((user) => {
      return values?.email === user.email;
    });
    if (result.length > 0 && userDetail.email !== values.email) {
      toast.error("Email already exist");
      setLoading(false);
      return;
    } else {
      axios
        .post(`${clientSide}/post/updateUser`, {
          uid: values.uid,
          displayName: values.displayName,
          email: values.email,
          password: values.password,
          photoURL: data.append("file", values.file[0]),
          role: values.role,
          status: values.status,
        })
        .then((res) => {
          if (res) {
            toast.success("Update user successfully!");
            setLoading(false);
            navigate("/manage-user");
          }
        });
    }
  };
  useEffect(() => {
    reset(userDetail);
  }, [reset, userDetail]);
  return (
    <>
      <div className="flex justify-between mt-[35px]">
        <ManageUserTitle
          className=""
          title="Update user"
          desc={`Update user information uID: ${userID}`}
        ></ManageUserTitle>
        <Button
          className={"text-white h-[48px]"}
          onClick={() => navigate("/manage-user")}
        >
          Return manage user
        </Button>
      </div>
      <form onSubmit={handleSubmit(handleUpdateUser)}>
        <div className="rounded-full mx-auto w-[200px] h-[200px] mb-10">
          <label
            className={`cursor-pointer flex items-center justify-center bg-gray-100 border border-dashed w-full min-h-[200px] relative overflow-hidden group h-full !rounded-full`}
          >
            <input
              type="file"
              className="hidden-input"
              {...register("file")}
              // {...rest}
            />
            {
              <div className="flex flex-col items-center text-center pointer-events-none">
                <img
                  src="../../../img-upload.png"
                  alt="upload-img"
                  className="max-w-[80px] mb-5"
                />
                <p className="font-semibold">Choose photo</p>
              </div>
            }
            {/* {image && (
        <Fragment>
          <img src={image} className="object-cover w-full h-full" alt="" />
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
        </Fragment>
      )} */}
          </label>
        </div>
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
              disabled={
                userDetail.provider === userProvider.cinemaPlus ? false : true
              }
              name="email"
              control={control}
            ></Input>
          </Field>
        </div>
        <div className="form-layout">
          <Field>
            <p className="mb-3 text-[17px] text-white">Password</p>
            <ShowPassword
              classNameInput="!p-4"
              control={control}
              disabled={
                userDetail.provider === userProvider.cinemaPlus ? false : true
              }
            ></ShowPassword>
          </Field>
        </div>
        <div className="form-layout">
          <Field>
            <p className="mb-3 text-[17px] text-white">Status</p>
            <FieldCheckboxes>
              <Radio
                name="status"
                control={control}
                checked={watchStatus === userStatus.active}
                value={userStatus.active}
              >
                Active
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={watchStatus === userStatus.ban}
                value={userStatus.ban}
              >
                Banned
              </Radio>
            </FieldCheckboxes>
          </Field>
          <Field>
            <p className="mb-3 text-[17px] text-white">Role</p>
            <FieldCheckboxes>
              <Radio
                name="role"
                control={control}
                checked={watchRole === userRole.admin}
                value={userRole.admin}
              >
                Admin
              </Radio>
              <Radio
                name="role"
                control={control}
                checked={watchRole === userRole.mod}
                value={userRole.mod}
              >
                Moderator
              </Radio>
              <Radio
                name="role"
                control={control}
                checked={watchRole === userRole.user}
                value={userRole.user}
              >
                User
              </Radio>
            </FieldCheckboxes>
          </Field>
        </div>
        <div className="flex items-center justify-center mb-10">
          <Button
            type="submit"
            className={"text-white w-[147px] h-[48px]"}
            isLoading={loading}
            disabled={loading}
          >
            Update User
          </Button>
        </div>
      </form>
    </>
  );
};

export default UserUpdate;
