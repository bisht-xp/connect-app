import { PermMedia, Label, Room, EmojiEmotions } from "@mui/icons-material";
import Image from "next/legacy/image";
import noAvatar from "../../public/assets/person/noAvatar.png";
import { useAuth } from "../../context/AuthContext";

export default function Share() {
  const { auth } = useAuth();

  return (
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
            placeholder={`What's in your mind ${
              auth.user.username || "loading.."
            }?`}
            className="ml-3 border-none focus:outline-none w-4/5"
          />
        </div>
        <hr className="m-5" />
        <div className="md:flex md:justify-around">
          <div className="flex  mr-5">
            <div className="flex items-center mr-5 cursor-pointer">
              <PermMedia
                htmlColor="tomato"
                sx={{ fontSize: 20 }}
                className="mr-1"
              />
              <span className="font-medium font-roboto text-sm">
                Photo & Video
              </span>
            </div>
            <div className="flex items-center mr-5 cursor-pointer">
              <Label htmlColor="blue" sx={{ fontSize: 20 }} className="mr-1" />
              <span className="font-medium font-roboto text-sm">Tag</span>
            </div>
            <div className="flex items-center mr-5 cursor-pointer">
              <Room htmlColor="green" sx={{ fontSize: 20 }} className="mr-1" />
              <span className="font-medium font-roboto text-sm">Location</span>
            </div>
            <div className="flex items-center mr-5 cursor-pointer">
              <EmojiEmotions
                htmlColor="goldenrod"
                sx={{ fontSize: 20 }}
                className="mr-1"
              />
              <span className="font-medium font-roboto text-sm">Feelings</span>
            </div>
          </div>
          <button className="ml-64 md:ml-0 border-none py-2 px-3 mt-1 rounded-md bg-green-600 font-medium mr-5 cursor-pointer text-white">
            Share
          </button>
        </div>
      </div>
    </div>
  );
}
