/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import "../assets/css/login.css";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
const Login = () => {
  const [regiter, setRegiter] = useState(false);
  return (
    <div className="container">
      <LoginForm regiter={regiter} setRegiter={setRegiter} />
      <RegisterForm register={regiter} setRegiter={setRegiter} />
    </div>
  );
};

export default Login;
