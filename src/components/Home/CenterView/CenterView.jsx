import React from "react";
import PostCreation from "../PostCreation/PostCreation";
import Post from "../Post/Post";
function CenterView() {
  return (
    <>
    <div className="w-full">
        <div className="sm:p-1">
        <PostCreation />
        </div>
        <div className="sm:p-1">
        <Post />
        </div>
      </div>
    </>
  );
}

export default CenterView;
