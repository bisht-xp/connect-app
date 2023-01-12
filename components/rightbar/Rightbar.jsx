import Image from "next/image";
import gift from "../../public/assets/gift.png";
import ad from "../../public/assets/ad.png";
import { Users } from "../../dummyData";
import Online from "../online/Online";

export default function Rightbar({ user }) {
  const HomeRightbar = () => {
    return (
      <>
        <div className="flex items-center">
          <Image className="w-10 h-10 mr-3" src={gift} alt="gift" />
          <span className="font-roboto font-light text-base">
            <b className="font-medium">Pola Foster</b> and{" "}
            <b className="font-medium">3 other friends</b> have a birhday today.
          </span>
        </div>
        <Image className="w-full rounded-xl my-8" src={ad} alt="ad" />
        <h4 className="text-lg font-medium mb-3">Online Friends</h4>
        <ul className="p-0 m-0 list-none">
          {Users.map((u) => (
            <Online key={u.id} user={u} />
          ))}
        </ul>
      </>
    );
  };

  const ProfileRightbar = () => {
    return (
      <>
        <h4 className="text-lg font-medium mb-3">User information</h4>
        <div className="mb-8">
          <div className="mb-3">
            <span className="font-medium mr-3 text-gray-800">City:</span>
            <span className="font-light">{user.city}</span>
          </div>
          <div className="mb-3">
            <span className="font-medium mr-3 text-gray-800">From:</span>
            <span className="font-light">{user.from}</span>
          </div>
          <div className="mb-3">
            <span className="font-medium mr-3 text-gray-800">
              Relationship:
            </span>
            <span className="font-light">{user.relationship}</span>
          </div>
        </div>
        <h4 className="text-lg font-medium mb-3">User friends</h4>
        <div className="flex flex-wrap justify-between">
          <div className="flex flex-col mb-5 cursor-pointer">
            <Image
              src="/assets/person/1.jpeg"
              alt="image"
              width={100}
              height={100}
              className="w-20 h-20 object-cover rounded-full"
            />
            <span className="font-roboto">John Carter</span>
          </div>
          <div className="flex flex-col mb-5 cursor-pointer">
            <Image
              src="/assets/person/2.jpeg"
              alt="image"
              width={100}
              height={100}
              className="w-20 h-20 object-cover rounded-full"
            />
            <span className="font-roboto">John Carter</span>
          </div>
          <div className="flex flex-col mb-5 cursor-pointer">
            <Image
              src="/assets/person/3.jpeg"
              alt="image"
              width={100}
              height={100}
              className="w-20 h-20 object-cover rounded-full"
            />
            <span className="font-roboto">John Carter</span>
          </div>
          <div className="flex flex-col mb-5 cursor-pointer">
            <Image
              src="/assets/person/4.jpeg"
              alt="image"
              width={100}
              height={100}
              className="w-20 h-20 object-cover rounded-full"
            />
            <span className="font-roboto">John Carter</span>
          </div>
          <div className="flex flex-col mb-5 cursor-pointer">
            <Image
              src="/assets/person/5.jpeg"
              alt="image"
              width={100}
              height={100}
              className="w-20 h-20 object-cover rounded-full"
            />
            <span className="font-roboto">John Carter</span>
          </div>
          <div className="flex flex-col mb-5 cursor-pointer">
            <Image
              src="/assets/person/6.jpeg"
              alt="image"
              width={100}
              height={100}
              className="w-20 h-20 object-cover rounded-full"
            />
            <span className="font-roboto">John Carter</span>
          </div>
        </div>
      </>
    );
  };
  return (
    <div className="basis-1/5">
      <div className="p-5">
        {user ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
}