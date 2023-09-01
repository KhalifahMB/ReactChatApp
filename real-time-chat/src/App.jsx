/* eslint-disable no-unused-vars */
// src/App.js
import React, { useState } from "react";
import { app } from "./firebase";
import Login from "./components/Login";
import Chat from "./components/Chat";
import UserList from "./components/UserList";
function App() {
  const [user, setUser] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <div className="App">
      {!user ? (
        <Login setUser={setUser} />
      ) : (
        <>
          <UserList setSelectedUser={setSelectedUser} />
          {selectedUser && <Chat user={user} selectedUser={selectedUser} />}
        </>
      )}
    </div>
  );
}

export default App;
