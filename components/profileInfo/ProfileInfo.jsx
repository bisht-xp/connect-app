import Image from "next/legacy/image";
import noCover from "../../public/assets/person/noCover.png";
import noAvatar from "../../public/assets/person/noAvatar.png";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
import axios from "axios";
import { Edit, Textsms } from "@mui/icons-material";
import { useRouter } from "next/router";
import UpdateModal from "../updateModal/UpdateModal";

export default function ProfileInfo({ user }) {
  const router = useRouter();
  const { auth } = useAuth();

  const [editModal, setEditModal] = useState(false);
  const [followed, setFollowed] = useState(
    auth.user.followings.includes(user?._id)
  );

  const handleClick = async () => {
    try {
      if (followed) {
        await axios.put(`/api/user/${user._id}/unfollow`, {
          userId: auth.user._id,
        });
      } else {
        await axios.put(`/api/user/${user._id}/follow`, {
          userId: auth.user._id,
        });
      }
      setFollowed(!followed);
    } catch (err) {
      console.log(err);
    }
  };
  const closeAndOutSideHandler = () => {
    setEditModal(false);
  };

  const messageClick = async () => {
    try {
      const res = await axios.get(
        `/api/conversations/find/${auth.user._id}/${user._id}`
      );
      if (!res.data) {
        const newConversation = {
          senderId: auth.user._id,
          receiverId: user._id,
        };
        await axios.post(`/api/conversations/`, newConversation);
      }
      router.push("/messages");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div>
        <div className="relative w-full h-48">
          <img
            className="w-full h-48 object-cover"
            src={
              user.coverPicture?.url ||
              "https://res.cloudinary.com/dakwu85pd/image/upload/v1675658082/connect/noCover_t7bquw.png"
            }
            alt="cover Picture"
          />
        </div>
        <div className="p-4">
          <div className="relative flex w-full">
            {/* <!-- Avatar --> */}
            <div className="flex flex-1">
              <div className="-mt-24">
                <div className="rounded-full relative w-32 h-32">
                  <img
                    className="md rounded-full border-4 border-gray-900"
                    src={
                      user.profilePicture?.url ||
                      "https://res.cloudinary.com/dakwu85pd/image/upload/v1675658082/connect/noAvatar_o4dszs.png"
                    }
                    alt="profile picture"
                  />
                  <div className="absolute"></div>
                </div>
              </div>
            </div>
            {/* <!-- Follow Button --> */}
            {user.username === auth.user.username && (
              <div className="flex flex-col text-right">
                <button
                  className="flex justify-center  max-h-max whitespace-nowrap focus:outline-none  focus:ring max-w-max border bg-transparent border-blue-500 text-blue-500 hover:border-blue-800 items-center hover:shadow-lg font-bold py-2 px-4 rounded-full mr-0 ml-auto"
                  onClick={() => {
                    setEditModal(true);
                  }}
                >
                  <Edit />
                </button>
              </div>
            )}
            {editModal && <UpdateModal closeHandler={closeAndOutSideHandler} />}
          </div>

          {/* <!-- Profile info --> */}
          <div className="space-y-1 justify-center w-full mt-3 ml-2">
            {/* <!-- User basic--> */}
            <div>
              <h2 className="text-xl leading-6 font-bold text-gray-800">
                {user.username}
              </h2>
              <p className="text-sm leading-5 font-medium text-gray-600">
                {`${user.email}`}
              </p>
            </div>
            {/* <!-- Description and others --> */}
            <div className="mt-3">
              <p className="leading-tight mb-2 font-medium">{user.desc}</p>
              {user.city && (
                <div className="mb-1">
                  <span className="font-medium mr-3 text-gray-800">City:</span>
                  <span className="font-semibold">{user.city}</span>
                </div>
              )}
              {user.relationship && (
                <div className="mb-2">
                  <span className="font-medium mr-3 text-gray-800">
                    Relationship:
                  </span>
                  <span className="font-semibold">{user.relationship}</span>
                </div>
              )}
            </div>
            <div className="flex justify-end">
              <div className="pt-3 flex justify-start items-start w-full divide-x divide-gray-800 divide-solid">
                <div className="text-center pr-3">
                  <span className="font-bold text-gray-500">
                    {user.followings.length}
                  </span>
                  <span className="text-gray-600"> Following</span>
                </div>
                <div className="text-center px-3">
                  <span className="font-bold text-gray-500">
                    {user.followers.length}
                  </span>
                  <span className="text-gray-600"> Followers</span>
                </div>
              </div>
              {user.username !== auth.user.username && (
                <>
                  <div className="mr-3">
                    <button
                      onClick={messageClick}
                      className="flex justify-center  max-h-max whitespace-nowrap focus:outline-none focus:ring max-w-max border bg-transparent border-blue-500 text-blue-500 hover:border-blue-800 items-center hover:shadow-lg font-bold py-2 px-4 rounded-full mr-0 ml-auto"
                    >
                      <Textsms />
                    </button>
                  </div>
                  <div className="mr-3">
                    <button
                      onClick={handleClick}
                      className="flex justify-center  max-h-max whitespace-nowrap focus:outline-none focus:ring max-w-max border bg-transparent border-blue-500 text-blue-500 hover:border-blue-800 items-center hover:shadow-lg font-bold py-2 px-4 rounded-full mr-0 ml-auto"
                    >
                      {followed ? "Unfollow" : "Follow"}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="border-gray-800"></div>
      </div>
    </>
  );
}
