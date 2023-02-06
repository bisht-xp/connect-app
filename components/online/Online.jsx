import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";

export default function Online({ onlineUsers }) {
  const router = useRouter();
  const [friends, setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);
  const { auth } = useAuth();

  useEffect(() => {
    const getFriends = async () => {
      const res = await axios.get(`/api/user/friends/${auth.user._id}`);
      setFriends(res.data);
    };
    getFriends();
  }, [auth.user]);

  useEffect(() => {
    setOnlineFriends(friends.filter((f) => onlineUsers.includes(f._id)));
  }, [friends, onlineUsers]);

  const messageClick = async (user) => {
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
      {onlineFriends.map((friend) => (
        <li key={friend?._id}>
          <div
            onClick={() => messageClick(friend)}
            className="flex items-center space-x-4 p-2 hover:bg-gray-200 dark:hover:bg-dark-third dark:text-dark-txt rounded-lg cursor-pointer"
          >
            <div className="relative ">
              <img
                src={friend.profilePicture || "https://res.cloudinary.com/dakwu85pd/image/upload/v1675658082/connect/noAvatar_o4dszs.png"}
                alt="Friends profile picture"
                className="w-12 h-12 rounded-full object-cover"
              />
              <span className="bg-green-500 w-3 h-3 rounded-full absolute right-0 top-3/4 border-white border-2"></span>
            </div>
            <div>
              <span className="font-semibold">{friend.username}</span>
            </div>
          </div>
        </li>
      ))}
    </>
  );
}
