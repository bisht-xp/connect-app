import Image from "next/legacy/image";
import noCover from "../../public/assets/person/noCover.png";
import noAvatar from "../../public/assets/person/noAvatar.png";

export default function ProfileInfo({ user }) {
  return (
    <div className="md:ml-64">
      <div className="">
        <div className="h-80">
          <div className="relative w-full h-64">
            <Image
              className="object-cover"
              src={user.coverPicture || noCover}
              layout="fill"
              objectFit="cover"
              alt="coverImage"
            />
          </div>
          <div className="relative w-36 h-36 m-auto -top-24 rounded-full border-2 border-solid border-white ">
            <Image
              className=" rounded-full absolute left-0 right-0"
              src={user.profilePicture || noAvatar}
              layout="fill"
              objectFit="cover"
              alt=""
            />
          </div>
        </div>
        <div className="flex flex-col items-center justify-center">
          <h4 className="text-2xl">{user.username}</h4>
          <span className="font-light">{user.desc}</span>
        </div>
      </div>
    </div>
  );
}