import axios from "axios";
import Button from "components/button/Button";
import FieldCheckboxes from "components/field/FieldCheckboxes";
import Radio from "components/radio/Radio";
import ManageTitle from "components/title/ManageTitle";
import { clientSide, serverSide } from "config/config";
import Field from "input/Field";
import Input from "input/Input";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import slugify from "slugify";
import styled from "styled-components";
import { status } from "utils/constant";
const BlogCategoriesCreateStyle = styled.form``;
const BlogCategoriesCreate = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
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
      status: status.approve,
    },
    // resolver: yupResolver(schema),
  });
  const watchStatus = Number(watch("status"));
  useEffect(() => {
    axios.get(`${clientSide}/get/categories`).then((response) => {
      setCategories(response.data);
    });
  }, []);
  const handleCreateCategory = (values) => {
    setLoading(true);
    const result = categories?.filter((category) => {
      return (
        slugify(values?.name) === category.slug ||
        slugify(values?.slug) === category.slug
      );
    });
    if (result.length > 0) {
      toast.error("Category already exist");
      setLoading(false);
      return;
    } else {
      axios
        .post(`${clientSide}/post/category`, {
          name: values.name,
          slug:
            slugify(values.name).toLowerCase() ||
            slugify(values.slug).toLowerCase(),
          status: values.status,
        })
        .then((res) => {
          if (res) {
            setLoading(false);
            toast.success("Create category successfully!");
            reset();
          }
        });
    }
    console.log(values);
  };
  return (
    <BlogCategoriesCreateStyle onSubmit={handleSubmit(handleCreateCategory)}>
      <div className="flex justify-between mt-[35px]">
        <ManageTitle
          className=""
          title="Create categories"
          desc={`Add new category to system`}
        ></ManageTitle>
        <Button
          className={"text-white h-[48px]"}
          onClick={() => navigate("/manage/categories")}
        >
          Return manage categories
        </Button>
      </div>
      <div className="form-layout">
        <Field>
          <p className="mb-3 text-[17px] text-white">Name</p>
          <Input
            className="!p-4"
            type={"text"}
            name="name"
            control={control}
          ></Input>
        </Field>
        <Field>
          <p className="mb-3 text-[17px] text-white">Slug</p>
          <Input
            className="!p-4"
            type={"text"}
            name="slug"
            control={control}
          ></Input>
        </Field>
      </div>
      <div className="form-layout">
        <Field>
          <p className="mb-3 text-[17px] text-white">Status</p>
          <FieldCheckboxes>
            <Radio
              name="status"
              control={control}
              checked={watchStatus === status.approve}
              value={status.approve}
            >
              Approved
            </Radio>
            <Radio
              name="status"
              control={control}
              checked={watchStatus === status.reject}
              value={status.reject}
            >
              Reject
            </Radio>
          </FieldCheckboxes>
        </Field>
      </div>
      <div className="flex items-center justify-center mb-10">
        <Button
          type="submit"
          className={"text-white w-[180px] h-[48px]"}
          isLoading={loading}
          disabled={loading}
        >
          Create category
        </Button>
      </div>
    </BlogCategoriesCreateStyle>
  );
};

export default BlogCategoriesCreate;
