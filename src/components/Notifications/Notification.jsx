import React from "react";

function Notification() {
  return (
    <div>
      <div class=" p-4 m-4 bg-white shadow-lg rounded-2xl dark:bg-gray-700">
        <div class="flex items-center justify-between w-full mb-6">
          <p class="text-xl font-medium text-gray-800 d">Calendar</p>
          <button class="flex items-center text-gray-800 border-0 hover:text-black dark:hover:text-white focus:outline-none">
            <svg
              width="20"
              height="20"
              fill="currentColor"
              viewBox="0 0 1792 1792"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M1600 736v192q0 40-28 68t-68 28h-416v416q0 40-28 68t-68 28h-192q-40 0-68-28t-28-68v-416h-416q-40 0-68-28t-28-68v-192q0-40 28-68t68-28h416v-416q0-40 28-68t68-28h192q40 0 68 28t28 68v416h416q40 0 68 28t28 68z"></path>
            </svg>
          </button>
        </div>
        <ul>
          <li class="flex items-center my-6 space-x-2">
            <a href="#" class="relative block">
              <img
                alt="profil"
                src="/images/person/1.jpg"
                class="mx-auto object-cover rounded-full h-10 w-10 "
              />
            </a>
            <div class="flex flex-col">
              <span class="ml-2 text-sm font-semibold text-gray-900 dark:text-white">
                Charlie Rabiller
              </span>
              <span class="ml-2 text-sm text-gray-400 dark:text-gray-300">
                Hey John ! Do you read the NextJS doc ?
              </span>
            </div>
          </li>
          <li class="flex items-center my-6 space-x-2">
            <a href="#" class="relative block">
              <img
                alt="profil"
                src="/images/person/5.jpg"
                class="mx-auto object-cover rounded-full h-10 w-10 "
              />
            </a>
            <div class="flex flex-col">
              <span class="ml-2 text-sm font-semibold text-gray-900 dark:text-white">
                Marie Lou
              </span>
              <span class="ml-2 text-sm text-gray-400 dark:text-gray-300">
                No I think the dog is better...
              </span>
            </div>
          </li>
          <li class="flex items-center my-6 space-x-2">
            <a href="#" class="relative block">
              <img
                alt="profil"
                src="/images/person/6.jpg"
                class="mx-auto object-cover rounded-full h-10 w-10 "
              />
            </a>
            <div class="flex flex-col">
              <span class="ml-2 text-sm font-semibold text-gray-900 dark:text-white">
                Ivan Buck
              </span>
              <span class="ml-2 text-sm text-gray-400 dark:text-gray-300">
                Seriously ? haha Bob is not a child !
              </span>
            </div>
          </li>
          <li class="flex items-center my-6 space-x-2">
            <a href="#" class="relative block">
              <img
                alt="profil"
                src="/images/person/7.jpg"
                class="mx-auto object-cover rounded-full h-10 w-10 "
              />
            </a>
            <div class="flex flex-col">
              <span class="ml-2 text-sm font-semibold text-gray-900 dark:text-white">
                Marina Farga
              </span>
              <span class="ml-2 text-sm text-gray-400 dark:text-gray-300">
                Do you need that design ?
              </span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Notification;
