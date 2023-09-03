// src/components/UserList.js
import { useState, useEffect } from "react";
import { db } from "../firebase";
import { query, ref } from "firebase/database";
import { onValue } from "firebase/database";

function UserList() {
  const [onlineUsers, setOnlineUsers] = useState([]);
  const usersRef = ref(db, "users"); // Reference to your users in Firebase

  useEffect(() => {
    const q = query(usersRef);
    const subscribe = onValue(q, (snapshot) => {
      if (snapshot.val()) {
        const users = Object.values(snapshot.val());
        const onlineUsers = users.filter((user) => user.online);
        setOnlineUsers(onlineUsers);
      }
    });

    return () => subscribe;
  }, []);

  return (
    <div>
      <h2>Online Users</h2>
      <ul>
        {onlineUsers ? (
          onlineUsers.map((user) => <li key={user.id}>{user.displayName}</li>)
        ) : (
          <h1>No user</h1>
        )}
      </ul>
    </div>
  );
}

export default UserList;
