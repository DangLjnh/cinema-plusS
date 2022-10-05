import React from "react";
import styled from "styled-components";
import { useController } from "react-hook-form";
const InputStyle = styled.input`
  padding: 25px 45px 10px 20px;
  display: block;
  width: 100%;
  border-radius: 10px;
  transition: border 0.25s linear;
  background-color: transparent;
  outline: none;
  color: white;
  font-size: 14px;
  border: 2px solid #757279;
  &:focus {
    border-color: #7a74f9;
  }
`;
const Input = ({
  type = "text",
  name,
  control,
  children,
  password,
  ...props
}) => {
  const { field } = useController({
    control,
    name,
    defaultValue: "",
  });
  return (
    <InputStyle
      autoComplete="off"
      type={type}
      placeholder=" "
      {...props}
      {...field}
    ></InputStyle>
  );
};

export default Input;
