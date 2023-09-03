import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Chat from "./Chat";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

const SharedLayout = () => {
  const [user, loading, error] = useAuthState(auth);
  return (
    <div className="chat-app">
      <Sidebar />
      {loading && <h1>Loading</h1>}
      {user && <Chat />}
      {error && <h1>Cant get User</h1>}

      <Outlet />
    </div>
  );
};

export default SharedLayout;
