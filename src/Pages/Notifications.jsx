import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "../components/Nav/Nav";
import { useState } from "react";
import axios from "../utils/axios";
import { verifyToken } from "../utils/constants";
import SideView from "../components/Home/SideView/SideView";
import Suggestion from "../components/Home/Suggestion/Suggestion";
import  Notification  from '../components/Notifications/Notification';


function Notifications() {
  const navigate = useNavigate();
  const Token = localStorage.getItem("token");
  const [response, setResponse] = useState(null);
  console.log(Token);
  useEffect(() => {
    if (Token) {
      axios
        .post(verifyToken, JSON.stringify({ Token }), {
          headers: { "Content-Type": "application/json" },
        })
        .then((res) => {
          console.log(res,'resss--------');
          setResponse(res.data.user);
        });
    } else {
      navigate("/login");
    }
  }, []);
  return (
    <div className="overflow-x-hidden overflow-y-hidden">
      <div className="w-screen">
        <Nav />
      </div>
      <div className="h-full flex flex-row">
        <div className="hidden md:block flex-shrink-0">
          <SideView  response={response}/>
        </div>
        <div className="flex-grow overflow-auto" style={{ height: "100vh" }}>
         <Notification />
        </div>
        <div className="hidden  lg:block xl:block flex-shrink-0 overflow-auto" style={{ height: "100vh" }}>
          <Suggestion />
        </div>
      </div>
    </div>
    
  );
}

export default Notifications;
