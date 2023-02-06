import { AddCircle, ChevronRight } from "@mui/icons-material";
import Image from "next/legacy/image";
import { useAuth } from "../../context/AuthContext";

export default function Story() {
  const { auth } = useAuth();
  return (
    <>
      <div className="relative flex space-x-2 pt-4">
        <div className="w-1/4 sm:w-1/6 h-44 rounded-xl overflow-hidden flex flex-col ">
          <div className="relative h-full group cursor-pointer">
            <Image
              className="group-hover:transform group-hover:scale-110 transition-all duration-700 "
              src={
                auth.user.profilePicture?.url ||
                "https://res.cloudinary.com/dakwu85pd/image/upload/v1675658082/connect/noAvatar_o4dszs.png"
              }
              layout="fill"
              objectFit="cover"
              alt={auth.user.username || "image"}
            />
          </div>
          <div className="flex-1 relative flex items-end justify-center pb-2 text-center leading-none dark:bg-dark-second dark:text-dark-txt">
            <span className="font-semibold bottom">Create a Story</span>
            <div className="w-10 h-10 rounded-full bg-blue-500 text-white grid place-items-center text-2xl border-4 border-white dark:border-dark-second absolute -top-5 left-1/2 transform -translate-x-1/2">
              <AddCircle />
            </div>
          </div>
        </div>
        <div className="w-1/4 sm:w-1/6 h-44 rounded-xl overflow-hidden">
          <div className="relative h-full group cursor-pointer">
            <Image
              className="group-hover:transform group-hover:scale-110 transition-all duration-700 h-full w-full"
              src="/assets/post/1.jpeg"
              layout="fill"
              objectFit="cover"
              alt="Story images"
            />
            <div className="w-full h-full bg-black absolute top-0 left-0 bg-opacity-10"></div>
            <span className="absolute bottom-0 left-2 pb-2 font-semibold text-white">
              jone Doe
            </span>
            <div className="w-10 h-10 rounded-full overflow-hidden absolute top-2 left-2 border-4 border-blue-500">
              <Image
                src={
                  auth.user.profilePicture?.url ||
                  "https://res.cloudinary.com/dakwu85pd/image/upload/v1675658082/connect/noAvatar_o4dszs.png"
                }
                alt="Profile picture"
                layout="fill"
                objectFit="cover"
              />
            </div>
          </div>
        </div>
        <div className="w-1/4 sm:w-1/6 h-44 rounded-xl overflow-hidden">
          <div className="relative h-full group cursor-pointer">
            <Image
              className="group-hover:transform group-hover:scale-110 transition-all duration-700 h-full w-full"
              src="/assets/post/1.jpeg"
              layout="fill"
              objectFit="cover"
              alt="Story images"
            />
            <div className="w-full h-full bg-black absolute top-0 left-0 bg-opacity-10"></div>
            <span className="absolute bottom-0 left-2 pb-2 font-semibold text-white">
              jone Doe
            </span>
            <div className="w-10 h-10 rounded-full overflow-hidden absolute top-2 left-2 border-4 border-blue-500">
              <Image
                src={
                  auth.user.profilePicture?.url ||
                  "https://res.cloudinary.com/dakwu85pd/image/upload/v1675658082/connect/noAvatar_o4dszs.png"
                }
                alt="Profile picture"
                layout="fill"
                objectFit="cover"
              />
            </div>
          </div>
        </div>
        <div className="w-1/4 sm:w-1/6 h-44 rounded-xl overflow-hidden">
          <div className="relative h-full group cursor-pointer">
            <Image
              className="group-hover:transform group-hover:scale-110 transition-all duration-700 h-full w-full"
              src="/assets/post/1.jpeg"
              layout="fill"
              objectFit="cover"
              alt="Story images"
            />
            <div className="w-full h-full bg-black absolute top-0 left-0 bg-opacity-10"></div>
            <span className="absolute bottom-0 left-2 pb-2 font-semibold text-white">
              jone Doe
            </span>
            <div className="w-10 h-10 rounded-full overflow-hidden absolute top-2 left-2 border-4 border-blue-500">
              <Image
                src={
                  auth.user.profilePicture?.url ||
                  "https://res.cloudinary.com/dakwu85pd/image/upload/v1675658082/connect/noAvatar_o4dszs.png"
                }
                alt="Profile picture"
                layout="fill"
                objectFit="cover"
              />
            </div>
          </div>
        </div>
        <div className="w-1/4 sm:w-1/6 h-44 rounded-xl overflow-hidden">
          <div className="relative h-full group cursor-pointer">
            <Image
              className="group-hover:transform group-hover:scale-110 transition-all duration-700 h-full w-full"
              src="/assets/post/1.jpeg"
              layout="fill"
              objectFit="cover"
              alt="Story images"
            />
            <div className="w-full h-full bg-black absolute top-0 left-0 bg-opacity-10"></div>
            <span className="absolute bottom-0 left-2 pb-2 font-semibold text-white">
              jone Doe
            </span>
            <div className="w-10 h-10 rounded-full overflow-hidden absolute top-2 left-2 border-4 border-blue-500">
              <Image
                src={
                  auth.user.profilePicture?.url ||
                  "https://res.cloudinary.com/dakwu85pd/image/upload/v1675658082/connect/noAvatar_o4dszs.png"
                }
                alt="Profile picture"
                layout="fill"
                objectFit="cover"
              />
            </div>
          </div>
        </div>
        <div className="w-12 h-12 rounded-full hidden lg:grid place-items-center text-2xl bg-white absolute -right-6 top-1/2 transform -translate-y-1/2 border border-gray-200 cursor-pointer hover:bg-gray-100 shadow text-gray-500 dark:bg-dark-third dark:border-dark-third dark:text-dark-txt">
          <ChevronRight />
        </div>
      </div>
    </>
  );
}
