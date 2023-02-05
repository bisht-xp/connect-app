import Link from "next/link";
import Image from "next/legacy/image";
import {
  Search,
  JoinFull,
  Message,
  DarkMode,
  Home,
  Group,
  ViewComfy,
  Storefront,
  CircleNotifications,
  Menu,
} from "@mui/icons-material";
import { Badge } from "@mui/material";
import { useRouter } from "next/router";
import { useAuth } from "../../context/AuthContext";
import noAvatar from "../../public/assets/person/noAvatar.png";
import SignOut from "../logout/Logout";
import { useState } from "react";
import SearchModal from "../serchModal/SearchModal";

export default function Topbar() {
  const { auth } = useAuth();
  const router = useRouter();

  const [search, setSearch] = useState(false);

  const clickHandler = () => {
    setSearch(true);
  };

  const searchClose = () => {
    setSearch(false);
  };

  return (
    <>
      <nav className="bg-white dark:bg-dark-second h-max md:h-14 w-full shadow flex flex-col md:flex-row items-center justify-center md:justify-between fixed top-0 z-50 border-b dark:border-dark-third">
        {/* <!-- LEFT NAV --> */}
        <div className="flex items-center justify-between w-full md:w-max px-4 py-2">
          <Link href="/" className="mr-2 hidden md:inline-block">
            <JoinFull className="w-24 sm:w-20 lg:w-10 h-auto text-blue-500" />
          </Link>
          <Link href="/" className="inline-block md:hidden">
            <span className="w-36 h-auto text-blue-500 text-lg font-bold font-roboto">
              Connect
            </span>
          </Link>
          <div className="flex items-center justify-between space-x-1">
            <div className="relative bg-gray-100 dark:bg-dark-third px-2 py-2 w-10 h-10 sm:w-11 sm:h-11 lg:h-10 lg:w-10 xl:w-max xl:pl-3 xl:pr-8 rounded-full flex items-center justify-center cursor-pointer">
              <Search onClick={clickHandler} />
              {/* <input
                type="text"
                placeholder="Search Facebook"
                className="outline-none bg-transparent hidden xl:inline-block"
              /> */}
            </div>
            <div className="text-2xl grid place-items-center md:hidden bg-gray-200 dark:bg-dark-third rounded-full w-10 h-10 cursor-pointer hover:bg-gray-300 dark:text-dark-txt">
              <DarkMode />
            </div>
            <div className="text-2xl grid place-items-center md:hidden bg-gray-200 dark:bg-dark-third rounded-full w-10 h-10 cursor-pointer hover:bg-gray-300 dark:text-dark-txt">
              <SignOut />
            </div>
          </div>
        </div>
        <ul className="flex w-full lg:w-max items-center justify-center">
          <li
            className={
              router.asPath == "/"
                ? `w-1/5 md:w-max text-center text-blue-500`
                : "w-1/5 md:w-max text-center"
            }
          >
            <Link
              href="/"
              className="w-full text-3xl py-2 px-3 xl:px-12 cursor-pointer text-center inline-block  border-b-4 "
            >
              <Home />
            </Link>
          </li>
          <li
            className={
              router.asPath == "/messages"
                ? `w-1/5 md:w-max text-center text-blue-500`
                : "w-1/5 md:w-max text-center"
            }
          >
            <Link
              href="/messages"
              className="w-full text-3xl py-2 px-3 xl:px-12 cursor-pointer text-center inline-block rounded hover:bg-gray-100 dark:hover:bg-dark-third dark:text-dark-txt relative"
            >
              <Badge badgeContent={8} color="error">
                <Message />
              </Badge>
            </Link>
          </li>
          <li className="w-1/5 md:w-max text-center">
            <Link
              href="#"
              className="w-full text-3xl py-2 px-3 xl:px-12 cursor-pointer text-center inline-block rounded text-gray-600 hover:bg-gray-100 dark:hover:bg-dark-third dark:text-dark-txt relative"
            >
              <Storefront />
            </Link>
          </li>
          <li className="w-1/5 md:w-max text-center">
            <Link
              href="#"
              className="w-full text-3xl py-2 px-3 xl:px-12 cursor-pointer text-center inline-block rounded text-gray-600 hover:bg-gray-100 dark:hover:bg-dark-third dark:text-dark-txt relative"
            >
              <Badge badgeContent={null} color="error">
                <Group />
              </Badge>
            </Link>
          </li>
          <li className="w-1/5 md:w-max text-center hidden md:inline-block">
            <Link
              href="#"
              className="w-full text-3xl py-2 px-3 xl:px-12 cursor-pointer text-center inline-block rounded text-gray-600 hover:bg-gray-100 dark:hover:bg-dark-third dark:text-dark-txt relative"
            >
              <Badge badgeContent={100} color="error">
                <ViewComfy />
              </Badge>
            </Link>
          </li>
          <li className="w-1/5 md:w-max text-center inline-block md:hidden">
            <Link
              href="#"
              className="w-full text-3xl py-2 px-3 xl:px-12 cursor-pointer text-center inline-block rounded text-gray-600 hover:bg-gray-100 dark:hover:bg-dark-third dark:text-dark-txt relative"
            >
              <Menu />
            </Link>
          </li>
        </ul>
        {/* <!-- END MAIN NAV --> */}

        {/* <!-- RIGHT NAV --> */}
        <ul className="hidden md:flex mx-4 items-center justify-center">
          <li className="h-full hidden xl:flex">
            <Link
              href={`/profile/${auth.user.username}`}
              className="inline-flex items-center justify-center p-1 rounded-full hover:bg-gray-200 dark:hover:bg-dark-third mx-1"
            >
              <Image
                className="h-7 w-7 rounded-full object-cover"
                src={auth.user.profilePicture?.url || noAvatar}
                width={28}
                height={28}
                alt={auth.user.username || "image"}
              />
              <span className="mx-2 font-semibold dark:text-dark-txt">
                {auth.user.username}
              </span>
            </Link>
          </li>
          <li>
            <div className="xl:grid hidden place-items-center bg-gray-200 dark:bg-dark-third dark:text-dark-txt rounded-full mx-1 p-3 cursor-pointer hover:bg-gray-300 relative">
              <Badge badgeContent={9} color="error">
                <CircleNotifications />
              </Badge>
            </div>
          </li>
          <li>
            <div
              className="grid place-items-center bg-gray-200 dark:bg-dark-third dark:text-dark-txt rounded-full mx-1 p-3 cursor-pointer hover:bg-gray-300 relative"
              // darkMood={dark}
            >
              <DarkMode />
            </div>
          </li>
          <li>
            <div className="xl:grid place-items-center bg-gray-200 dark:bg-dark-third dark:text-dark-txt rounded-full mx-1 p-3 cursor-pointer hover:bg-gray-300 relative">
              <SignOut />
            </div>
          </li>
        </ul>
        {/* <!-- END RIGHT NAV --> */}
      </nav>
      {search && <SearchModal outSideClick={searchClose} />}
    </>
  );
}
