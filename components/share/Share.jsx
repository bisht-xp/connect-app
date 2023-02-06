import {
  PermMedia,
  Label,
  Room,
  EmojiEmotions,
  Cancel,
} from "@mui/icons-material";
import Image from "next/legacy/image";
import { useAuth } from "../../context/AuthContext";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

export default function Share() {
  const { auth } = useAuth();
  const router = useRouter();
  const desc = useRef();
  const [file, setFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const submitHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("image", file);
    formData.append("desc", desc.current.value);
    try {
      await axios.post("/api/post", formData);
      // window.location.reload();
      router.replace(router.asPath);
      setFile(null);
      setErrorMessage("");
      desc.current.value = "";
    } catch (err) {
      setErrorMessage("Image is missing!");
    }
  };
  // md:min-w-min rounded-xl shadow-lg bg-white
  return (
    <>
      <div className="px-4 mt-4 shadow rounded-lg bg-white dark:bg-dark-second">
        <div className="p-3">
          {errorMessage && (
            <p className="text-lg text-red-500 ">{errorMessage}</p>
          )}
          <div className="p-2 border-b border-gray-300 dark:border-dark-third flex space-x-4 mb-3">
            <Image
              className="rounded-full object-cover"
              src={
                auth.user.profilePicture?.url ||
                "https://res.cloudinary.com/dakwu85pd/image/upload/v1675658082/connect/noAvatar_o4dszs.png"
              }
              alt={auth.user.username || "image"}
              width={56}
              height={56}
            />
            <input
              name="description"
              ref={desc}
              placeholder={`What's in your mind ${
                auth.user.username || "loading.."
              }?`}
              className="ml-3 border-none focus:outline-none w-4/5"
            />
          </div>
          {file && (
            <div className="px-5 pb-3 relative">
              <img
                className="w-full object-cover"
                src={URL.createObjectURL(file)}
                alt=""
              />
              <Cancel
                className="absolute top-0 right-5 cursor-pointer opacity-70"
                onClick={() => setFile(null)}
              />
            </div>
          )}
          <form className="flex md:justify-around" onSubmit={submitHandler}>
            {/* <div className="p-2 flex"> */}
            <label
              htmlFor="image"
              className="w-1/3 flex space-x-2 justify-center items-center hover:bg-gray-100 dark:hover:bg-dark-third text-xl sm:text-3xl py-2 rounded-lg cursor-pointer ml-0"
            >
              <PermMedia htmlColor="tomato" sx={{ fontSize: 20 }} />
              <span className="text-xs sm:text-sm font-semibold text-gray-500 dark:text-dark-txt">
                Photo
              </span>
              <input
                type="file"
                id="image"
                name="image"
                className="hidden"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </label>
            <div className="w-1/3 flex space-x-2 justify-center items-center hover:bg-gray-100 dark:hover:bg-dark-third text-xl sm:text-3xl py-2 rounded-lg cursor-pointer">
              <Room htmlColor="green" sx={{ fontSize: 20 }} />
              <span className="text-xs sm:text-sm font-semibold text-gray-500 dark:text-dark-txt">
                Location
              </span>
            </div>
            <div className="w-1/3 flex space-x-2 justify-center items-center hover:bg-gray-100 dark:hover:bg-dark-third text-xl sm:text-3xl py-2 rounded-lg cursor-pointer">
              <EmojiEmotions htmlColor="goldenrod" sx={{ fontSize: 20 }} />
              <span className="text-xs sm:text-sm font-semibold text-gray-500 dark:text-dark-txt">
                Feelings
              </span>
            </div>
            {/* </div> */}
            <button
              type="submit"
              className="w-1/3 flex  justify-center items-center dark:hover:bg-dark-third text-xl sm:text-3xl py-2 rounded-lg cursor-pointer bg-green-600"
            >
              <span className="text-xs sm:text-sm font-semibold text-white dark:text-dark-txt">
                Share
              </span>
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
