import React, { useEffect, useState } from "react";
import "rsuite/dist/rsuite.min.css";
import { useSelector } from "react-redux";
import { Navbar, Nav } from "rsuite";
import AdminIcon from "@rsuite/icons/Admin";
import CogIcon from "@rsuite/icons/legacy/Cog";
import "./nav.css";
import { useNavigate } from "react-router-dom";
import { change } from "../../Redux/userNameReducer";
import { useDispatch } from "react-redux";

import axios from "../../utils/axios";
import { verifyToken } from "../..//utils/constants";
import { changeImage } from "../../Redux/userImageReducer";

export default function NavbarTemplate() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [sidenav,setSidenav]=useState(false)
  const Token = localStorage.getItem("token");
  console.log(Token);
  useEffect(() => {
    if (Token) {
      axios
        .post(verifyToken, JSON.stringify({ Token }), {
          headers: { "Content-Type": "application/json" },
        })
        .then((res) => {
          dispatch(change(res.data.user.userName));
          dispatch(changeImage(res.data.user.image));
        })
        .catch((err) => {});
    }
  }, []);
  const username = useSelector((state) => state.username);
  return (
    <>
      <Navbar className="mainNav pt-4  pb-4 w-screen l z-50">
        <Navbar.Brand>
          <h2
            className=""
            data-te-sidenav-toggle-ref
            data-te-target="#sidenav-1"
            aria-controls="#sidenav-1"
            aria-haspopup="true"
            onClick={()=>
            {
              setSidenav(true)
            }}
          >
        Social Bee
          </h2>
        </Navbar.Brand>
        <Nav pullRight className="me-5">
          <Nav.Menu title={username}>
            <Nav.Item
              icon={<AdminIcon />}
              onClick={() => {
                navigate("/account");
              }}
            >
              Account
            </Nav.Item>
            <Nav.Item
              icon={<CogIcon />}
              onClick={() => {
                localStorage.clear();
                dispatch({ type: "logout" });
                navigate("/login");
              }}
            >
              Logout
            </Nav.Item>
          </Nav.Menu>
        </Nav>
      </Navbar>
      {sidenav&&(<div
      id="sidebar"
      className={`bg-white overflow-x-hidden shadow-xl px-3 w-30 transition-transform duration-300 ease-in-out absolute left-0 top-0 z-[1035] h-full w-60 -translate-x-full overflow-hidden data-[te-sidenav-hidden='false']:translate-x-0 dark:bg-zinc-800 ${
        sidenav ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="space-y-6 md:space-y-10 mt-10">
        <div id="profile" className="space-y-3">
          <img
            src=''
            alt="Avatar user"
            className="w-10 md:w-16 rounded-full mx-auto"
          />
          <div>
            <h2 className="font-medium text-xs md:text-sm text-center text-teal-500">
              {username}
            </h2>
            <p className="text-xs text-gray-400 text-center"> 
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
        <div id="menu" className="space-y-1" >
          <a
            className="flex items-center space-x-4 p-2 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-teal-500 transition duration-150 ease-in-out"
            onClick={()=>
              {
                setSidenav(false)
              }}>
            <svg
              className="w-5 h-5 fill-current"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4 4a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zm0 6a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zm0 6a1 1 0 011-1h5a1 1 0 110 2H5a1 1 0 01-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span className="text-sm">Home</span>
          </a>
          <a
            href="/search"
            className="flex items-center space-x-4 p-2 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-teal-500 transition duration-150 ease-in-out"
          >
            <svg
              className="w-5 h-5 fill-current"
              fill="currentColor"
              viewBox="0 0 19.9 19.7"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M18.5 18.3l-5.4-5.4"
                clipRule="evenodd"
              ></path>
            </svg>
            <span className="text-sm">Search</span>
          </a>
          <a
            href="/messages"
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
                d="M10 2a8 8 0 100 16 8 8 0 000-16zM3.773 6.614a6.07 6.07 0 00-1.92 4.315c0 3.363 2.708 6.07 6.07 6.07 1.525 0 2.908-.562 3.97-1.484l.045-.037a.608.608 0 01.829.036l.145.13 1.636 1.636.048.048A7.905 7.905 0 0110 18a7.996 7.996 0 01-7.959-7.18A6.06 6.06 0 003.773 6.614zM10 4a6.05 6.05 0 00-4.315 1.785A7.956 7.956 0 013.62 6.06 6.03 6.03 0 0010 8c1.62 0 3.08-.62 4.2-1.628A7.938 7.938 0 0116.378 6.06 6.05 6.05 0 0010 4zM2 10.005C2 5.589 5.586 2 10 2a7.963 7.963 0 017.12 4.42 6.016 6.016 0 00-1.57-.214c-3.363 0-6.07 2.708-6.07 6.07 0 1.024.253 2.006.738 2.872l-.011.006A6.073 6.073 0 0010 14c-1.024 0-2.006.253-2.872.738l-.006-.011A6.033 6.033 0 004.42 17.12 7.996 7.996 0 012 10.005zm13.343 1.368a4.019 4.019 0 01-.343.027c-2.22 0-4-1.79-4-4 0-.119.01-.238.028-.355A4.012 4.012 0 0110 5.995c1.968 0 3.576 1.424 3.914 3.304a3.984 3.984 0 01.43-.022c2.22 0 4 1.79 4 4 0 .119-.01.238-.028.355a4.01 4.01 0 01-3.915 3.304c-1.963 0-3.571-1.421-3.912-3.293z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span className="text-sm">Messages</span>
          </a>
          <a href="/notification" className="flex items-center space-x-4 p-2 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-teal-500 transition duration-150 ease-in-out">
            <svg
              className="w-5 h-5 fill-current"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12zm1-7h3a1 1 0 010 2h-3v3a1 1 0 01-2 0v-3H6a1 1 0 010-2h3V6a1 1 0 012 0v3z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span className="text-sm">Notifications</span>
          </a>
          <a
            href="/account"
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
            <span className="text-sm">Account</span>
          </a>
          <a
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
          </a>
        </div>
      </div>
    </div>)}
    </>
  );
}
 