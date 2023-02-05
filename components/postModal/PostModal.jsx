import {
  BookmarkBorderOutlined,
  DeleteOutlineOutlined,
  ReportProblemOutlined,
} from "@mui/icons-material";
import axios from "axios";
import Link from "next/link";
import React from "react";
import { useAuth } from "../../context/AuthContext";
import OutsideClickHandler from "react-outside-click-handler";

export default function PostModal({ post, clickOutSide}) {
  const { auth } = useAuth();
  const clickHandler = async () => {
    // const postUser = { currentUserId: auth.user._id };
    try {
      const res = await axios.delete(`/api/post/${post._id}`, {
        data: {
          currentUserId: auth.user._id,
        },
      });
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const outSideClick = () => {
    clickOutSide();
  }

  return (
    <>
      <OutsideClickHandler onOutsideClick={outSideClick}>
        <div className="absolute -right-6 bg-white shadow-md shadow-gray-300 p-3 rounded-sm border border-gray-100 w-52">
          <span className="flex -mx-4 hover:shadow-md gap-3 py-2 my-2 hover:bg-socialBlue hover:text-white px-4 rounded-md transition-all hover:scale-110 shadow-gray-300">
            <BookmarkBorderOutlined />
            Save Post
          </span>
          {auth.user._id === post.userId && (
            <button className="w-full -my-2" onClick={clickHandler}>
              <span className="flex gap-3 py-2 my-2 hover:bg-socialBlue hover:text-white hover:text- -mx-4 px-4 rounded-md transition-all hover:scale-110 hover:shadow-md shadow-gray-300">
                <DeleteOutlineOutlined />
                Delete
              </span>
            </button>
          )}
          <Link
            href="#"
            className="flex gap-3 py-2 my-2 hover:bg-socialBlue hover:text-white -mx-4 px-4 rounded-md transition-all hover:scale-110 hover:shadow-md shadow-gray-300"
          >
            <ReportProblemOutlined />
            Report
          </Link>
        </div>
      </OutsideClickHandler>
    </>
  );
}
