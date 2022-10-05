import React from "react";
import CommentAvatar from "./CommentAvatar";
import CommentInput from "./CommentInput";

const ComentContent = ({ children }) => {
  return (
    <div>
      <div className=" bg-[#404040] text-[#a3a3a3] px-3 py-3 rounded-2xl">
        <h2 className="text-white">Dang Ljnh</h2>
        <p>
          Ngoài bình luận, trang web còn có chức năng thả cảm xúc, xem thông tin
          những người thả cảm xúc, (cảm xúc được nhiều người thả sẽ được ưu tiên
          hiện đầu), trả lời bình luận, chỉnh sửa, xóa, ẩn bình luận, sắp xếp
          bình luận, tải thêm bình luận.
        </p>
      </div>
      <div className="flex mt-3 mb-5 gap-x-3">
        <span className="flex gap-x-3">
          <img src="../../like.png" alt="" className="w-[24px] h-6" /> Like
        </span>
        {/* <span>Reaction</span> */}
        <span>Reply</span>
        <span>7 weeks</span>
        <span>Edited</span>
      </div>
      {/* <div className="flex items-center">
        <CommentAvatar></CommentAvatar>
        <CommentInput className={"w-full"}></CommentInput>
      </div> */}
      {children}
    </div>
  );
};

export default ComentContent;
