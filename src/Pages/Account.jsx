import React from "react";
import { useState } from "react";
import axios from "../utils/axios";
import Nav from "../components/Nav/Nav.jsx";
import SideView from "../components/Home/SideView/SideView";
import Suggestion from "../components/Home/Suggestion/Suggestion";
import AccountSide from "../components/Account/AccountSide/AccountSide";
import AccountSaved from "../components/Account/AccountSaved/AccountSaved";
import AccountSecurity from "../components/Account/AccountSecurity/AccountSecurity";
import ProfilePic from "../components/Account/ProfilePic/ProfilePic";
import AllPost from "../components/Account/AllPost/AllPost";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { verifyToken } from "../utils/constants.js";
function Account() {
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
          console.log(res, "resss from account itself");
          setResponse(res.data.user);
        });
    } else {
      navigate("/login");
    }
  }, []);
  return (
    <div className="overflow-x-hidden">
      <div className="w-screen">
        <Nav />
      </div>

      <div className="h-full flex flex-row">
        <div className="hidden md:block flex-shrink-0">
          <SideView response={response} />
        </div>
        <div className="flex-grow overflow-auto mb-5" style={{ height: "100vh" }}>
          <div className="w-full p-4">
            <ProfilePic />
          </div>
          <div className="w-full">
            <AccountSide />
          </div>
          <div className="w-full">
            <AllPost />
          </div>
        </div>
        <div
          className="hidden lg:block xl:block flex-shrink-0 overflow-auto"
          style={{ height: "100vh" }}
        >
          <AccountSecurity response={response} />
        </div>
      </div>
    </div>
  );
}

export default Account;
