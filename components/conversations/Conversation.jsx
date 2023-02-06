import axios from "axios";
import Image from "next/legacy/image";
import { useEffect, useState } from "react";
import avatar from "../../public/assets/person/noAvatar.png";
import { format } from "timeago.js";

export default function Conversation({
  conversation,
  currentUser,
  onlineUsers,
  messages,
}) {
  const [user, setUser] = useState({});
  // const [onlineFriends, setOnlineFriends] = useState([]);
  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser._id);
    const getUser = async () => {
      try {
        const res = await axios(`/api/user?userId=${friendId}`);
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [currentUser, conversation]);
  // console.log(messages);

  return (
    <>
      <div className="flex justify-between items-center p-3 hover:bg-gray-100 rounded-lg relative">
        <div className="w-16 h-16 relative flex flex-shrink-0">
          <Image
            className="shadow-md rounded-full w-full h-full object-cover"
            src={user.profilePicture?.url || "https://res.cloudinary.com/dakwu85pd/image/upload/v1675658082/connect/noAvatar_o4dszs.png"}
            layout="fill"
            alt={user.username}
          />
          <div
            className={`absolute bg-white p-1 rounded-full bottom-0 right-0`}
          >
            {onlineUsers.includes(user._id) && (
              <div className="bg-green-500 rounded-full w-3 h-3"></div>
            )}
          </div>
        </div>
        <div className="flex-auto min-w-0 ml-4 mr-6 hidden md:block">
          <p>{user.username}</p>
          <div className="flex items-center text-sm text-gray-600">
            <div className="min-w-0">
              <p className="truncate">
              {/* {messages.text} */}
              </p>
            </div>
            <p className="ml-2 whitespace-no-wrap font-bold">
              {/* {format(messages.createdAt)} */}
            </p>
          </div>
        </div>
        {onlineUsers.includes(user._id) && (
          <div className="bg-blue-500 w-3 h-3 rounded-full hidden flex-shrink-0 md:block"></div>
        )}
      </div>
    </>
  );
}
