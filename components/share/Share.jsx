import {
  PermMedia,
  Label,
  Room,
  EmojiEmotions,
  Cancel,
} from "@mui/icons-material";
import Image from "next/legacy/image";
import noAvatar from "../../public/assets/person/noAvatar.png";
import { useAuth } from "../../context/AuthContext";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

export default function Share() {
  const { auth } = useAuth();
  const router = useRouter();
  const desc = useRef();
  const [file, setFile] = useState(null);
  

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
      desc.current.value = "";
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="md:min-w-min rounded-xl shadow-lg">
        <div className="p-3">
          <div className="flex items-center">
            <Image
              className="rounded-full object-cover"
              src={auth.user.profilePicture || noAvatar}
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
          <hr className="m-5" />
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
          <form className="md:flex md:justify-around" onSubmit={submitHandler}>
            <div className="flex  mr-5">
              <label
                htmlFor="image"
                className="flex items-center mr-5 cursor-pointer"
              >
                <PermMedia
                  htmlColor="tomato"
                  sx={{ fontSize: 20 }}
                  className="mr-1"
                />
                <span className="font-medium font-roboto text-sm">
                  Photo & Video
                </span>
                <input
                  type="file"
                  id="image"
                  name="image"
                  className="hidden"
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </label>
              <div className="flex items-center mr-5 cursor-pointer">
                <Label
                  htmlColor="blue"
                  sx={{ fontSize: 20 }}
                  className="mr-1"
                />
                <span className="font-medium font-roboto text-sm">Tag</span>
              </div>
              <div className="flex items-center mr-5 cursor-pointer">
                <Room
                  htmlColor="green"
                  sx={{ fontSize: 20 }}
                  className="mr-1"
                />
                <span className="font-medium font-roboto text-sm">
                  Location
                </span>
              </div>
              <div className="flex items-center mr-5 cursor-pointer">
                <EmojiEmotions
                  htmlColor="goldenrod"
                  sx={{ fontSize: 20 }}
                  className="mr-1"
                />
                <span className="font-medium font-roboto text-sm">
                  Feelings
                </span>
              </div>
            </div>
            <button
              type="submit"
              className="ml-64 md:ml-0 border-none py-2 px-3 mt-1 rounded-md bg-green-600 font-medium mr-5 cursor-pointer text-white"
            >
              Share
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
