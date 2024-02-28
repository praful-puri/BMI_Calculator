import React, { useEffect, useState } from "react";
import "./LoginSignup.css";
import { useNavigate } from "react-router-dom";
import user_icon from "../Assets/person.png";
import email_icon from "../Assets/email.png";
import password_icon from "../Assets/password.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginSignup = () => {
  const navigate = useNavigate();
  const getLocalStorageData = localStorage.getItem("user_credentials");
  const [action, setAction] = useState("Sign Up");
  const [signUpUserData, setSignUpUserData] = useState({
    Name: "",
    Email: "",
    Password: "",
  });

  const [loginUserData, setLoginUserData] = useState({
    Email: "",
    Password: "",
  });

  const handleSignUpUserInput = (event) => {
    const { name, value } = event.target;
    setSignUpUserData({ ...signUpUserData, [name]: value });
  };

  const handleLoginUserInput = (event) => {
    const { name, value } = event.target;
    setLoginUserData({ ...loginUserData, [name]: value });
  };

  const handleLogin = () => {
    const getLocalStorageData = localStorage.getItem("user_credentials");
    if (getLocalStorageData !== null) {
      const { Name, Email, Password } = JSON.parse(getLocalStorageData);
      if (
        Email === loginUserData.Email &&
        Password === loginUserData.Password
      ) {
        navigate("/");
      } else {
        toast.error("Credentials are not valid", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    } else {
      toast.error("User Not Registered", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
    console.log(JSON.parse(getLocalStorageData));
  };

  const handleSignUp = () => {
    if (
      signUpUserData.Email &&
      signUpUserData.Name &&
      signUpUserData.Password
    ) {
      localStorage.setItem("user_credentials", JSON.stringify(signUpUserData));
      toast.success("Signed Up Successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      setSignUpUserData({
        Name: "",
        Email: "",
        Password: "",
      });
      setAction("Login");
    } else {
      toast.error("All fields are required", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  useEffect(() => {
    if (getLocalStorageData !== null) {
      navigate("/");
    }
  }, []);

  return (
    <div className="Box">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="submit-container">
        <div
          className={
            action === "Login" ? "submit-container1 gray" : "submit-container1"
          }
          onClick={() => {
            setAction("Sign Up");
          }}
        >
          Sign Up
        </div>
        <div
          className={
            action === "Sign Up"
              ? "submit-container1 gray"
              : "submit-container1"
          }
          onClick={() => {
            setAction("Login");
          }}
        >
          Login
        </div>
      </div>
      <div className="Box1">
        <div className="text">{action} </div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        {action !== "Login" ? (
          <>
            <div className="inputs1">
              <img src={user_icon} alt="" />
              <input
                type="text"
                name="Name"
                value={signUpUserData.Name}
                placeholder="Name"
                onChange={handleSignUpUserInput}
              />
            </div>
            <div className="inputs1">
              <img src={email_icon} alt="" />
              <input
                type="email"
                name="Email"
                value={signUpUserData.Email}
                placeholder="Email Id"
                onChange={handleSignUpUserInput}
              />
            </div>
            <div className="inputs1">
              <img src={password_icon} alt="" />
              <input
                type="password"
                name="Password"
                value={signUpUserData.Password}
                placeholder="password"
                onChange={handleSignUpUserInput}
              />
            </div>
            <button onClick={handleSignUp} className="submitButton">
              Submit
            </button>
          </>
        ) : (
          <>
            <div className="inputs1">
              <img src={email_icon} alt="" />
              <input
                type="email"
                name="Email"
                value={loginUserData.Email}
                placeholder="Email Id"
                onChange={handleLoginUserInput}
              />
            </div>
            <div className="inputs1">
              <img src={password_icon} alt="" />
              <input
                type="password"
                name="Password"
                value={loginUserData.Password}
                placeholder="password"
                onChange={handleLoginUserInput}
              />
            </div>
            <button className="submitButton" onClick={handleLogin}>
              Submit
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default LoginSignup;
