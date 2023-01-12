import { useState } from "react";
import Link from "next/link";
import PhoneSidebar from "../phoneSidebar/PhoneSidebar";

import {Search, JoinFull} from "@mui/icons-material";

export default function Topbar() {

  const [collapse, setCollapse] = useState(false);

  const collapseHandler = () => {
    setCollapse(!collapse);
  };
  return (
    <>
      <nav className="flex flex-row md:p-3 lg:p-2 items-center justify-around min-w-full sticky z-50 top-0 md:justify-around flex-wrap bg-blue-600 p-3">
          <div className="block md:hidden">
            <button
              onClick={collapseHandler}
              className="flex justify-around px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white"
            >
              <svg
                className="fill-current h-3 w-3"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Menu</title>
                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
              </svg>
            </button>
          </div>
        <div className="basis-1/12 text-white md:mr-2">
          <Link href="/" className="flex ">
            <JoinFull fontSize="large" />
            <span className="hidden  font-semibold text-2xl pl-1 tracking-tight md:block">
              Connect
            </span>
          </Link>
        </div>
        <div className="relative group lg:basis-1/2 md:basis-1/2 md:mx-0">
          <Search
            className="absolute left-2 top-1/2 -mt-2.5 pointer-events-nonegroup-focus-within:text-blue-500"
            aria-hidden="true"
          />
          <input
            className="mx-1 focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none w-full text-sm leading-6 text-slate-900 placeholder-slate-400 rounded-md py-2 pl-10 ring-1 ring-slate-200 shadow-sm"
            type="text"
            aria-label="Filter projects"
            placeholder="Filter projects..."
          />
        </div>
      </nav>
        <div
          className={`${
            collapse ? "block " : "hidden "
          } fixed overflow-auto z-10 basis-1/5`}
        >
          <PhoneSidebar />
        </div>
    </>
  );
}
