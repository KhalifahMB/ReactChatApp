import { useContext, useEffect, useState } from "react";
import Message from "./Message";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { AppContext } from "../contexts/appContext";
const Messages = () => {
  const [messages, setMessages] = useState([]);
  const { chatId } = useContext(AppContext);
  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });

    return () => {
      unSub();
    };
  }, [chatId]);
  return (
    <div className="chat-messages">
      {messages.map((message) => (
        <Message key={message.uid} />
      ))}
    </div>
  );
};

export default Messages;
