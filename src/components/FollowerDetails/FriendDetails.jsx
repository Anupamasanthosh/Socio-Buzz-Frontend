import axios from "../../utils/axios";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { followingDetails } from "../../utils/constants";
import { useState } from "react";
import { useSelector } from "react-redux";


function FriendDetails() {
  const {id}=useParams()
  const [user,setUser]=useState({})
  const [posts,setPost]=useState({})
  const [following,setFollowing]=useState(0)
  const [follower,setFollower]=useState(0)

  useEffect(() => {
    axios.get(`${followingDetails}?id=${id}`)
      .then((res) => {
        console.log(res.data, '-------------res from follower details');
        setUser(res.data.user)
        setPost(res.data.Posts)
        setFollowing(res.data.followingUsers)
        setFollower(res.data.followerUsers)
      })
      .catch((error) => {
        console.log(error,'eroor');
        
      });
  }, []);
  console.log(user,'---')
  console.log(posts,'---0000')
  const userImage = useSelector((state) => state.userimage);
  const userCover=useSelector((state)=>state.usercoverimage)
  return (
    <div className="">
      <img
        alt="profil"
        src={user.coverImage?user.coverImage:userCover}
        class="w-full mb-4 rounded-t-lg h-28"
      />
      <div class="flex flex-col items-center justify-center p-4 -mt-16">
        <a href="#" class="relative block">
          <img
            alt="profil"
            src={user.image?user.image:userImage}
            class="mx-auto object-cover rounded-full h-16 w-16  border-2 border-white dark:border-gray-800"
          />
        </a>
        <p class="mt-2 text-xl font-medium text-gray-800 dark:text-black">
          {user.userName}
        </p>
        <p class="mb-4 text-xs text-gray-400">{user.userEmail}</p>
        <p class="p-2 px-4 text-xs text-white bg-pink-500 rounded-full">
          Posts
        </p>
        <div class="w-full p-2 mt-4 rounded-lg">
          <div class="flex items-center justify-between text-sm text-gray-600 dark:text-gray-200">
            <p class="flex flex-col items-center">
              Posts
              <span class="font-bold text-black dark:text-black">{posts.length}</span>
            </p>
            <p class="flex flex-col items-center">
              Followers
              <span class="font-bold text-black">{follower.length}</span>
            </p>
            <p class="flex flex-col items-center">
              Following
              <span class="font-bold text-black dark:text-black">{following.length}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
    
  );
}

export default FriendDetails;
