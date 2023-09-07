import { signOut } from "firebase/auth";
import { AppContext } from "../contexts/appContext";
import { auth } from "../firebase";
import { useContext } from "react";
import "../assets/css/nav.scss";
export const Navbar = () => {
  const { currentUser } = useContext(AppContext);
  return (
    <div className="navBar">
      <span className="logo">React Chat</span>
      <div className="user">
        <img src={currentUser.photoURL} alt="" />
        <span>{currentUser.displayName}</span>
        <button onClick={() => signOut(auth)}>logout</button>
      </div>
    </div>
  );
};
