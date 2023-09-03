/* eslint-disable no-unused-vars */
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { Link, Navigate } from "react-router-dom";

const Welcome = () => {
  const [user, loading, error] = useAuthState(auth);
  return (
    <>
      <div>Welcome</div>
      {user ? <Link to="/chats">Chats</Link> : <Link to="/login">Login</Link>}
    </>
  );
};

export default Welcome;
