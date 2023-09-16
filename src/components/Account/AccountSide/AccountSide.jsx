import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import {  useState } from "react";
import Select from "react-select";
import axios from "../../../utils/axios";
//  import InputEmoji from 'react-input-emoji'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { following, postView, verifyToken } from "../../../utils/constants";


import {
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalBody,
} from "mdb-react-ui-kit";
import { editUserInfo } from "../../../utils/constants";

function AccountSide() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [personal, setPersonal] = useState(false);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [phone, setPhone] = useState("");
  const [name1, setName1] = useState("");
  const [email1, setEmail1] = useState("");
  const [followingCount, setFollowingCount] = useState(0);
  const [follwerCount,setFollowerCount]=useState(0)
  const [posts,setPosts]=useState(0)

  const Token = localStorage.getItem("token");
  const [basicModal, setBasicModal] = useState(false);

  const options = [
    { value: "Male", label: "Male" },
    { value: "Women", label: "Women" },
    { value: "Others", label: "Prefer Not to say" },
  ];

  useEffect(() => {
    if (Token) {
      axios
        .post(verifyToken, JSON.stringify({ Token }), {
          headers: { "Content-Type": "application/json" },
        })
        .then((res) => {
          console.log(res,'from verify')
          setName1(res.data.user.userName);
          setEmail1(res.data.user.userEmail);
          setFollowerCount(res.data.user.followerCount)
          setFollowingCount(res.data.user.followingCount)
          axios
          .get(`${postView}?token=${Token}`)
          .then((res) => {
            console.log(res)
            if(res.data.posts)
            {
              setPosts(res.data.posts.length)
            }
          })
        })
        .catch((err) => {
          console.log(err, "error from token");
        });
    } else {
      navigate("/login");
    }
  }, []);
  const showToastMessage = () => {
    toast.success("Updated", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };
  const showToastMessageError = (error) => {
    toast.error("Something went wrong", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };
  const toggleShow = () => {
    setBasicModal(!basicModal);
  };
  const handleUser = (e) => {
    const Token = localStorage.getItem("token");

    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("bio", bio);
    formData.append("gender", gender);
    formData.append("email", email);
    formData.append("dob", dob);
    formData.append("phone", phone);
    formData.append("token", Token);
    axios
      .post(editUserInfo, formData, {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        if (res.data.message) {
          setName("");
          setBio("");
          setGender("");
          setBasicModal(false);
          showToastMessage();
        } else {
          showToastMessageError();
        }
      })
      .catch(() => {});
  };

  return (
    <div>
      <div className="flex flex-col m-2">
        <div>
          <div className="grid grid-cols-1 ">
            <div className="flex flex-col justify-center items-center">
              <span className="my-1">{name1}</span>
              <span className="my-3">{email1}</span>
              <div className="flex gap-10 text-sm">
                <div
                  className="flex flex-col items-center"
                >
                  <span className="font-bold">{followingCount?followingCount:0}</span>
                  <span>Following</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="font-bold">{follwerCount?follwerCount:0}</span>
                  <span>Followers</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="font-bold">{posts}</span>
                  <span>Posts</span>
                </div>
              </div>

              <button
                className="my-5 px-5 py-2 font-semibold text-sm border border-gray-400"
                onClick={toggleShow}
              >
                Edit profile
              </button>
            </div>
          </div>
          <MDBModal show={basicModal} setShow={setBasicModal} tabIndex="-1">
            <MDBModalContent className="p-0 m-0">
              <MDBModalBody className="ms-3">
                <div className="relative">
                  <div className="py-6  flex justify-center">
                    <button
                      type="button"
                      className="absolute top-3 right-1.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-emerald-950"
                      data-modal-hide="authentication-modal"
                      onClick={toggleShow}
                    >
                      <svg
                        aria-hidden="true"
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                    </button>
                    <form className="space-y-6" onSubmit={handleUser}>
                      {!personal && (
                        <>
                          <div>
                            <label
                              for="email"
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-balck"
                            >
                              Your Name
                            </label>
                            <input
                              type="name"
                              name="name"
                              id="name"
                              onChange={(e) => setName(e.target.value)}
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-500 dark:placeholder-gray-400 dark:text-black"
                              placeholder={name1 || "Name Here"}
                              required
                            />
                          </div>
                          <div>
                            <label
                              for="email"
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-balck"
                            >
                              Add Bio
                            </label>
                            <input
                              type="bio"
                              name="bio"
                              onChange={(e) => setBio(e.target.value)}
                              id="bio"
                              className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-500 dark:placeholder-gray-400 dark:text-black"
                              placeholder={bio || "Add bio"}
                              required
                            />
                          </div>
                          <div>
                            <label
                              for="email"
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-balck"
                            >
                              Gender
                            </label>
                            <Select
                              options={options}
                              onChange={(selectedOption) =>
                                setGender(selectedOption.value)
                              }
                            />
                          </div>
                        </>
                      )}
                      {personal && (
                        <>
                          <div>
                            <label
                              for="email"
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-balck"
                            >
                              Your Email Here
                            </label>
                            <input
                              type="email"
                              name="email"
                              id="email"
                              onChange={(e) => setEmail(e.target.value)}
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-500 dark:placeholder-gray-400 dark:text-black"
                              placeholder={email1 || "Your Email here"}
                              required
                            />
                          </div>
                          <div>
                            <label
                              for="email"
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-balck"
                            >
                              Dob
                            </label>
                            <input
                              type="date"
                              name="name"
                              id="name"
                              onChange={(e) => setDob(e.target.value)}
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-500 dark:placeholder-gray-400 dark:text-black"
                              placeholder="Your Dob here"
                              required
                            />
                          </div>
                          <div>
                            <label
                              for="email"
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-balck"
                            >
                              Your Phone
                            </label>
                            <input
                              type="name"
                              name="name"
                              id="name"
                              onChange={(e) => setPhone(e.target.value)}
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-500 dark:placeholder-gray-400 dark:text-black"
                              placeholder="Your Phone"
                              required
                            />
                          </div>
                        </>
                      )}

                      <button
                        type="submit"
                        className="w-full  text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        Save Changes
                      </button>
                      <div className="text-sm flex justify-between font-medium text-gray-500 dark:text-gray-300">
                        {personal ? (
                          <a
                            href="#"
                            className="text-blue-700 hover:underline dark:text-blue-500"
                            onClick={() => {
                              setPersonal(false);
                            }}
                          >
                            General Information Settings
                          </a>
                        ) : (
                          <a
                            href="#"
                            className="text-blue-700 hover:underline dark:text-blue-500"
                            onClick={() => {
                              setPersonal(true);
                            }}
                          >
                            Personal Informmation Settings
                          </a>
                        )}
                        <a
                          href="#"
                          className="text-blue-700 hover:underline dark:text-blue-500"
                          onClick={toggleShow}
                        >
                          Cancel
                        </a>
                      </div>
                    </form>
                  </div>
                </div>
              </MDBModalBody>
            </MDBModalContent>
          </MDBModal>
        </div>
      </div>
    </div>
  );
}

export default AccountSide;
