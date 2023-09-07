/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import Google from "../assets/img/google.png";

const LoginForm = ({ register, setRegister, googleSign }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setloading] = useState(false);
  const [err, seterr] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    setloading(true);
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      console.error("Login error:", error.message);
      setloading(false);
      seterr(error.message);
    }
  };
  useEffect(() => {
    const timerId = setTimeout(() => {
      seterr("");
    }, 2000);

    return () => {
      clearTimeout(timerId);
    };
  }, [err]);

  return (
    <div
      className={`innerContainer ${register ? "hidden" : ""}`}
      id="login-container"
    >
      {err && <h1>{err}</h1>}
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
        <input
          type="submit"
          value={loading ? "please wait logging in" : "Login"}
          disabled={loading}
        />
      </form>
      <img src={Google} onClick={googleSign} />
      <button className="btnRegs" onClick={() => setRegister(true)}>
        Register
      </button>
    </div>
  );
};

export default LoginForm;
