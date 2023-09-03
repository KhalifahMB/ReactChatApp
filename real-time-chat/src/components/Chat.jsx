/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
// import { ref, push, onChildAdded, off } from "firebase/database";
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Outgoing from "./Outgoing";
import Incoming from "./Incoming";
import getRelativeTime from "../utils/getRelativeDate";
import { ref, onChildAdded, push } from "firebase/database";

const Chat = () => {
  const [user] = useAuthState(auth);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [isloading, setLoading] = useState(false);
  const messageCollection = ref(db, "chats");

  useEffect(() => {
    const unsubscribe = onChildAdded(messageCollection, (snapshot) => {
      const timestamp = snapshot.val().timestamp;
      const relativeTime = getRelativeTime(`${timestamp}`);
      const message = snapshot.val();
      console.log(message);
      console.log(messages);
      setMessages((prev) => [...prev, message]);
    });
    return () => unsubscribe;
  }, []); // Empty dependency array means this effect runs once on mount

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (message !== "") {
        await push(messageCollection, {
          sender: user.uid,
          username: user.displayName,
          photoURL: user.photoURL,
          text: message,
          timestamp: new Date().toISOString(),
        }).then((data) => console.log(data));
        setMessage(""); // Clear the input field after sending the message
        setLoading(false);
      }
    } catch (error) {
      console.log("Error sending message:", error);
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h1>Real-time Chat App</h1>
      </div>
      <div className="chat-messages">
        {messages.map((message) =>
          message.sender === user.uid ? (
            <Outgoing key={message.id} message={message} />
          ) : (
            <Incoming key={message.id} message={message} />
          )
        )}
      </div>
      <div className="chat-input">
        <form className="input" onSubmit={handleSubmit}>
          <input
            type="text"
            id="message-input"
            placeholder="Type your message..."
            value={message}
            onChange={handleChange}
          />
          <span style={{ cursor: "pointer" }}>&#128247;</span>
          {message && (
            <input
              type="submit"
              id="send-button"
              value="Send"
              disabled={isloading}
            />
          )}
        </form>
      </div>
    </div>
  );
};

export default Chat;
