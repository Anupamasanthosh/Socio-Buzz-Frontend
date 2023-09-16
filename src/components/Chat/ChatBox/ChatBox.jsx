import React from "react";
import { useState } from "react";
import ChatInput from "./ChatInput";
import axios from "../../../utils/axios";
import { getAllMsg, sendMsg } from "../../../utils/constants";
import { useEffect } from "react";
import {v4 as uuid4} from 'uuid'
import { useRef } from "react";

function ChatBox({ currentChat, currentUser, socket }) {
  const [message, setMessage] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const scrollRef = useRef();

  const handleSendMsg = (msg) => {
    const formData = new FormData();
    formData.append("from", currentUser._id);
    formData.append("to", currentChat._id);
    formData.append("message", msg);
    axios.post(sendMsg, formData, {
      headers: { "Content-Type": "application/json" },
    });
    socket.current.emit("send-msg", {
      to: currentChat._id,
      from: currentUser._id,
      message: msg,
    });
    const msgs = [...message];
    msgs.push({ fromSelf: true, message: msg });
    setMessage(msgs);
  };
  useEffect(()=>
  {
    if (socket.current) {
        socket.current.on("msg-recieve", (msg) => {
          setArrivalMessage({ fromSelf: false, message: msg });
        });
      }
  },[])
  useEffect(() => {
    arrivalMessage && setMessage((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);
  useEffect(() => {
    // axios.get(`${followingDetails}?id=${id}`)
    axios
      .get(`${getAllMsg}?from=${currentUser._id}&to=${currentChat._id}`)
      .then((res) => {
        console.log(res, "from chat");

        setMessage(res.data);
      });
  }, [currentChat]);
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);
  console.log(message, "heheeee");
  return (
    <>
      <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 w-full h-full p-4">
        <div className="flex flex-col h-full overflow-x-auto mb-4">
          <div className="flex flex-col h-full">
            <div className="grid grid-cols-12 gap-y-2">
              {message.map((message) =>
                message.fromSelf ? (
                    <div className="col-start-6 col-end-13 p-3 rounded-lg" ref={scrollRef} key={uuid4()}>
                    <div className="flex items-center justify-start flex-row-reverse">
                      <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                        A
                      </div>
                      <div className="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl">
                        <div>{message.message}</div>
                      </div>
                    </div>
                  </div>
                ) : (
                    <div className="col-start-1 col-end-8 p-3 rounded-lg" ref={scrollRef} key={uuid4()}>
                    <div className="flex flex-row items-center">
                      <div
                        className={`message ${
                          message.fromSelf ? "sended" : "recieved"
                        }`}
                      >
                        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                          A
                        </div>
                        <div className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                          <div>{message.message}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
        <ChatInput handleSendMsg={handleSendMsg} />
      </div>
    </>
  );
}

export default ChatBox;
