import { Search, Settings } from "@mui/icons-material";
import Link from "next/link";
import React from "react";

export default function ProfileRightMenu() {
  return (
    <div className="w-1/4 pt-16 h-full hidden xl:block px-4 fixed top-0 right-0">
      <div className="h-full boarder">
        <div className="relative text-gray-400 w-80 p-5">
          <button type="submit" className="absolute ml-3 mt-2 mr-4">
            <Search />
          </button>
          <input
            type="search"
            name="search"
            placeholder="Search Connect"
            className=" bg-dim-700 h-10 px-10 pr-5 w-full text-sm focus:outline-none bg-purple-white shadow rounded border-0"
          />
        </div>
        <div className="max-w-sm rounded-lg bg-dim-700 overflow-hidden shadow-lg m-4">
          <div className="flex">
            <div className="flex-1 m-2">
              <h2 className="px-4 py-2 text-xl w-48 font-semibold text-gray-800">
                Trending # Tags
              </h2>
            </div>
            <div className="flex-1 px-4 py-2 m-2">
              <Link
                href="#"
                className=" text-2xl rounded-full text-gray-800 hover:text-blue-600 float-right"
              >
                <Settings />
              </Link>
            </div>
          </div>
          <div className="flex-1">
            <p className="px-4 ml-2 mt-3 w-48 text-xs text-gray-400">
              1 . Trending
            </p>
            <h2 className="px-4 ml-2 w-48 font-bold text-black">
              #LookingForJob
            </h2>
            <p className="px-4 ml-2 mb-3 w-48 text-xs text-gray-500">
              5,466 upVotes
            </p>
          </div>
          <div className="flex-1">
            <p className="px-4 ml-2 mt-3 w-48 text-xs text-gray-400">
              2 . Trending
            </p>
            <h2 className="px-4 ml-2 w-48 font-bold text-black">
              #CreatorOfConnect
            </h2>
            <p className="px-4 ml-2 mb-3 w-48 text-xs text-gray-500">
              5,366 upVotes
            </p>
          </div>
          <div className="flex-1">
            <p className="px-4 ml-2 mt-3 w-48 text-xs text-gray-400">
              3 . Trending
            </p>
            <h2 className="px-4 ml-2 w-48 font-bold text-black">#MERNproject</h2>
            <p className="px-4 ml-2 mb-3 w-48 text-xs text-gray-500">
              5,266 upVotes
            </p>
          </div>
        </div>
        {/* <div className="max-w-sm rounded-lg  bg-dim-700 overflow-hidden shadow-lg m-4">
          <div className="flex">
            <div className="flex-1 m-2">
              <h2 className="px-4 py-2 text-xl w-48 font-semibold text-gray-800">
                Contact
              </h2>
            </div>
          </div>
          <div className="flex flex-shrink-0">
            <div className="flex-1 ">
              <div className="flex items-center w-48">
                <div>
                  <img
                    className="inline-block h-10 w-auto rounded-full ml-4 mt-2"
                    src="https://pbs.twimg.com/profile_images/1121328878142853120/e-rpjoJi_bigger.png"
                    alt=""
                  />
                </div>
                <div className="ml-3 mt-3">
                  <p className="text-base leading-6 font-medium text-white">
                    {}
                  </p>
                  <p className="text-sm leading-5 font-medium text-gray-400 group-hover:text-gray-300 transition ease-in-out duration-150">
                    @ShonaDesign
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}
