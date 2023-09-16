import React, { useState } from "react";
import axios from "../../utils/axios";
import { loginPost } from "../../utils/constants";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import pic2 from "./undraw_social_life_re_x7t5.svg";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  function handleSubmit(e) {
    e.preventDefault();
    
    const data = JSON.stringify({
      email: email,
      password: password,
    });
    axios
      .post(loginPost, data, {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Login Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/");
      })
      .catch((res) => {

        Swal.fire({
          position: "center",
          icon: "warning",
          title: 'Invalid Credentials',
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
                  className="email"
                  id="UserEmail"
                  placeholder="Email"
                  name="userEmail"
                  onChange={(e) => {
                    setEmail(e.target.value);
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
                  placeholder="Password"
                  name="c-password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>
            </div>
            <a
              href=""
              onClick={() => {
                navigate("/signUp");
              }}
            >
              Not Registered ?
            </a>
            <a href="#">Forgot Password?</a>
            <input type="submit" className="btn btn2" value="Login" />
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
