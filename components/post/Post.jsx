import { MoreVert } from "@mui/icons-material";
import Image from "next/legacy/image"
import { Users } from "../../dummyData";
import { useState } from "react";
import likes from "../../public/assets/like.png";
import heart from "../../public/assets/heart.png";

export default function Post({ post }) {
  const [like, setLike] = useState(post.like);
  const [isLiked, setIsLiked] = useState(false);

  const likeHandler = () => {
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };
  return (
    <div className="w-full rounded-3xl ">
      <div className="p-3  my-8 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Image
              className="w-8 h-8 rounded-full object-cover"
              src={Users.filter((u) => u.id === post?.userId)[0].profilePicture}
              width={32}
              height={32}
              alt="It's Your"
            />
            <span className="text-base font-medium mx-3">
              {/* Angela safak */}
              {Users.filter((u) => u.id === post?.userId)[0].username}
            </span>
            <span className="text-xs">{post.date}</span>
          </div>
          <div className="cursor-pointer">
            <MoreVert />
          </div>
        </div>
        <div className="my-5">
          <span className="font-roboto">{post?.desc}</span>
          <div className="w-full h-96 md:h-500 relative mt-2">
          {/* w-full h-96 md:h-500  */}
            <Image
              className="mt-5 w-full h-96 md:h-500"
              src={post.photo}
              // width={400}
              // height={400}
              alt="image"
              layout="fill"
              objectFit="cover"
            />
          </div>
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
