import Head from "next/head";
import Topbar from "../../components/topbar/Topbar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import PhoneSidebar from "../../components/phoneSidebar/PhoneSidebar";
import ProfileInfo from "../../components/profileInfo/ProfileInfo";
import axios from "axios";

export default function Profile({ userData, postData }) {
  return (
    <>
      <Head>
        <title>{userData.username}</title>
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>
      <Topbar />
      <div className="flex w-full">
        <div className="hidden md:block lg:block">{<PhoneSidebar />}</div>
        <div className="w-full ">
          <ProfileInfo user={userData} />
          <div className="flex">
            <Feed posts={postData} />
            <div className="hidden lg:block lg:basis-1/3">
              <Rightbar user={userData} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps = async (context) => {
  const { profile } = context.params;
  const resUser = await axios.get(
    `http://localhost:3000/api/user/?username=${profile}`
  );
  const resPost = await axios.get(
    `http://localhost:3000/api/post/profile/${profile}`
  );
  const userData = resUser.data;
  const postData = resPost.data;
  return {
    props: { userData, postData },
  };
};