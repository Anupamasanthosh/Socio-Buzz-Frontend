import React from "react";
import axios from "../utils/axios";
import { useEffect,useRef } from "react";
import { baseUrl, verifyToken } from "../utils/constants";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usersData } from "../utils/constants";
import Contacts from "../components/Chat/Contacts/Contacts";
import ChatBox from "../components/Chat/ChatBox/ChatBox";
import Welcome from "../components/Chat/Welcome/Welcome";
import ChatHeader from "../components/Chat/ChatBox/ChatHeader";
import {io} from 'socket.io-client'


function Chat() {
  const socket=useRef()
  const [currentUser, setCurrentUser] = useState("");
  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState();
  const [isLoaded,setIsLoaded]=useState(false)
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
          setCurrentUser(res.data.user);
          setIsLoaded(true)
        });
    } else {
      navigate("/login");
    }
  }, []);
  useEffect(() => {
    if (currentUser) {
      console.log("hoi");
      axios
        .get(`${usersData}?token=${Token}`)
        .then((res) => {
          console.log(res, "and this us it");
          setContacts(res.data.filteredUsers);
        })
        .catch((err) => {
          console.log(err, "errpr hei bha");
        });
    }
  }, [currentUser]);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };
  useEffect(()=>
  {
    if(currentUser)
    {
      socket.current=io(baseUrl)
      socket.current.emit("add-user",currentUser._id)
    }
  },[currentUser])
  console.log(contacts, "contacts array");
  console.log(currentChat, "currentChat");
  return (
    <>
      <div className="flex h-screen">
        <div className="flex h-screen antialiased text-gray-800">
          <div className="flex flex-row h-full w-screen overflow-x-hidden">
            <div>
              {contacts.length > 0 && (
                <Contacts
                  allcontacts={contacts}
                  currentUser={currentUser}
                  changeChat={handleChatChange}
                />
              )}
            </div>
            <div className="flex flex-col flex-auto w-full h-[650px] p-6">
              {currentChat&&isLoaded  ? (
                <>
                <ChatHeader User={currentChat} />
                <ChatBox currentChat={currentChat} currentUser={currentUser} socket={socket}/>
                </>
              ) : (
                <Welcome currentUser={currentUser} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Chat;
