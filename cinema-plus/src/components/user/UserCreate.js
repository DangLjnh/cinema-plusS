import axios from "axios";
import Button from "components/button/Button";
import FieldCheckboxes from "components/field/FieldCheckboxes";
import ShowPassword from "components/other/ShowPassword";
import Radio from "components/radio/Radio";
import ManageTitle from "components/title/ManageTitle";
import { clientSide, serverSide } from "config/config";
import Field from "input/Field";
import Input from "input/Input";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { userProvider, userRole, userStatus } from "utils/constant";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useState } from "react";
const schema = yup.object({
  email: yup.string().email().required("Please enter your email address"),
  password: yup
    .string()
    .min(8, "Your password must be at least 8 characters or greater")
    .required("Please enter your password"),
  displayName: yup.string().required("Please enter your display name"),
});
const UserCreate = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
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
    defaultValues: {
      status: userStatus.active,
      role: userRole.user,
    },
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
  useEffect(() => {
    axios.get(`${serverSide}/get/users`).then((response) => {
      setUsers(response.data);
    });
  }, []);
  const handleCreateUser = (values) => {
    setLoading(true);
    const result = users?.filter((user) => {
      return (
        values?.email === user.email &&
        userProvider.cinemaPlus === user.provider
      );
    });
    if (result.length > 0) {
      toast.error("Email already exist");
      return;
    } else {
      axios
        .post(`${clientSide}/post/user`, {
          displayName: values.displayName,
          email: values.email,
          password: values.password,
          photoURL: "",
          role: values.role,
          status: values.status,
          provider: userProvider.cinemaPlus,
        })
        .then((res) => {
          const uid = res.data.insertId;
          const formData = new FormData();
          formData.append("uid", uid);
          formData.append("file", values.file[0]);
          axios.post(`${clientSide}/upload`, formData).then((res) => {
            if (res) {
              axios
                .post(`${serverSide}/get/userItem`, {
                  uid: uid,
                })
                .then((res) => {
                  if (res) {
                    setLoading(false);
                    toast.success("Create user successful");
                    reset();
                  }
                });
            }
          });
        });
    }
  };
  return (
    <div>
      <div className="flex justify-between mt-[35px]">
        <ManageTitle
          className=""
          title="Create user"
          desc={`Add new user to system`}
        ></ManageTitle>
        <Button
          className={"text-white h-[48px]"}
          onClick={() => navigate("/manage/user")}
        >
          Return manage users
        </Button>
      </div>
      <form onSubmit={handleSubmit(handleCreateUser)}>
        <div className="mx-auto w-[200px] mb-10">
          <input type="file" name="photoURL" {...register("file")} />
        </div>
        <div className="form-layout">
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
            ></Input>
          </Field>
        </div>
        <div className="form-layout">
          <Field>
            <p className="mb-3 text-[17px] text-white">Password</p>
            <ShowPassword
              classNameInput="!p-4"
              control={control}
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
            className={"text-white w-[148px] h-[48px]"}
            isLoading={loading}
            disabled={loading}
          >
            Create User
          </Button>
        </div>
      </form>
    </div>
  );
};

export default UserCreate;
