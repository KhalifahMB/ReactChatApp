/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import "../assets/css/login.css";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const [register, setRegister] = useState(false);
  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((userCredentials) => {
        console.log(userCredentials);
        navigate("/");
      })
      .catch((err) => {});
    console.log("success");
  };

  return (
    <div className="container">
      <LoginForm
        register={register}
        setRegister={setRegister}
        googleSign={googleSignIn}
      />
      <RegisterForm register={register} setRegister={setRegister} />
    </div>
  );
};

export default Login;
