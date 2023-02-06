import axios from "axios";
import React, { createContext } from "react";
import router from "next/router";

const AuthContext = createContext();

export const getUser = async ({ req, res }) => {
  // console.log("req.user: ", req.user);
  try {
    if (req.user) {
      return { status: "SIGNED_IN", user: req.user };
    } else {
      return { status: "SIGNED_OUT", user: null };
    }
  } catch (err) {
    return { status: "SIGNED_OUT", user: null };
  }
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
       
      })
      .catch((error) => {
        return "Incorrect email or password entered.";
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
        
      })
      .catch((error) => {
        return "User already exits.";
      });
  };

  const logout = async () => {
    return await axios
      .get(`http://localhost:3000/api/auth/logout`, { withCredentials: true })
      .then(() => {
        router.push("/login");
        // console.log("user logged out");
      })
      .catch((error) => {
        return "Internal server error!!"
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
