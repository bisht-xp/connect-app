import Post from "../post/Post";
import Share from "../share/Share";
import { Posts } from "../../dummyData";

export default function Feed() {
  return (
    <div className="w-full md:ml-64 lg:basis-2/3 ">
    
      <div className="p-2 md:p-5">
        <Share />
        {Posts.map((p) => (
          <Post key={p.id} post={p} />
        ))}
        {/* <Post /> */}
      </div>
    </div>
  );
}