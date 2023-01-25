import Head from "next/head";
import Feed from "../components/feed/Feed";
import Rightbar from "../components/rightbar/Rightbar";
import Topbar from "../components/topbar/Topbar";
import PhoneSidebar from "../components/phoneSidebar/PhoneSidebar";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

export default function Home({ postData }) {
  const {auth} = useAuth()
  return (
    <>
      <Head>
        <title>Home-page</title>
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>
      <Topbar />
      <div className="flex min-w-full">
        <div className="hidden md:block ">{<PhoneSidebar />}</div>
        <Feed posts={postData} />
        <div className="hidden lg:block lg:basis-1/3">
          <Rightbar user={auth.user}/>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps = async ({ req, res }) => {
  if (!req.user) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  const postTimeline = await axios.get(
    `http://localhost:3000/api/post/timeline/${req.user._id}`
  );
  const postData = postTimeline.data.sort((p1, p2) => {
    return new Date(p2.createdAt) - new Date(p1.createdAt);
  });
  return {
    props: { postData },
  };
};
