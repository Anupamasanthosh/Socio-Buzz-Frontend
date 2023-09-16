import React, { useState, useEffect } from "react";

function AccountSecurity({ response }) {
  const [user, setUser] = useState({});

  useEffect(() => {
    if (response) {
      setUser(response);
    }
  }, [response]);
  return (
    <div>
      {user && user.userName ? (
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto  mt-4 w-full bg-white rounded-lg ">
            <div class="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 sm:p-8">
          <ul class="flex flex-col w-auto">
            <div>
            <h2 class="mb-1 text-xl font-bold leading-tight tracking-tight md:text-2xl text-black">
              Personal details
          </h2>
            </div>
            <li class="flex flex-row">
              <div class="flex items-center flex-1 p-1 cursor-pointer select-none">
                <div class="flex flex-col items-center justify-center w-10 h-10 mr-4">
                  <a href="#" class="relative block">
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
                        d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                      />
                    </svg>
                  </a>
                </div>
                <div class="flex-1 pl-1 mr-16">
                  <div class="font-medium dark:text-black">{user.userName}</div>
                </div>
              </div>
            </li>
            <li class="flex flex-row">
              <div class="flex items-center flex-1 p-1 cursor-pointer select-none">
                <div class="flex flex-col items-center justify-center w-10 h-10 mr-4">
                  <a href="#" class="relative block">
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
                        d="M16.5 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 10-2.636 6.364M16.5 12V8.25"
                      />
                    </svg>
                  </a>
                </div>
                <div class="flex-1 pl-1 mr-16">
                  <div class="font-medium dark:text-black">
                    {user.userEmail}
                  </div>
                </div>
              </div>
            </li>
            {user.phone &&
            <li class="flex flex-row">
              <div class="flex items-center flex-1 p-1 cursor-pointer select-none">
                <div class="flex flex-col items-center justify-center w-10 h-10 mr-4">
                  <a href="#" class="relative block">
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
                        d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                      />
                    </svg>
                  </a>
                </div>
                <div class="flex-1 pl-1 mr-16">
                  <div class="font-medium dark:text-black">{user.phone}</div>
                </div>
              </div>
            </li>
}
            {user.bio && <li class="flex flex-row">
              <div class="flex items-center flex-1 p-1 cursor-pointer select-none">
                <div class="flex flex-col items-center justify-center w-10 h-10 mr-4">
                  <a href="#" class="relative block">
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
                        d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"
                      />
                    </svg>
                  </a>
                </div>
                <div class="flex-1 pl-1 mr-16">
                  <div class="font-medium dark:text-black">{user.bio}</div>
                </div>
              </div>
            </li>}
            {user.gender&&<li class="flex flex-row">
              <div class="flex items-center flex-1 p-1 cursor-pointer select-none">
                <div class="flex flex-col items-center justify-center w-10 h-10 mr-4">
                  <a href="#" class="relative block">
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
                        d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                      />
                    </svg>
                  </a>
                </div>
                <div class="flex-1 pl-1 mr-16">
                  <div class="font-medium dark:text-black">{user.gender}</div>
                </div>
              </div>
            </li>}
            {user.dob &&<li class="flex flex-row">
              <div class="flex items-center flex-1 p-1 cursor-pointer select-none">
                <div class="flex flex-col items-center justify-center w-10 h-10 mr-4">
                  <a href="#" class="relative block">
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
                        d="M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.87c1.355 0 2.697.055 4.024.165C17.155 8.51 18 9.473 18 10.608v2.513m-3-4.87v-1.5m-6 1.5v-1.5m12 9.75l-1.5.75a3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0L3 16.5m15-3.38a48.474 48.474 0 00-6-.37c-2.032 0-4.034.125-6 .37m12 0c.39.049.777.102 1.163.16 1.07.16 1.837 1.094 1.837 2.175v5.17c0 .62-.504 1.124-1.125 1.124H4.125A1.125 1.125 0 013 20.625v-5.17c0-1.08.768-2.014 1.837-2.174A47.78 47.78 0 016 13.12M12.265 3.11a.375.375 0 11-.53 0L12 2.845l.265.265zm-3 0a.375.375 0 11-.53 0L9 2.845l.265.265zm6 0a.375.375 0 11-.53 0L15 2.845l.265.265z"
                      />
                    </svg>
                  </a>
                </div>
                <div class="flex-1 pl-1 mr-16">
                  <div class="font-medium dark:text-black">{user.dob}</div>
                </div>
              </div>
            </li>}
          </ul>
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default AccountSecurity;
