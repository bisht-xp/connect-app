import Head from "next/head";
import {
  AddCircle,
  Send,
  Mic,
  Photo,
  PhotoCamera,
  ThumbUp,
} from "@mui/icons-material";
import Topbar from "../components/topbar/Topbar";
import Conversation from "../components/conversations/Conversation";
import Message from "../components/message/Message";
import Chat from "../components/chat/Chat";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

export default function messages({ conversationData }) {
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [lastMessage, setLastMessage] = useState(null);
  const socket = useRef();
  const scrollRef = useRef();
  const { auth } = useAuth();

  useEffect(() => {
    socket.current = io("ws://localhost:3000");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.current.emit("addUser", auth.user._id);
    socket.current.on("getUsers", (users) => {
      setOnlineUsers(
        auth.user.followings.filter((f) => users.some((u) => u.userId === f))
      );
    });
  }, [auth.user]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get(`/api/messages/${currentChat?._id}`);
        setMessages(res.data);
        setLastMessage(messages[messages.length - 1]);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);

  const clickHandler = async (event) => {
    event.preventDefault();

    if (newMessage.trim().length !== 0) {
      const message = {
        sender: auth.user._id,
        text: newMessage,
        conversationId: currentChat._id,
      };

      const receiverId = currentChat.members.find(
        (member) => member !== auth.user._id
      );

      socket.current.emit("sendMessage", {
        senderId: auth.user._id,
        receiverId,
        text: newMessage,
      });

      try {
        const res = await axios.post("/api/messages", message);
        setMessages([...messages, res.data]);
        setNewMessage("");
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <Head>
        <title>Messages</title>
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>
      <div className="h-screen w-full flex antialiased text-gray-800 bg-white overflow-hidden">
        <div className="flex-1 flex flex-col">
          <Topbar />
          <main className="flex-grow flex flex-row min-h-0">
            <section className="flex flex-col flex-none overflow-auto w-24 lg:max-w-sm md:w-2/5 transition-all duration-300 ease-in-out">
              <div className="header p-4 flex flex-row justify-between items-center flex-none">
                <p className="text-md font-bold hidden md:block">Messenger</p>
              </div>
              <div className="contacts p-2 flex-1 scrollbar overflow-y-scroll">
                {conversationData.map((conv) => (
                  <div onClick={() => setCurrentChat(conv)} key={conv._id}>
                    <Conversation
                      conversation={conv}
                      currentUser={auth.user}
                      onlineUsers={onlineUsers}
                      messages={lastMessage}
                    />
                  </div>
                ))}
              </div>
            </section>
            <section className="flex flex-col flex-auto border-l">
              {currentChat ? (
                <>
                  <Message currentChat={currentChat} />
                  <div className="chat-body p-4 flex-1 scrollbar overflow-y-scroll">
                    {messages.map((message) => (
                      <div key={message._id} ref={scrollRef}>
                        <Chat
                          message={message}
                          own={message.sender === auth.user._id}
                        />
                      </div>
                    ))}
                  </div>

                  <div className="chat-footer flex-none">
                    <div className="flex flex-row items-center p-4">
                      <button
                        type="button"
                        className="flex flex-shrink-0 focus:outline-none mx-2 text-blue-600 hover:text-blue-700 w-6 h-6"
                      >
                        <AddCircle />
                      </button>
                      <button
                        type="button"
                        className="flex flex-shrink-0 focus:outline-none mx-2 text-blue-600 hover:text-blue-700 w-6 h-6"
                      >
                        <Photo />
                      </button>
                      <button
                        type="button"
                        className="flex flex-shrink-0 focus:outline-none mx-2 text-blue-600 hover:text-blue-700 w-6 h-6"
                      >
                        <PhotoCamera />
                      </button>
                      <button
                        type="button"
                        className="flex flex-shrink-0 focus:outline-none mx-2 text-blue-600 hover:text-blue-700 w-6 h-6"
                      >
                        <Mic />
                      </button>
                      <div className="relative flex-grow">
                        <label>
                          <input
                            className="rounded-full py-2 pl-3 pr-10 w-full border border-gray-200 bg-gray-200 focus:bg-white focus:outline-none text-gray-600 focus:shadow-md transition duration-300 ease-in"
                            type="text"
                            placeholder="Aa"
                            value={newMessage}
                            onChange={(event) =>
                              setNewMessage(event.target.value)
                            }
                          />
                          <button
                            type="submit"
                            className="absolute top-0 right-0 mt-2 mr-3 flex flex-shrink-0 focus:outline-none text-blue-600 hover:text-blue-700 w-6 h-6"
                            onClick={clickHandler}
                          >
                            <Send />
                          </button>
                        </label>
                      </div>
                      <button
                        type="button"
                        className="flex flex-shrink-0 focus:outline-none mx-2 text-blue-600 hover:text-blue-700 w-6 h-6"
                      >
                        <ThumbUp />
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <span className="  text-5xl text-gray-200 p-10 cursor-default flex-1">
                  Open a conversation to start a chat.
                </span>
              )}
            </section>
          </main>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps = async ({ req, res }) => {
  const getConversation = await axios.get(
    `http://localhost:3000/api/conversations/${req.user._id}`
  );
  const conversationData = getConversation.data;
  return {
    props: { conversationData },
  };
};
