import { MoreVert } from "@mui/icons-material";
import { useState, useEffect } from "react";
import Image from "next/legacy/image";
import Link from "next/link";
import axios from "axios";
import { format } from "timeago.js";
import avatar from "../../public/assets/person/noAvatar.png";
import likes from "../../public/assets/like.png";
import heart from "../../public/assets/heart.png";
import { useAuth } from "../../context/AuthContext";

export default function Post({ post }) {
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});
  const [hydrated, setHydrated] = useState(false);
  
  const { auth } = useAuth();

  useEffect(() => {
    setIsLiked(post.likes.includes(auth.user._id));
  }, [auth.user._id, post.likes]);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/api/user?userId=${post.userId}`);
      setUser(res.data);
    };
    fetchUser();
  }, [post.userId]);

  useEffect(() => {
    setHydrated(true);
  }, []);
  if (!hydrated) {
    // Returns null on first render, so the client and server match
    return null;
  }

  const likeHandler = async () => {
    try {
       await axios.put(`/api/post/${post._id}/like`, { userId: auth.user._id });
    } catch (err) {
      console.log(err);
    }
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  return (
    <div className="w-full rounded-3xl ">
      <div className="p-3  my-8 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link href={`/profile/${user.username}`}>
              <Image
                className="w-8 h-8 rounded-full object-cover"
                src={user.profilePicture || avatar}
                width={32}
                height={32}
                alt={user.username}
              />
            </Link>
            <span className="text-base font-medium mx-3">
              {/* Angela safak */}
              {user.username}
            </span>
            <span className="text-xs">{format(post.createdAt)}</span>
          </div>
          <div className="cursor-pointer">
            <MoreVert />
          </div>
        </div>
        <div className="my-5">
          <span className="font-roboto">{post?.desc}</span>
          {post.img?.url && (
            <div className="w-full h-96 md:h-500 relative mt-2">
              {/* w-full h-96 md:h-500  */}
              <Image
                className="mt-5 w-full h-96 md:h-500"
                src={post.img.url}
                // width={400}
                // height={400}
                alt="image"
                layout="fill"
                objectFit="cover"
              />
            </div>
          )}
        </div>
        <div className="flex items-center justify-between mt-1">
          <div className="flex items-center">
            <Image
              className="ml-1 cursor-pointer"
              width={24}
              height={24}
              src={likes}
              onClick={likeHandler}
              alt="likes"
            />
            <Image
              className=" ml-1 cursor-pointer"
              width={24}
              height={24}
              src={heart}
              onClick={likeHandler}
              alt="heart"
            />
            <span className="ml-2 text-sm">{like} people like it</span>
          </div>
          <div className="postBottomRight">
            <span className="cursor-pointer text-sm">comments</span>
          </div>
        </div>
      </div>
    </div>
  );
}
