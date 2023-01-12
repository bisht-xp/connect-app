import Image from "next/image";
import {
  Person,
  Notifications,
  Chat,
  Verified,
  RssFeed,
  PlayCircleFilledOutlined,
  Group,
  Bookmark,
  HelpOutline,
  WorkOutline,
  Event,
  School,
} from "@mui/icons-material";
import { Badge } from "@mui/material";
import person1 from "../../public/assets/person/1.jpeg";


export default function PhoneSidebar() {
  return (
    <>
      <div className="fixed overflow-y-auto scrollbar lg:basis-1/4 md:basis-1/3">
        <div className="bg-white md:h-screen rounded p-7 shadow-lg">
          <div className="flex items-center space-x-4 p-2 mb-5">
            <Image
              className="w-12 h-12 rounded-full object-cover "
              src={person1}
              alt="James Bhatta"
            />
            <div>
              <h4 className="font-semibold text-lg text-gray-700 capitalize font-poppins tracking-wide">
                James Bhatta
              </h4>
              <span className="text-sm tracking-wide flex items-center space-x-1">
                <Verified htmlColor="green" fontSize="small" />
                <span className="text-gray-600">Verified</span>
              </span>
            </div>
          </div>
          <ul className="space-y-2 text-sm">
            <li>
              <a
                href="#"
                className="flex items-center space-x-3 text-gray-700 p-2 rounded-md font-medium hover:bg-gray-200 bg-gray-200 focus:shadow-outline"
              >
                <span className="text-gray-600">
                  <RssFeed className="h-5" />
                </span>
                <span>Feed</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center space-x-3 text-gray-700 p-2 rounded-md font-medium hover:bg-gray-200 focus:bg-gray-200 focus:shadow-outline"
              >
                <span className="text-gray-600">
                  <Badge badgeContent={17} color="error">
                    <Notifications className="h-5" />
                  </Badge>
                </span>
                <span>Notifications</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center space-x-3 text-gray-700 p-2 rounded-md font-medium hover:bg-gray-200 focus:bg-gray-200 focus:shadow-outline"
              >
                <span className="text-gray-600">
                  <Badge badgeContent={4} color="error">
                    <Chat className="h-5" />
                  </Badge>
                </span>
                <span>Personal messages</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center space-x-3 text-gray-700 p-2 rounded-md font-medium hover:bg-gray-200 focus:bg-gray-200 focus:shadow-outline"
              >
                <span className="text-gray-600">
                  <Badge badgeContent={null} color="error">
                    <Person className="h-5" />
                  </Badge>
                </span>
                <span>My profile</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center space-x-3 text-gray-700 p-2 rounded-md font-medium hover:bg-gray-200 focus:bg-gray-200 focus:shadow-outline"
              >
                <span className="text-gray-600">
                  <Badge badgeContent={null} color="error">
                    <PlayCircleFilledOutlined className="h-5" />
                  </Badge>
                </span>
                <span>Videos</span>
              </a>
            </li>
            <li>
              <a
                href=""
                className="flex items-center space-x-3 text-gray-700 p-2 rounded-md font-medium hover:bg-gray-200 focus:bg-gray-200 focus:shadow-outline"
              >
                <span className=" text-gray-600">
                  <Badge badgeContent={null} color="error">
                    <Group className="h-5" />
                  </Badge>
                </span>
                <span>Groups</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center space-x-3 text-gray-700 p-2 rounded-md font-medium hover:bg-gray-200 focus:bg-gray-200 focus:shadow-outline"
              >
                <span className="text-gray-600">
                  <Badge badgeContent={null} color="error">
                    <Bookmark className="h-5" />
                  </Badge>
                </span>

                <span>Bookmarks</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center space-x-3 text-gray-700 p-2 rounded-md font-medium hover:bg-gray-200 focus:bg-gray-200 focus:shadow-outline"
              >
                <span className="text-gray-600">
                  <Badge badgeContent={null} color="error">
                    <HelpOutline className="h-5" />
                  </Badge>
                </span>
                <span>Questions</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center space-x-3 text-gray-700 p-2 rounded-md font-medium hover:bg-gray-200 focus:bg-gray-200 focus:shadow-outline"
              >
                <span className="text-gray-600">
                  <Badge badgeContent={null} color="error">
                    <WorkOutline className="h-5" />
                  </Badge>
                </span>
                <span>Jobs</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center space-x-3 text-gray-700 p-2 rounded-md font-medium hover:bg-gray-200 focus:bg-gray-200 focus:shadow-outline"
              >
                <span className="text-gray-600">
                  <Badge badgeContent={null} color="error">
                    <Event className="h-5" />
                  </Badge>
                </span>
                <span>Events</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center space-x-3 text-gray-700 p-2 rounded-md font-medium hover:bg-gray-200 focus:bg-gray-200 focus:shadow-outline"
              >
                <span className="text-gray-600">
                  <Badge badgeContent={null} color="error">
                    <School className="h-5" />
                  </Badge>
                </span>
                <span>Courses</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}