import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { useEffect, useState } from "react";
import { Users } from "../../dummyData";
import Online from "../online/Online";
import gift from "../../public/assets/gift.png";
import ad from "../../public/assets/ad.png";
import noAvatar from "../../public/assets/person/noAvatar.png";
import { useAuth } from "../../context/AuthContext";
import { Add, Remove } from "@mui/icons-material";

export default function Rightbar({ user }) {
  const { auth } = useAuth();
  
  const [friends, setFriends] = useState([]);
  const [followed, setFollowed] = useState(
    auth.user.followings.includes(user?._id)
  );


  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendList = await axios.get(`/api/user/friends/${user._id}`);
        setFriends(friendList.data);
      } catch (err) {
        console.log(err);
      }
    };
    getFriends();
  }, [user]);

  const handleClick = async () => {
    try {
      if (followed) {
        await axios.put(`/api/user/${user._id}/unfollow`, {
          userId: auth.user._id,
        });
      } else {
        await axios.put(`/api/user/${user._id}/follow`, {
          userId: auth.user._id,
        });
      }
      setFollowed(!followed);
    } catch (err) {
      console.log(err);
    }
  };

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
        {user.username !== auth.user.username && (
          <button
            className="mt-8 mb-3 border-none bg-blue-600 text-white rounded-md py-1 px-3 flex items-center text-base font-medium cursor-pointer focus:outline-none"
            onClick={handleClick}
          >
            {followed ? "Unfollow" : "Follow"}
            {followed ? <Remove /> : <Add />}
          </button>
        )}
        <h4 className="text-lg font-medium mb-3">User information</h4>
        <div className="mb-8">
          <div className="mb-3">
            <span className="font-medium mr-3 text-gray-800">City:</span>
            <span className="font-light">New York</span>
          </div>
          <div className="mb-3">
            <span className="font-medium mr-3 text-gray-800">From:</span>
            <span className="font-light">Madrid</span>
          </div>
          <div className="mb-3">
            <span className="font-medium mr-3 text-gray-800">
              Relationship:
            </span>
            <span className="font-light">Single</span>
          </div>
        </div>
        <h4 className="text-lg font-medium mb-3">User friends</h4>
        <div className="flex flex-wrap justify-around">
          {friends.map((friend) => (
            <Link
              href={`/profile/${friend.username}`}
              className="mr-3"
              key={friend._id}
            >
              <div className="flex flex-col mb-5 cursor-pointer">
                <Image
                  src={friend.profilePicture ? friend.profilePicture : noAvatar}
                  alt="image"
                  width={100}
                  height={100}
                  className="w-20 h-20 object-cover rounded-full"
                />
                <span className="font-roboto pt-2 self-center">
                  {friend.username}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </>
    );
  };
  return (
    <div className="basis-1/5">
      <div className="p-5">
        {user ? <ProfileRightbar /> : <HomeRightbar />}
        {/* <HomeRightbar /> */}
      </div>
    </div>
  );
}
