import Button from "components/button/Button";
import ManageUserTitle from "components/title/ManageUserTitle";
import { UserContext } from "contexts/UserProvider";
import Field from "input/Field";
import Input from "input/Input";
import SidebarProfile from "modules/SidebarProfile";
import React from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { useForm } from "react-hook-form";

const ProfilePage = () => {
  let [currentUser, setCurrentUser] = useContext(UserContext);
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
  const handleUpdateProfile = (values) => {};
  useEffect(() => {
    reset({
      displayName: currentUser.displayName,
      email: currentUser.email,
      password: currentUser.password,
    });
  }, [currentUser.displayName, currentUser.email, currentUser.password, reset]);
  return (
    <>
      <form onSubmit={handleSubmit(handleUpdateProfile)}>
        <ManageUserTitle
          className=""
          title="Update profile"
          desc={`Here you can edit public information about yourself.`}
          desc2="If you signed in with Google or Facebook, you can't change your email and password."
        ></ManageUserTitle>
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
            ></Input>
          </Field>
        </div>
        <div className="flex items-center justify-center">
          <Button
            type="submit"
            className={"text-white h-[48px]"}
            // isLoading={loading}
            // disabled={loading}
          >
            Update profile
          </Button>
        </div>
      </form>
      <SidebarProfile></SidebarProfile>
    </>
  );
};

export default ProfilePage;
