import { MoreVert, Search } from "@mui/icons-material";
import { useAuth } from "../../context/AuthContext";
import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import Online from "../online/Online";

export default function RightMenu() {
  const [onlineUsers, setOnlineUsers] = useState([]);
  const socket = useRef();

  const { auth } = useAuth();

  //socket connection
  useEffect(() => {
    socket.current = io("ws://localhost:3000");
    socket.current.emit("addUser", auth.user._id);
    socket.current.on("getUsers", (users) => {
      setOnlineUsers(
        auth.user.followings.filter((f) => users.some((u) => u.userId === f))
      );
    });
  }, [auth.user]);

  return (
    <>
      <div className="w-1/5 pt-16 h-full hidden xl:block px-4 fixed top-0 right-0">
        <div className="h-full boarder">
          <div className="p-4 text-gray-800 rounded-lg shadow bg-gradient-to-r from-blue-400 to-sky-500">
            <div className="mb-2">
              <h3 className="text-white">Random Quote</h3>
              <div className="h-3 text-3xl text-left text-white">“</div>
              <p className="px-4 text-sm text-center text-white">
                The best time to plant a tree was 20 years ago. The second best
                time is now.
              </p>
              <div className="h-3 text-3xl text-right text-white">”</div>
            </div>
          </div>
          <div className="border-b border-gray-200 dark:border-dark-third mt-6"></div>
          <div className="flex justify-between items-center px-4 pt-4 text-gray-500 dark:text-dark-txt">
            <span className="font-semibold text-lg">Online</span>
            <div className="flex space-x-1">
              <div className="w-8 h-8 grid place-items-center text-xl hover:bg-gray-200 dark:hover:bg-dark-third rounded-full cursor-pointer">
                <Search />
              </div>
              <div className="w-8 h-8 grid place-items-center text-xl hover:bg-gray-200 dark:hover:bg-dark-third rounded-full cursor-pointer">
                <MoreVert />
              </div>
            </div>
          </div>
          <ul className="p-2">
            <Online onlineUsers={onlineUsers} />
          </ul>
        </div>
      </div>
    </>
  );
}
