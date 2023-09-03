/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../firebase";
import { useState } from "react";
import { push, ref } from "firebase/database";
import { useNavigate } from "react-router-dom";

const RegisterForm = ({ register, setRegister }) => {
  const navigate = useNavigate();
  const userscollection = ref(db, "users");

  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [image, setImage] = useState(null);
  const [errMsg, setErrMsg] = useState("error");
  const validateImage = (e) => {
    console.log(e);
    const file = e.target.files[0];
    const allowedTypes = ["image/jpeg", "image/png"];
    const maxSize = 2 * 1024 * 1024; // 2MB in bytes

    setErrMsg("");
    if (!allowedTypes.includes(file.type)) {
      setErrMsg("Please select a valid image of type JPG or PNG.");
      e.target.value = ""; // Clear the input field
      return;
    }

    if (file.size > maxSize) {
      setErrMsg("Image size must not exceed 2MB.");
      e.target.value = ""; // Clear the input field
      let timer = setTimeout(() => {
        console.log("timeout ran");
        setErrMsg("");
        return clearTimeout(timer);
      }, 1000);
      //  return;
    }

    setImage(file);
  };
  const handleRegister = async (e) => {
    e.preventDefault();
    await createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log("User registered:", result);
        navigate("/");
        // Add additional registration logic here if needed
      })
      .catch((error) => {
        console.error("Registration error:", error);
        // Display error message to the user if needed
      });
    await updateProfile(auth.currentUser, {
      displayName: `${firstName} ${lastName || ""}`,
    })
      .then((result) => console.log(result))
      .catch((err) => console.log(err));
  };
  return (
    <div
      className={`
         innerContainer ${!register ? "hidden" : ""}
      `}
      id="registration-form"
    >
      <form
        action="#"
        // method="post"
        // encType="multipart/form-data"
        onSubmit={handleRegister}
      >
        <div className="names">
          <label htmlFor="firstname">First Name</label>
          <input
            type="text"
            required
            id="firstname"
            value={firstName}
            onChange={(e) => setfirstName(e.target.value)}
          />
          <label htmlFor="lastname">Last Name</label>
          <input
            type="text"
            id="lastname"
            value={lastName}
            onChange={(e) => setlastName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            required
            name="email"
            id="email"
            value={email}
            onChange={(e) => setemail(e.target.value)}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            required
            name="password"
            id="password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
          />
        </div>
        <div className="image">
          <label htmlFor="image">Image</label>
          <input
            type="file"
            name="image"
            id="image"
            accept=".jpg, .png"
            // value={image}
            onChange={validateImage}
          />
          <p className="error-message">{errMsg}</p>
        </div>
        <input type="submit" value="Register" />
      </form>
      <button className="btnReg" onClick={() => setRegister(false)}>
        Login
      </button>
    </div>
  );
};

export default RegisterForm;
