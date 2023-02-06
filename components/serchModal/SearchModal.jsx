import axios from "axios";
import Image from "next/legacy/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import { useAuth } from "../../context/AuthContext";

export default function SearchModal(props) {
  const { auth } = useAuth();
  const [allUser, setAllUser] = useState([]);
  const [query, setQuery] = useState("");
  const [filterData, setFilterData] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await axios.get(`/api/user/alluser`);
        setAllUser(res.data);
      } catch (err) {
        setErrorMessage("Internal server Error!");
      }
    };
    getUsers();
  }, []);

  const handleFilter = (event) => {
    const searchWord = event.target.value.toLowerCase();
    setQuery(searchWord);

    const newFilter = allUser.filter((user) => {
      return user.username.toLowerCase().includes(query);
    });

    if (searchWord === "") {
      setFilterData([]);
    } else {
      setFilterData(newFilter);
    }
  };

  const clickHandler = () => {
    setQuery("");
    setFilterData([]);
    props.outSideClick();
  };

  console.log(filterData);
  return (
    <>
      <div className="fixed  z-50  w-full h-full outline-none overflow-x-hidden overflow-y-auto">
        <OutsideClickHandler onOutsideClick={clickHandler}>
          <div className="w-full max-w-screen-xl mx-auto px-6 mt-12">
            <div className="flex justify-center p-4 px-3 py-10">
              <div className="w-full max-w-2xl mt-10">
                <div className="bg-white shadow-md rounded-lg px-3 py-2 mb-4">
                  <div className="block text-gray-700 text-lg font-semibold py-2 px-2">
                    Search
                  </div>
                  <div className="flex items-center bg-gray-200 rounded-md">
                    <div className="pl-2">
                      <svg
                        className="fill-current text-gray-500 w-6 h-6"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                      >
                        <path
                          className="heroicon-ui"
                          d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z"
                        />
                      </svg>
                    </div>
                    <input
                      className="w-full rounded-md bg-gray-200 text-gray-700 leading-tight focus:outline-none py-2 px-2"
                      id="search"
                      type="text"
                      onChange={handleFilter}
                      placeholder="Search for Friend"
                    />
                  </div>
                  {filterData.length !== 0 ? (
                    <div className="py-3 text-lg">
                      {filterData.map((data) => {
                        return (
                          <Link
                            href={`/profile/${data.username}`}
                            key={data._id}
                          >
                            <div className="flex justify-start cursor-pointer text-gray-700 hover:text-blue-400 hover:bg-blue-100 rounded-md px-2 py-2 my-2">
                              <span className=" m-1 rounded-full">
                                <img
                                  src={data.profilePicture?.url || "https://res.cloudinary.com/dakwu85pd/image/upload/v1675658082/connect/noAvatar_o4dszs.png"}
                                  className="w-8 h-8 rounded-full"
                                />
                              </span>
                              <div className="flex-grow font-medium px-2 py-2">
                                {data.username}
                              </div>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="py-3 text-lg">
                      <div className="flex-grow font-medium px-2 py-2">
                        No User Found
                      </div>
                    </div>
                  )}

                  <div className="block bg-gray-200 text-sm text-right py-2 px-3 -mx-3 -mb-2 rounded-b-lg">
                    <button
                      className="hover:text-gray-600 text-gray-500 font-bold py-2 px-4"
                      onClick={clickHandler}
                    >
                      Cancel
                    </button>
                    {/* <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Invite
                  </button> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </OutsideClickHandler>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 backdrop-brightness-95 bg-black"></div>
    </>
  );
}
