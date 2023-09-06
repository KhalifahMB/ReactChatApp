// src/components/UserList.js
import { useState, useEffect, useContext } from "react";
import { db } from "../firebase";
import { AppContext } from "../contexts/appContext";
import { doc, onSnapshot } from "firebase/firestore";

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
    <div>
      <h2>Online Users</h2>
      <div>
        {chats &&
          Object.entries(chats)
            ?.sort((a, b) => b[1].date - a[1].date)
            .map((chat) => (
              <div
                className="userChat"
                key={chat[0]}
                onClick={() => handleSelect(chat[1].userInfo)}
              >
                <img src={chat[1].userInfo.photoURL} alt="" />
                <div className="userChatInfo">
                  <span>{chat[1].userInfo.displayName}</span>
                  <p>{chat[1].lastMessage?.text}</p>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
}

export default UserList;
