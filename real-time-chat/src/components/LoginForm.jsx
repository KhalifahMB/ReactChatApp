/* eslint-disable react/prop-types */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import Google from "../assets/img/google.png";

const LoginForm = ({ register, setRegister, googleSign }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    setloading(true);
    e.preventDefault();
    console.log("logging you in soon");

    try {
      await signInWithEmailAndPassword(auth, email, password)
        .then((data) => {
          alert("succes");
          console.log(data);
          setloading(false);
          navigate("/");
        })
        .catch((error) => {
          alert("an error occured");
          console.log("sorry an error occured", error);
          setloading(false);
        });

      // Redirect to the home page after successful login

      // Replace with your home page route
    } catch (error) {
      console.error("Login error:", error);
      // Display error message to the user if needed
    }
  };

  return (
    <div
      className={`innerContainer ${register ? "hidden" : ""}`}
      id="login-container"
    >
      <form action="#" id="login-form" onSubmit={handleLogin}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            required
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            required
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <input type="submit" value="Login" disabled={loading} />
      </form>
      <img src={Google} onClick={googleSign} />
      <button className="btnRegs" onClick={() => setRegister(true)}>
        Register
      </button>
    </div>
  );
};

export default LoginForm;
