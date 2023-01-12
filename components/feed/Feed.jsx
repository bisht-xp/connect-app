import axios from "axios";
// import { useEffect, useState } from "react";
import Post from "../post/Post";
import Share from "../share/Share";
// import { Posts } from "../../dummyData";

export default function Feed({posts}) {
  // console.log(posts);

  return (
    <div className="w-full md:ml-64 lg:basis-2/3 ">
      <div className="p-2 md:p-5">
        <Share />
        {posts.map((post) => (
          <Post key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
}
