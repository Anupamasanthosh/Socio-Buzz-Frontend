import React from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { verifyToken, imageupload, coverUpload } from "../../../utils/constants";
import axios from "../../../utils/axios";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useState } from "react";
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from "mdb-react-ui-kit";
import { changeCoverImage } from "../../../Redux/userCoverReducer";

function ProfilePic() {
  const [image, setImage] = useState("");
  const [modalImage, setModalImage] = useState(image);
  const [showInput, setShowInput] = useState(false);
  const [basicModal, setBasicModal] = useState(false);
  const [cover,setCover]=useState('')
  const [prev,setPrev]=useState('')
  const imageRef = useRef();
  const dispatch = useDispatch()

  const coverImage=useSelector((state)=>state.usercoverimage)
  console.log(coverImage,'imggg from cover')
  const navigate = useNavigate();
  const Token = localStorage.getItem("token");

  const toggleShow = () => {
    setBasicModal(!basicModal);
    setModalImage(image);
  };
  const handleClick = () => {
    setShowInput(true);
  };
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const img = event.target.files[0];
      setImage(img);
      const reader = new FileReader();
      reader.readAsDataURL(img);
      reader.onload = (readerEvent) => {
        if (img.type.includes("image")) {
          setModalImage(readerEvent.target.result);
        }
      };
    }
  };
  const onImage =(event)=>
  {
    if (event.target.files && event.target.files[0]) {
      const img = event.target.files[0];
      console.log(img,'img from evdo')
      setPrev(img)
      const formData=new FormData()
      formData.append('image',img)
      formData.append('token',Token)
      axios.post(coverUpload,formData, {
        headers: { "Content-Type": "multipart/form-data" },
      }).then((res)=>
      {
        console.log(res,'resssssss from somewhere ')
        if(res.data.data)
        {
          dispatch(changeCoverImage(res.data.data))
          setCover(res.data.data)
          showToastMessage()
        }
        else
        {
          showToastMessageError()
        }
      })
    }
  }
  useEffect(() => {
    if (Token) {
      axios
        .post(verifyToken, JSON.stringify({ Token }), {
          headers: { "Content-Type": "application/json" },
        })
        .then((res) => {
          console.log(res, "from resss");
          setImage(res.data.user.image);
        })
        .catch((err) => {
          console.log(err, "error from token");
        });
    } else {
      navigate("/login");
    }
    setCover(coverImage)
  }, []);

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

  function handleUpload(e) {
    e.preventDefault();
    const formData = new FormData();
    console.log(modalImage);
    formData.append("image", image);
    formData.append("token", Token);
    axios
      .post(imageupload, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        console.log(res);
        showToastMessage();

        const img = res.data.data;
        setImage(img);
        toggleShow();
      })
      .catch(() => {
        console.log("heheh");
        showToastMessageError();
      });
  }

  return (
    <div className="pe-3 m-4">
      <div class="relative border border-b-gray-600 rounded shadow-lg">
        <div
          class="flex items-center justify-center h-48 rounded relative"
          style={{
            backgroundImage:{coverImage},
            backgroundSize: "cover",
          }}
        >
          <img src={cover} alt="why"  className="w-full h-full" />
          <div className="absolute top-0 right-0">
            <div className="m-3" >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6" onClick={() => {
                  imageRef.current.click();
                }}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
</svg>
<div className="hidden">
            <input
              type="file"
              name="image"
              ref={imageRef}
              accept="image/*"
              onChange={onImage}
            />
          </div>
            </div>
          </div>
          <div class="absolute bottom-0 w-full flex justify-center">
            <div class="max-w-sm border border-gray-200 rounded-lg shadow">
              <img
                src={image}
                alt=""
                onClick={toggleShow}
                class="rounded-full w-24 h- border-24 border-white"
              />
            </div>
            <ToastContainer />
          </div>
        </div>
      </div>
      <MDBModal show={basicModal} setShow={setBasicModal} tabIndex="-1">
        <MDBModalDialog centered>
          <MDBModalContent>
            <MDBModalHeader className="ms-10 me-10">
              <MDBModalTitle>Profile Image</MDBModalTitle>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={() => {
                  toggleShow();
                  setShowInput(false);
                }}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody className="ms-10 me-10">
              <form onSubmit={handleUpload} enctype="multipart/form-data">
                <img
                  classNameName="mx-auto"
                  src={modalImage}
                  alt=""
                  width={200}
                  name="image"
                  height={200}
                  onClick={handleClick}
                />

                <MDBModalFooter>
                  {showInput && (
                    <div class="flex justify-between">
                      <input
                        type="file"
                        accept="image/*"
                        name="image"
                        onChange={onImageChange}
                      />
                      <button type="submit">Upload</button>
                    </div>
                  )}
                </MDBModalFooter>
              </form>
            </MDBModalBody>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </div>
  );
}

export default ProfilePic;
