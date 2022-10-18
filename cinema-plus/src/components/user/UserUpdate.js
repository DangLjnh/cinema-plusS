import axios, { toFormData } from "axios";
import Button from "components/button/Button";
import FieldCheckboxes from "components/field/FieldCheckboxes";
import ImageUpload from "components/image/ImageUpLoad";
import ShowPassword from "components/other/ShowPassword";
import Radio from "components/radio/Radio";
import ManageTitle from "components/title/ManageTitle";
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
import { Cloudinary } from "@cloudinary/url-gen";
import { userProvider, userRole, userStatus } from "utils/constant";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ImageUpLoad from "components/image/ImageUpLoad";
const UserUpdate = () => {
  const [loading, setLoading] = useState(false);
  const [loadingImg, setLoadingImg] = useState(false);
  const [checkUpdate, setCheckUpdate] = useState(false);
  const [users, setUsers] = useState([]);
  const { userID } = useParams();
  const [selectedFile, setSelectedFile] = useState();
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
      .post(`${clientSide}/get/userItem`, {
        uid: userID,
      })
      .then((res) => setUserDetail(Object.assign({}, ...res.data)));
    axios.get(`${clientSide}/get/users`).then((response) => {
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
  const cld = new Cloudinary({
    cloud: {
      cloudName: "dwkckmmr7",
    },
  });
  const handleReturnManage = () => {
    // if (userDetail.photoURL && checkUpdate === true) {
    //   setLoadingImg(true);
    //   axios
    //     .post(`${clientSide}/delete/image`, {
    //       uid: userDetail.uid,
    //       publicID: userDetail.publicID,
    //     })
    //     .then((res) => {
    //       if (res) {
    //         setLoadingImg(false);
    //         navigate("/manage/user");
    //       }
    //     });
    // } else {
    navigate("/manage/user");
    // }
  };
  const handleDeleteImage = () => {
    setLoadingImg(true);
    axios
      .post(`${clientSide}/delete/image`, {
        uid: userDetail.uid,
        publicID: userDetail.publicID,
      })
      .then((res) => {
        if (res) {
          axios
            .post(`${serverSide}/get/userItem`, {
              uid: userID,
            })
            .then((res) => {
              setLoadingImg(false);
              setUserDetail(Object.assign({}, ...res.data));
            });
        }
      });
  };
  const handleUploadImage = (e) => {
    setLoadingImg(true);
    setCheckUpdate(true);
    const formData = new FormData();
    formData.append("uid", userDetail.uid);
    formData.append("file", e.target.files[0]);
    axios.post(`${clientSide}/upload`, formData).then((res) => {
      if (res) {
        axios
          .post(`${serverSide}/get/userItem`, {
            uid: userID,
          })
          .then((res) => {
            setLoadingImg(false);
            setUserDetail(Object.assign({}, ...res.data));
          });
      }
    });
  };
  const handleUpdateUser = (values) => {
    setLoading(true);
    setCheckUpdate(true);
    // const formData = new FormData();
    // formData.append("uid", values.uid);
    // formData.append("file", values.file[0]);
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
          photoURL: userDetail.photoURL || "",
          role: values.role,
          status: values.status,
        })
        .then((res) => {
          if (res) {
            toast.success("Update user successfully!");
            setLoading(false);
            navigate("/manage/user");
          }
        });
    }
  };
  useEffect(() => {
    reset(userDetail);
  }, [reset, userDetail]);
  return (
    <>
      <div className="flex justify-between">
        <ManageTitle
          className=""
          title="Update user"
          desc={`Update user information uID: ${userID}`}
        ></ManageTitle>
        <Button className={"text-white h-[48px]"} onClick={handleReturnManage}>
          Return manage user
        </Button>
      </div>
      <form onSubmit={handleSubmit(handleUpdateUser)} className="form-update">
        <div className="rounded-full mx-auto w-[200px] h-[200px] mb-10">
          <ImageUpLoad
            handleDeleteImage={handleDeleteImage}
            handleUploadImage={handleUploadImage}
            register={register}
            loadingImg={loadingImg}
            userDetail={userDetail}
          ></ImageUpLoad>
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
