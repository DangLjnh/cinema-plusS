import axios from "axios";
import Button from "components/button/Button";
import FieldCheckboxes from "components/field/FieldCheckboxes";
import Radio from "components/radio/Radio";
import ManageTitle from "components/title/ManageTitle";
import { clientSide } from "config/config";
import Field from "input/Field";
import Input from "input/Input";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import slugify from "slugify";
import { status } from "utils/constant";

const BlogCategoriesUpdate = () => {
  const { categoryID } = useParams();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [categoryDetail, setCategoryDetail] = useState([]);
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
    // resolver: yupResolver(schema),
  });
  const watchStatus = Number(watch("status"));
  useEffect(() => {
    axios
      .post(`${clientSide}/get/categoryItem`, {
        categoryID: categoryID,
      })
      .then((res) => setCategoryDetail(Object.assign({}, ...res.data)));
    axios.get(`${clientSide}/get/categories`).then((response) => {
      setCategories(response.data);
    });
  }, []);
  const handleUpdateCategory = (values) => {
    setLoading(true);
    const result = categories?.filter((category) => {
      return (
        slugify(values?.name) === category.slug ||
        slugify(values?.slug) === category.slug
      );
    });
    if (result.length > 0 && categoryDetail.slug !== values.slug) {
      toast.error("Email already exist");
      return;
    } else {
      axios
        .post(`${clientSide}/post/update/category`, {
          categoryID: values.categoryID,
          name: values.name,
          slug: values.slug,
          status: values.status,
        })
        .then((res) => {
          if (res) {
            toast.success("Update category successfully!");
            setLoading(false);
            navigate("/manage/categories");
          }
        });
    }
  };
  useEffect(() => {
    reset(categoryDetail);
  }, [reset, categoryDetail]);
  return (
    <form onSubmit={handleSubmit(handleUpdateCategory)}>
      <div className="flex justify-between mt-[35px]">
        <ManageTitle
          className=""
          title="Update category"
          desc={`Update category categoryID: ${categoryID}`}
        ></ManageTitle>
        <Button className={"text-white h-[48px]"}>Return manage user</Button>
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
          className={"text-white w-[183px] h-[48px]"}
          isLoading={loading}
          disabled={loading}
        >
          Update category
        </Button>
      </div>
    </form>
  );
};

export default BlogCategoriesUpdate;
