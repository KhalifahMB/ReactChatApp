import Messages from "./Messages";
import Input from "./Input";
import { useContext } from "react";
import { AppContext } from "../contexts/appContext";

const Chat = () => {
  const { user } = useContext(AppContext);
  return (
    <div className="chat-container">
      <div className="chat-header">
        <h1>{user.displayName}</h1>
      </div>
      <Messages />
      <Input />
    </div>
  );
};

export default Chat;
