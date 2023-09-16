import React, { useEffect, useState } from "react";
import { following, postView, saved } from "../../../utils/constants";
import axios from "../../../utils/axios";
import moment from "moment";

function AllPost() {
  const [user,setUser]=useState({})
  const [post, setPost] = useState([]);
  const [activeMenu, setActiveMenu] = useState("Posts");
  const Token = localStorage.getItem("token");
  const [followings, setFollowing] = useState([]);
  const [follower,setFollower]=useState([])
  const [save,setSaved]=useState([])
  useEffect(() => {
    axios
      .get(`${postView}?token=${Token}`)
      .then((res) => {
        console.log(res, "res from postview");
        if (res.data.posts) {
          let data = res.data.posts;
          setPost(data);
          setUser(res.data.user)
        } else {
        }
      })
      .catch((err) => {
        console.log(err, "err from postview");
      });
  }, []);
  useEffect(() => {
    axios.get(`${following}?token=${Token}`).then((res) => {
      console.log(res, "from following");
      if (res.data.status) {
        setFollower(res.data.followerUsers)
        setFollowing(res.data.followingUsers)
      }
    }).catch((err)=>
    {
      console.log(err,'-from following')
    })
  }, []);
  useEffect(()=>
  {
    axios.get(`${saved}?user=${Token}`).then((res)=>
    {
      console.log(res,'from saved')
      if(res.status)
      {
        setSaved(res.data.saved.postId)
      }
      else
      {
        console.log('no posts to show')
      }
    }).catch((err)=>
    {
      console.log(err,'from saved')
    })
  },[activeMenu=== "Saved"])
   const handleMenuClick = (menu) => {
    setActiveMenu(menu);
  };
  console.log(save,'posts');
  return (
    <div className="m-1">
      <div class="text-sm font-medium text-center text-gray-500 border-gray-200 w-full lg:px-5 px-0">
        <ul class="flex flex-wrap justify-between -mb-px p-3">
          <li class="mr-2">
            <a
              href="#"
              class={`inline-block sm:p-2 md:p-4 lg:p-4 xl:p-4 ${
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
              class={`inline-block sm:p-2 md:p-4 lg:p-4 xl:p-4 border-b-2  ${
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
              class={`inline-block sm:p-2 md:p-4 lg:p-4 xl:p-4 border-b-2  ${
                activeMenu === "Followers"
                  ? "text-purple-600 border-b-2 border-purple-600 rounded-t-lg active"
                  : "border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300"
              }`}
              onClick={() => handleMenuClick("Followers")}
            >
              Followers
            </a>
          </li>
          <li class="mr-2">
            <a
              href="#"
              class={`inline-block sm:p-2 md:p-4 lg:p-4 xl:p-4 border-b-2  ${
                activeMenu === "Saved"
                  ? "text-purple-600 border-b-2 border-purple-600 rounded-t-lg active"
                  : "border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300"
              }`}
              onClick={() => handleMenuClick("Saved")}
            >
              Saved
            </a>
          </li>
        </ul>
      </div>

      {activeMenu === "Posts" && (
        <div
          className={`mx-auto lg:px-12 lg:overflow-y-auto  ${
            activeMenu === "Posts"
          }`}
        >
          <div className="-m-1 flex flex-wrap md:-m-2">
            {post.length > 0 ? (
              post.map((pos) => (
                <div
                  className="relative w-full sm:w-1/2 md:w-1/3 p-2 md:p-3 "
                  key={pos._id}
                  onClick={() => handleMenuClick("display")}
                >
                  <img
                    alt="gallery"
                    className="block rounded-lg object-cover object-center w-full h-full"
                    src={pos.image}
                    
                  />
                  
                </div>
              ))
            ) : (
              <div className="flex justify-center items-center h-full w-full">
                <svg
            className="w-64 h-64 text-gray-300"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0zM19 12a7 7 0 11-14 0 7 7 0 0114 0zM12 21v2M3 3l18 18M3 21L21 3"
            />
          </svg>
          <p className="mt-4 text-gray-500">No posts to show</p>
              </div>
            )}
          </div>
        </div>
      )}

{activeMenu === "Followers" && (
  <div className="flex flex-wrap -mb-px p-3">
    {follower.length > 0 ? (
      follower.map((follower) => (
        <div
          className="relative w-full p-4 m-2 overflow-hidden bg-white shadow-lg rounded-xl md:w-72 dark:bg-gray-800"
          key={follower.id}
        >
          <a href="#" className="block w-full h-full">
            <div className="flex items-center w-full">
              <a href="#" className="relative block">
                <img
                  alt="profil"
                  src={
                    follower.image
                      ? follower.image
                      : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                  }
                  className="mx-auto object-cover rounded-full h-10 w-10"
                />
              </a>
              <div className="flex flex-col items-center ml-2">
                <span className="dark:text-black">{follower.userName}</span>
                <span className="text-sm text-black dark:text-gray-300">
                  {follower.userEmail}
                </span>
              </div>
            </div>
            <div className="flex items-center justify-center my-2">
              <p className="text-sm text-gray-300">Unfollow</p>
            </div>
          </a>
        </div>
      ))
    ) : (
      <div className="flex items-center justify-center my-2 w-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4v16m8-8H4"
          />
        </svg>
        <p className="text-sm text-gray-300 ml-2">No followers</p>
      </div>
    )}
  </div>
)}


{activeMenu === "Following" && (
  <div className="flex flex-wrap -mb-px p-3">
    {followings.length > 0 ? (
      followings.map((follower) => (
        <div
          className="relative w-full p-4 m-2 overflow-hidden bg-white shadow-lg rounded-xl md:w-72 dark:bg-gray-800"
          key={follower.id}
        >
              <a href="#" class="block w-full h-full">
                <div class="flex items-center w-full">
                  <a href="#" class="relative block">
                    <img
                      alt="profil"
                      src={
                        follower.image
                          ? follower.image
                          : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                      }
                      class="mx-auto object-cover rounded-full h-10 w-10 "
                    />
                  </a>
                  <div class="flex flex-col items-center ml-2">
                    <span class="dark:text-black">{follower.userName}</span>
                    <span class="text-sm text-black dark:text-gray-300">
                      {follower.userEmail}
                    </span>
                  </div>
                </div>
                <div class="flex items-center justify-center my-2">
                  <p class="text-sm text-gray-300">
                    Unfollow
                  </p>
                </div>
                
              </a>
            </div>
           ))
           ) : (
             <div className="flex items-center justify-center my-2 w-full">
               <svg
                 xmlns="http://www.w3.org/2000/svg"
                 className="h-6 w-6"
                 fill="none"
                 viewBox="0 0 24 24"
                 stroke="currentColor"
               >
                 <path
                   strokeLinecap="round"
                   strokeLinejoin="round"
                   strokeWidth={2}
                   d="M12 4v16m8-8H4"
                 />
               </svg>
               <p className="text-sm text-gray-300 ml-2">No followings</p>
             </div>
           )}
        </div>
      )}

      {activeMenu === "display" && (
        <div className="flex flex-wrap justify-between p-3">
          {post.length > 0 ? (
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
      {activeMenu === "Saved" && (
        <div
          className={`mx-auto lg:px-12 lg:overflow-y-auto  ${
            activeMenu === "Saved"
          }`}
        >
          <div className="flex flex-wrap justify-between p-3">
          {save.length > 0 ? (
            save.map((pos) => (
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
                                src={pos.user.image}
                                class="mx-auto object-cover rounded-full h-full w-[60px] "
                              />
                            </a>
                            <div class="flex flex-col flex-shrink-0 items-center ml-2">
                              <span class="dark:text-black">
                              {pos.user.userName}
                              </span>
                              <span class="text-sm text-gray-400 dark:text-gray-300">
                                {moment(pos.createdAt).fromNow()}
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
        </div>
      )}
    </div>
  );
}

export default AllPost;
