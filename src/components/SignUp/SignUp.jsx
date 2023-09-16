import React from "react";
import axios from "../../utils/axios";
import { SignUpPost } from "../../utils/constants";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Swal from "sweetalert2";
import pic2 from "./undraw_social_life_re_x7t5.svg";

import "./SignUp.css";
import { useEffect } from "react";

function SignUp() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [password, setUserPassword] = useState("");
  const [cPassword, setCpassword] = useState("")

  function handleSubmit(e) {
    e.preventDefault();
    const body = JSON.stringify({
      userName:userName,
      userEmail:userEmail,
      password:password,
      cPassword:cPassword
  })
    axios
      .post(SignUpPost, body, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        if (response.data.status === "ok") {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Signup success",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/login");
        } else {
          Swal.fire({
            position: "center",
            icon: "warning",
            title: response.data.error,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          position: "center",
          icon: "warning",
          title: err,
          showConfirmButton: false,
          timer: 1500,
        });
      });
  }
  return (
    <div>
      <div className="container">
        <div className="img">
          <img src={pic2} />
        </div>
        <div className="login-content">
          <form onSubmit={handleSubmit}>
            <h2 className="title">Welcome</h2>
            <div className="input-div one">
              <div className="i">
                <i className="fas fa-user"></i>
              </div>
              <div className="div">
                <input
                  type="text"
                  className="input"
                  id="UserName"
                  placeholder="Name"
                  name="userName"
                  onChange={(e) => {
                    setUserName(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="input-div one">
              <div className="i">
                <i className="fas fa-user"></i>
              </div>
              <div className="div">
                <input
                  type="text"
                  className="email"
                  id="UserEmail"
                  placeholder="Email"
                  name="userEmail"
                  onChange={(e) => {
                    setUserEmail(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="input-div one">
              <div className="i">
                <i className="fas fa-user"></i>
              </div>
              <div className="div">
                <input
                  type="password"
                  className="input"
                  id="password"
                  placeholder="Password"
                  name="password"
                  onChange={(e) => {
                    setUserPassword(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="input-div pass">
              <div className="i">
                <i className="fas fa-lock"></i>
              </div>
              <div className="div">
                <input
                  type="password"
                  className="input"
                  id="c-password"
                  placeholder="Retype Password"
                  name="c-password"
                  onChange={(e) => {
                    setCpassword(e.target.value);
                  }}
                />
              </div>
            </div>
            <a
              href=""
              onClick={() => {
                navigate("/login");
              }}
            >
              Already Have Account ?
            </a>
            <a href="#">Forgot Password?</a>
            <input type="submit" className="btn btn1" value="Signup" />
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
