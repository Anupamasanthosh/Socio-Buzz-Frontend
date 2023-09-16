import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../../utils/axios";
import { verifyToken, allPost } from "../../../utils/constants";
import { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";

const Sidebar = () => {
  const [user, setUser] = useState("");
  const [open, setOpen] = useState(false);
  const [post, setPost] = useState("");

  const cancelButtonRef = useRef(null);
  useEffect(() => {
    if (Token) {
      axios
        .post(verifyToken, JSON.stringify({ Token }), {
          headers: { "Content-Type": "application/json" },
        })
        .then((res) => {
          console.log(res, "-----------------");
          setUser(res.data.user);
        })
        .catch((err) => {});

      axios.get(`${allPost}?token=${Token}`).then((res) => {
        console.log(res, "from all posts");
        if (res.data.posts) {
          const filteredPosts = res.data.posts.filter(
            (post) => post.reported !== "blocked by admin"
          );
          setPost(filteredPosts);
        }
      });
    }
  }, []);
  const [sidenav, setSidenav] = useState(true);
  const navigate = useNavigate();
  const Token = localStorage.getItem("token");
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  const toggleSidenav = () => {
    setSidenav(!sidenav);
  };

  return (
    <div
      id="sidebar"
      className={`bg-white h-screen md:block shadow-xl px-3 w-30 md:w-60 lg:w-60 overflow-x-hidden transition-transform duration-300 ease-in-out ${
        sidenav ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="space-y-6 md:space-y-10 mt-10">
        
        <div id="profile" className="space-y-3">
          <img
            src={user.image}
            alt="Avatar user"
            className="w-10 md:w-16 rounded-full mx-auto"
          />
          <div>
            <h2 className="font-medium text-xs md:text-sm text-center text-teal-500">
              {user.userName}
            </h2>
            <p className="text-xs text-gray-400 text-center">
              {user.userEmail}
            </p>
          </div>
        </div>
        <div id="search">
          <div className="flex items-center justify-center">
            <input
              type="text"
              placeholder="Search..."
              className="text-sm px-4 py-2 w-full border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <button
              type="button"
              className="ml-2 bg-teal-500 text-white rounded-full p-2 focus:outline-none focus:bg-teal-600"
            >
              <svg
                className="w-4 h-4 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path
                  className="heroicon-ui"
                  d="M14.4 15.1h-.8l-.3-.3a6.7 6.7 0 10-.8.8l.3.3v.8l4.3 4.3.8-.8zm-3.7 0a5.1 5.1 0 115.1-5.1 5.1 5.1 0 01-5.1 5.1z"
                ></path>
              </svg>
            </button>
          </div>
        </div>
        <div id="menu" className="space-y-1">
          <a
            href="/"
            className="flex items-center space-x-4 p-2 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-teal-500 transition duration-150 ease-in-out"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
</svg>

            <span className="text-sm">Home</span>
          </a>
          <a
            href="/search"
            className="flex items-center space-x-4 p-2 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-teal-500 transition duration-150 ease-in-out"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
</svg>

            <span className="text-sm">Search</span>
          </a>
          <a
            href="/messages"
            className="flex items-center space-x-4 p-2 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-teal-500 transition duration-150 ease-in-out"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
</svg>

            <span className="text-sm">Messages</span>
          </a>
          <a href="/notification" className="flex items-center space-x-4 p-2 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-teal-500 transition duration-150 ease-in-out">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0M3.124 7.5A8.969 8.969 0 015.292 3m13.416 0a8.969 8.969 0 012.168 4.5" />
</svg>


            <span className="text-sm">Notifications</span>
          </a>
          <a
            href="/account"
            className="flex items-center space-x-4 p-2 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-teal-500 transition duration-150 ease-in-out"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
</svg>

            <span className="text-sm">Account</span>
          </a>
          {/* <a
            href="/settings"
            className="flex items-center space-x-4 p-2 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-teal-500 transition duration-150 ease-in-out"
          >
            <svg
              className="w-5 h-5 fill-current"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M13 2a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0V8H8a1 1 0 110-2h3V3a1 1 0 011-1zM7 13H4a1 1 0 110-2h3V8a1 1 0 112 0v3h3a1 1 0 110 2H9v3a1 1 0 11-2 0v-3z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span className="text-sm">Settings</span>
          </a> */}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
