import axios from "axios";
import Image from "next/legacy/image";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import avatar from "../../public/assets/person/noAvatar.png";

export default function Message({ currentChat }) {
  const [user, setUser] = useState({});
  const [errorMessage, setErrorMessage] = useState([]);
  const { auth } = useAuth();

  useEffect(() => {
    const friendId = currentChat.members.find((m) => m !== auth.user._id);
    const getUser = async () => {
      try {
        const res = await axios(`/api/user?userId=${friendId}`);
        setUser(res.data);
      } catch (err) {
        setErrorMessage(err);
      }
    };
    getUser();
  }, [currentChat, auth.user]);

  return (
    <>
      <div className="chat-header px-6 py-4 flex flex-row flex-none justify-between items-center shadow">
        <div className="flex">
          <div className="w-12 h-12 mr-4 relative flex flex-shrink-0">
            <Image
              className="shadow-md rounded-full w-full h-full object-cover"
              src={user.profilePicture?.url || "https://res.cloudinary.com/dakwu85pd/image/upload/v1675658082/connect/noAvatar_o4dszs.png"}
              alt={user.username || "name"}
              layout="fill"
            />
          </div>
          <div className="text-sm">
            <p className="font-bold">{user.username}</p>
            {/* <p>Active 1h ago</p> */}
          </div>
        </div>
      </div>
    </>
  );
}
