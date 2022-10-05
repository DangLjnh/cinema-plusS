import Cancel from "components/icon/Cancel";
import Edit from "components/icon/Edit";
import SelectAll from "components/icon/SelectAll";
import Trash from "components/icon/Trash";
import React from "react";
import { useState } from "react";
import styled from "styled-components";
const SidebarBookmarkHistoryStyle = styled.div`
  button {
    transition: 0.3s all linear;
    div {
      transition: 0.3s all linear;
      svg {
        path {
          transition: stroke 0.3s linear;
        }
      }
    }
  }
`;
const SidebarBookmarkHistory = () => {
  return (
    <SidebarBookmarkHistoryStyle className="fixed w-[350px] top-[60px] right-[10px] z-[100] ">
      <div className="relative">
        <button
          className="absolute top-4 right-0 edit"
          onClick={() => {
            const edit = document.querySelector(".edit");
            const select = document.querySelector(".select-book");
            edit.classList.add("pointer-events-none");
            edit.classList.add("opacity-0");
            edit.classList.remove("opacity-100");
            select.classList.remove("opacity-100");
            select.classList.add("opacity-100");
            select.classList.add("pointer-events-auto");
          }}
        >
          <Edit></Edit>
        </button>
        <button
          className="absolute flex gap-x-5 top-4 right-0 select-book opacity-0 pointer-events-none"
          onClick={() => {}}
        >
          <SelectAll></SelectAll>
          <Trash></Trash>
          <Cancel
            onClick={(e) => {
              const edit = document.querySelector(".edit");
              const select = document.querySelector(".select-book");
              edit.classList.add("opacity-100");
              edit.classList.remove("pointer-events-none");
              select.classList.remove("opacity-100");
              select.classList.remove("pointer-events-auto");
            }}
          ></Cancel>
        </button>
      </div>
    </SidebarBookmarkHistoryStyle>
  );
};

export default SidebarBookmarkHistory;
