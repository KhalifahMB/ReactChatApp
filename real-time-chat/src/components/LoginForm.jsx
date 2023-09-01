/* eslint-disable react/prop-types */
import { signInWithEmailAndPassword } from "firebase/auth";
// import { useState } from "react";

const LoginForm = ({ regiter, setRegiter }) => {
  //   const [logins, setlogins] = useState({
  //     email: "",
  //     password: "",
  //   });
  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Login successful
        const user = userCredential.user;
        console.log("User logged in:", user);
        // Redirect the user to the chat page or perform additional login logic
      })
      .catch((error) => {
        console.error("Login error:", error);
        // Display error message to the user if needed
      });
  };
  return (
    <div
      className={`
        containe ${regiter ? "hidden" : ""}
      `}
      id="login-container"
    >
      <form action="#" id="login-form" onSubmit={handleLogin}>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" required name="email" id="email" />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            required="true"
            name="password"
            id="password"
          />
        </div>
        <input type="submit" value="Login" />
      </form>
      <p id="register-link" onClick={() => setRegiter(true)}>
        Register
      </p>
    </div>
  );
};

export default LoginForm;
