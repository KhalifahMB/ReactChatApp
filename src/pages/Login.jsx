/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import "../assets/css/login.css";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
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
