import Head from "next/head";
import axios from "axios";
import Feed from "../components/feed/Feed";
import Topbar from "../components/topbar/Topbar";
import LeftMenu from "../components/leftMenu/LeftMenu";
import RightMenu from "../components/rightMenu/RightMenu";


export default function Home({ postData }) {
  
  return (
    <>
      <Head>
        <title>Home-page</title>
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>
      <Topbar />
      <div className="flex justify-center h-screen">
        <LeftMenu />
        <div className="w-full lg:w-2/3 xl:w-2/5 pt-32 lg:pt-16 px-2">
          <Feed posts={postData} />
        </div>
        <RightMenu />
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
