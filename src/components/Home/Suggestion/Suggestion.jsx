import React, { useState, useEffect } from "react";
import axios from "../../../utils/axios";
import { userFollow, usersData } from "../../../utils/constants";
import { useNavigate } from "react-router-dom";
function Suggestion() {
    const navigate=useNavigate()
  const [users, setUsers] = useState([]);
  const Token = localStorage.getItem("token");
  useEffect(() => {
    axios.get(`${usersData}?token=${Token}`).then((res) => {
      console.log(res, "-----------res data");
      setUsers(res.data.filteredUsers);
    });
  }, []);
  const handleFollow = (id, e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("token", Token);
    formData.append("id", id);
    axios
      .post(userFollow, formData, {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        const updatedUsers = users.map((user) =>
        user._id === id ? { ...user, isFollowed: !user.isFollowed } : user
      );
      setUsers(updatedUsers);
      localStorage.setItem("followState", JSON.stringify(updatedUsers));
      });
  };
  useEffect(() => {
    const followState = localStorage.getItem("followState");
    if (followState) {
      setUsers(JSON.parse(followState));
    }
  }, [setUsers]);

  const handleSuggestion =(userId)=>{
    navigate(`/friendAccount/${userId}`)
  }
  console.log(users,'--------------usersss')
  return (
    <div>
      <ul class="flex flex-col m-4">
        {users.map((user) => (
          <li key={user.id} class="flex flex-shrink-0 mb-2  border-gray-400">
            <div class="transition duration-500 shadow ease-in-out transform hover:-translate-y-1 hover:shadow-lg select-none cursor-pointer bg-white dark:bg-gray-800 rounded-md flex flex-1 items-center p-4">
              <div class="flex flex-col items-center justify-center w-10 h-10 mr-4">
                <a onClick={() => handleSuggestion(user._id)} class="relative block">
                  <img
                    alt="profil"
                    src={
                      user.image
                        ? user.image
                        : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                    }
                    
                    class="mx-auto object-cover rounded-full h-10 w-10 "
                  />
                </a>
              </div>
              <div class="flex-1 pl-1 md:mr-16">
                <div class="font-medium dark:text-black">{user.userName}</div>
              </div>

              <button
                class="flex justify-end w-24 text-right"
                onClick={(e) => handleFollow(user._id, e)}
              >
                {user.isFollowed ? "Unfollow" : "Follow"}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Suggestion;
