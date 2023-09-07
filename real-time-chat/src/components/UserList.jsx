import { useState, useEffect, useContext } from "react";
import { db } from "../firebase";
import { AppContext } from "../contexts/appContext";
import { doc, onSnapshot } from "firebase/firestore";
import "../assets/css/userlist.scss"; // Import SCSS file
import { Link } from "react-router-dom";

function UserList() {
  const [chats, setChats] = useState([]);
  const { currentUser, dispatch } = useContext(AppContext);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });

      return () => {
        unsub();
      };
    };

    currentUser.uid && getChats();
  }, [currentUser.uid]);

  const handleSelect = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u });
  };

  return (
    <div className="user-list-container">
      <h2 className="user-list-title">Online Users</h2>
      <Link to="/users">Add Friends</Link>
      {/* Apply a title class */}
      <div className="user-list">
        {chats &&
          Object.entries(chats)
            ?.sort((a, b) => b[1].date - a[1].date)
            .map((chat) => (
              <div
                className="user-chat"
                key={chat[0]}
                onClick={() => handleSelect(chat[1].userInfo)}
              >
                <img
                  src={chat[1].userInfo.photoURL}
                  alt=""
                  className="user-avatar"
                />{" "}
                {/* Apply a user-avatar class */}
                <div className="user-chat-info">
                  {" "}
                  {/* Apply a user-chat-info class */}
                  <span className="user-display-name">
                    {chat[1].userInfo.displayName}
                  </span>
                  <p className="user-last-message">
                    {chat[1].lastMessage?.text}
                  </p>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
}

export default UserList;
