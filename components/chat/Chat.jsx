import React from "react";

export default function Chat({ own }) {
  return (
    <div
      className={
        own
          ? "flex flex-row justify-end mt-2 mb-3"
          : "flex flex-row justify-start mt-2 mb-3"
      }
    >
      <div className="w-8 h-8 relative flex flex-shrink-0 mr-4">
        <img
          className="shadow-md rounded-full w-full h-full object-cover"
          src="https://randomuser.me/api/portraits/women/33.jpg"
          alt=""
        />
      </div>
      <div
        className={`messages text-sm grid grid-flow-row gap-2 ${
          own ? `text-white` : `text-gray-700`
        }`}
      >
        <div className={`flex items-center group`}>
          <p
            className={`px-6 py-3 rounded-t-full rounded-r-full max-w-xs lg:max-w-md ${
              own ? `bg-blue-500` : "bg-gray-100"
            } `}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Volutpat
            lacus laoreet non curabitur gravida.
          </p>
        </div>
        <p className={"p-4 text-center text-sm text-gray-500"}>just now</p>
      </div>
    </div>
  );
}
