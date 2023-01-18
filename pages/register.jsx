import Head from "next/head";
import { JoinFull } from "@mui/icons-material";
// import axios from "axios";
import { useRef } from "react";
import { useAuth } from "../context/AuthContext";

export default function register() {
  const { register } = useAuth();
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();

  const submitHandler = async (event) => {
    event.preventDefault();
    if (passwordAgain.current.value !== password.current.value) {
      passwordAgain.current.setCustomValidity("Passwords don't match!");
    } else {
      register(
        username.current.value,
        email.current.value,
        password.current.value
      );
    }
  };

  return (
    <>
      <Head>
        <title>register</title>
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>
      <div className="w-full h-screen bg-gray-300 flex items-center justify-center">
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
              onSubmit={submitHandler}
              className="w-80 h-96 p-5 bg-white rounded-xl flex flex-col justify-between"
            >
              <input
                placeholder="Username"
                required
                type="text"
                className="h-12 rounded-xl border border-solid border-gray-600 text-lg p-5 focus:outline-none"
                ref={username}
              />
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
                minLength="6"
                type="password"
                className="h-12 rounded-xl border border-solid border-gray-600 text-lg p-5 focus:outline-none"
                ref={password}
              />
              <input
                placeholder="Password Again "
                required
                minLength="6"
                type="password"
                className="h-12 rounded-xl border border-solid border-gray-600 text-lg p-5 focus:outline-none"
                ref={passwordAgain}
              />
              <button className="h-12 rounded-xl border-none bg-blue-600 text-white text-xl font-roboto font-medium cursor-pointer">
                Sign Up
              </button>
              <button className="w-4/5  self-center h-12 rounded-xl bg-green-600 text-white font-roboto font-medium text-xl cursor-pointer">
                Log into Account
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
