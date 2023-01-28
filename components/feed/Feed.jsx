import { useAuth } from "../../context/AuthContext";
import Post from "../post/Post";
import Share from "../share/Share";
import Story from "../story/Story";
// import { Posts } from "../../dummyData";

export default function Feed({ posts, username }) {
  const { auth } = useAuth();

  return (
    <>
      {(!username || username === auth.user.username) && (
        <>
          <Story />
          <Share />
        </>
      )}
      {posts.map((post) => (
        <Post key={post._id} post={post} />
      ))}
    </>
  );
}
