import axios from "axios";
import { useRef, useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import { useAuth } from "../../context/AuthContext";

export default function UpdateModal(props) {
  const desc = useRef();
  const city = useRef();
  const relationship = useRef();
  const [profileFile, setProfileFile] = useState(null);
  const [coverFile, setCoverFile] = useState(null);

  const { auth } = useAuth();

  const formSubmit = async (event) => {
    event.preventDefault();
    let formData = new FormData();
    formData.append("desc", desc.current.value);
    formData.append("city", city.current.value);
    formData.append("relationship", relationship.current.value);
    // console.log(profileFile, coverFile);
    formData.append("profile", profileFile);
    formData.append("coverPicture", coverFile);

    // console.log(formData.value);
    try {
      const res = await axios.put(`/api/user/${auth.user._id}`, formData);
      // console.log(res.data);
      // desc.current.value={}
      setCoverFile(null);
      setProfileFile(null);
      console.log(res.data);
    } catch (err) {
      console.log(err.response);
    }
  };

  const clickHandler = () => {
    props.closeHandler();
  };

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <OutsideClickHandler onOutsideClick={clickHandler}>
          <form onSubmit={formSubmit}>
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="relative p-4 flex-auto">
                  <div className="shadow sm:rounded-md sm:overflow-hidden">
                    <div className="px-2 py-2 bg-white space-y-6 sm:p-6 text-lg w-full">
                      <div>
                        <label
                          htmlFor="about"
                          className="block  font-medium text-gray-700"
                        >
                          About
                        </label>
                        <div className="mt-1">
                          <input
                            name="about"
                            type="text"
                            ref={desc}
                            className="p-3 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                            placeholder="Web Developer"
                          />
                        </div>
                      </div>
                      <div className="flex">
                        <div className="col-span-6  lg:col-span-6">
                          <label
                            htmlFor="city"
                            className="block font-medium text-lg text-gray-700"
                          >
                            City
                          </label>
                          <input
                            type="text"
                            ref={city}
                            placeholder="Delhi"
                            className="p-3 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>
                        <div className="col-span-6  lg:col-span-6">
                          <label
                            htmlFor="relationship"
                            className="block  font-medium text-lg text-gray-700"
                          >
                            Relationship
                          </label>
                          <input
                            type="text"
                            ref={relationship}
                            placeholder="Single"
                            className="p-3 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-lg font-medium text-gray-700">
                          Photo
                        </label>
                        <div className="mt-1 flex items-center">
                          <span className="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                            <svg
                              className="h-full w-full text-gray-300"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                          </span>
                          <label
                            // htmlfor="file-upload"
                            className="relative ml-5 py-2 px-3 text-gray-700 border cursor-pointer bg-white rounded-md font-medium focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2"
                          >
                            <span>Upload a file</span>
                            <input
                              id="profile"
                              name="profile"
                              type="file"
                              className="sr-only"
                              onChange={(e) =>
                                setProfileFile(e.target.files[0])
                              }
                            />
                          </label>
                        </div>
                      </div>
                      <div>
                        <label className="block font-medium text-gray-700">
                          Cover photo
                        </label>
                        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                          <div className="space-y-1 text-center">
                            <div className="flex text-sm text-gray-600">
                              <label className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                                <span>Upload a file</span>
                                <input
                                  id="coverPicture"
                                  name="coverPicture"
                                  type="file"
                                  className="sr-only"
                                  onChange={(e) =>
                                    setCoverFile(e.target.files[0])
                                  }
                                />
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={clickHandler}
                  >
                    Close
                  </button>
                  <button
                    className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="submit"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </form>
        </OutsideClickHandler>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 backdrop-brightness-95 bg-black"></div>
    </>
  );
}
