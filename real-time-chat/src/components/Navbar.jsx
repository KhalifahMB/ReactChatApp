import { signOut } from "firebase/auth";
import { useAppContext } from "../contexts/appContext";
import { auth } from "../firebase";

export const Navbar = () => {
  const { currentUser } = useAppContext();
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
