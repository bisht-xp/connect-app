import React from "react";
import { format } from "timeago.js";

export default function Chat({ message, own }) {
  return (
    <div
      className={
        own
          ? "flex flex-row justify-end mt-2 mb-3"
          : "flex flex-row justify-start mt-2 mb-3"
      }
    >
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
            {message.text}
          </p>
        </div>
        <p className={"p-4 text-center text-sm text-gray-500"}>
          {format(message.createdAt)}
        </p>
      </div>
    </div>
  );
}
