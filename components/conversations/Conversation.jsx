import React from "react";

export default function Conversation() {
  return (
    <>
      <div className="flex justify-between items-center p-3 hover:bg-gray-100 rounded-lg relative">
        <div className="w-16 h-16 relative flex flex-shrink-0">
          <img
            className="shadow-md rounded-full w-full h-full object-cover"
            src="https://randomuser.me/api/portraits/women/61.jpg"
            alt=""
          />
          <div className={`absolute bg-white p-1 rounded-full bottom-0 right-0`}>
            <div className="bg-green-500 rounded-full w-3 h-3"></div>
          </div>
        </div>
        <div className="flex-auto min-w-0 ml-4 mr-6 hidden md:block">
          <p>Angelina Jolie</p>
          <div className="flex items-center text-sm text-gray-600">
            <div className="min-w-0">
              <p className="truncate">Ok, see you at the subway</p>
            </div>
            <p className="ml-2 whitespace-no-wrap">Just now</p>
          </div>
        </div>
        <div class="bg-blue-500 w-3 h-3 rounded-full flex flex-shrink-0 hidden md:block"></div>
      </div>
    </>
  );
}
