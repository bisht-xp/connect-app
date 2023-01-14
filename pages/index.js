import Head from "next/head";
import Feed from "../components/feed/Feed";
import Rightbar from "../components/rightbar/Rightbar";
import Topbar from "../components/topbar/Topbar";
import PhoneSidebar from "../components/phoneSidebar/PhoneSidebar";
import { useAuth } from "../context/AuthContext";

import axios from "axios";

export default function Home({ data }) {
  const { auth } = useAuth();
  console.log(auth);
  return (
    <>
      <Head>
        <title>Home-page</title>
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>
      <Topbar />
      <div className="flex min-w-full">
        <div className="hidden md:block ">{<PhoneSidebar />}</div>
        <Feed posts={data} />
        <div className="hidden lg:block lg:basis-1/3">
          <Rightbar />
        </div>
      </div>
    </>
  );
}

export const getServerSideProps = async () => {
  const res = await axios.get(
    `http://localhost:3000/api/post/timeline/63a5824362b001108fbe1f9d`
  );
  const data = res.data;
  return {
    props: { data },
  };
};