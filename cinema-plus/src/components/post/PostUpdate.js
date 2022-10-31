import axios from "axios";
import Button from "components/button/Button";
import { Dropdown } from "components/dropdown";
import FieldCheckboxes from "components/field/FieldCheckboxes";
import ImageUpLoad from "components/image/ImageUpLoad";
import Radio from "components/radio/Radio";
import ManageTitle from "components/title/ManageTitle";
import Toogle from "components/toogle/Toogle";
import { clientSide } from "config/config";
import Field from "input/Field";
import Input from "input/Input";
import React from "react";
import { useEffect } from "react";
import { useMemo } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import ReactQuill from "react-quill";
import { useNavigate, useParams } from "react-router-dom";
import { imgbbAPI, status } from "utils/constant";
import { v4 } from "uuid";
import styled from "styled-components";
import { toast } from "react-toastify";
import slugify from "slugify";
import { useContext } from "react";
import { UserContext } from "contexts/UserProvider";
const PostUpdateStyle = styled.div`
  .quill .ql-toolbar {
    position: sticky;
    top: 72px;
    background-color: white;
    z-index: 101;
  }
`;

const PostUpdate = () => {
  const { postID } = useParams();
  const navigate = useNavigate();
  let [currentUser] = useContext(UserContext);
  const [categories, setCategories] = useState([]);
  const [posts, setPosts] = useState([]);
  const [option, setOption] = useState();
  const [check, setCheck] = useState(false);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [postDetail, setPostDetail] = useState(false);
  const [loadingImg, setLoadingImg] = useState(false);
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
  });
  const watchStatus = watch("status");
  useEffect(() => {
    axios.get(`${clientSide}/get/categories`).then((response) => {
      setCategories(response.data);
    });
    axios.get(`${clientSide}/get/posts`).then((response) => {
      setPosts(response.data);
    });
    axios
      .post(`${clientSide}/get/postItem`, {
        postID: postID,
      })
      .then((res) => setPostDetail(Object.assign({}, ...res.data)));
  }, []);
  const handleClickOption = (item) => {
    setOption(item.name);
  };
  const handleUploadImage = (e) => {
    setLoadingImg(true);
    const formData = new FormData();
    formData.append("postID", postDetail.postID);
    formData.append("file", e.target.files[0]);
    axios.post(`${clientSide}/upload/post`, formData).then((res) => {
      if (res) {
        axios
          .post(`${clientSide}/get/postItem`, {
            postID: postDetail.postID,
          })
          .then((res) => {
            setLoadingImg(false);
            setPostDetail(Object.assign({}, ...res.data));
          });
      }
    });
  };
  const handleDeleteImage = () => {
    setLoadingImg(true);
    axios
      .post(`${clientSide}/delete/image/post`, {
        postID: postDetail.postID,
        publicID: postDetail.publicID,
      })
      .then((res) => {
        if (res) {
          axios
            .post(`${clientSide}/get/postItem`, {
              postID: postDetail.postID,
            })
            .then((res) => {
              setLoadingImg(false);
              setPostDetail(Object.assign({}, ...res.data));
            });
        }
      });
  };
  const handleUpdatePost = (values) => {
    setLoading(true);
    axios
      .post(`${clientSide}/post/update/post`, {
        postID: postDetail.postID,
        uid: currentUser.uid,
        nameAuthor: currentUser.displayName,
        title: values.title,
        slug: slugify(values.slug || values.title),
        categoryName: option,
        photoURL: postDetail.photoURL,
        publicID: postDetail.publicID,
        hot: values.hot,
        status: values.status,
        content,
      })
      .then((res) => {
        if (res) {
          toast.success("Update post successfully!");
          setLoading(false);
          navigate("/manage/posts");
        }
      });
  };
  useEffect(() => {
    setOption(postDetail.categoryName);
    reset(postDetail);
    setContent(postDetail.content);
    setCheck(postDetail.hot);
  }, [postDetail, reset]);
  return (
    <PostUpdateStyle>
      <div className="flex justify-between">
        <ManageTitle
          className=""
          title="Update post"
          desc={`Update post postID: ${postID}`}
        ></ManageTitle>
        <Button
          className={"text-white h-[48px]"}
          onClick={() => {
            navigate("/manage/posts");
          }}
        >
          Return manage post
        </Button>
      </div>
      <form onSubmit={handleSubmit(handleUpdatePost)}>
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
            <p>Image</p>
            <ImageUpLoad
              handleDeleteImage={handleDeleteImage}
              handleUploadImage={(e) => handleUploadImage(e)}
              register={register}
              loadingImg={loadingImg}
              className="!rounded-lg"
              userDetail={postDetail}
            ></ImageUpLoad>
          </Field>
          <Field>
            <p className="mb-3 text-[17px] text-white">Category</p>
            <Dropdown>
              <Dropdown.Select className="text-white">
                {option || "Select the category"}
              </Dropdown.Select>
              <Dropdown.List className="z-[102] h-[280px] overflow-y-auto dropdown-list">
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
            isLoading={loading}
            disabled={loading}
          >
            Update post
          </Button>
        </div>
      </form>
    </PostUpdateStyle>
  );
};

export default PostUpdate;
