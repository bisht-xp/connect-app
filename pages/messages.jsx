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

export default function messages() {
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
                <Conversation />
                <Conversation />
                <Conversation />
                <Conversation />
              </div>
            </section>
            <section className="flex flex-col flex-auto border-l">
              <Message />
              <div className="chat-body p-4 flex-1 scrollbar overflow-y-scroll">
                <Chat />
                <Chat own={true}/>
                <Chat />
                <Chat own={true}/>
                <Chat />
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
                      />
                      <button
                        type="button"
                        className="absolute top-0 right-0 mt-2 mr-3 flex flex-shrink-0 focus:outline-none text-blue-600 hover:text-blue-700 w-6 h-6"
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
            </section>
          </main>
        </div>
      </div>
    </>
  );
}
