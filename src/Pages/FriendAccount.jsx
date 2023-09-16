import React from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "../utils/axios";
import { verifyToken } from "../utils/constants";
import { useNavigate } from "react-router-dom";
import FriendDetails from "../components/FollowerDetails/FriendDetails";
import Nav from "../components/Nav/Nav";
import SideView from "../components/Home/SideView/SideView";
import Suggestion from "../components/Home/Suggestion/Suggestion";
import FriendPosts from "../components/Account/FollowerPosts/FriendrPosts";

function FriendAccount() {
  const [response, setResponse] = useState(null);
  const Token = localStorage.getItem("token");
  const navigate = useNavigate();
  useEffect(() => {
    if (Token) {
      axios
        .post(verifyToken, JSON.stringify({ Token }), {
          headers: { "Content-Type": "application/json" },
        })
        .then((res) => {
          console.log(res, "resss--------");
          setResponse(res.data.user);
        });
    } else {
      navigate("/login");
    }
  }, []);
  return (
    <div>
      <div className="overflow-x-hidden">
        <div className="w-screen">
          <Nav />
        </div>
        <div className="h-full flex flex-row">
          <div className="hidden md:block flex-shrink-0">
            <SideView response={response} />
          </div>
          <div
            className="flex-grow m-4  bg-white shadow-lg rounded-2xl w-full dark:bg-gray-800"
            style={{ maxHeight: "calc(100vh)" }}
          >
            <FriendDetails />
            <FriendPosts />
          </div>

          <div
            className="hidden md:block flex-shrink-0 overflow-auto"
            style={{ height: "100vh" }}
          >
            <Suggestion />
          </div>
        </div>
      </div>
    </div>
  );
}

export default FriendAccount;
