import { IconEyeClose, IconEyeOpen } from "components/icon";
import Input from "input/Input";
import Label from "input/Label";
import React from "react";
import { useState } from "react";

const ShowPassword = ({
  control,
  haveLabel,
  classNameInput = "",
  ...props
}) => {
  const [eyeOpen, setEyeOpen] = useState(false);
  return (
    <div className="relative">
      <Input
        type={eyeOpen ? "text" : "password"}
        name="password"
        control={control}
        className={classNameInput}
        {...props}
      ></Input>
      {haveLabel && <Label>Password</Label>}
      <div
        className={`absolute -translate-y-1/2 cursor-pointer input-icon right-5 top-1/2`}
        onClick={() => setEyeOpen(!eyeOpen)}
      >
        {eyeOpen ? <IconEyeOpen></IconEyeOpen> : <IconEyeClose></IconEyeClose>}
      </div>
    </div>
  );
};

export default ShowPassword;
