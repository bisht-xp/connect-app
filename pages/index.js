import Head from "next/head";
import Feed from "../components/feed/Feed";
import Rightbar from "../components/rightbar/Rightbar";
import Topbar from "../components/topbar/Topbar";
import PhoneSidebar from "../components/phoneSidebar/PhoneSidebar";

export default function Home() {
  return (
    <>
      <Head>
        <title>Home-page</title>
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>
      <Topbar />
      <div className="flex min-w-full">
        <div className="hidden md:block ">{<PhoneSidebar />}</div>
        <Feed/>
        <div className="hidden lg:block lg:basis-1/3">
          <Rightbar />
        </div>
      </div>
    </>
  );
}
