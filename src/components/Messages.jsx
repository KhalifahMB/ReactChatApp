import { useContext, useEffect, useState } from "react";
import Message from "./Message";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { AppContext } from "../contexts/appContext";
const Messages = () => {
  const [messages, setMessages] = useState([]);
  const { chatId } = useContext(AppContext);
  console.log(chatId);
  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", chatId), (doc) => {
      doc.exists() && setMessages(doc.data().message);
    });

    return () => {
      unSub();
    };
  }, [chatId]);
  console.log(messages);
  return (
    <div className="chat-messages">
      {messages &&
        messages.map((message) => (
          <Message key={message.id} message={message} />
        ))}
    </div>
  );
};

export default Messages;
