import axios from "axios";
import Button from "components/button/Button";
import { Dropdown } from "components/dropdown";
import FieldCheckboxes from "components/field/FieldCheckboxes";
import Radio from "components/radio/Radio";
import ManageUserTitle from "components/title/ManageUserTitle";
import Toogle from "components/toogle/Toogle";
import { clientSide } from "config/config";
import Field from "input/Field";
import Input from "input/Input";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { imgbbAPI, status } from "utils/constant";
import { v4 } from "uuid";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import ImageUploader from "quill-image-uploader";
import { useMemo } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";
import { useContext } from "react";
import { UserContext } from "contexts/UserProvider";
import slugify from "slugify";
Quill.register("modules/imageUploader", ImageUploader);
const PostCreateStyle = styled.div`
  .quill .ql-toolbar {
    position: sticky;
    top: 0;
    background-color: white;
    z-index: 1000;
  }
`;
const PostCreate = () => {
  const navigate = useNavigate();
  let [currentUser] = useContext(UserContext);
  const [categories, setCategories] = useState([]);
  const [posts, setPosts] = useState([]);
  const [option, setOption] = useState();
  const [check, setCheck] = useState(false);
  const [content, setContent] = useState("");
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
      hot: false,
      status: status.pending,
    },
  });
  const watchStatus = watch("status");
  useEffect(() => {
    axios.get(`${clientSide}/get/categories`).then((response) => {
      setCategories(response.data);
    });
    axios.get(`${clientSide}/get/posts`).then((response) => {
      setPosts(response.data);
    });
  }, []);
  const modules = useMemo(
    () => ({
      toolbar: [
        ["bold", "italic", "underline", "strike"],
        ["blockquote"],
        [{ header: 1 }, { header: 2 }], // custom button values
        [{ list: "ordered" }, { list: "bullet" }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ["link", "image"],
      ],
      imageUploader: {
        upload: async (file) => {
          const bodyFormData = new FormData();
          bodyFormData.append("image", file);
          const response = await axios({
            method: "post",
            url: imgbbAPI,
            data: bodyFormData,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          return response.data.data.url;
        },
      },
    }),
    []
  );
  const handleClickOption = (item) => {
    setOption(item.name);
  };
  const handleCreatePost = (values) => {
    axios
      .post(`${clientSide}/post/post`, {
        uid: currentUser.uid,
        nameAuthor: currentUser.displayName,
        title: values.title,
        slug: slugify(values.slug || values.title),
        categoryName: option,
        photoURL: "",
        publicID: "",
        hot: values.hot,
        status: values.status,
        content,
      })
      .then((res) => {
        const postID = res.data.insertId;
        const formData = new FormData();
        formData.append("postID", postID);
        formData.append("file", values.file[0]);
        axios.post(`${clientSide}/upload/post`, formData).then((res) => {
          if (res) {
            axios
              .post(`${clientSide}/get/postItem`, {
                postID: postID,
              })
              .then((res) => {
                if (res) {
                  // setLoading(false);
                  toast.success("Create user successful");
                  reset();
                  setContent("");
                  setOption("");
                }
              });
          }
        });
      });
  };

  return (
    <PostCreateStyle className="mb-10">
      <div className="flex justify-between">
        <ManageUserTitle
          className=""
          title="Create post"
          desc={`Add new post to system`}
        ></ManageUserTitle>
        <Button
          className={"text-white h-[48px]"}
          onClick={() => navigate("/manage/posts")}
        >
          Return manage posts
        </Button>
      </div>
      <form onSubmit={handleSubmit(handleCreatePost)}>
        <div className="mx-auto w-[200px] mb-10">
          <input type="file" name="photoURL" {...register("file")} />
        </div>
        <div className="form-layout">
          <Field>
            <p className="mb-3 text-[17px] text-white">Title</p>
            <Input
              className="!p-4"
              type={"text"}
              name="title"
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
            <p className="mb-3 text-[17px] text-white">Category</p>
            <Dropdown>
              <Dropdown.Select className="text-white">
                {option || "Select the category"}
              </Dropdown.Select>
              <Dropdown.List>
                {categories.length > 0 &&
                  categories.map((item) => (
                    <Dropdown.Option
                      key={v4()}
                      className="flex items-center justify-between px-3 py-4 text-white rounded-md cursor-pointer dropdown-option hover:bg-neutral-600"
                      onClick={() => handleClickOption(item)}
                    >
                      {item.name}
                    </Dropdown.Option>
                  ))}
              </Dropdown.List>
            </Dropdown>
            {option && (
              <span className="inline-block px-5 py-2 mt-5 text-white text-sm font-medium rounded-lg bg-[#7877fa]">
                {option}
              </span>
            )}
          </Field>
        </div>
        <div className="form-layout">
          <Field>
            <p className="mb-3 text-[17px] text-white">Feature post</p>
            <Toogle
              register={register}
              check={check}
              onChange={() => {
                setCheck(!check);
              }}
            ></Toogle>
          </Field>
          <Field>
            <p className="mb-3 text-[17px] text-white">Status</p>
            <FieldCheckboxes>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === status.approve}
                value={status.approve}
              >
                Approve
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === status.pending}
                value={status.pending}
              >
                Pending
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === status.reject}
                value={status.reject}
              >
                Reject
              </Radio>
            </FieldCheckboxes>
          </Field>
        </div>
        <div className="mb-10">
          <Field>
            <p className="mb-3 text-[17px] text-white">Content</p>
            <div className="w-full entry-content">
              {/* react quill update content */}
              <ReactQuill
                modules={modules}
                theme="snow"
                value={content}
                onChange={setContent}
                className="text-white"
              />
            </div>
          </Field>
        </div>
        <div className="flex items-center justify-center mb-10">
          <Button
            type="submit"
            className={"text-white w-[147px] h-[48px]"}
            // isLoading={loading}
            // disabled={loading}
          >
            Create post
          </Button>
        </div>
      </form>
    </PostCreateStyle>
  );
};

export default PostCreate;
