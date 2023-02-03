import Head from "next/head";
import Topbar from "../../components/topbar/Topbar";
import Feed from "../../components/feed/Feed";
import axios from "axios";
import LeftMenu from "../../components/leftMenu/LeftMenu";
import ProfileInfo from "../../components/profileInfo/ProfileInfo";
import ProfileRightMenu from "../../components/profileRightMenu/ProfileRightMenu";

export default function Profile({ userData, postData }) {
  return (
    <>
      <Head>
        <title>{userData.username}</title>
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>
      <Topbar />
      {/* <div className="flex w-full">
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
      </div> */}
      <div className="flex justify-center h-screen">
        <LeftMenu />
        <div className="w-full lg:w-2/3 xl:w-2/5 pt-32 lg:pt-16 px-2">
          <ProfileInfo user={userData} />
          <Feed posts={postData} username={userData.username} />
        </div>
        <ProfileRightMenu />
      </div>
    </>
  );
}

export const getServerSideProps = async ({ req, res, params }) => {
  if (!req.user) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  const { profile } = params;
  const resUser = await axios.get(
    `http://localhost:3000/api/user/?username=${profile}`
  );
  const resPost = await axios.get(
    `http://localhost:3000/api/post/profile/${profile}`
  );
  const userData = resUser.data;
  const postData = resPost.data.sort((p1, p2) => {
    return new Date(p2.createdAt) - new Date(p1.createdAt);
  });
  return {
    props: { userData, postData },
  };
};
