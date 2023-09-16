import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import axios from "../../../utils/axios";
import { ToastContainer, toast } from "react-toastify";
import pic from "./undraw_no_data_re_kwbl.svg";
import { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import moment from "moment";

import {
  allPost,
  likePost,
  unlikePosts,
  reportPost,
  savePost,
  unFollow,
  unsaved,
  verifyToken,
  addComment,
  baseUrl,
  getComments,
} from "../../../utils/constants";
import { useNavigate } from "react-router-dom";
import { addComments, setComments } from "../../../Redux/userCommentsReducer";

function Post() {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [image, setImage] = useState(
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
  );
  const [posts, setPosts] = useState([]);
  const [selectedReason, setSelectedReason] = useState("");
  const [postId, setPostId] = useState("");
  const [commentPostId, setPostIdComment] = useState("");
  const [saved, setSaved] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [user, setUser] = useState("");
  const [comment, setComment] = useState("");
  const Token = localStorage.getItem("token");
  
  const img = useSelector((state) => state.userimage);

  const comments = useSelector((state) => state.comments);

  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const showToastMessage = (message) => {
    toast.success(message, {
      position: toast.POSITION.TOP_RIGHT,
    });
  };
  const showToastMessageError = (errorMessage) => {
    toast.error(errorMessage, {
      position: toast.POSITION.TOP_RIGHT,
    });
  };
  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };
  const cancelButtonRef = useRef(null);
  const reasons = [
    "I just dont like it",
    "Nudity or pornography",
    "hate speech or symbols",
    "Violence or threat of violence",
    "Sale or promotion of firearms",
  ];
  const handleCommentModal = (commentPostId) => {
    toggleModal();
    console.log(commentPostId, "from jjjj");
    setPostIdComment(commentPostId);
  };
  useEffect(() => {
    if (Token) {
      axios
        .post(verifyToken, JSON.stringify({ Token }), {
          headers: { "Content-Type": "application/json" },
        })
        .then((res) => {
          if (res.data.user) {
            setUser(res.data.user);
          } else {
            navigate("/login");
          }
        })
        .catch((err) => {});
    } else {
    }
    axios.get(`${allPost}?token=${Token}`).then((res) => {
      if (res.data.postsWithLikes) {
        const filteredPosts = res.data.postsWithLikes.filter(
          (post) =>
            post && (!post.reported || post.reported !== "blocked by admin")
        );
        const sortedPosts = filteredPosts.sort((a, b) => {
          const dateA = new Date(a.createdAt);
          const dateB = new Date(b.createdAt);
          return dateB - dateA;
        });
        setPosts(sortedPosts);
      }
    });
  }, []);
  const handleUnFollow = (e, userId) => {
    axios.post(`${unFollow}?id=${userId}&token=${Token}`);
  };
  const unsave = (postId, e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("postId", postId);
    formData.append("userId", user._id);
    axios
      .post(unsaved, formData, {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {});
  };
  const save = (postId, e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("postId", postId);
    formData.append("userid", user._id);
    axios
      .post(savePost, formData, {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        showToastMessage(res.data.message);
        setSaved(res.data.saved.postId);
        
      })
      .catch((err) => {
        showToastMessageError(err.response.data.message);
        setSaved(err.response.data.saved.postId);
      });
  };
  const likePosts = (postId, e) => {
    const formData = new FormData();
    formData.append("token", Token);
    formData.append("post", postId);

    axios
      .post(likePost, formData, {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        
      });
  };

  const unlikePost = (postId, e) => {
    const formData = new FormData();
    formData.append("token", Token);
    formData.append("post", postId);

    axios
      .post(unlikePosts, formData, {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
       
      });
  };

  useEffect(() => {
    localStorage.setItem("savedPosts", JSON.stringify(saved));
  }, []);
  const reportPosts = (e) => {
    const userId = user._id;
    e.preventDefault();
    const formData = new FormData();
    formData.append("id", postId);
    formData.append("reason", selectedReason);
    formData.append("user", userId);

    axios
      .post(reportPost, formData, {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        console.log(res,'grooooo')
        if (res.data.alreadyReported) {
          console.log('yes post is a;rad')
          let message = res.data.message;
          showToastMessageError(message);
          setIsOpen(false);
        } else {
          let message = res.data.message;
          showToastMessage(message);
          setIsOpen(false);
        }
      });
  };
  const handleComment = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("id", user._id);
    formData.append("comment", comment);
    formData.append("postId", commentPostId);
    axios
      .post(addComment, formData, {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        console.log(res, "res from cmnt");
        const newComment = res.data.comments.comment;
        dispatch(addComments({ commentPostId, comment: newComment }));
      });
  };
  useEffect(() => {
    console.log(commentPostId, "this is the real post id i mean ");
    axios.get(`${getComments}?post=${commentPostId}`).then((res) => {
      console.log(res, "yyyy");
      dispatch(setComments(res.data.comments));
    });
  }, [commentPostId]);

  return (
    <div className="m-4">
      {posts.length === 0 ? (
        <div className="">
          <img src={pic} alt="No posts" />
        </div>
      ) : (
        posts.map((post) => (
          <div className="flex flex-col mt-2" key={post.id}>
            <div class="sm:p-0 sm:m-0 ps-1 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
              <div className="flex flex-row pt-3 pe-3">
                <div className="w-1/12 me-2">
                  <img
                    class="w-16 h-16 rounded-full shadow-lg"
                    src={post.user.image ? post.user.image : image}
                    alt="Bonnie image"
                  />
                </div>
                <ToastContainer />
                <div class="flex justify-between w-11/12">
                  <div class="flex-grow pt-3">
                    <div className="text-base">{post.user.userName}</div>
                    <div className="text-sm">
                      {moment(post.createdAt).fromNow()}
                    </div>
                  </div>
                  {post.user._id != user._id && (
                    <div className="pt-3">
                      <div class="relative">
                        <button
                          class="flex items-center focus:outline-none"
                          onClick={() => setIsOpen(!isOpen)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                            />
                          </svg>
                        </button>

                        {isOpen && (
                          <div class="absolute z-10 mt-2 py-2 w-28  end-5 bg-white rounded-md shadow-lg">
                            <a
                              href="#"
                              class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              onClick={(e) => {
                                handleUnFollow(e, post.user._id);
                              }}
                            >
                              Unfollow
                            </a>

                            <a
                              href="#"
                              className="block
                          px-4
                          py-2
                          text-sm
                          text-gray-700
                          hover:bg-gray-100"
                              onClick={() => {
                                setOpen(true);
                                setPostId(post._id);
                              }}
                            >
                              Report
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div class="sm:p-0 sm:m-0 mt-3 bg-white border border-gray-200 shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                <img
                  src={post.image}
                  alt="Example Image"
                  class="h-full w-full object-cover"
                />
              </div>
              <p class="text-sm mt-2 text-gray-400 dark:text-gray-500">
                <div class="grid grid-cols-2 gap-5">
                  <div class="flex items-start justify-start h-10">
                    <div className="ps-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill={
                          post.likes?.some((like) =>
                            like.user.some((user) => user._id === user._id)
                          )
                            ? "red"
                            : "white"
                        }
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-8 h-8"
                        onClick={(e) => {
                          const likedByLoggedInUser = post.likes?.some((like) =>
                            like.user.some((user) => user._id === user._id)
                          );

                          if (likedByLoggedInUser) {
                            unlikePost(post._id, e);
                          } else {
                            likePosts(post._id, e);
                          }
                        }}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                        />
                      </svg>
                    </div>
                    <div
                      className="ps-3"
                      onClick={() => {
                        console.log(post._id, "yoo post id here");
                        handleCommentModal(post._id);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-8 h-8"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.068.157 2.148.279 3.238.364.466.037.893.281 1.153.671L12 21l2.652-3.978c.26-.39.687-.634 1.153-.67 1.09-.086 2.17-.208 3.238-.365 1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
                        />
                      </svg>
                    </div>
                    <div className="ps-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-8 h-8"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z"
                        />
                      </svg>
                    </div>
                  </div>

                  <div class="flex items-center justify-end pe-4 h-10 rounded">
                    <div>
                      {saved.includes(post._id) ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-6 h-6"
                          onClick={(e) => {
                            unsave(post._id, e);
                          }}
                        >
                          <path
                            fillRule="evenodd"
                            d="M6.32 2.577a49.255 49.255 0 0111.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 01-1.085.67L12 18.089l-7.165 3.583A.75.75 0 013.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-8 h-8"
                          onClick={(e) => {
                            save(post._id, e);
                          }}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
                          />
                        </svg>
                      )}
                    </div>
                  </div>
                </div>
                <Transition.Root show={open} as={Fragment}>
                  <Dialog
                    as="div"
                    className="relative z-10"
                    initialFocus={cancelButtonRef}
                    onClose={setOpen}
                  >
                    <Transition.Child
                      as={Fragment}
                      enter="ease-out duration-300"
                      enterFrom="opacity-0"
                      enterTo="opacity-100"
                      leave="ease-in duration-200"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    <div className="fixed inset-0 z-10 overflow-y-auto">
                      <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child
                          as={Fragment}
                          enter="ease-out duration-300"
                          enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                          enterTo="opacity-100 translate-y-0 sm:scale-100"
                          leave="ease-in duration-200"
                          leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                          leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                          <form action="" onSubmit={reportPosts}>
                            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                              <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                <div className="flex">
                                  <div class="grid space-y-3">
                                    {reasons.map((reason, index) => (
                                      <div
                                        class="relative flex items-center"
                                        key={index}
                                      >
                                        <div class="flex items-center h-5 mt-1">
                                          <input
                                            id="hs-radio-delete"
                                            name="radio"
                                            type="radio"
                                            value={reason}
                                            onChange={(e) =>
                                              setSelectedReason(e.target.value)
                                            }
                                            class="border-gray-200 rounded-full text-white focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                                            aria-describedby="hs-radio-delete-description"
                                          />
                                        </div>
                                        <label
                                          htmlFor="hs-radio-delete"
                                          class="ml-3 mt-1"
                                        >
                                          <span
                                            id="hs-radio-delete-description"
                                            class="block text-sm text-dark dark:text-gray-500"
                                          >
                                            {reason}
                                          </span>
                                        </label>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                <button
                                  type="submit"
                                  className="mt-3 inline-flex w-full justify-center rounded-md bg-red-400 px-3 ms-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                  onClick={() => setOpen(false)}
                                >
                                  Report
                                </button>
                                <button
                                  type="button"
                                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                  onClick={() => setOpen(false)}
                                  ref={cancelButtonRef}
                                >
                                  Cancel
                                </button>
                              </div>
                            </Dialog.Panel>
                          </form>
                        </Transition.Child>
                      </div>
                    </div>
                  </Dialog>
                </Transition.Root>
                <Transition.Root show={modalVisible} as={Fragment}>
                  <Dialog
                    as="div"
                    className="fixed inset-0 z-50 overflow-y-auto"
                    onClose={() => setModalVisible(false)}
                  >
                    <div className="flex items-center justify-center min-h-screen">
                      <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                      </Transition.Child>

                      <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                      >
                        <form
                          action=""
                          className="w-full flex justify-center"
                          onSubmit={handleComment}
                        >
                          <div>
                            <div className="w-[500px] h-full rounded-xl border border-gray-200 bg-white py-4 px-2 shadow-md shadow-gray-100">
                              <div className="flex items-center justify-between px-2 text-base font-medium text-gray-700">
                                <div>Add Block</div>
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-black">
                                  <svg
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2.5"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                    onClick={toggleModal}
                                  >
                                    <path
                                      d="M6 18L18 6M6 6l12 12"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    ></path>
                                  </svg>
                                </div>
                              </div>

                              <div className="mt-4">
                                {comments.length === 0 ? (
                                  <p className="text-gray-500">
                                    No comments yet.
                                  </p>
                                ) : (
                                  <div className="flex max-h-[100px] w-full flex-col overflow-y-scroll">
                                    {comments.map((comment) => (
                                      <div
                                        key={comment._id}
                                        className="group flex items-center gap-x-5 rounded-md px-2.5 py-2 transition-all duration-75 hover:bg-green-100"
                                      >
                                        <div className="flex h-12 w-12 items-center rounded-lg  text-black group-hover:bg-green-200">
                                          <img
                                            src={
                                              comment.user?.image
                                                ? comment.user.image
                                                : img
                                            }
                                            alt='imag'
                                            className="w-full h-full rounded-full"
                                          />
                                        </div>

                                        <div className="flex flex-col items-start justify-between font-light text-gray-600">
                                          <p className="text-[15px]">
                                            {comment.comment}
                                          </p>
                                          <span className="text-xs font-light text-gray-400">
                                            {moment(
                                              comment.createdAt
                                            ).fromNow()}
                                          </span>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>

                              <div className="flex w-full px-2 py-4 ">
                                <textarea
                                  placeholder="Add your comment..."
                                  name="comment"
                                  className="justify-start p-2 focus:outline-1 focus:outline-blue-500 font-bold border-[0.1px] resize-none border-[#9EA5B1] rounded-md w-[350px]"
                                  onChange={(e) => {
                                    setPostId(post._id);
                                    setComment(e.target.value);
                                  }}
                                ></textarea>
                                <input type="text" value={post._id} hidden />
                                <div className="flex justify-end flex-1 mr-3">
                                  <button
                                    className="text-sm font-semibold  text-black rounded"
                                    type="submit"
                                  >
                                    Post
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </form>
                      </Transition.Child>
                    </div>
                  </Dialog>
                </Transition.Root>

                <div className="ms-1 p-2">
                  {post.user.userName}
                  <span className="ps-3">{post.caption}</span>
                </div>
              </p>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Post;
