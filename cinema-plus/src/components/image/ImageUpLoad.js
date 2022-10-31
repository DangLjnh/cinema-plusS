import React from "react";
import { userProvider } from "utils/constant";

const ImageUpLoad = ({
  userDetail,
  register,
  handleDeleteImage,
  handleUploadImage,
  loadingImg,
  className = "",
}) => {
  return (
    <>
      <label
        className={`${
          userDetail.photoURL === "" || !userDetail.photoURL
            ? "cursor-pointer"
            : ""
        }  flex items-center justify-center bg-neutral-400 border border-neutral-300 border-dashed w-full min-h-[200px] relative overflow-hidden group h-full rounded-full ${className}`}
      >
        <input
          type="file"
          className="hidden-input"
          {...register("file")}
          disabled={
            userDetail.photoURL === "" || !userDetail.photoURL ? false : true
          }
          // accept=".jpg, .jpeg, .png"
          onChange={handleUploadImage}
          // {...rest}
        />
        {loadingImg && (
          <div className="min-h-[130px] max-w-[250px] flex items-center justify-center relative">
            <div className="loader">
              <div className="inner one"></div>
              <div className="inner two"></div>
              <div className="inner three"></div>
            </div>
          </div>
        )}
        {!userDetail.photoURL && !loadingImg && (
          <div className="flex flex-col items-center text-center pointer-events-none">
            <img
              src="../../../img-upload.png"
              alt="upload-img"
              className="max-w-[80px] mb-5"
            />
            <p className="font-medium text-white">Choose photo</p>
          </div>
        )}
        {userDetail.photoURL && !loadingImg && (
          <>
            <img
              src={userDetail?.photoURL || "/default-image.png"}
              className="object-cover w-full h-full"
              alt=""
            />
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
          </>
        )}
      </label>
    </>
  );
};

export default ImageUpLoad;
