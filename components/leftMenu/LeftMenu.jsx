import Link from "next/link";
import Image from "next/legacy/image";
import { useAuth } from "../../context/AuthContext";
import noAvatar from "../../public/assets/person/noAvatar.png";
import { AccessTime, ExpandMore, Flag, Group, Groups } from "@mui/icons-material";

export default function LeftMenu() {
  const { auth } = useAuth();
  return (
    <>
      <div className="w-1/5 pt-16 h-full hidden xl:flex flex-col fixed top-0 left-0">
        <ul className="p-4">
          <li>
            <Link
              href={`/profile/${auth.user.username}`}
              className="flex items-center space-x-2 p-2 hover:bg-gray-200 rounded-lg transition-all dark:text-dark-txt dark:hover:bg-dark-third"
            >
              {/* <Image
                src="./images/tuat.jpg"
                alt="Profile picture"
                className="w-10 h-10 rounded-full"
              /> */}
              <Image
                className="w-10 h-10 rounded-full object-cover "
                src={auth.user.profilePicture || noAvatar}
                width={40}
                height={40}
                alt={auth.user.username || "image"}
              />
              <span className="font-semibold">{auth.user.username}</span>
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className="flex items-center space-x-2 p-2 hover:bg-gray-200 rounded-lg transition-all dark:text-dark-txt dark:hover:bg-dark-third"
            >
              {/* <img
                src="./images/friends.png"
                alt="Profile picture"
                className="w-10 h-10 rounded-full"
              /> */}
              <Group className="w-10 h-10 rounded-full"/>
              <span className="font-semibold">Friends</span>
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className="flex items-center space-x-2 p-2 hover:bg-gray-200 rounded-lg transition-all dark:text-dark-txt dark:hover:bg-dark-third"
            >
              <Flag className="w-10 h-10 rounded-full"/>
              <span className="font-semibold">Pages</span>
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className="flex items-center space-x-2 p-2 hover:bg-gray-200 rounded-lg transition-all dark:text-dark-txt dark:hover:bg-dark-third"
            >
              <AccessTime className="w-10 h-10 rounded-full" />
              <span className="font-semibold">Memories</span>
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className="flex items-center space-x-2 p-2 hover:bg-gray-200 rounded-lg transition-all dark:text-dark-txt dark:hover:bg-dark-third"
            >
              <Groups className="w-10 h-10 rounded-full" />
              <span className="font-semibold">Groups</span>
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className="flex items-center space-x-2 p-2 hover:bg-gray-200 rounded-lg transition-all dark:text-dark-txt dark:hover:bg-dark-third"
            >
              <span className="w-10 h-10 rounded-full grid place-items-center bg-gray-300 dark:bg-dark-second">
                <ExpandMore />
              </span>
              <span className="font-semibold">See more</span>
            </Link>
          </li>
          <li className="border-b border-gray-200 dark:border-dark-third mt-6"></li>
        </ul>
        
        <div className="mt-auto p-7 text-sm text-gray-500 dark:text-dark-txt">
          <Link href="#">Privacy</Link>
          <span>.</span>
          <Link href="#">Terms</Link>
          <span>.</span>
          <Link href="#">Advertising</Link>
          <span>.</span>
          <Link href="#">Cookies</Link>
          <span>.</span>
          <Link href="#">Ad choices</Link>
          <span>.</span>
          <Link href="#">More</Link>
          <span>.</span>
          <span>Connect © {(new Date().getFullYear())}</span>
        </div>
      </div>
    </>
  );
}
