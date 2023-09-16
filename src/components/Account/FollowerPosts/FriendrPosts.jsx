import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../../utils/axios";
import { followingDetails } from "../../../utils/constants";
import moment from "moment";

function FriendPosts() {
  const [post, setPost] = useState([]);
  const [following, setFollowing] = useState([]);
  const [follower, setFollower] = useState([]);
  const [user, setUser] = useState({});
  const [activeMenu, setActiveMenu] = useState("Posts"); // Track the active menu item

  const { id } = useParams();
  useEffect(() => {
    axios
      .get(`${followingDetails}?id=${id}`)
      .then((res) => {
        console.log(res, "------------------");
        setPost(res.data.Posts);
        setFollowing(res.data.followingUsers);
        setFollower(res.data.followUsers);
        setUser(res.data.user);
      })
      .catch((error) => {
        console.log(error, "eroor");
      });
  }, []);

  const handleMenuClick = (menu) => {
    setActiveMenu(menu);
  };

  return (
    <div>
      <div class="text-sm font-medium text-center text-gray-500 border-gray-200 w-full lg:px-5 px-0">
        <ul class="flex flex-wrap justify-between -mb-px p-3">
          <li class="mr-2">
            <a
              href="#"
              class={`inline-block p-4  ${
                activeMenu === "Posts"
                  ? "text-purple-600 border-b-2 border-purple-600 rounded-t-lg active"
                  : "border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300"
              }`}
              onClick={() => handleMenuClick("Posts")}
            >
              Posts
            </a>
          </li>
          <li class="mr-2">
            <a
              href="#"
              class={`inline-block p-4 border-b-2  ${
                activeMenu === "Following"
                  ? "text-purple-600 border-b-2 border-purple-600 rounded-t-lg active"
                  : "border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300"
              }`}
              onClick={() => handleMenuClick("Following")}
            >
              Following
            </a>
          </li>
          <li class="mr-2">
            <a
              href="#"
              class={`inline-block p-4 border-b-2  ${
                activeMenu === "Followers"
                  ? "text-purple-600 border-b-2 border-purple-600 rounded-t-lg active"
                  : "border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300"
              }`}
              onClick={() => handleMenuClick("Followers")}
            >
              Followers
            </a>
          </li>
        </ul>
      </div>

      {activeMenu === "Posts" && (
        <div
          className={`mx-auto lg:px-12   ${
            activeMenu === "display"
          }`}
        >
          <div className="-m-1 flex flex-wrap md:-m-2">
            {post && post.length > 0 ? (
              post.map((pos) => (
                <div
                  className="relative w-full sm:w-1/2 md:w-1/3 p-2 md:p-3 "
                  key={pos._id}
                >
                  <img
                    alt="gallery"
                    className="block rounded-lg object-cover object-center w-full h-full"
                    src={pos.image}
                    onClick={() => handleMenuClick("display")}
                  />
                  <div class="absolute bottom-0 w-full p-4">
                    <p class="text-2xl text-blacknb-4">{pos.caption}</p>
                    <div class="flex justify-between">
                      <p class="flex items-center text-sm text-gray-300">
                        {moment(post.createdAt).fromNow()}
                      </p>
                      <p class="flex items-center text-sm text-gray-300">
                        <svg
                          width="10"
                          height="10"
                          fill="currentColor"
                          class="w-4 h-4"
                          viewBox="0 0 1792 1792"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M491 1536l91-91-235-235-91 91v107h128v128h107zm523-928q0-22-22-22-10 0-17 7l-542 542q-7 7-7 17 0 22 22 22 10 0 17-7l542-542q7-7 7-17zm-54-192l416 416-832 832h-416v-416zm683 96q0 53-37 90l-166 166-416-416 166-165q36-38 90-38 53 0 91 38l235 234q37 39 37 91z"></path>
                        </svg>
                        Nantes
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex items-center justify-center w-full h-full">
                <div>No posts to show</div>
              </div>
            )}
          </div>
        </div>
      )}

      {activeMenu === "Followers" && (
        <div className="flex flex-wrap  -mb-px p-3">
        {follower && follower.length > 0 ? (
          follower.map((follow) => (
            <div
              class="relative w-full p-4 m-2 overflow-hidden bg-white shadow-lg rounded-xl md:w-72 dark:bg-gray-800"
              key={follow.id}
            >
              <a href="#" class="block w-full h-full">
                <div class="flex items-center w-full">
                  <a href="#" class="relative block">
                    <img
                      alt="profil"
                      src={
                        follow.image
                          ? follow.image
                          : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                      }
                      class="mx-auto object-cover rounded-full h-10 w-10 "
                    />
                  </a>
                  <div class="flex flex-col items-center ml-2">
                    <span class="dark:text-black">{follow.userName}</span>
                    <span class="text-sm text-black dark:text-gray-300">
                      {follow.userEmail}
                    </span>
                  </div>
                </div>
                <div class="flex items-center justify-center my-2">
                  <p class="text-sm text-gray-300">Unfollow</p>
                </div>
              </a>
            </div>
          ))
        ) : (
          <div className="flex justify-center w-full">
            <div>No follower</div>
          </div>
        )}
      </div>
      )}

      {activeMenu === "Following" && (
        <div className="flex flex-wrap  -mb-px p-3">
          {following && following.length > 0 ? (
            following.map((following) => (
              <div
                class="relative w-full p-4 m-2 overflow-hidden bg-white shadow-lg rounded-xl md:w-72 dark:bg-gray-800"
                key={following.id}
              >
                <a href="#" class="block w-full h-full">
                  <div class="flex items-center w-full">
                    <a href="#" class="relative block">
                      <img
                        alt="profil"
                        src={
                          following.image
                            ? following.image
                            : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                        }
                        class="mx-auto object-cover rounded-full h-10 w-10 "
                      />
                    </a>
                    <div class="flex flex-col items-center ml-2">
                      <span class="dark:text-black">{following.userName}</span>
                      <span class="text-sm text-black dark:text-gray-300">
                        {following.userEmail}
                      </span>
                    </div>
                  </div>
                  <div class="flex items-center justify-center my-2">
                    <p class="text-sm text-gray-300">Unfollow</p>
                  </div>
                </a>
              </div>
            ))
          ) : (
            <div className="flex justify-center w-full">
              <div>No follower</div>
            </div>
          )}
        </div>
      )}

      {activeMenu === "display" && (
        <div className="flex flex-wrap justify-between p-3">
          {post&& post.length > 0 ? (
            post.map((pos) => (
              <div
                key={pos._id}
                className="mx-auto rounded shadow-lg w-full mb-3"
              >
                <div className="p-3 h-">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="...">
                      <div class="relative w-full overflow-hidden rounded-xl md:w-72">
                        <a href="#" class="block w-full h-full">
                          <div class="flex flex-shrink-0 items-center w-full">
                            <a href="#" class="relative block">
                              <img
                                alt="profil"
                                src={user.image}
                                class="mx-auto object-cover rounded-full h-full w-[60px] "
                              />
                            </a>
                            <div class="flex flex-col flex-shrink-0 items-center ml-2">
                              <span class="dark:text-black">
                                {user.userName}
                              </span>
                              <span class="text-sm text-gray-400 dark:text-gray-300">
                                {moment(post.createdAt).fromNow()}
                              </span>
                            </div>
                          </div>
                        </a>
                      </div>
                    </div>
                    <div className="col-span-2 flex justify-end mt-3 p-2">
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
                    </div>
                  </div>
                </div>
                <div className="ps-3 pe-3 overflow-hidden">
                  <img
                    src={pos.image}
                    alt=""
                    className="object-fill h-[400px] w-full"
                  />
                </div>
                <div className="p-3 h-">
                  <div className="grid grid-cols-3 gap-4 mt-2">
                    <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-8 col-span-2 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
                    <div className="..."></div>
                    <div className="col-span-2 ..."></div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="flex items-center justify-center w-full h-48">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1-3a6 6 0 110-12 6 6 0 010 12zm0-9a3 3 0 100-6 3 3 0 000 6z"
                  clipRule="evenodd"
                />
              </svg>
              <div className="ml-2">No posts to show</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default FriendPosts;
