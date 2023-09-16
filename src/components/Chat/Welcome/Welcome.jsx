import React from "react";
import { useState } from "react";

function Welcome({currentUser}) {
    const [user,setUser]=useState(currentUser)
  return (
    <div class="flex flex-col flex-auto flex-shrink-0 rounded-2xl h-full p-4 items-center justify-center">
    <div class="p-5 rounded  w-auto">
      <div class="h-full p-3 flex flex-col items-center justify-center ">
        <img src="https://media3.giphy.com/media/bcKmIWkUMCjVm/giphy.gif?cid=ecf05e47o9hngcw598qu54oa2krwvazku6bvqcouej46wm1k&ep=v1_gifs_related&rid=giphy.gif&ct=g" alt="" class="mx-auto" />
        <div class="mt-4 text-center">
          <p class="text-lg font-semibold">Welcome</p>
          <p class="text-sm">Click on a chat to start the conversation</p>
        </div>
      </div>
    </div>
  </div>
  
  );
}

export default Welcome;
