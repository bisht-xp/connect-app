import axios from "axios";
import React, { createContext } from "react";
import router from "next/router";

const AuthContext = createContext();

export const getUser = async ({ req, res }) => {
  console.log("req.user: ", req.user);
  try {
    if (req.user) {
      // console.log(response.data);
      return { status: "SIGNED_IN", user: req.user };
    } else {
      return { status: "SIGNED_OUT", user: null };
    }
  } catch (err) {
    return { status: "SIGNED_OUT", user: null };
  }
  //   console.log("req.user from frontedn", req.user);
  //   return await axios
  //   .get(`http://localhost:3000/api/user/session`)
  //   .then((response) => {
  //     if (response.data) {
  //       return { status: 'SIGNED_IN', user: response.data };
  //     } else {
  //       return { status: 'SIGNED_OUT', user: null };
  //     }
  //   })
  //   .catch((error) => {
  //     return { status: 'SIGNED_OUT', user: null };
  //   });
};

export const AuthProvider = (props) => {
  // console.log(props);

  const auth = props.myAuth || { status: "SIGNED_OUT", user: null };

  const login = async (email, password) => {
    // Use any auth service methods here
    return await axios({
      method: "post",
      url: `http://localhost:3000/api/auth/login`,
      data: { email, password },
      withCredentials: true,
    })
      .then((response) => {
        router.push("/");
        console.log("user signed in");
        // return { status: "SIGNED_IN", user: response.data };
      })
      .catch((error) => {
        console.error("Incorrect email or password entered.");
      });
  };

  const register = async (username, email, password) => {
    return await axios({
      method: "post",
      url: `http://localhost:3000/api/auth/register`,
      data: { username, email, password },
      withCredentials: true,
    })
      .then(function (response) {
        router.push("/");
        console.log("user registered");
      })
      .catch(function (error) {
        console.error(error.message);
      });
  };

  const logout = async () => {
    return await axios
      .get(`http://localhost:3000/api/auth/logout`, { withCredentials: true })
      .then(() => {
        router.push("/");
        console.log("user logged out");
      })
      .catch((error) => {
        console.error(error.message);
      });
  };
  return (
    <AuthContext.Provider
      value={{ auth, logout, register, login }}
      {...props}
    />
  );
};

export const useAuth = () => React.useContext(AuthContext);

// export const AuthConsumer = AuthContext.Consumer;
