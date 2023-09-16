import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import axios from "../../../utils/axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { postCreation, postVideoCreation } from "../../../utils/constants";
function PostCreation() {
  const [prev, setPrev] = useState(null);
  const [videoPrev,setVideoPrev]=useState(null)
  const [image, setImage] = useState(null);
  const [video,setVideo]=useState(null)
  const [caption, setCaption] = useState("");
  const imageRef = useRef();
  const videoRef=useRef()
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const img = event.target.files[0];
      console.log(img)
      setImage(img);
      setPrev(URL.createObjectURL(img));
    }
  };
  // const onVideoChange = (event) => {
  //   const file = event.target.files[0];
  //   console.log(file,'file from video')
  //   if (file) {
  //     setVideoPrev(URL.createObjectURL(file));
  //     setVideo(file);
  //   }
  // };

  const showToastMessage = () => {
    toast.success("uploaded", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };
  const showToastMessageError = (error) => {
    toast.error("Something went wrong", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };
  function handleSubmit(e) {
    const Token = localStorage.getItem("token");
    e.preventDefault();
    const formData = new FormData();
    console.log(image,'from form')
    if(image)
    {
      console.log('jiiii')
      
      formData.append("token", Token);
      formData.append("img", prev);
      formData.append("image", image);
      formData.append("caption", caption);
      formData.append("Date", Date());
      axios
      .post(postCreation,formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        console.log(res,'jiiii')
        if (res.data.status) {
          showToastMessage();
          setPrev(null);
          setCaption("");
        } else {
          showToastMessageError();
        }
      })
      .catch((err) => {
        console.log(err)
      });
    }
    // if(video)
    // {
    //   console.log('heylo from video')
    //   formData.append('video',video)
    //   formData.append('token',Token)
    //   formData.append("caption", caption);
    //   formData.append("Date", Date());
    //   axios.post(postVideoCreation,formData,{
    //     headers: { "Content-Type": "multipart/form-data" },
    //   }).then((res)=>
    //   {
    //     console.log(res,'------------')
    //   }).catch((err)=>
    //   {
    //     console.log(err,'from video creation')
    //   })
    // }
    
  }
  useEffect(()=>
  {

  },[handleSubmit])
  const userImage = useSelector((state) => state.userimage);
  return (
    <div className="flex flex-col m-4">
      <form
        className="w-auto"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <div class="sm:p-0 sm:m-0 ps-2 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 pb-3">
          <div className="flex flex-row pt-3 pe-3">
            <div className="w-1/12 me-2">
              <img
                class="w-16 h-16 rounded-full shadow-lg"
                src={userImage}
                alt="Bonnie image"
              />
            </div>
            <div className="w-11/12">
              <input
                class="w-full h-11 rounded-lg shadow-md border-gray-300 border focus:outline-none focus:border-transparent mt-2"
                type="text"
                value={caption}
                placeholder="Whats Happening?"
                onChange={(e) => {
                  setCaption(e.target.value);
                }}
              />
            </div>
          </div>
          <p class="font-normal text-gray-700 dark:text-gray-400 flex flex-row justify-between mt-3">
            <div className="w-1/4 flex flex-row">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                />
              </svg>
              <span
                className="sm:pl-2"
                onClick={() => {
                  imageRef.current.click();
                }}
              >
                Image
              </span>
            </div>
            <div className="w-1/4 flex flex-row">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path d="M4.5 4.5a3 3 0 00-3 3v9a3 3 0 003 3h8.25a3 3 0 003-3v-9a3 3 0 00-3-3H4.5zM19.94 18.75l-2.69-2.69V7.94l2.69-2.69c.944-.945 2.56-.276 2.56 1.06v11.38c0 1.336-1.616 2.005-2.56 1.06z" />
              </svg>
              <span className="sm:pl-2"
              onClick={() => {
                videoRef.current.click();
              }}>Video</span>
            </div>
            <div className="w-1/4 flex flex-row">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path
                  fillRule="evenodd"
                  d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="sm:pl-2">Location</span>
            </div>
            {image && (
              <div className="w-1/4 sm:ps-2">
                <button
                  type="submit"
                  class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-green-300 rounded-lg hover:bg-green-400 focus:ring-4 focus:outline-none focus:ring-green-100 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                >
                  Submit
                </button>
                <ToastContainer />
              </div>
            )}
          </p>
          <div className="hidden">
            <input
              type="file"
              name="image"
              ref={imageRef}
              accept="`image/*"
              onChange={onImageChange}
            />
          </div>
          <div className="hidden">
            <input
              type="file"
              name="video"
              ref={videoRef}
              accept="video/*"
              // onChange={onVideoChange}
            />
          </div>
          <div className="flex flex-row justify-center">
            {prev && (
              <div className="ms-2 me-3 mb-3 ">
                <img src={prev} alt="img" className="w-40 object-fill" />
              </div>
            )}
            {/* {videoPrev &&(
              <div className="ms-2 me-3 mb-3 ">
              <video src={videoPrev} alt='video' className="w-40 object-fill" controls></video>
            </div>
            )
            } */}
            {prev && (
              <div className="">
                <button
                  type="button"
                  class="bg-white rounded-md p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                  onClick={() => {
                    setPrev(null);
                    setVideoPrev(null)
                  }}
                >
                  <span class="sr-only">Close menu</span>

                  <svg
                    class="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}

export default PostCreation;
