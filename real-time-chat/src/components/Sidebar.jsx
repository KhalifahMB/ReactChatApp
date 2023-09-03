import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import UserList from "./UserList";
import { useEffect, useState } from "react";

const Sidebar = () => {
  const [user, loading, error] = useAuthState(auth);
  const [displayName, setDisplayName] = useState(user.displayName);
  useEffect(() => {
    setDisplayName(user.displayName);
  }, [user]);

  const handleLogout = async () => {
    await auth
      .signOut()
      .then((susses) => console.log("success", susses))
      .catch((error) => console.log("error", error));
  };
  return (
    <div className="sidebar">
      {user && (
        <div className="current-user">
          {displayName ? (
            <h1>{displayName}</h1>
          ) : (
            <h1 className="user-text">{user.email[0].toUpperCase()}</h1>
          )}
          <img src={user.photoURL} alt="no profile pic" />
        </div>
      )}
      <ul className="user-list">
        <UserList />
      </ul>
      {loading ? (
        <h1>Loading</h1>
      ) : error ? (
        <h1>Error</h1>
      ) : (
        <div className="auth-links">
          {user ? (
            <button onClick={handleLogout} className="signout-btn">
              SignOut
            </button>
          ) : (
            <a href="login.html">Register/Login </a>
          )}
        </div>
      )}
    </div>
  );
};

export default Sidebar;
