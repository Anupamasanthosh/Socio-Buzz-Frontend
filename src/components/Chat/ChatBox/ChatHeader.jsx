import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";

function ChatHeader({ User }) {
    
  const [user, setUser] = useState(User);
  useEffect(()=>
  {
    setUser(User)
  },[User])
  console.log(User,'from engeyooo')
  const userImage = useSelector((state) => state.userimage);
  return (
    <div>
      <div class="shadow-lg rounded-2xl bg-white dark:bg-gray-800 p-4 mb-3 flex items-center">
        <div class="flex-shrink-0">
          <a href="#" class="relative block">
            <img
              alt="profil"
              src={user.image ? user.image : userImage}
              class="mx-auto object-cover rounded-full h-16 w-16"
            />
          </a>
        </div>
        <div class="flex flex-grow justify-start items-center ml-4">
          <div class="flex flex-col">
            <span class="text-lg font-medium text-gray-600 dark:to-black">
              {user.userName}
            </span>
            <span class="text-xs text-gray-400">Online</span>
          </div>
        </div>
        {/* <div class="flex-shrink-0">
            <button
              type="button"
              class="py-2 px-4 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
            >
              Add
            </button>
          </div> */}
      </div>
    </div>
  );
}

export default ChatHeader;
