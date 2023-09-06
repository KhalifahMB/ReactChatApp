/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../firebase";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDownloadURL, uploadBytesResumable, ref } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";

const RegisterForm = ({ register, setRegister }) => {
  const navigate = useNavigate();

  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [image, setImage] = useState(null);
  const [errMsg, setErrMsg] = useState("error");
  const validateImage = (e) => {
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
    try {
      // create user
      const res = await createUserWithEmailAndPassword(auth, email, password);
      console.log(res);
      // create image reference
      const storageref = ref(storage, `${email}`);
      await uploadBytesResumable(storageref, image).then(() => {
        getDownloadURL(storageref).then(async (imgUrl) => {
          try {
            // update profile
            await updateProfile(res.user, {
              displayName: `${firstName} ${lastName}`,
              photoURL: imgUrl,
            });
            // create  user  on firestore
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName: `${firstName} ${lastName}`,
              email,
              photoURL: imgUrl,
            });
            // set a user chats on firestore
            await setDoc(doc(db, "userChats", res.user.uid), {});
            navigate("/");
          } catch (error) {
            console.error("an error occured", error);
          }
        });
      });
    } catch (error) {
      console.error("sorry an error occured", error);
    }
  };
  return (
    <div
      className={`
         innerContainer ${!register ? "hidden" : ""}
      `}
      id="registration-form"
    >
      <form encType="" onSubmit={handleRegister}>
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
