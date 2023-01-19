import Head from "next/head";
import { JoinFull } from "@mui/icons-material";
import CircularProgress from "@mui/material/CircularProgress";
import { useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const email = useRef();
  const password = useRef();
  const [isFetching, setIsFetching] = useState(false);

  // const { user, isFetching, dispatch } = useContext(AuthContext);
  // useEffect
  const { login } = useAuth();

  const submitHandler = (event) => {
    setIsFetching(true);
    event.preventDefault();
    login(email.current.value, password.current.value);
    setIsFetching(false);
  };

  return (
    <>
      <Head>
        <title>login</title>
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>
      <div className="w-full h-screen bg-gray-200 flex items-center justify-center">
        <div className="w-full md:flex p-10 justify-center">
          <div className=" flex flex-col justify-center p-5">
            <div className="flex items-center pb-3">
              <JoinFull sx={{ fontSize: 48 }} htmlColor="blue" />
              <h3 className="text-5xl font-roboto font-extrabold text-sky-700">
                Connect
              </h3>
            </div>
            <span className="text-2xl">
              Connect with friends and the world around you on Connect.
            </span>
          </div>
          <div className="flex-justify-center">
            <form
              className="w-80 h-80 p-5 bg-white rounded-xl flex flex-col justify-between"
              onSubmit={submitHandler}
            >
              <input
                placeholder="Email"
                required
                type="email"
                className="h-12 rounded-xl border border-solid border-gray-600 text-lg p-5 focus:outline-none"
                ref={email}
              />
              <input
                placeholder="Password"
                required
                minLength="4"
                type="password"
                className="h-12 rounded-xl border border-solid border-gray-600 text-lg p-5 focus:outline-none"
                ref={password}
              />
              <button
                disabled={isFetching}
                className="h-12 rounded-xl border-none bg-blue-600 text-white text-xl font-roboto font-medium cursor-pointer"
              >
                {isFetching ? (
                  <CircularProgress style={{ color: "white" }} size="20px" />
                ) : (
                  "Log In"
                )}
              </button>
              <span className="text-center text-blue-600">
                Forgot Password?
              </span>
              <button className="w-4/5  self-center h-12 rounded-xl bg-green-600 text-white font-roboto font-medium text-xl cursor-pointer">
                {isFetching ? (
                  <CircularProgress style={{ color: "white" }} size="20px" />
                ) : (
                  "Create a New Account"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps({ req, res }) {
  if (req.user) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {}, // will be passed to the page component as props
  };
}